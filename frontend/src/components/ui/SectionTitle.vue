<script setup lang="ts">
defineProps<{ title: string; subtitle?: string }>()
</script>

<template>
  <header class="section-header">
    <h2 class="section-title">{{ title }}</h2>
    <p v-if="subtitle" class="section-subtitle">{{ subtitle }}</p>
  </header>
</template>

<style scoped>
.section-header {
  margin-bottom: 3rem;
}

.section-title {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--ink);
  line-height: 1.2;
}

.section-subtitle {
  margin-top: 0.5rem;
  font-size: 0.95rem;
  color: var(--ink-muted);
  line-height: 1.6;
}
</style>
