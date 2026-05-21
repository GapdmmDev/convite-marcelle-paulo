# Convite de Casamento — Marcelle & Paulo

## Visão Geral

Site de convite de casamento web com duas páginas:
1. **Convite** — página principal com informações do evento e animações
2. **Confirmação** — formulário de RSVP que envia para Google Sheets

Design de referência: `ref.png`
Paleta:
- Fundo da página: `#FFFFFF` (branco puro)
- Verde escuro (fundo do CTA, seções de destaque): `#7C8558`
- Verde dos elementos (textos, formas, SVGs sobre fundo branco): `#707750`
Tipografia:
- Títulos e destaques: **Cormorant Garamond** (Google Fonts)
- Corpo de texto: **Verdana Italic** (fonte do sistema, sem import)
Estética: botânica, elegante, mobile-first, scroll longo
Extras: countdown regressivo animado até o dia do casamento

---

## Stack

### Front-end
- **HTML + CSS + JavaScript puro** (sem framework)
  - Projeto pequeno, estático, sem necessidade de reatividade
  - Build via **Vite** para hot reload no dev e bundle otimizado em prod
  - Mantém zero dependências pesadas em runtime

### Animações
- **GSAP (GreenSock)** — animações de entrada fluídas, timeline controlada
- **Intersection Observer API** — acionar animações ao fazer scroll
- CSS transitions/keyframes para micro-interações (hover, fade)

### Integração de Mapas
- Links diretos — sem API key necessária:
  - Google Maps: `https://maps.google.com/?q=ENDEREÇO`
  - Waze: `https://waze.com/ul?q=ENDEREÇO`
- Botões de "Como chegar" no estilo do layout

### Formulário de RSVP → Google Sheets
- **Google Apps Script** como Web App (método `doPost`)
  - Script publicado como endpoint HTTP gratuito
  - O formulário faz `fetch POST` para a URL do script
  - Script escreve a linha na planilha do Google Sheets
  - Zero custo, zero backend próprio, zero servidor

### Hospedagem
- **Vercel** (free tier) — deploy via git push, HTTPS automático, Edge Network global, zero config para Vite

---

## Estrutura de Arquivos

```
convite-marcelle&paulo/
├── CLAUDE.md
├── ref.png
├── package.json
├── vite.config.js
├── index.html              # Página do convite
├── confirmacao.html        # Página do formulário RSVP
├── src/
│   ├── css/
│   │   ├── main.css        # Reset + variáveis + layout geral
│   │   ├── convite.css     # Estilos da página principal
│   │   └── confirmacao.css # Estilos do formulário
│   ├── js/
│   │   ├── animations.js   # GSAP + Intersection Observer
│   │   ├── maps.js         # Links Google Maps e Waze
│   │   └── rsvp.js         # Fetch POST para Google Apps Script
│   └── assets/
│       ├── fonts/          # Fontes locais (se necessário)
│       └── images/         # Fotos polaroid, logo do local, etc.
└── apps-script/
    └── Code.gs             # Google Apps Script (doPost handler)
```

---

## Seções da Página Principal (`index.html`)

Baseado no `ref.png`:

1. **Hero** — ilustração botânica + silhueta do casal + iniciais "M.P"
2. **Mensagem** — texto poético de abertura
3. **Countdown** — contagem regressiva animada (dias, horas, minutos) até o casamento
4. **Calendário** — destaque visual da semana de junho com a data marcada
5. **Fotos polaroid** — fotos do local do evento com rotação e sombra
6. **Logo do local** — logotipo do espaço
7. **Detalhes do evento** — data, horário, descrição
8. **Como chegar** — botões Google Maps e Waze
9. **CTA final** — fundo `#7C8558`, "NOS VEMOS LÁ!", botão "Confirme sua presença"

---

## Página de Confirmação (`confirmacao.html`)

Campos do formulário:
- Nome completo (obrigatório)
- Número de acompanhantes (select: 0, 1, 2, 3+)
- Restrição alimentar (campo texto opcional)
- Botão "Confirmar presença"

Estados:
- Loading ao enviar
- Sucesso com mensagem de agradecimento
- Erro com orientação para tentar novamente

---

## Google Apps Script — Fluxo

1. Criar planilha no Google Sheets com colunas: `Timestamp | Nome | Acompanhantes | Restrição`
2. Criar Apps Script vinculado à planilha com função `doPost(e)`
3. Publicar como Web App: "Execute as: me", "Who has access: Anyone"
4. Copiar URL do Web App para `rsvp.js`

---

## Roadmap de Implementação

### Fase 1 — Setup
- [ ] Inicializar projeto Vite
- [ ] Configurar estrutura de pastas
- [ ] Importar Cormorant Garamond via Google Fonts
- [ ] Definir variáveis CSS:
  - `--color-bg: #FFFFFF`
  - `--color-green-dark: #7C8558` (fundo CTA / seções escuras)
  - `--color-green: #707750` (textos, ícones, SVGs sobre branco)
  - `--font-title: 'Cormorant Garamond', serif`
  - `--font-body: Verdana, sans-serif` (italic aplicado via CSS onde necessário)

### Fase 2 — Convite (index.html)
- [ ] Markup HTML semântico de todas as seções
- [ ] CSS: layout, tipografia, cores, ilustrações
- [ ] Assets: fotos polaroid, logo, ilustrações botânicas (SVG ou PNG)
- [ ] Animações GSAP na entrada das seções ao scroll
- [ ] Botões de mapa (Google Maps + Waze)

### Fase 3 — Formulário RSVP
- [ ] Markup do formulário em `confirmacao.html`
- [ ] CSS do formulário alinhado ao estilo do convite
- [ ] Google Apps Script (`Code.gs`) configurado e publicado
- [ ] `rsvp.js` com fetch POST + estados de loading/sucesso/erro

### Fase 4 — Ajustes Finais
- [ ] Responsividade mobile (375px → 768px)
- [ ] Performance: otimizar imagens, lazy loading
- [ ] Testar fluxo completo do formulário
- [ ] Deploy no Vercel (`vercel --prod`)

---

## Decisões Técnicas — Justificativas

| Decisão | Alternativa descartada | Motivo |
|---|---|---|
| Vite + Vanilla JS | Next.js / React | Overkill para site estático simples |
| Google Apps Script | Backend próprio / Supabase | Zero custo, sem servidor, integração nativa com Sheets |
| GSAP | Framer Motion / AOS | Controle preciso de timeline, ideal para animações custom |
| Vercel | Netlify / GitHub Pages | Zero config para Vite, Edge Network mais rápido, CLI polida |
| Links diretos Maps/Waze | Google Maps Embed API | Sem API key, sem custo, abre app nativo no mobile |
