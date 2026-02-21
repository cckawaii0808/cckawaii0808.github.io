<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePortfolioStore } from '../../stores/portfolio'

const { profile } = storeToRefs(usePortfolioStore())
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-left">
        <span class="footer-logo">CC<span class="dot">.</span></span>
        <span class="footer-role">{{ profile.title }}</span>
      </div>
      <p class="footer-copy">&copy; {{ year }} {{ profile.full_name }}</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--border);
  background: var(--surface);
  padding: 2rem 0;
}
.footer-inner {
  max-width: var(--max-w);
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}
.footer-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.footer-logo {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--ink);
}
.dot { color: var(--accent); }
.footer-role {
  font-size: 0.8rem;
  color: var(--ink-muted);
}
.footer-copy {
  font-size: 0.78rem;
  color: var(--ink-faint);
}
</style>
