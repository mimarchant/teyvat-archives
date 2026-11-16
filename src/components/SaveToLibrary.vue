<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

const props = defineProps<{ entryId: string }>();
const saved = ref(false);
const storageKey = 'teyvat-archives:saved';

onMounted(() => {
  try {
    const entries = JSON.parse(localStorage.getItem(storageKey) ?? '[]') as string[];
    saved.value = entries.includes(props.entryId);
  } catch {
    saved.value = false;
  }
});

const label = computed(() => saved.value ? 'Guardado en tu biblioteca' : 'Guardar en mi biblioteca');

function toggleSaved() {
  try {
    const entries = JSON.parse(localStorage.getItem(storageKey) ?? '[]') as string[];
    const next = saved.value
      ? entries.filter((entry) => entry !== props.entryId)
      : [...new Set([...entries, props.entryId])];
    localStorage.setItem(storageKey, JSON.stringify(next));
    saved.value = !saved.value;
  } catch {
    // The control remains usable without persistence if storage is unavailable.
    saved.value = !saved.value;
  }
}
</script>

<template>
  <button class="save-button" type="button" :aria-pressed="saved" @click="toggleSaved">
    <span aria-hidden="true">{{ saved ? '✦' : '＋' }}</span>
    {{ label }}
  </button>
</template>
