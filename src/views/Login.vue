<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'
import { supabase } from '../lib/supabase'

const router = useRouter()
const message = useMessage()

const formValue = ref({
  email: '',
  password: '',
})

const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  
  try {
    const { data: _data, error } = await supabase.auth.signInWithPassword({
      email: formValue.value.email,
      password: formValue.value.password,
    })

    if (error) throw error

    localStorage.setItem('isAuthenticated', 'true')
    message.success('登入成功!')
    router.push('/')
  } catch (error: any) {
    message.error(error.message || '登入失敗')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 px-4">
    <n-card
      title="後台登入"
      :bordered="false"
      class="w-full max-w-md !shadow-2xl"
    >
      <n-form
        :model="formValue"
        @submit.prevent="handleLogin"
      >
        <n-form-item label="Email" path="email">
          <n-input
            v-model:value="formValue.email"
            type="email"
            placeholder="請輸入 Email"
            size="large"
            :disabled="loading"
          />
        </n-form-item>

        <n-form-item label="密碼" path="password">
          <n-input
            v-model:value="formValue.password"
            type="password"
            placeholder="請輸入密碼"
            size="large"
            show-password-on="click"
            :disabled="loading"
          />
        </n-form-item>

        <n-button
          type="primary"
          size="large"
          block
          :loading="loading"
          attr-type="submit"
          class="!mt-4"
        >
          登入
        </n-button>
      </n-form>

      <template #footer>
        <n-space justify="center">
          <n-button text tag="a" @click="router.push('/')">
            返回首頁
          </n-button>
        </n-space>
      </template>
    </n-card>
  </div>
</template>
