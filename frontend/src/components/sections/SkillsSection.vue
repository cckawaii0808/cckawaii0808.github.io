<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePortfolioStore } from '../../stores/portfolio'
import SectionTitle from '../ui/SectionTitle.vue'
import ScrollReveal from '../ui/ScrollReveal.vue'

const { skills } = storeToRefs(usePortfolioStore())

const colors = ['accent', 'blue', 'violet', 'amber', 'rose'] as const

function levelLabel(n?: number): string {
  return ({ 1: '入門', 2: '基礎', 3: '熟練', 4: '精通', 5: '專家' } as Record<number, string>)[n || 3] || '熟練'
}
function levelPct(n?: number): number { return ((n || 3) / 5) * 100 }
</script>

<template>
  <section id="skills" class="skills-section">
    <div class="container">
      <ScrollReveal>
        <SectionTitle title="技能專長" subtitle="核心技術棧與能力領域" />
      </ScrollReveal>

      <div class="skills-grid">
        <ScrollReveal v-for="(s, i) in skills" :key="s.id || i" :delay="i * 60">
          <div class="skill-card" :class="'sk-' + colors[i % colors.length]">
            <div class="skill-top">
              <h3 class="skill-name">{{ s.category }}</h3>
              <span class="skill-level">{{ levelLabel(s.proficiency) }}</span>
            </div>
            <div class="skill-bar-track">
              <div class="skill-bar-fill" :style="{ width: levelPct(s.proficiency) + '%' }" />
            </div>
            <p class="skill-desc">{{ s.description }}</p>
            <div v-if="s.tags?.length" class="skill-tags">
              <span v-for="t in s.tags" :key="t" class="s-tag">{{ t }}</span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills-section {
  padding: var(--section-gap) 0;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.85rem;
}

.skill-card {
  padding: 1.25rem;
  background: var(--surface-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  border-top: 3px solid var(--accent);
  transition: box-shadow 0.25s, transform 0.25s;
}
.skill-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}
.sk-accent { border-top-color: var(--accent); }
.sk-blue { border-top-color: var(--blue); }
.sk-violet { border-top-color: var(--violet); }
.sk-amber { border-top-color: var(--amber); }
.sk-rose { border-top-color: var(--rose); }

.skill-top {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.6rem;
}
.skill-name {
  font-family: var(--font-display);
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--ink);
}
.skill-level {
  font-size: 0.68rem;
  font-weight: 600;
  padding: 0.12rem 0.45rem;
  border-radius: 4px;
}
.sk-accent .skill-level { background: var(--accent-bg); color: var(--accent); }
.sk-blue .skill-level { background: var(--blue-bg); color: var(--blue); }
.sk-violet .skill-level { background: var(--violet-bg); color: var(--violet); }
.sk-amber .skill-level { background: var(--amber-bg); color: var(--amber); }
.sk-rose .skill-level { background: var(--rose-bg); color: var(--rose); }

.skill-bar-track {
  height: 4px;
  background: var(--surface-warm);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 0.7rem;
}
.skill-bar-fill {
  height: 100%;
  border-radius: 2px;
  transition: width 1s cubic-bezier(0.16, 1, 0.3, 1);
}
.sk-accent .skill-bar-fill { background: var(--accent); }
.sk-blue .skill-bar-fill { background: var(--blue); }
.sk-violet .skill-bar-fill { background: var(--violet); }
.sk-amber .skill-bar-fill { background: var(--amber); }
.sk-rose .skill-bar-fill { background: var(--rose); }

.skill-desc {
  font-size: 0.8rem;
  color: var(--ink-muted);
  line-height: 1.55;
  margin-bottom: 0.65rem;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}
.s-tag {
  font-size: 0.68rem;
  font-weight: 500;
  padding: 0.15rem 0.45rem;
  background: var(--surface-warm);
  color: var(--ink-muted);
  border-radius: 4px;
  border: 1px solid var(--border);
}

/* ── Mobile ── */
@media (max-width: 640px) {
  .skills-grid { grid-template-columns: 1fr; }
}
</style>
