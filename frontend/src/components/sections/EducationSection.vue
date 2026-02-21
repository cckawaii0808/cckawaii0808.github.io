<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePortfolioStore } from '../../stores/portfolio'
import SectionTitle from '../ui/SectionTitle.vue'
import ScrollReveal from '../ui/ScrollReveal.vue'

const { education, certifications } = storeToRefs(usePortfolioStore())

const certColors = ['accent', 'blue', 'violet', 'amber', 'rose'] as const
</script>

<template>
  <section id="education" class="edu-section">
    <div class="container">
      <ScrollReveal>
        <SectionTitle title="學歷與證照" />
      </ScrollReveal>

      <div class="edu-grid">
        <ScrollReveal>
          <div class="edu-col">
            <h3 class="col-label">Education</h3>
            <div v-for="(e, i) in education" :key="e.id || i" class="edu-card">
              <div class="edu-icon">&#127891;</div>
              <div>
                <h4 class="edu-school">{{ e.school_name }}</h4>
                <p class="edu-dept">{{ e.department }}</p>
                <p class="edu-meta">{{ e.degree }} / {{ e.period }}</p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal :delay="80">
          <div class="edu-col">
            <h3 class="col-label">Certifications</h3>
            <div
              v-for="(c, i) in certifications"
              :key="c.id || i"
              class="cert-row"
              :class="'cert-' + certColors[i % certColors.length]"
            >
              <span class="cert-idx">{{ String(i + 1).padStart(2, '0') }}</span>
              <span class="cert-name">{{ c.name }}</span>
              <span class="cert-cat">{{ c.category }}</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
</template>

<style scoped>
.edu-section {
  padding: var(--section-gap) 0;
}

.edu-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
}

.col-label {
  font-size: 0.68rem;
  font-weight: 600;
  color: var(--ink-faint);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.85rem;
}

.edu-card {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  padding: 1.15rem;
  background: var(--surface-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  margin-bottom: 0.6rem;
}
.edu-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
  margin-top: 0.15rem;
}
.edu-school {
  font-family: var(--font-display);
  font-size: 0.92rem;
  font-weight: 700;
  color: var(--ink);
}
.edu-dept {
  margin-top: 0.1rem;
  font-size: 0.82rem;
  color: var(--ink-light);
}
.edu-meta {
  margin-top: 0.25rem;
  font-size: 0.72rem;
  color: var(--ink-faint);
}

.cert-row {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.75rem 0.85rem;
  background: var(--surface-card);
  border: 1px solid var(--border);
  border-left: 3px solid var(--accent);
  border-radius: var(--radius);
  margin-bottom: 0.45rem;
  transition: box-shadow 0.2s;
}
.cert-row:hover { box-shadow: var(--shadow-sm); }
.cert-accent { border-left-color: var(--accent); }
.cert-blue { border-left-color: var(--blue); }
.cert-violet { border-left-color: var(--violet); }
.cert-amber { border-left-color: var(--amber); }
.cert-rose { border-left-color: var(--rose); }

.cert-idx {
  font-family: var(--font-display);
  font-size: 0.7rem;
  font-weight: 600;
  flex-shrink: 0;
}
.cert-accent .cert-idx { color: var(--accent); }
.cert-blue .cert-idx { color: var(--blue); }
.cert-violet .cert-idx { color: var(--violet); }
.cert-amber .cert-idx { color: var(--amber); }
.cert-rose .cert-idx { color: var(--rose); }

.cert-name {
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--ink);
  flex: 1;
}
.cert-cat {
  font-size: 0.68rem;
  color: var(--ink-faint);
  flex-shrink: 0;
}

/* ── Mobile ── */
@media (max-width: 640px) {
  .edu-grid { grid-template-columns: 1fr; gap: 1.5rem; }
}
</style>
