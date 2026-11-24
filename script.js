// Menu mobile
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
burger.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});

// Dropdown "Layanan"
const sub = document.querySelector('.has-sub');
const toggle = sub.querySelector('.sub-toggle');
toggle.addEventListener('click', e => {
  e.stopPropagation();
  const open = sub.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
document.addEventListener('click', e => {
  if (!sub.contains(e.target)) { sub.classList.remove('open'); toggle.setAttribute('aria-expanded', false); }
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') { sub.classList.remove('open'); toggle.setAttribute('aria-expanded', false); } });

// Tutup menu mobile setelah klik link
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open'); burger.setAttribute('aria-expanded', false);
}));

// Link aktif mengikuti scroll
const links = [...nav.querySelectorAll(':scope > a')];
const map = { '#top': links[0] };
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      const l = links.find(x => x.getAttribute('href') === '#' + en.target.id);
      if (l) { links.forEach(x => x.classList.remove('active')); l.classList.add('active'); }
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
['top', 'trainer', 'member'].forEach(id => { const el = document.getElementById(id); if (el) io.observe(el); });

// Modal video: isi video link
const modal = document.getElementById('modal');
const body = document.getElementById('modal-body');
const play = document.getElementById('play');
play.addEventListener('click', () => {
  const src = play.dataset.video;
  body.innerHTML = src
    ? `<iframe src="${src}" title="Video Fitness" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`
    : '<p>hanya foto reverensi.</p>';
  modal.showModal();
});
const closeModal = () => { modal.close(); body.innerHTML = ''; };
document.getElementById('close').addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
modal.addEventListener('cancel', () => { body.innerHTML = ''; });
