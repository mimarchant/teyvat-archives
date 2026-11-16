<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import SpoilerPreferences from '../editorial/SpoilerPreferences.vue';
import { canReveal, type SpoilerMode } from '../../data/graph';
import { spoilerLevels } from '../../data/spoilers';

type SpoilerLevel = (typeof spoilerLevels)[number];

type MysteryEntry = {
  id: string;
  title: string;
  summary: string;
  status: 'open' | 'partially-solved' | 'resolved';
  reviewStatus: 'draft' | 'needs-review' | 'verified';
  spoilerLevel: SpoilerLevel;
};
const props = defineProps<{ entries: MysteryEntry[] }>();
const mode = ref<SpoilerMode>('warn');
const revealed = ref<string[]>([]);
const statusLabels = { open: 'Abierto', 'partially-solved': 'Parcialmente resuelto', resolved: 'Resuelto' };
const visibleCount = computed(() => props.entries.filter(entry => isExposed(entry)).length);
const isExposed = (entry: MysteryEntry) => canReveal(entry.spoilerLevel, mode.value, revealed.value.includes(entry.id));

function updateMode() {
  const next = document.documentElement.dataset.spoilerMode;
  mode.value = next === 'hide' || next === 'show' ? next : 'warn';
  revealed.value = [];
}
function reveal(id: string) { revealed.value = [...revealed.value, id]; }
onMounted(() => { updateMode(); window.addEventListener('teyvat-spoiler-change', updateMode); });
onUnmounted(() => window.removeEventListener('teyvat-spoiler-change', updateMode));
</script>

<template>
  <div class="mystery-directory__controls">
    <SpoilerPreferences />
    <p role="status">{{ visibleCount }} expedientes visibles · {{ entries.length - visibleCount }} protegidos</p>
  </div>
  <ol class="mystery-list" data-pagefind-ignore>
    <li v-for="(entry, index) in entries" :key="entry.id">
      <a v-if="isExposed(entry)" :href="`/misterios/${entry.id}/`">
        <span class="mystery-list__number">{{ String(index + 1).padStart(2, '0') }}</span>
        <span class="mystery-list__copy">
          <span class="mystery-list__meta">{{ statusLabels[entry.status] }} · {{ entry.reviewStatus === 'verified' ? 'Revisión verificada' : 'Revisión pendiente' }}</span>
          <strong>{{ entry.title }}</strong>
          <span>{{ entry.summary }}</span>
        </span>
        <span class="mystery-list__arrow" aria-hidden="true">↗</span>
      </a>
      <div v-else class="mystery-list__protected">
        <span class="mystery-list__number">{{ String(index + 1).padStart(2, '0') }}</span>
        <span class="mystery-list__copy">
          <span class="mystery-list__meta">Contenido protegido · {{ entry.spoilerLevel }}</span>
          <strong>Expediente protegido</strong>
          <span>{{ mode === 'hide' ? 'Cambia tu preferencia para mostrar este expediente.' : 'Puedes revelar el título y el resumen de este expediente.' }}</span>
          <button v-if="mode === 'warn'" type="button" @click="reveal(entry.id)">Revelar expediente</button>
        </span>
      </div>
    </li>
  </ol>
</template>
