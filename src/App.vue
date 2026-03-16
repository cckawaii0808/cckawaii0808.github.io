<script setup lang="ts">
import { 
  NConfigProvider, 
  NGlobalStyle, 
  NMessageProvider, 
  NDialogProvider, 
  NNotificationProvider,
  zhTW,
  dateZhTW
} from 'naive-ui'
import { themeOverrides } from './theme'
</script>

<template>
  <n-config-provider :locale="zhTW" :date-locale="dateZhTW" :theme="null" :theme-overrides="themeOverrides">
    <n-global-style />
    <n-message-provider>
      <n-notification-provider>
        <n-dialog-provider>
          <router-view />
        </n-dialog-provider>
      </n-notification-provider>
    </n-message-provider>
  </n-config-provider>
</template>
