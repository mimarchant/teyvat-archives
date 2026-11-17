<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import SpoilerPreferences from '../editorial/SpoilerPreferences.vue';
import { canReveal, type SpoilerMode } from '../../data/graph';
import { spoilerLevels } from '../../data/spoilers';

type SpoilerLevel = (typeof spoilerLevels)[number];
type EntityType = 'character' | 'civilization' | 'region' | 'faction' | 'deity' | 'concept' | 'location' | 'artifact' | 'creature' | 'nation';
type EntityEntry = {
  id: string;
  title: string;
  summary: string;
  entityType: EntityType;
  reviewStatus: 'draft' | 'needs-review' | 'verified';
  spoilerLevel: SpoilerLevel;
};

const props = defineProps<{ entries: EntityEntry[] }>();
const mode = ref<SpoilerMode>('warn');
const revealed = ref<string[]>([]);
const activeType = ref<'all' | EntityType>('all');
const typeLabels: Record<EntityType, string> = {
  character: 'Personajes', civilization: 'Civilizaciones', region: 'Regiones', faction: 'Facciones',
  deity: 'Deidades', concept: 'Conceptos', location: 'Lugares', artifact: 'Artefactos',
  creature: 'Criaturas', nation: 'Naciones',
};
const entityTypes = (Object.keys(typeLabels) as EntityType[])
  .sort((a, b) => typeLabels[a].localeCompare(typeLabels[b], 'es'));
const filteredEntries = computed(() => props.entries.filter(entry => activeType.value === 'all' || entry.entityType === activeType.value));
const isExposed = (entry: EntityEntry) => canReveal(entry.spoilerLevel, mode.value, revealed.value.includes(entry.id));
const visibleCount = computed(() => filteredEntries.value.filter(isExposed).length);

function updateMode() {
  const next = document.documentElement.dataset.spoilerMode;
  mode.value = next === 'hide' || next === 'show' ? next : 'warn';
  revealed.value = [];
}
function reveal(id: string) { revealed.value = [...revealed.value, id]; }
function updateType(type: string | null) {
  activeType.value = type && entityTypes.includes(type as EntityType) ? type as EntityType : 'all';
}
onMounted(() => {
  updateMode();
  updateType(new URL(window.location.href).searchParams.get('tipo'));
  window.addEventListener('teyvat-spoiler-change', updateMode);
});
onUnmounted(() => window.removeEventListener('teyvat-spoiler-change', updateMode));
</script>

<template>
  <div class="entity-directory__toolbar">
    <SpoilerPreferences />
    <label class="entity-directory__filter">
      <span>Tipo de entrada</span>
      <select v-model="activeType">
        <option value="all">Todos los tipos</option>
        <option v-for="type in entityTypes" :key="type" :value="type">{{ typeLabels[type] }}</option>
      </select>
    </label>
  </div>
  <p class="entity-directory__status" role="status">
    {{ visibleCount }} entradas visibles · {{ filteredEntries.length - visibleCount }} protegidas
  </p>
  <ol v-if="filteredEntries.length" class="entity-list" data-pagefind-ignore>
    <li v-for="(entry, index) in filteredEntries" :key="entry.id">
      <a v-if="isExposed(entry)" :href="`/entidades/${entry.id}/`">
        <span class="entity-list__number">{{ String(index + 1).padStart(2, '0') }}</span>
        <span class="entity-list__copy">
          <span class="entity-list__meta">{{ typeLabels[entry.entityType] }} · {{ entry.reviewStatus === 'verified' ? 'Revisión verificada' : 'Revisión pendiente' }}</span>
          <strong>{{ entry.title }}</strong>
          <span>{{ entry.summary }}</span>
        </span>
        <span class="entity-list__arrow" aria-hidden="true">↗</span>
      </a>
      <div v-else class="entity-list__protected">
        <span class="entity-list__number">{{ String(index + 1).padStart(2, '0') }}</span>
        <span class="entity-list__copy">
          <span class="entity-list__meta">Contenido protegido · {{ entry.spoilerLevel }}</span>
          <strong>Entrada protegida</strong>
          <span>{{ mode === 'hide' ? 'Cambia tu preferencia para mostrar esta entrada.' : 'Puedes revelar el título y el resumen de esta entrada.' }}</span>
          <button v-if="mode === 'warn'" type="button" @click="reveal(entry.id)">Revelar entrada</button>
        </span>
      </div>
    </li>
  </ol>
  <div v-else class="entity-directory__empty" role="status">
    <strong>No hay entradas publicadas en esta categoría.</strong>
    <span>El filtro no crea fichas provisionales ni muestra contenido de otra categoría.</span>
  </div>
</template>
