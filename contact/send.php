<?php
/**
 * Palmelita - Contact Form Email Handler
 * 
 * PHP backend for contact form with validation, anti-spam, and rate limiting
 */

// ============================================================================
// CONFIGURATION
// ============================================================================

const DEST_EMAIL = 'confituras@palmelita.es';
const FROM_EMAIL = 'confituras@palmelita.es';
const FROM_NAME = 'Palmelita';
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_SECONDS = 600; // 10 minutes

// ============================================================================
// INITIALIZATION
// ============================================================================

header('Content-Type: application/json; charset=utf-8');

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'method_not_allowed']);
    exit;
}

// ============================================================================
// INPUT VALIDATION
// ============================================================================

$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';
$honeypot = isset($_POST['company_fax']) ? trim($_POST['company_fax']) : '';


$formType = isset($_POST['form_type']) ? trim($_POST['form_type']) : 'contacto';

// allowlist para que no te inyecten cualquier cosa
$allowedTypes = ['contacto', 'distribuidores'];
if (!in_array($formType, $allowedTypes, true)) {
    $formType = 'contacto';
}

// Honeypot anti-spam check
if (!empty($honeypot)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'invalid']);
    exit;
}

// Email validation
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'invalid']);
    exit;
}

// Message validation (minimum 3 characters)
if (strlen($message) < 3) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'invalid']);
    exit;
}

$allowedHosts = ['confituras.palmelita.es', 'jam.palmelita.com', 'konfitueren.palmelita.com', 'confitures.palmelita.com'];
$host = $_SERVER['HTTP_HOST'] ?? '';

if (!in_array($host, $allowedHosts, true)) {
    http_response_code(403);
    echo json_encode(['ok' => false, 'error' => 'forbidden']);
    exit;
}

// ============================================================================
// RATE LIMITING
// ============================================================================

function getRateLimitData() {
    $file = __DIR__ . '/rate_limit.json';
    if (!file_exists($file)) {
        return [];
    }
    $data = file_get_contents($file);
    return json_decode($data, true) ?: [];
}

function saveRateLimitData($data) {
    $file = __DIR__ . '/rate_limit.json';
    file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT));
}

function cleanExpiredEntries($data, $window) {
    $now = time();
    $cleaned = [];
    foreach ($data as $ip => $timestamps) {
        $valid = array_filter($timestamps, function($ts) use ($now, $window) {
            return ($now - $ts) < $window;
        });
        if (!empty($valid)) {
            $cleaned[$ip] = array_values($valid);
        }
    }
    return $cleaned;
}

function checkRateLimit($ip, $max, $window) {
    $data = getRateLimitData();
    $data = cleanExpiredEntries($data, $window);
    
    if (!isset($data[$ip])) {
        $data[$ip] = [];
    }
    
    $count = count($data[$ip]);
    
    if ($count >= $max) {
        return false; // Rate limit exceeded
    }
    
    // Add new timestamp
    $data[$ip][] = time();
    saveRateLimitData($data);
    
    return true;
}

// Get client IP
$clientIp = ($_SERVER['REMOTE_ADDR'] ?? 'unknown') . '|' . $formType;

if (!checkRateLimit($clientIp, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_SECONDS)) {
    http_response_code(429);
    echo json_encode(['ok' => false, 'error' => 'ratelimit']);
    exit;
}

// ============================================================================
// EMAIL PREPARATION
// ============================================================================

// Sanitize inputs
$email = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
$name = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');

$host = $_SERVER['HTTP_HOST'] ?? 'unknown-host';
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$referer = $_SERVER['HTTP_REFERER'] ?? '';
$subject = strtoupper($formType) . " | Palmelita | " . $host;

$userAgent = $_SERVER['HTTP_USER_AGENT'] ?? 'N/A';
$timestamp = date('Y-m-d H:i:s');

$bodyText = "NUEVO MENSAJE (" . strtoupper($formType) . ")\n\n";
$bodyText .= "Dominio: $host\n";
if ($origin)  $bodyText .= "Origin: $origin\n";
if ($referer) $bodyText .= "Referer: $referer\n";
$bodyText .= "\n";
$bodyText .= "Nombre: $name\n";
$bodyText .= "Email: $email\n\n";
$bodyText .= "Mensaje:\n$message\n\n";


// ============================================================================
// EMAIL SENDING
// ============================================================================

function sendWithPHPMailer($to, $subject, $body, $fromEmail, $fromName, $replyTo) {
    // Check if PHPMailer is available
    if (!class_exists('PHPMailer\PHPMailer\PHPMailer')) {
        // Try to autoload if composer is present
        $autoload = __DIR__ . '/../vendor/autoload.php';
        if (file_exists($autoload)) {
            require_once $autoload;
        }
    }
    
    if (!class_exists('PHPMailer\PHPMailer\PHPMailer')) {
        return false; // PHPMailer not available
    }
    
    try {
        $mail = new PHPMailer\PHPMailer\PHPMailer(true);
        $mail->CharSet = 'UTF-8';
        $mail->setFrom($fromEmail, $fromName);
        $mail->addAddress($to);
        $mail->addReplyTo($replyTo, '');
        $mail->Subject = $subject;
        $mail->Body = $body;
        
        return $mail->send();
    } catch (Exception $e) {
        return false;
    }
}

function sendWithMail($to, $subject, $body, $fromEmail, $fromName, $replyTo) {
    $headers = "From: $fromName <$fromEmail>\r\n";
    $headers .= "Reply-To: $replyTo\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    return mail($to, $subject, $body, $headers);
}

// Try PHPMailer first, fallback to mail()
$sent = sendWithPHPMailer(DEST_EMAIL, $subject, $bodyText, FROM_EMAIL, FROM_NAME, $email);

if (!$sent) {
    $sent = sendWithMail(DEST_EMAIL, $subject, $bodyText, FROM_EMAIL, FROM_NAME, $email);
}

// ============================================================================
// RESPONSE
// ============================================================================

if ($sent) {
    http_response_code(200);
    echo json_encode(['ok' => true]);
} else {
    // Log error for debugging
    $logFile = __DIR__ . '/error_log.txt';
    $logMsg = date('Y-m-d H:i:s') . " - Email send failed\n";
    $logMsg .= "To: " . DEST_EMAIL . "\n";
    $logMsg .= "From: $email ($name)\n";
    $logMsg .= "Subject: $subject\n";
    $logMsg .= "Message length: " . strlen($message) . "\n";
    $logMsg .= "---\n\n";
    @file_put_contents($logFile, $logMsg, FILE_APPEND);
    
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'send_failed']);
}
