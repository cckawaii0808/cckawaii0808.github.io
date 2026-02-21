<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePortfolioStore } from '../../stores/portfolio'
import { NAvatar, NButton, NIcon } from 'naive-ui'
import { LogoGithub, MailOutline, DocumentTextOutline } from '@vicons/ionicons5'
import ScrollReveal from '../ui/ScrollReveal.vue'

const store = usePortfolioStore()
const { profile, projects } = storeToRefs(store)
</script>

<template>
  <section id="hero" class="hero">
    <!-- Decorative bg blobs -->
    <div class="blob blob-1" />
    <div class="blob blob-2" />
    <div class="blob blob-3" />

    <div class="hero-inner">
      <ScrollReveal>
        <div class="hero-content">
          <span class="hero-badge">{{ profile.tagline }}</span>
          <h1 class="hero-name">{{ profile.full_name }}</h1>
          <p class="hero-title">{{ profile.title }}</p>
          <p v-if="profile.quote" class="hero-quote">"{{ profile.quote }}"</p>

          <div class="hero-actions">
            <n-button type="primary" size="medium" tag="a" href="#contact">
              <template #icon><n-icon :size="16"><MailOutline /></n-icon></template>
              與我聯繫
            </n-button>
            <n-button size="medium" secondary tag="a" :href="profile.github_url" target="_blank">
              <template #icon><n-icon :size="16"><LogoGithub /></n-icon></template>
              GitHub
            </n-button>
            <n-button size="medium" secondary tag="a" href="#projects">
              <template #icon><n-icon :size="16"><DocumentTextOutline /></n-icon></template>
              作品集
            </n-button>
          </div>

          <div class="hero-stats">
            <div class="stat">
              <span class="stat-val">{{ profile.total_experience }}</span>
            </div>
            <span class="stat-div" />
            <div class="stat">
              <span class="stat-val">{{ projects.length }}+</span>
              <span class="stat-lbl">專案</span>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal :delay="200">
        <div class="hero-avatar-wrap">
          <div class="avatar-ring" />
          <n-avatar
            :size="180"
            round
            :src="profile.avatar_url || 'https://avatars.githubusercontent.com/u/161303806?v=4'"
            class="hero-avatar"
          />
          <span class="status-pill">Open to Work</span>
        </div>
      </ScrollReveal>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 5rem 1.5rem 3rem;
  position: relative;
  overflow: hidden;
  background: linear-gradient(160deg, #f0fdf4 0%, #ecfeff 40%, #eff6ff 100%);
}

/* Decorative blobs */
.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.45;
  pointer-events: none;
}
.blob-1 {
  width: 400px; height: 400px;
  top: -100px; right: -80px;
  background: radial-gradient(circle, rgba(45,106,79,0.25), transparent 70%);
}
.blob-2 {
  width: 300px; height: 300px;
  bottom: -50px; left: 10%;
  background: radial-gradient(circle, rgba(59,130,246,0.2), transparent 70%);
}
.blob-3 {
  width: 200px; height: 200px;
  top: 40%; left: -50px;
  background: radial-gradient(circle, rgba(124,58,237,0.15), transparent 70%);
}

.hero-inner {
  max-width: var(--max-w);
  margin: 0 auto;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 3rem;
  align-items: center;
  position: relative;
  z-index: 1;
}

.hero-badge {
  display: inline-block;
  padding: 0.3rem 0.85rem;
  background: var(--accent-bg);
  color: var(--accent);
  border-radius: 20px;
  font-size: 0.78rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.hero-name {
  font-family: var(--font-display);
  font-size: 3rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.15;
  color: var(--ink);
}

.hero-title {
  margin-top: 0.5rem;
  font-size: 1.05rem;
  font-weight: 500;
  color: var(--ink-light);
}

.hero-quote {
  margin-top: 1rem;
  font-size: 0.85rem;
  color: var(--ink-muted);
  font-style: italic;
  max-width: 400px;
  line-height: 1.6;
}

.hero-actions {
  margin-top: 1.75rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.hero-stats {
  margin-top: 2rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
}
.stat { display: flex; align-items: baseline; gap: 0.25rem; }
.stat-val {
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--ink);
}
.stat-lbl {
  font-size: 0.78rem;
  color: var(--ink-muted);
}
.stat-div {
  width: 1px;
  height: 20px;
  background: var(--border);
}

/* Avatar */
.hero-avatar-wrap {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.avatar-ring {
  position: absolute;
  width: 210px;
  height: 210px;
  border-radius: 50%;
  border: 2px dashed var(--accent-bg);
  animation: spin 24s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
.hero-avatar {
  box-shadow: var(--shadow-lg);
  border: 3px solid var(--surface-card);
  position: relative;
  z-index: 1;
}
.status-pill {
  position: absolute;
  bottom: 5px;
  right: -10px;
  background: var(--accent);
  color: #fff;
  font-size: 0.68rem;
  font-weight: 600;
  padding: 0.2rem 0.65rem;
  border-radius: 12px;
  z-index: 2;
  box-shadow: var(--shadow-sm);
}

/* ── Mobile ── */
@media (max-width: 768px) {
  .hero {
    padding: 5rem 1rem 2.5rem;
    min-height: auto;
  }
  .hero-inner {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }
  .hero-name { font-size: 2.2rem; }
  .hero-title { font-size: 0.95rem; }
  .hero-actions { justify-content: center; }
  .hero-stats { justify-content: center; }
  .hero-avatar-wrap { order: -1; }
  .hero-quote { margin-left: auto; margin-right: auto; }
  .hero-badge { margin-bottom: 0.75rem; }
  .blob-1 { width: 250px; height: 250px; }
  .blob-2 { width: 180px; height: 180px; }
  .blob-3 { display: none; }
}
</style>
