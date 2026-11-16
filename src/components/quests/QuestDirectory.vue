<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import SpoilerPreferences from '../editorial/SpoilerPreferences.vue';
import { canReveal, type SpoilerMode } from '../../data/graph';
import { spoilerLevels } from '../../data/spoilers';

type SpoilerLevel = (typeof spoilerLevels)[number];
type QuestEntry = {
  id: string;
  title: string;
  summary: string;
  questType: 'archon' | 'story' | 'world' | 'event';
  reviewStatus: 'draft' | 'needs-review' | 'verified';
  spoilerLevel: SpoilerLevel;
};
const props = defineProps<{ entries: QuestEntry[] }>();
const mode = ref<SpoilerMode>('warn');
const revealed = ref<string[]>([]);
const typeLabels = { archon: 'Misión de Arconte', story: 'Misión legendaria', world: 'Misión de mundo', event: 'Misión de evento' };
const isExposed = (entry: QuestEntry) => canReveal(entry.spoilerLevel, mode.value, revealed.value.includes(entry.id));
const visibleCount = computed(() => props.entries.filter(isExposed).length);

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
  <div class="quest-directory__controls">
    <SpoilerPreferences />
    <p role="status">{{ visibleCount }} misiones visibles · {{ entries.length - visibleCount }} protegidas</p>
  </div>
  <ol class="quest-list" data-pagefind-ignore>
    <li v-for="(entry, index) in entries" :key="entry.id">
      <a v-if="isExposed(entry)" :href="`/misiones/${entry.id}/`">
        <span class="quest-list__number">{{ String(index + 1).padStart(2, '0') }}</span>
        <span class="quest-list__copy">
          <span class="quest-list__meta">{{ typeLabels[entry.questType] }} · {{ entry.reviewStatus === 'verified' ? 'Revisión verificada' : 'Revisión pendiente' }}</span>
          <strong>{{ entry.title }}</strong>
          <span>{{ entry.summary }}</span>
        </span>
        <span class="quest-list__arrow" aria-hidden="true">↗</span>
      </a>
      <div v-else class="quest-list__protected">
        <span class="quest-list__number">{{ String(index + 1).padStart(2, '0') }}</span>
        <span class="quest-list__copy">
          <span class="quest-list__meta">Contenido protegido · {{ entry.spoilerLevel }}</span>
          <strong>Misión protegida</strong>
          <span>{{ mode === 'hide' ? 'Cambia tu preferencia para mostrar esta misión.' : 'Puedes revelar el título y el resumen de esta misión.' }}</span>
          <button v-if="mode === 'warn'" type="button" @click="reveal(entry.id)">Revelar misión</button>
        </span>
      </div>
    </li>
  </ol>
</template>
