// ===== FLOATING HEARTS =====
const heartEmojis = ['❤️', '💕', '💗', '💓', '💖', '💝', '🌹', '💞', '💘'];

function createHeart() {
  const container = document.getElementById('heartsBg');
  const heart = document.createElement('div');
  heart.classList.add('heart-float');
  heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.fontSize = (Math.random() * 1.5 + 0.8) + 'rem';
  const duration = Math.random() * 8 + 6;
  heart.style.animationDuration = duration + 's';
  heart.style.animationDelay = Math.random() * 4 + 's';
  container.appendChild(heart);
  setTimeout(() => heart.remove(), (duration + 4) * 1000);
}

setInterval(createHeart, 600);
for (let i = 0; i < 12; i++) setTimeout(createHeart, i * 200);

// ===== SPARKLES =====
const sparkleEmojis = ['✨', '⭐', '💫', '🌟', '✦'];

function createSparkle() {
  const container = document.getElementById('sparkles');
  if (!container) return;
  const s = document.createElement('div');
  s.classList.add('sparkle');
  s.textContent = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];
  s.style.left = Math.random() * 100 + '%';
  s.style.top = Math.random() * 100 + '%';
  s.style.animationDelay = Math.random() * 2 + 's';
  s.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
  container.appendChild(s);
}

for (let i = 0; i < 20; i++) createSparkle();

// ===== GIFT BOX CLICK =====
const giftBox = document.getElementById('giftBox');
if (giftBox) {
  giftBox.addEventListener('click', () => {
    const lid = giftBox.querySelector('.gift-lid');
    const open = giftBox.querySelector('.gift-open');
    lid.classList.add('hidden');
    open.classList.remove('hidden');
    // burst hearts
    for (let i = 0; i < 10; i++) setTimeout(createHeart, i * 100);
  });
}

// ===== ENVELOPE / LETTER =====
function openEnvelope() {
  const env = document.getElementById('envelope');
  const letter = document.getElementById('letterContent');
  const btn = document.querySelector('.btn-open');
  env.classList.add('open');
  setTimeout(() => {
    letter.classList.remove('hidden');
    btn.style.display = 'none';
  }, 700);
}

// ===== BUCKET LIST CHECKOFF =====
document.querySelectorAll('.bucket-item').forEach(item => {
  item.addEventListener('click', () => {
    item.classList.toggle('checked');
    if (item.classList.contains('checked')) {
      const icon = item.querySelector('.bucket-icon');
      const orig = icon.textContent;
      icon.textContent = '✅';
      setTimeout(() => { if (item.classList.contains('checked')) icon.textContent = '✅'; else icon.textContent = orig; }, 0);
    } else {
      // restore original icon — just toggle class, CSS handles style
    }
  });
});

// ===== YES / NO BUTTONS =====
function sayYes() {
  document.querySelector('.answer-btns').classList.add('hidden');
  document.getElementById('yesMessage').classList.remove('hidden');
  document.getElementById('bigHeart').textContent = '💍';
  // burst of hearts
  for (let i = 0; i < 20; i++) setTimeout(createHeart, i * 150);
}

function runAway(btn) {
  const wrap = document.querySelector('.answer-btns');
  wrap.style.position = 'relative';
  wrap.style.minHeight = '120px';

  const wrapRect = wrap.getBoundingClientRect();
  const btnW = btn.offsetWidth;
  const btnH = btn.offsetHeight;

  const maxX = wrapRect.width - btnW;
  const maxY = wrapRect.height - btnH;

  const x = Math.max(0, Math.random() * maxX);
  const y = Math.max(0, Math.random() * Math.max(80, maxY));

  btn.style.position = 'absolute';
  btn.style.left = x + 'px';
  btn.style.top = y + 'px';
  btn.style.transition = 'left 0.2s ease, top 0.2s ease';
}

// also fire on touch for mobile
document.addEventListener('DOMContentLoaded', () => {
  const noBtn = document.getElementById('noBtn');
  if (noBtn) {
    noBtn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      runAway(noBtn);
    }, { passive: false });
  }
});

// ===== SCROLL REVEAL =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.msg-card, .bucket-item, .photo-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ===== CURSOR HEARTS =====
document.addEventListener('click', (e) => {
  const heart = document.createElement('div');
  heart.textContent = '💕';
  heart.style.cssText = `
    position: fixed;
    left: ${e.clientX}px;
    top: ${e.clientY}px;
    font-size: 1.5rem;
    pointer-events: none;
    z-index: 9999;
    animation: cursorHeart 0.8s ease forwards;
  `;
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 800);
});

// inject cursor heart keyframe
const style = document.createElement('style');
style.textContent = `
  @keyframes cursorHeart {
    0%   { opacity: 1; transform: translateY(0) scale(1); }
    100% { opacity: 0; transform: translateY(-60px) scale(1.5); }
  }
`;
document.head.appendChild(style);
