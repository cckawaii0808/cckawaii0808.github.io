<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePortfolioStore } from '../../stores/portfolio'
import SectionTitle from '../ui/SectionTitle.vue'
import ScrollReveal from '../ui/ScrollReveal.vue'

const { workExperiences } = storeToRefs(usePortfolioStore())

const tagColors = ['accent', 'blue', 'violet', 'amber'] as const
function tagColor(i: number) { return tagColors[i % tagColors.length] }
</script>

<template>
  <section id="experience" class="exp-section">
    <div class="container">
      <ScrollReveal>
        <SectionTitle title="工作經歷" subtitle="職涯旅程與技術成長軌跡" />
      </ScrollReveal>

      <div class="timeline">
        <ScrollReveal
          v-for="(w, i) in workExperiences"
          :key="w.id || i"
          :delay="i * 80"
        >
          <div class="tl-item" :class="{ current: w.is_current }">
            <div class="tl-dot">
              <span v-if="w.is_current" class="tl-pulse" />
            </div>

            <div class="tl-card">
              <div class="tl-header">
                <div>
                  <h3 class="tl-company">{{ w.company_name }}</h3>
                  <p class="tl-role">{{ w.job_title }}</p>
                </div>
                <div class="tl-meta-right">
                  <span v-if="w.is_current" class="badge-current">In Role</span>
                  <span class="tl-date">{{ w.start_date }} - {{ w.is_current ? '現在' : w.end_date }}</span>
                </div>
              </div>

              <div v-if="w.industry || w.location" class="tl-meta">
                <span v-if="w.industry">{{ w.industry }}</span>
                <span v-if="w.industry && w.location" class="tl-sep">/</span>
                <span v-if="w.location">{{ w.location }}</span>
              </div>

              <p class="tl-desc">{{ w.description }}</p>

              <div v-if="w.technologies?.length" class="tl-tags">
                <span
                  v-for="(t, ti) in w.technologies"
                  :key="t"
                  class="tech-tag"
                  :class="'tag-' + tagColor(ti)"
                >{{ t }}</span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
</template>

<style scoped>
.exp-section {
  padding: var(--section-gap) 0;
  background: var(--surface-warm);
}

.timeline {
  max-width: 720px;
  position: relative;
  padding-left: 28px;
}
.timeline::before {
  content: '';
  position: absolute;
  left: 5px;
  top: 8px;
  bottom: 0;
  width: 1px;
  background: linear-gradient(180deg, var(--accent) 0%, var(--border) 100%);
}

.tl-item {
  position: relative;
  padding-bottom: 1.75rem;
}
.tl-item:last-child { padding-bottom: 0; }

.tl-dot {
  position: absolute;
  left: -28px;
  top: 6px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--border);
  border: 2px solid var(--surface-warm);
  z-index: 1;
}
.current .tl-dot {
  background: var(--accent);
  border-color: var(--accent-bg);
}
.tl-pulse {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  background: rgba(45, 106, 79, 0.2);
  animation: pulse-ring 2s ease-out infinite;
}
@keyframes pulse-ring {
  0% { transform: scale(1); opacity: 0.6; }
  100% { transform: scale(2.2); opacity: 0; }
}

.tl-card {
  padding: 1.15rem 1.25rem;
  background: var(--surface-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  transition: border-color 0.25s, box-shadow 0.25s;
}
.tl-card:hover {
  border-color: var(--border-hover);
  box-shadow: var(--shadow-md);
}

.tl-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.75rem;
}
.tl-company {
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--ink);
}
.tl-role {
  margin-top: 0.1rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--accent);
}
.tl-meta-right {
  text-align: right;
  flex-shrink: 0;
}
.badge-current {
  display: inline-block;
  font-size: 0.65rem;
  font-weight: 600;
  padding: 0.12rem 0.45rem;
  background: var(--accent-bg);
  color: var(--accent);
  border-radius: 4px;
  margin-bottom: 0.2rem;
}
.tl-date {
  display: block;
  font-size: 0.7rem;
  color: var(--ink-faint);
}

.tl-meta {
  margin-top: 0.4rem;
  font-size: 0.75rem;
  color: var(--ink-faint);
}
.tl-sep { margin: 0 0.2rem; }

.tl-desc {
  margin-top: 0.6rem;
  font-size: 0.82rem;
  color: var(--ink-light);
  line-height: 1.65;
}

.tl-tags {
  margin-top: 0.65rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}
.tech-tag {
  font-size: 0.68rem;
  font-weight: 500;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  border: 1px solid;
}
.tag-accent { background: var(--accent-bg); color: var(--accent); border-color: rgba(45,106,79,0.15); }
.tag-blue { background: var(--blue-bg); color: var(--blue); border-color: rgba(59,130,246,0.15); }
.tag-violet { background: var(--violet-bg); color: var(--violet); border-color: rgba(124,58,237,0.15); }
.tag-amber { background: var(--amber-bg); color: var(--amber); border-color: rgba(217,119,6,0.15); }

/* ── Mobile ── */
@media (max-width: 768px) {
  .timeline { padding-left: 22px; }
  .tl-dot { left: -22px; width: 10px; height: 10px; }
  .tl-header { flex-direction: column; gap: 0.2rem; }
  .tl-meta-right { text-align: left; display: flex; gap: 0.5rem; align-items: center; }
  .tl-card { padding: 1rem; }
  .tl-company { font-size: 0.9rem; }
}
</style>
