const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxbDS5T4BuaU059pHgdj7FU3dBf8IXyfUDklOsjrA_Fg-rKV4HU2VO33lySvsQlYS01/exec'

const form    = document.getElementById('rsvp-form')
const sucesso = document.getElementById('rsvp-sucesso')
const topo    = document.querySelector('.rsvp-topo')
const section = document.querySelector('.rsvp-section')

form?.addEventListener('submit', (e) => {
  e.preventDefault()

  const nome = form.nome.value.trim()
  if (!nome) { form.nome.focus(); return }

  const payload = {
    nome,
    acompanhante: form.acompanhante.value.trim(),
  }

  // Fire and forget
  fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).catch(() => {})

  // Esconde só o conteúdo, não o main
  topo.hidden    = true
  section.hidden = true
  sucesso.hidden = false

  // Redireciona para a página principal após 10 segundos
  setTimeout(() => {
    window.location.href = '/'
  }, 10000)
})
