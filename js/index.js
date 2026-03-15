;(function () {
  const header = document.querySelector('.header')
  const burgerBtn = document.getElementById('burgerBtn')
  const closeMenuBtn = document.getElementById('closeMenuBtn')
  const backdropBtn = document.getElementById('backdropBtn')
  const mobileMenu = document.getElementById('mobileMenu')

  if (!header || !burgerBtn || !mobileMenu) return

  let lastFocus = null

  function lockScroll(lock) {
    document.documentElement.classList.toggle('no-scroll', lock)
    document.body.classList.toggle('no-scroll', lock)
  }

  function openMenu() {
    lastFocus = document.activeElement
    header.classList.add('is-open')
    burgerBtn.setAttribute('aria-expanded', 'true')
    mobileMenu.setAttribute('aria-hidden', 'false')
    lockScroll(true)

    const firstLink = mobileMenu.querySelector(
      '.mnav__link, .pill, .mnav__close',
    )
    if (firstLink) firstLink.focus()
  }

  function closeMenu() {
    header.classList.remove('is-open')
    burgerBtn.setAttribute('aria-expanded', 'false')
    mobileMenu.setAttribute('aria-hidden', 'true')
    lockScroll(false)

    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus()
  }

  burgerBtn.addEventListener('click', () => {
    const isOpen = header.classList.contains('is-open')
    isOpen ? closeMenu() : openMenu()
  })

  if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMenu)
  if (backdropBtn) backdropBtn.addEventListener('click', closeMenu)

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && header.classList.contains('is-open')) closeMenu()
  })

  mobileMenu.addEventListener('click', (e) => {
    const a = e.target.closest('a')
    if (a) closeMenu()
  })

  const cartBadge = document.getElementById('cartBadge')
  if (cartBadge) {
    const stored = Number(localStorage.getItem('mgx_cart_count') || '0')
    cartBadge.textContent = String(stored)
  }
})()

const smoothLinks = document.querySelectorAll('a[href^="#"]')
for (let smoothLink of smoothLinks) {
  smoothLink.addEventListener('click', function (e) {
    e.preventDefault()
    const id = smoothLink.getAttribute('href')

    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  })
}

;(function () {
  const year = document.getElementById('footerYear')
  if (year) {
    year.textContent = new Date().getFullYear()
  }

  const form = document.getElementById('footerNewsForm')
  const msg = document.getElementById('footerMsg')

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault()

      msg.textContent = 'Subscribed successfully.'

      form.reset()
    })
  }
})()
