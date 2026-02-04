(function () {
  const forms = document.querySelectorAll('.js-mail-form');
  if (!forms.length) return;

  const lang = (document.documentElement.lang || 'es').toLowerCase();

  const copy = {
    es: {
      sending: 'Enviando…',
      ok: '¡Listo! Mensaje enviado.',
      error: 'Ups. No se pudo enviar. Probá de nuevo.',
      invalid: 'Revisá tu email y el mensaje.'
    },
    en: {
      sending: 'Sending…',
      ok: 'Done! Message sent.',
      error: 'Oops. Could not send. Please try again.',
      invalid: 'Please check your email and message.'
    },
    de: {
      sending: 'Wird gesendet…',
      ok: 'Fertig! Nachricht gesendet.',
      error: 'Ups. Senden fehlgeschlagen. Bitte erneut versuchen.',
      invalid: 'Bitte E-Mail und Nachricht prüfen.'
    },
    fr: {
      sending: 'Envoi…',
      ok: 'C’est envoyé !',
      error: 'Oups. Envoi impossible. Réessaie.',
      invalid: 'Vérifie ton e-mail et ton message.'
    }
  };

  const t = copy[lang] || copy.es;

  function toast(msg, type) {
    const el = document.createElement('div');
    el.textContent = msg;
    el.setAttribute('role', 'status');
    el.style.position = 'fixed';
    el.style.left = '50%';
    el.style.bottom = '18px';
    el.style.transform = 'translateX(-50%)';
    el.style.padding = '12px 14px';
    el.style.borderRadius = '14px';
    el.style.background =
      type === 'ok' ? 'rgba(20, 120, 60, 0.95)' :
      type === 'error' ? 'rgba(160, 30, 30, 0.95)' :
      'rgba(20, 20, 20, 0.92)';
    el.style.color = '#fff';
    el.style.fontFamily = 'system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif';
    el.style.fontSize = '14px';
    el.style.lineHeight = '1.2';
    el.style.maxWidth = '92vw';
    el.style.boxShadow = '0 10px 30px rgba(0,0,0,.25)';
    el.style.zIndex = '99999';
    el.style.opacity = '0';
    el.style.transition = 'opacity .18s ease, transform .18s ease';

    document.body.appendChild(el);
    requestAnimationFrame(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateX(-50%) translateY(-4px)';
    });

    setTimeout(() => {
      el.style.opacity = '0';
      el.style.transform = 'translateX(-50%) translateY(0px)';
      setTimeout(() => el.remove(), 220);
    }, 2600);
  }

  function isValidEmail(v) {
    return typeof v === 'string' && v.includes('@') && v.length >= 6;
  }

  forms.forEach((form) => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = form.querySelector('input[name="email"]')?.value?.trim();
      const msg = form.querySelector('textarea[name="message"]')?.value?.trim();

      if (!isValidEmail(email) || !msg || msg.length < 3) {
        toast(t.invalid, 'error');
        return;
      }

      const btn = form.querySelector('button[type="submit"]');
      const prevText = btn?.textContent;

      if (btn) {
        btn.disabled = true;
        btn.textContent = t.sending;
        btn.style.opacity = '0.85';
        btn.style.cursor = 'not-allowed';
      }

      try {
        const data = new FormData(form);

        // Agrega el dominio automáticamente al subject (sirve para ver desde qué sitio llegó)
        const currentSubject = data.get('_subject') || 'Mensaje web - Palmelita';
        data.set('_subject', `${currentSubject} | ${location.hostname}`);

        const res = await fetch(form.action, {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' }
        });

        if (res.ok) {
          form.reset();
          toast(t.ok, 'ok');
        } else {
          toast(t.error, 'error');
        }
      } catch (err) {
        toast(t.error, 'error');
      } finally {
        if (btn) {
          btn.disabled = false;
          btn.textContent = prevText || 'ENVIAR';
          btn.style.opacity = '';
          btn.style.cursor = '';
        }
      }
    });
  });
})();
