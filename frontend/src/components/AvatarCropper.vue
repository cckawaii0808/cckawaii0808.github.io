<script setup lang="ts">
import { ref, computed } from 'vue'
import { Cropper, CircleStencil } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'
import { NModal, NButton, NSpace } from 'naive-ui'

interface Props {
  show: boolean
  imageUrl: string
}

interface Emits {
  (e: 'update:show', value: boolean): void
  (e: 'confirm', blob: Blob): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const cropperRef = ref<InstanceType<typeof Cropper>>()

const showModal = computed({
  get: () => props.show,
  set: (val) => emit('update:show', val)
})

const handleConfirm = async () => {
  if (!cropperRef.value) return
  
  const { canvas } = cropperRef.value.getResult()
  if (!canvas) return

  canvas.toBlob((blob) => {
    if (blob) {
      emit('confirm', blob)
      showModal.value = false
    }
  }, 'image/jpeg', 0.9)
}

const handleCancel = () => {
  showModal.value = false
}
</script>

<template>
  <n-modal 
    v-model:show="showModal" 
    preset="card" 
    title="裁切大頭貼" 
    style="width: 600px; border-radius: 24px;"
    :mask-closable="false"
  >
    <div class="cropper-wrapper">
      <Cropper
        ref="cropperRef"
        :src="imageUrl"
        :stencil-component="CircleStencil"
        :stencil-props="{
          aspectRatio: 1,
        }"
        class="cropper"
      />
    </div>
    
    <template #footer>
      <n-space justify="end">
        <n-button round @click="handleCancel">取消</n-button>
        <n-button type="primary" round @click="handleConfirm" class="px-8">
          確認裁切
        </n-button>
      </n-space>
    </template>
  </n-modal>
</template>

<style scoped>
.cropper-wrapper {
  width: 100%;
  height: 400px;
  background: #f7fafc;
  border-radius: 16px;
  overflow: hidden;
}

.cropper {
  height: 100%;
  width: 100%;
}
</style>
