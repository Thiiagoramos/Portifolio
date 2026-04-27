// =========================================
// FORM.JS — Validação e envio do formulário
// =========================================

async function handleSubmit(btn) {
  const nome     = document.querySelector('input[name="nome"]').value.trim();
  const email    = document.querySelector('input[name="email"]').value.trim();
  const mensagem = document.querySelector('textarea[name="mensagem"]').value.trim();

  // Validação básica
  if (!nome || !email || !mensagem) {
    showError(btn, '⚠ Preencha todos os campos');
    return;
  }

  if (!isValidEmail(email)) {
    showError(btn, '⚠ Email inválido');
    return;
  }

  // Feedback de envio
  btn.textContent  = '⚠ Enviando...';
  btn.style.opacity = '0.7';
  btn.disabled     = true;

  try {
    const response = await fetch('https://formspree.io/f/mojyzvgbl', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, mensagem })
    });

    if (response.ok) {
      btn.textContent = '✓ Mensagem enviada!';
      btn.style.opacity = '1';
      btn.style.background = 'var(--green)';
      btn.style.color = '#0d0f14';

      document.querySelector('input[name="nome"]').value = '';
      document.querySelector('input[name="email"]').value = '';
      document.querySelector('textarea[name="mensagem"]').value = '';

      setTimeout(() => {
        btn.textContent = 'Enviar mensagem';
        btn.style.background = '';
        btn.style.color = '';
        btn.disabled = false;
      }, 3000);
    } else {
      //Caso ocorra erro de resposta da API
      showError(btn, '⚠ Erro ao enviar, tente novamente');
      btn.disabled = false;
    }
} catch (error) {
    //Caso ocorra erro de rede ou outro tipo de falha
    showError(btn, '⚠ Erro de conexão, tente novamente');
    btn.disabled = false;
  }
}

function showError(btn, message) {
  btn.textContent = message;
  btn.style.opacity = '1';
  btn.style.background = 'var(--red)';
  btn.style.color = '#fff';

  setTimeout(() => {
    btn.textContent = 'Enviar mensagem';
    btn.style.background = '';
    btn.style.color = '';
  }, 3000);
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}