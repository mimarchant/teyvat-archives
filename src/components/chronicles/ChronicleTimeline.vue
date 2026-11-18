<script setup lang="ts">
import { computed, ref } from 'vue';
import { classificationLabels, reviewLabels, type Chronicle } from '../../data/chronicles';
const props = defineProps<{ entries: Chronicle[] }>();
const era = ref('');
const region = ref('');
const classification = ref('');
const eras = computed(() => [...new Set(props.entries.map(e => e.era || 'Sin documentar'))].sort());
const regions = computed(() => [...new Set(props.entries.map(e => e.region || 'Sin documentar'))].sort());
const filtered = computed(() => props.entries.filter(e => {
  return (!era.value || (e.era || 'Sin documentar') === era.value) &&
    (!region.value || (e.region || 'Sin documentar') === region.value) &&
    (!classification.value || e.classification === classification.value);
}));
const ordered = (e: Chronicle) => e.chronologyConfirmed && e.timelineOrder !== undefined;
const groups = computed(() => [
  { title: 'Secuencia documentada', entries: filtered.value.filter(ordered).sort((a, b) => a.timelineOrder! - b.timelineOrder! || a.id.localeCompare(b.id)) },
  { title: 'Sin ubicación cronológica confirmada', entries: filtered.value.filter(e => !ordered(e)).sort((a, b) => a.id.localeCompare(b.id)) },
]);
function reset() { era.value = ''; region.value = ''; classification.value = ''; }
</script>

<template>
  <div class="chronicles-explorer">
    <aside v-if="entries.some(entry => entry.spoilerLevel !== 'none')" class="chronicles-spoiler-warning" aria-label="Advertencia de spoilers">
      <strong>Advertencia de spoilers</strong>
      <span>Este índice muestra títulos y resúmenes de crónicas. Revisa el nivel indicado antes de abrir una entrada.</span>
    </aside>
    <form class="chronicles-filters" @submit.prevent>
      <label>Marco temporal<select v-model="era"><option value="">Todos los marcos temporales</option><option v-for="value in eras" :key="value">{{ value }}</option></select></label>
      <label>Región<select v-model="region"><option value="">Todas las regiones</option><option v-for="value in regions" :key="value">{{ value }}</option></select></label>
      <label>Clasificación<select v-model="classification"><option value="">Todas las clasificaciones</option><option v-for="(label, value) in classificationLabels" :key="value" :value="value">{{ label }}</option></select></label>
      <button type="button" @click="reset">Limpiar filtros</button>
    </form>
    <p class="chronicles-note">El marco temporal reproduce el alcance declarado por cada crónica; no equivale a una era histórica confirmada.</p>
    <p role="status">{{ filtered.length }} de {{ entries.length }} entradas</p>
    <p v-if="!filtered.length" class="chronicles-empty">No hay crónicas para esta combinación. Prueba otros filtros.</p>
    <section v-for="group in groups.filter(g => g.entries.length)" :key="group.title" class="chronicles-group" :aria-label="group.title">
      <h2>{{ group.title }}</h2>
      <ol class="chronicles-timeline">
        <li v-for="entry in group.entries" :key="entry.id">
          <article :id="`chronicle-${entry.id}`">
            <p v-if="entry.spoilerLevel !== 'none'" class="chronicles-card-warning">Puede contener spoilers hasta {{ entry.spoilerLevel }}.</p>
            <p class="eyebrow">{{ entry.era || 'Era sin documentar' }} · {{ entry.region || 'Región sin documentar' }}</p>
            <h3><a :href="entry.href">{{ entry.title }}</a></h3>
            <p>{{ entry.summary }}</p>
            <p class="chronicles-meta">{{ classificationLabels[entry.classification] }} · {{ reviewLabels[entry.reviewStatus] }}</p>
            <a class="back-link" :href="entry.href">Leer crónica →</a>
          </article>
        </li>
      </ol>
    </section>
  </div>
</template>
