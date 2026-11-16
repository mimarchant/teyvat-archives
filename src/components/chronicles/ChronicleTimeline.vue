<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import SpoilerPreferences from '../editorial/SpoilerPreferences.vue';
import { classificationLabels, reviewLabels, type Chronicle } from '../../data/chronicles';
const props = defineProps<{ entries: Chronicle[] }>();
const era = ref('');
const region = ref('');
const classification = ref('');
const mode = ref('warn');
const revealed = ref<string[]>([]);
const exposed = (entry: Chronicle) => entry.spoilerLevel === 'none' || mode.value === 'show' || (mode.value === 'warn' && revealed.value.includes(entry.id));
const visibleMetadata = computed(() => props.entries.filter(exposed));
const eras = computed(() => [...new Set(visibleMetadata.value.map(e => e.era || 'Sin documentar'))].sort());
const regions = computed(() => [...new Set(visibleMetadata.value.map(e => e.region || 'Sin documentar'))].sort());
const filtered = computed(() => props.entries.filter(e => {
  if (!exposed(e)) return !era.value && !region.value && !classification.value;
  return (!era.value || (e.era || 'Sin documentar') === era.value) &&
    (!region.value || (e.region || 'Sin documentar') === region.value) &&
    (!classification.value || e.classification === classification.value);
}));
const ordered = (e: Chronicle) => e.chronologyConfirmed && e.timelineOrder !== undefined;
const groups = computed(() => [
  { title: 'Secuencia documentada', entries: filtered.value.filter(e => exposed(e) && ordered(e)).sort((a, b) => a.timelineOrder! - b.timelineOrder! || a.id.localeCompare(b.id)) },
  { title: 'Sin ubicación cronológica confirmada o por revelar', entries: filtered.value.filter(e => !exposed(e) || !ordered(e)).sort((a, b) => a.id.localeCompare(b.id)) },
]);
function reset() { era.value = ''; region.value = ''; classification.value = ''; }
function updateMode() {
  mode.value = document.documentElement.dataset.spoilerMode || 'warn';
  revealed.value = [];
  reset();
}
onMounted(() => {
  updateMode();
  window.addEventListener('teyvat-spoiler-change', updateMode);
});
onUnmounted(() => {
  window.removeEventListener('teyvat-spoiler-change', updateMode);
});
</script>

<template>
  <div class="chronicles-explorer">
    <SpoilerPreferences />
    <form class="chronicles-filters" @submit.prevent>
      <label>Era<select v-model="era"><option value="">Todas las eras</option><option v-for="value in eras" :key="value">{{ value }}</option></select></label>
      <label>Región<select v-model="region"><option value="">Todas las regiones</option><option v-for="value in regions" :key="value">{{ value }}</option></select></label>
      <label>Clasificación<select v-model="classification"><option value="">Todas las clasificaciones</option><option v-for="(label, value) in classificationLabels" :key="value" :value="value">{{ label }}</option></select></label>
      <button type="button" @click="reset">Limpiar filtros</button>
    </form>
    <p class="chronicles-note">Los filtros de era y región se completan con las entradas reveladas. Las entradas protegidas no participan en los filtros hasta revelarlas.</p>
    <p role="status">{{ filtered.length }} de {{ entries.length }} entradas · {{ filtered.filter(e => !exposed(e)).length }} protegidas</p>
    <p v-if="!filtered.length" class="chronicles-empty">No hay crónicas para esta combinación. Prueba otros filtros.</p>
    <section v-for="group in groups.filter(g => g.entries.length)" :key="group.title" class="chronicles-group" :aria-label="group.title">
      <h2>{{ group.title }}</h2>
      <ol class="chronicles-timeline">
        <li v-for="entry in group.entries" :key="entry.id">
          <article v-if="exposed(entry)" :id="`chronicle-${entry.id}`">
            <p class="eyebrow">{{ entry.era || 'Era sin documentar' }} · {{ entry.region || 'Región sin documentar' }}</p>
            <h3><a :href="entry.href">{{ entry.title }}</a></h3>
            <p>{{ entry.summary }}</p>
            <p class="chronicles-meta">{{ classificationLabels[entry.classification] }} · {{ reviewLabels[entry.reviewStatus] }}</p>
            <a class="back-link" :href="entry.href">Leer crónica →</a>
          </article>
          <article v-else :id="`chronicle-${entry.id}`">
            <h3>Crónica protegida</h3>
            <p>El título, el resumen y sus datos editoriales están ocultos para evitar spoilers.</p>
            <p v-if="mode === 'hide'">Cambia el control de spoilers a Advertir o Mostrar para leerla.</p>
          </article>
          <button v-if="entry.spoilerLevel !== 'none' && mode === 'warn'" type="button"
            :aria-expanded="exposed(entry)" :aria-controls="`chronicle-${entry.id}`"
            @click="revealed = exposed(entry) ? revealed.filter(id => id !== entry.id) : [...revealed, entry.id]">
            {{ exposed(entry) ? 'Ocultar esta crónica' : 'Revelar esta crónica' }}
          </button>
        </li>
      </ol>
    </section>
  </div>
</template>
