import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ─── HERO — animação de entrada ao carregar ─── */
// Pré-renderiza o casal off-screen para evitar primeira renderização durante animação
gsap.set('.hero__casal', { opacity: 0.001, force3D: true })

const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', force3D: true } })

heroTl
  .from('.hero__ornamento', {
    clipPath: 'inset(0 0 100% 0)',
    duration: 2,
    ease: 'power2.inOut',
  })
  .from('.hero__coracao',   { opacity: 0, scale: 0.8,  duration: 0.8 }, '-=0.6')
  .to('.hero__casal',       { opacity: 1, duration: 1.1, ease: 'power2.out' }, '-=0.6')
  .from('.hero__casal',     { y: 24, duration: 0.9 }, '<')
  .from('.hero__sigla',     { opacity: 0, y: 12, duration: 0.7 }, '-=0.4')

/* ─── Helper: fade-up ao entrar na viewport ─── */
function fadeUp(selector, options = {}) {
  gsap.from(selector, {
    opacity: 0,
    y: options.y ?? 32,
    duration: options.duration ?? 0.9,
    ease: 'power2.out',
    stagger: options.stagger ?? 0,
    scrollTrigger: {
      trigger: selector,
      start: 'top 88%',
      toggleActions: 'play none none none',
    },
  })
}

/* ─── CORAÇÃO — pulsação infinita após entrada ─── */
heroTl.add(() => {
  gsap.to('.hero__coracao', {
    scale: 1.03,
    duration: 0.28,
    ease: 'power1.inOut',
    yoyo: true,
    repeat: 1,
    repeatDelay: 0,
    onComplete() {
      gsap.to('.hero__coracao', {
        scale: 1,
        duration: 0.28,
        ease: 'power1.out',
        onComplete: pulse,
      })
    },
  })
})

function pulse() {
  gsap.to('.hero__coracao', {
    scale: 1.03,
    duration: 0.28,
    ease: 'power1.inOut',
    yoyo: true,
    repeat: 1,
    delay: 1.2,
    onComplete() {
      gsap.to('.hero__coracao', {
        scale: 1,
        duration: 0.28,
        ease: 'power1.out',
        onComplete: pulse,
      })
    },
  })
}

/* ─── MENSAGEM — scroll travado, letras aparecem ─── */
function splitChars(el) {
  const nodes = []
  el.childNodes.forEach(node => {
    if (node.nodeType === Node.TEXT_NODE) {
      node.textContent.split('').forEach(char => {
        const span = document.createElement('span')
        span.className = 'char'
        span.textContent = char
        nodes.push(span)
      })
    } else {
      nodes.push(node.cloneNode(true))
    }
  })
  el.innerHTML = ''
  nodes.forEach(n => el.appendChild(n))
}

splitChars(document.querySelector('.mensagem__intro'))
splitChars(document.querySelector('.mensagem__corpo'))

const msgTl = gsap.timeline()

msgTl
  .from('.mensagem__intro .char', {
    opacity: 0,
    stagger: 0.04,
    ease: 'none',
  })
  .from('.mensagem__corpo .char', {
    opacity: 0,
    stagger: 0.018,
    ease: 'none',
  }, '+=0.1')

ScrollTrigger.create({
  trigger: '.mensagem',
  start: 'top top',
  end: '+=1400',
  pin: true,
  scrub: 0.5,
  anticipatePin: 1,
  animation: msgTl,
})

/* ─── CALENDÁRIO — scroll horizontal até dia 21 ─── */
fadeUp('.calendario__mes', { y: 20, duration: 0.7 })

const heartPath = document.querySelector('.coracaodata__path')
const heartLen  = heartPath.getTotalLength()
gsap.set(heartPath, { strokeDasharray: heartLen, strokeDashoffset: heartLen })

let scrollLocked = false

function preventScroll(e) { e.preventDefault() }

function lockScroll() {
  if (scrollLocked) return
  scrollLocked = true
  document.addEventListener('touchmove', preventScroll, { passive: false })
  document.addEventListener('wheel',     preventScroll, { passive: false })
  document.body.style.overflow = 'hidden'
  document.documentElement.style.overflow = 'hidden'
}

function unlockScroll() {
  if (!scrollLocked) return
  scrollLocked = false
  document.removeEventListener('touchmove', preventScroll)
  document.removeEventListener('wheel',     preventScroll)
  document.body.style.overflow = ''
  document.documentElement.style.overflow = ''
}

const calTimeline = gsap.timeline({
  onComplete: unlockScroll,
  scrollTrigger: {
    trigger: '.calendario',
    start: 'top 20%',
    once: true,
    onEnter: lockScroll,
  },
})

calTimeline
  .to('.calendario__col', { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
  .to(heartPath,
    { strokeDashoffset: 0, duration: 0.9, ease: 'power2.inOut' },
    '+=0.15'
  )
  .to(['.polaroid--esq', '.polaroid--dir'],
    { opacity: 1, x: 0, duration: 0.9, ease: 'power2.out', stagger: 0.2 },
    '+=0.2'
  )

/* ─── POLAROIDS — estado inicial oculto (animação via onLeave do calendário) ─── */
gsap.set('.polaroid--esq', { opacity: 0, x: -48 })
gsap.set('.polaroid--dir', { opacity: 0, x: 48 })

/* ─── ECLIPSE + CONTEÚDO LOCAL ─── */
gsap.from('.eclipse', {
  opacity: 0,
  y: 40,
  duration: 1,
  ease: 'power2.out',
  scrollTrigger: { trigger: '.eclipse', start: 'top 90%' },
})

gsap.from(['.local__logo', '.local__casal', '.local__desc'], {
  opacity: 0,
  y: 20,
  duration: 0.7,
  stagger: 0.15,
  ease: 'power2.out',
  scrollTrigger: { trigger: '.local__logo', start: 'top 88%' },
})

/* ─── CTA ─── */
gsap.from('.cta__mesa', {
  opacity: 0,
  x: -30,
  duration: 1,
  ease: 'power2.out',
  scrollTrigger: { trigger: '.cta', start: 'top 85%' },
})

gsap.from(['.cta__titulo', '.cta__sub', '.cta__btn'], {
  opacity: 0,
  y: 20,
  duration: 0.7,
  stagger: 0.12,
  ease: 'power2.out',
  scrollTrigger: { trigger: '.cta__content', start: 'top 88%' },
})
