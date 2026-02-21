<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{ delay?: number }>(), { delay: 0 })

const el = ref<HTMLElement | null>(null)
const isVisible = ref(false)
let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!el.value) return
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => { isVisible.value = true }, props.delay)
          observer?.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.08 }
  )
  observer.observe(el.value)
})

onUnmounted(() => { observer?.disconnect() })
</script>

<template>
  <div ref="el" class="sr" :class="{ visible: isVisible }">
    <slot />
  </div>
</template>
