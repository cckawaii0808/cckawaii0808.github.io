<script setup lang="ts">
import { onMounted } from 'vue'
import { usePortfolioStore } from '../stores/portfolio'

import TheNavbar from '../components/layout/TheNavbar.vue'
import TheFooter from '../components/layout/TheFooter.vue'
import HeroSection from '../components/sections/HeroSection.vue'
import AboutSection from '../components/sections/AboutSection.vue'
import ExperienceSection from '../components/sections/ExperienceSection.vue'
import SkillsSection from '../components/sections/SkillsSection.vue'
import ProjectsSection from '../components/sections/ProjectsSection.vue'
import EducationSection from '../components/sections/EducationSection.vue'
import ContactSection from '../components/sections/ContactSection.vue'

const store = usePortfolioStore()

onMounted(async () => {
  await store.checkAuth()
  await store.fetchAll()
})
</script>

<template>
  <TheNavbar />
  <main>
    <HeroSection />
    <AboutSection />
    <ExperienceSection />
    <SkillsSection />
    <ProjectsSection />
    <EducationSection />
    <ContactSection />
  </main>
  <TheFooter />
</template>
