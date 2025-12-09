<script setup lang="ts">
import AppHeader from './AppHeader.vue'
import AppFooter from './AppFooter.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <AppHeader />
    <!-- 主要內容區域，預留 header 高度 -->
    <main class="flex-1 pt-16">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
