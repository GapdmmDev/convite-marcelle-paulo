const ENDERECO = 'Av.+Dr.+Luís+Arrobas+Martins,+795+-+Veleiros,+São+Paulo+-+SP,+04781-001'

const btnMaps = document.getElementById('btn-maps')
const btnWaze = document.getElementById('btn-waze')

if (btnMaps) btnMaps.href = `https://maps.google.com/?q=${ENDERECO}`
if (btnWaze) btnWaze.href = `https://waze.com/ul?q=${ENDERECO}`
