/**
 * Formulario de contacto (Netlify Forms).
 * Valida en el navegador, envía por POST y solo confirma si el servidor aceptó la solicitud.
 */
export function initContactForm(): void {
  const form = document.querySelector<HTMLFormElement>('[data-contact-form]');
  if (!form) return;
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const label = button?.querySelector('span');
  const status = form.querySelector<HTMLElement>('.status');
  const msgRequired = form.dataset.msgRequired ?? '';
  const msgEmail = form.dataset.msgEmail ?? '';
  const msgSending = form.dataset.msgSending ?? '';
  let sending = false;

  const fields = Array.from(form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input[required], textarea[required]'));

  const check = (el: HTMLInputElement | HTMLTextAreaElement): boolean => {
    const err = form.querySelector<HTMLElement>(`#${el.id}-err`);
    let msg = '';
    if (!el.value.trim()) msg = msgRequired;
    else if (el.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(el.value.trim())) msg = msgEmail;
    el.setAttribute('aria-invalid', msg ? 'true' : 'false');
    if (err) err.textContent = msg;
    return !msg;
  };

  fields.forEach((el) => {
    el.addEventListener('blur', () => { if (el.value) check(el); });
    el.addEventListener('input', () => { if (el.getAttribute('aria-invalid') === 'true') check(el); });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (sending) return;
    const invalid = fields.filter((el) => !check(el));
    if (invalid.length) { invalid[0].focus(); return; }

    sending = true;
    form.classList.remove('is-ok', 'is-fail');
    form.setAttribute('aria-busy', 'true');
    if (button) button.disabled = true;
    if (label) label.textContent = msgSending;
    if (status) status.textContent = '';

    try {
      const body = new URLSearchParams(new FormData(form) as unknown as Record<string, string>).toString();
      const res = await fetch(window.location.pathname, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      form.reset();
      fields.forEach((el) => el.removeAttribute('aria-invalid'));
      form.classList.add('is-ok');
      if (status) status.textContent = status.dataset.ok ?? '';
    } catch (err) {
      console.warn('[contacto] envío no aceptado', err);
      form.classList.add('is-fail');
      if (status) status.textContent = status.dataset.fail ?? '';
    } finally {
      sending = false;
      form.removeAttribute('aria-busy');
      if (button) button.disabled = false;
      if (label) label.textContent = button?.dataset.label ?? '';
    }
  });
}
