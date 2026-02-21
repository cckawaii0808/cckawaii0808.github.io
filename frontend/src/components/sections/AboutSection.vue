<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { usePortfolioStore } from '../../stores/portfolio'
import SectionTitle from '../ui/SectionTitle.vue'
import ScrollReveal from '../ui/ScrollReveal.vue'

const store = usePortfolioStore()
const { profile, bioSections } = storeToRefs(store)

const aboutHtml = computed(() => {
  if (!profile.value.about_me) return ''
  return profile.value.about_me.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').trim()
})

const infoColors = ['accent', 'blue', 'violet', 'amber'] as const
</script>

<template>
  <section id="about" class="about-section">
    <div class="container">
      <ScrollReveal>
        <SectionTitle title="關於我" subtitle="背景、經歷與熱情所在" />
      </ScrollReveal>

      <div class="about-grid">
        <ScrollReveal class="about-main">
          <div class="about-text" v-html="aboutHtml"></div>

          <div v-if="bioSections.length" class="bio-cards">
            <div
              v-for="(s, i) in bioSections"
              :key="s.id || i"
              class="bio-card"
              :class="'bio-' + infoColors[i % infoColors.length]"
            >
              <span class="bio-num">{{ String(i + 1).padStart(2, '0') }}</span>
              <div class="bio-body">
                <h4 class="bio-title">{{ s.title }}</h4>
                <p class="bio-desc">{{ s.text }}</p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal :delay="120" class="about-aside">
          <div class="info-card card-accent">
            <span class="info-big">{{ profile.total_experience }}</span>
          </div>
          <div class="info-card card-violet">
            <span class="info-label">MBTI</span>
            <span class="info-value">ENFP</span>
          </div>
          <div class="info-card">
            <span class="info-label">Location</span>
            <span class="info-value">{{ profile.location }}</span>
          </div>
          <div v-if="profile.connect_with_me" class="info-card">
            <span class="info-label">Interests</span>
            <div class="tag-row">
              <span v-for="h in profile.connect_with_me.hobbies" :key="h" class="mini-tag">{{ h }}</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-section {
  padding: var(--section-gap) 0;
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 240px;
  gap: 2.5rem;
  align-items: start;
}

.about-text {
  font-size: 0.92rem;
  color: var(--ink-light);
  line-height: 1.75;
  white-space: pre-line;
}
.about-text :deep(strong) {
  font-weight: 600;
  color: var(--accent);
}

/* Bio Cards */
.bio-cards {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.bio-card {
  display: flex;
  gap: 0.85rem;
  padding: 0.85rem 1rem;
  background: var(--surface-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  border-left: 3px solid var(--accent);
  transition: box-shadow 0.25s;
}
.bio-card:hover { box-shadow: var(--shadow-sm); }
.bio-accent { border-left-color: var(--accent); }
.bio-blue { border-left-color: var(--blue); }
.bio-violet { border-left-color: var(--violet); }
.bio-amber { border-left-color: var(--amber); }
.bio-num {
  flex-shrink: 0;
  font-family: var(--font-display);
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--accent);
  line-height: 1.5;
}
.bio-blue .bio-num { color: var(--blue); }
.bio-violet .bio-num { color: var(--violet); }
.bio-amber .bio-num { color: var(--amber); }
.bio-title {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--ink);
}
.bio-desc {
  margin-top: 0.2rem;
  font-size: 0.78rem;
  color: var(--ink-muted);
  line-height: 1.55;
}

/* Aside Info Cards */
.about-aside {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.info-card {
  padding: 1.1rem;
  background: var(--surface-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
}
.card-accent {
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-light) 100%);
  border-color: transparent;
  color: #fff;
}
.card-violet {
  background: var(--violet-bg);
  border-color: rgba(124, 58, 237, 0.15);
}
.card-violet .info-value { color: var(--violet); }

.info-big {
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 700;
}
.info-label {
  display: block;
  font-size: 0.68rem;
  font-weight: 600;
  color: var(--ink-faint);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 0.25rem;
}
.info-value {
  font-family: var(--font-display);
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--ink);
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin-top: 0.2rem;
}
.mini-tag {
  font-size: 0.7rem;
  font-weight: 500;
  padding: 0.18rem 0.45rem;
  background: var(--accent-bg);
  color: var(--accent);
  border-radius: 4px;
}

/* ── Mobile ── */
@media (max-width: 768px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  .about-aside {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
  }
  .about-text { font-size: 0.88rem; }
}
</style>
