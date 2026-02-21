<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePortfolioStore } from '../../stores/portfolio'
import { NButton, NIcon } from 'naive-ui'
import { MailOutline, LogoGithub } from '@vicons/ionicons5'
import ScrollReveal from '../ui/ScrollReveal.vue'

const { profile } = storeToRefs(usePortfolioStore())
</script>

<template>
  <section id="contact" class="contact-section">
    <div class="container">
      <ScrollReveal>
        <div class="contact-inner">
          <span class="contact-label">Contact</span>
          <h2 class="contact-title">讓我們聊聊</h2>
          <p class="contact-desc">
            {{ profile.connect_with_me?.text || '如果你對我的經歷或專案有興趣，歡迎隨時聯繫。' }}
          </p>
          <div class="contact-actions">
            <n-button type="primary" size="medium" tag="a" href="mailto:your@email.com">
              <template #icon><n-icon :size="16"><MailOutline /></n-icon></template>
              聯繫我
            </n-button>
            <n-button v-if="profile.github_url" secondary size="medium" tag="a" :href="profile.github_url" target="_blank">
              <template #icon><n-icon :size="16"><LogoGithub /></n-icon></template>
              GitHub
            </n-button>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  padding: var(--section-gap) 0;
  background: linear-gradient(160deg, #ecfdf5 0%, #eff6ff 50%, #f5f3ff 100%);
}
.contact-inner {
  max-width: 480px;
}
.contact-label {
  display: inline-block;
  font-size: 0.68rem;
  font-weight: 600;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.5rem;
}
.contact-title {
  font-family: var(--font-display);
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--ink);
}
.contact-desc {
  margin-top: 0.6rem;
  font-size: 0.88rem;
  color: var(--ink-muted);
  line-height: 1.65;
}
.contact-actions {
  margin-top: 1.25rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

/* ── Mobile ── */
@media (max-width: 768px) {
  .contact-inner { max-width: 100%; }
  .contact-title { font-size: 1.5rem; }
}
</style>
