<script setup lang="ts">
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { usePortfolioStore } from '../../stores/portfolio'
import { NIcon } from 'naive-ui'
import { LogoGithub, OpenOutline } from '@vicons/ionicons5'
import SectionTitle from '../ui/SectionTitle.vue'
import ScrollReveal from '../ui/ScrollReveal.vue'

const { projects } = storeToRefs(usePortfolioStore())

const showAll = ref(false)
const list = computed(() =>
  showAll.value ? projects.value : projects.value.filter(p => p.is_featured)
)
</script>

<template>
  <section id="projects" class="proj-section">
    <div class="container">
      <ScrollReveal>
        <SectionTitle title="專案作品" subtitle="精選與完成的專案展示" />
      </ScrollReveal>

      <ScrollReveal :delay="40">
        <div class="proj-filter">
          <button class="filter-btn" :class="{ active: !showAll }" @click="showAll = false">精選</button>
          <button class="filter-btn" :class="{ active: showAll }" @click="showAll = true">全部 ({{ projects.length }})</button>
        </div>
      </ScrollReveal>

      <div class="proj-grid">
        <ScrollReveal v-for="(p, i) in list" :key="p.id || i" :delay="i * 80">
          <div class="proj-card">
            <div class="proj-top">
              <h3 class="proj-name">{{ p.title }}</h3>
              <span v-if="p.status" class="proj-status" :class="statusClass(p.status)">{{ p.status }}</span>
            </div>

            <div v-if="p.role" class="proj-role">
              <span>{{ p.role }}</span>
              <span v-if="p.difficulty" class="proj-dots">
                <i v-for="d in 5" :key="d" class="dot" :class="{ filled: d <= p.difficulty }" />
              </span>
            </div>

            <p class="proj-desc">{{ p.description }}</p>

            <div v-if="p.technologies?.length" class="proj-tags">
              <span v-for="t in p.technologies" :key="t" class="p-tag">{{ t }}</span>
            </div>

            <div class="proj-links">
              <a v-if="p.github_url" :href="p.github_url" target="_blank" class="proj-link">
                <n-icon :size="14"><LogoGithub /></n-icon> Source
              </a>
              <a v-if="p.demo_url" :href="p.demo_url" target="_blank" class="proj-link link-demo">
                <n-icon :size="14"><OpenOutline /></n-icon> Demo
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
function statusClass(status: string) {
  const lower = status.toLowerCase()
  if (lower.includes('side') || lower.includes('active')) return 'status-accent'
  if (lower.includes('maint')) return 'status-amber'
  if (lower.includes('compl')) return 'status-blue'
  return 'status-default'
}
</script>

<style scoped>
.proj-section {
  padding: var(--section-gap) 0;
  background: var(--surface-warm);
}

.proj-filter {
  display: flex;
  gap: 0.35rem;
  margin-bottom: 1.5rem;
}
.filter-btn {
  font-family: var(--font-display);
  font-size: 0.76rem;
  font-weight: 600;
  padding: 0.35rem 0.9rem;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--surface-card);
  color: var(--ink-muted);
  cursor: pointer;
  transition: all 0.2s;
}
.filter-btn.active {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}
.filter-btn:not(.active):hover {
  border-color: var(--border-hover);
}

.proj-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 0.85rem;
}

.proj-card {
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
  background: var(--surface-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
  height: 100%;
}
.proj-card:hover {
  border-color: var(--border-hover);
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.proj-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
  margin-bottom: 0.4rem;
}
.proj-name {
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--ink);
}
.proj-status {
  flex-shrink: 0;
  font-size: 0.65rem;
  font-weight: 600;
  padding: 0.12rem 0.45rem;
  border-radius: 4px;
}
.status-accent { background: var(--accent-bg); color: var(--accent); }
.status-amber { background: var(--amber-bg); color: var(--amber); }
.status-blue { background: var(--blue-bg); color: var(--blue); }
.status-default { background: var(--surface-warm); color: var(--ink-muted); }

.proj-role {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  font-size: 0.75rem;
  color: var(--ink-faint);
  margin-bottom: 0.6rem;
}
.proj-dots {
  display: flex;
  gap: 3px;
}
.dot {
  width: 5px; height: 5px;
  border-radius: 50%;
  background: var(--border);
}
.dot.filled { background: var(--accent); }

.proj-desc {
  font-size: 0.82rem;
  color: var(--ink-light);
  line-height: 1.6;
  flex: 1;
}

.proj-tags {
  margin-top: 0.65rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}
.p-tag {
  font-size: 0.68rem;
  font-weight: 500;
  padding: 0.15rem 0.45rem;
  background: var(--blue-bg);
  color: var(--blue);
  border-radius: 4px;
  border: 1px solid rgba(59,130,246,0.12);
}

.proj-links {
  margin-top: 0.85rem;
  padding-top: 0.65rem;
  border-top: 1px solid var(--border);
  display: flex;
  gap: 1rem;
}
.proj-link {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--ink-muted);
  transition: color 0.2s;
}
.proj-link:hover { color: var(--ink); }
.link-demo:hover { color: var(--accent); }

/* ── Mobile ── */
@media (max-width: 640px) {
  .proj-grid { grid-template-columns: 1fr; }
}
</style>
