<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';

type SpoilerMode = 'hide' | 'warn' | 'show';
const mode = ref<SpoilerMode>('warn');
const ready = ref(false);
const options: { value: SpoilerMode; label: string; description: string }[] = [
  { value: 'hide', label: 'Ocultar', description: 'Mantiene cerradas las secciones con spoilers.' },
  { value: 'warn', label: 'Advertir', description: 'Permite revelar cada sección manualmente.' },
  { value: 'show', label: 'Mostrar', description: 'Muestra todas las secciones.' },
];
const currentDescription = computed(() => options.find((option) => option.value === mode.value)?.description ?? '');

function applyMode(nextMode: SpoilerMode) {
  mode.value = nextMode;
  document.documentElement.dataset.spoilerMode = nextMode;
  document.querySelectorAll<HTMLDetailsElement>('.spoiler-section[data-spoiler-level]:not([data-spoiler-level="none"])').forEach((section) => {
    section.open = nextMode === 'show';
    const summary = section.querySelector<HTMLElement>('summary');
    if (summary) {
      summary.inert = nextMode === 'hide';
      summary.setAttribute('aria-disabled', String(nextMode === 'hide'));
      summary.title = nextMode === 'hide' ? 'Cambia el modo de spoilers a Advertir o Mostrar para revelar esta sección.' : '';
    }
  });
  try { localStorage.setItem('teyvat-spoiler-mode', nextMode); } catch { /* La preferencia sigue activa en esta página. */ }
  window.dispatchEvent(new CustomEvent('teyvat-spoiler-change', { detail: nextMode }));
}

function syncStorage(event: StorageEvent) {
  if (event.key !== 'teyvat-spoiler-mode' && event.key !== null) return;
  const next = event.newValue;
  applyMode(next === 'hide' || next === 'show' ? next : 'warn');
}

onMounted(() => {
  window.addEventListener('storage', syncStorage);
  let stored: string | null = null;
  try { stored = localStorage.getItem('teyvat-spoiler-mode'); } catch { /* Usar el modo seguro por defecto. */ }
  const valid = options.some((option) => option.value === stored);
  applyMode(valid ? (stored as SpoilerMode) : 'warn');
  ready.value = true;
});
onUnmounted(() => window.removeEventListener('storage', syncStorage));
</script>

<template>
  <section class="spoiler-preferences" aria-label="Preferencias de spoilers">
    <div class="spoiler-preferences__heading">
      <span class="eyebrow">CONTROL DE SPOILERS</span>
      <p>Elige cómo explorar el archivo.</p>
    </div>
    <div class="spoiler-preferences__options" role="group" aria-label="Modo de spoilers">
      <button v-for="option in options" :key="option.value" type="button"
        :class="{ 'is-active': mode === option.value }"
        :aria-pressed="mode === option.value"
        @click="applyMode(option.value)">
        {{ option.label }}
      </button>
    </div>
    <p class="spoiler-preferences__description" aria-live="polite">{{ ready ? currentDescription : 'Cargando preferencias…' }}</p>
  </section>
</template>
