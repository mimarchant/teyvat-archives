<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
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
const activeType = ref<'all' | EntityType>('all');
const typeLabels: Record<EntityType, string> = {
  character: 'Personajes', civilization: 'Civilizaciones', region: 'Regiones', faction: 'Facciones',
  deity: 'Deidades', concept: 'Conceptos', location: 'Lugares', artifact: 'Artefactos',
  creature: 'Criaturas', nation: 'Naciones',
};
const entityTypes = (Object.keys(typeLabels) as EntityType[])
  .filter(type => props.entries.some(entry => entry.entityType === type))
  .sort((a, b) => typeLabels[a].localeCompare(typeLabels[b], 'es'));
const filteredEntries = computed(() => props.entries.filter(entry => activeType.value === 'all' || entry.entityType === activeType.value));
function updateType(type: string | null) {
  activeType.value = type && entityTypes.includes(type as EntityType) ? type as EntityType : 'all';
}
onMounted(() => {
  updateType(new URL(window.location.href).searchParams.get('tipo'));
});
</script>

<template>
  <div class="entity-directory__toolbar">
    <aside class="directory-spoiler-warning" aria-label="Advertencia de spoilers">
      <strong>Advertencia de spoilers</strong>
      <span>Este índice muestra títulos y resúmenes. Cada entrada indica hasta qué parte de la historia puede contener detalles.</span>
    </aside>
    <label class="entity-directory__filter">
      <span>Tipo de entrada</span>
      <select v-model="activeType">
        <option value="all">Todos los tipos</option>
        <option v-for="type in entityTypes" :key="type" :value="type">{{ typeLabels[type] }}</option>
      </select>
    </label>
  </div>
  <p class="entity-directory__status" role="status">
    {{ filteredEntries.length }} {{ filteredEntries.length === 1 ? 'entrada' : 'entradas' }}
  </p>
  <ol v-if="filteredEntries.length" class="entity-list" data-pagefind-ignore>
    <li v-for="(entry, index) in filteredEntries" :key="entry.id">
      <a :href="`/entidades/${entry.id}/`">
        <span class="entity-list__number">{{ String(index + 1).padStart(2, '0') }}</span>
        <span class="entity-list__copy">
          <span class="entity-list__meta">{{ typeLabels[entry.entityType] }} · {{ entry.reviewStatus === 'verified' ? 'Revisión completada' : 'Revisión pendiente' }}<template v-if="entry.spoilerLevel !== 'none'"> · Spoilers hasta {{ entry.spoilerLevel }}</template></span>
          <strong>{{ entry.title }}</strong>
          <span>{{ entry.summary }}</span>
        </span>
        <span class="entity-list__arrow" aria-hidden="true">↗</span>
      </a>
    </li>
  </ol>
  <div v-else class="entity-directory__empty" role="status">
    <strong>No hay entradas publicadas en esta categoría.</strong>
    <span>El filtro no crea fichas provisionales ni muestra contenido de otra categoría.</span>
  </div>
</template>
