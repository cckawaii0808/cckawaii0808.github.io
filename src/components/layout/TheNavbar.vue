<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const isMobileOpen = ref(false)

const links = [
  { label: '關於', href: '#about' },
  { label: '經歷', href: '#experience' },
  { label: '技能', href: '#skills' },
  { label: '作品', href: '#projects' },
  { label: '聯繫', href: '#contact' },
]

function onScroll() { isScrolled.value = window.scrollY > 60 }
function close() { isMobileOpen.value = false }

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <nav class="navbar" :class="{ scrolled: isScrolled }">
    <div class="navbar-inner">
      <a href="#hero" class="logo">CC<span class="dot">.</span></a>
      <div class="nav-links">
        <a v-for="l in links" :key="l.href" :href="l.href" class="nav-link">{{ l.label }}</a>
      </div>
      <button class="burger" :class="{ open: isMobileOpen }" @click="isMobileOpen = !isMobileOpen" aria-label="Menu">
        <span /><span /><span />
      </button>
    </div>
    <div class="mobile-menu" :class="{ open: isMobileOpen }">
      <a v-for="l in links" :key="l.href" :href="l.href" class="mobile-link" @click="close">{{ l.label }}</a>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transition: background 0.3s, box-shadow 0.3s, backdrop-filter 0.3s;
}
.navbar.scrolled {
  background: rgba(250, 250, 249, 0.85);
  backdrop-filter: blur(16px);
  box-shadow: 0 1px 0 var(--border);
}

.navbar-inner {
  max-width: var(--max-w);
  margin: 0 auto;
  padding: 0 2rem;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--ink);
  letter-spacing: -0.02em;
}
.dot { color: var(--accent); }

.nav-links {
  display: flex;
  gap: 0.25rem;
}

.nav-link {
  padding: 0.4rem 0.75rem;
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--ink-muted);
  border-radius: 6px;
  transition: color 0.2s, background 0.2s;
}
.nav-link:hover {
  color: var(--accent);
  background: var(--accent-glow);
}

.burger {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}
.burger span {
  display: block;
  width: 18px;
  height: 2px;
  background: var(--ink);
  border-radius: 2px;
  transition: transform 0.3s, opacity 0.3s;
}
.burger.open span:nth-child(1) { transform: rotate(45deg) translate(4px, 4px); }
.burger.open span:nth-child(2) { opacity: 0; }
.burger.open span:nth-child(3) { transform: rotate(-45deg) translate(4px, -4px); }

.mobile-menu {
  display: none;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s;
  background: rgba(250, 250, 249, 0.95);
  backdrop-filter: blur(16px);
}
.mobile-menu.open {
  max-height: 280px;
  border-bottom: 1px solid var(--border);
}
.mobile-link {
  display: block;
  padding: 0.75rem 2rem;
  font-size: 0.88rem;
  font-weight: 500;
  color: var(--ink-light);
  transition: color 0.2s;
}
.mobile-link:hover { color: var(--accent); }

@media (max-width: 768px) {
  .nav-links { display: none; }
  .burger { display: flex; }
  .mobile-menu { display: block; }
}
</style>
