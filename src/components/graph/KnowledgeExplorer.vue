<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue';
import SpoilerPreferences from '../editorial/SpoilerPreferences.vue';
import { classificationLabels, reviewLabels } from '../../data/chronicles';
import { canReveal, collectionLabels, relationLabels, visibleEdges, type GraphNode,
  type KnowledgeGraph, type SpoilerMode } from '../../data/graph';

const props = defineProps<{ graph: KnowledgeGraph }>();
const mode = ref<SpoilerMode>('warn');
const collection = ref('');
const classification = ref('');
const relationType = ref('');
const selectedId = ref('');
const revealedNodes = ref<string[]>([]);
const revealedEdges = ref<string[]>([]);
const detailHeading = ref<HTMLHeadingElement | null>(null);
const isExposed = (node: GraphNode) => canReveal(node.spoilerLevel, mode.value, revealedNodes.value.includes(node.id));
const filtered = computed(() => props.graph.nodes.filter(node => {
  if (!isExposed(node)) return !collection.value && !classification.value;
  return (!collection.value || node.collection === collection.value) &&
    (!classification.value || node.classification === classification.value);
}));
const visible = computed(() => filtered.value.filter(isExposed));
const nodeIds = computed(() => new Set(visible.value.map(node => node.id)));
const edges = computed(() => visibleEdges(props.graph, nodeIds.value, mode.value, revealedEdges.value)
  .filter(edge => !relationType.value || edge.type === relationType.value));
const selected = computed(() => visible.value.find(node => node.id === selectedId.value));
const related = computed(() => edges.value.filter(edge => edge.from === selectedId.value || edge.to === selectedId.value));
const pending = computed(() => props.graph.edges.filter(edge => selected.value && !relationType.value &&
  (edge.from === selectedId.value || edge.to === selectedId.value) && nodeIds.value.has(edge.from) && nodeIds.value.has(edge.to) &&
  !canReveal(edge.spoilerLevel, mode.value, revealedEdges.value.includes(edge.key))));
const positions = computed(() => visible.value.map((node, index, nodes) => {
  const angle = index * Math.PI * 2 / nodes.length - Math.PI / 2;
  return { ...node, number: index + 1, x: nodes.length === 1 ? 250 : 250 + 180 * Math.cos(angle),
    y: nodes.length === 1 ? 180 : 180 + 125 * Math.sin(angle) };
}));
const positioned = computed(() => new Map(positions.value.map(node => [node.id, node])));
const nodeTitle = (id: string) => visible.value.find(node => node.id === id)?.title || '';
const diagramDescription = computed(() => `${visible.value.length} entradas visibles y ${edges.value.length} relaciones. Selecciona una entrada en la lista para consultar sus conexiones.`);

function reset() { collection.value = ''; classification.value = ''; relationType.value = ''; selectedId.value = ''; }
function updateMode() {
  const next = document.documentElement.dataset.spoilerMode;
  mode.value = next === 'hide' || next === 'show' ? next : 'warn';
  revealedNodes.value = []; revealedEdges.value = []; reset();
}
function toggleNode(id: string) {
  revealedNodes.value = revealedNodes.value.includes(id) ? revealedNodes.value.filter(value => value !== id) : [...revealedNodes.value, id];
  revealedEdges.value = [];
}
async function revealEdge(key: string) {
  revealedEdges.value.push(key);
  await nextTick();
  detailHeading.value?.focus();
}
onMounted(() => { updateMode(); window.addEventListener('teyvat-spoiler-change', updateMode); });
onUnmounted(() => window.removeEventListener('teyvat-spoiler-change', updateMode));
</script>

<template>
  <div class="graph-explorer">
    <SpoilerPreferences />
    <form class="graph-filters" @submit.prevent>
      <label>Tipo de entrada<select v-model="collection"><option value="">Todos los tipos</option><option v-for="(label, value) in collectionLabels" :key="value" :value="value">{{ label }}</option></select></label>
      <label>Clasificación de entrada<select v-model="classification"><option value="">Todas las clasificaciones</option><option v-for="(label, value) in classificationLabels" :key="value" :value="value">{{ label }}</option></select></label>
      <label>Tipo de relación<select v-model="relationType"><option value="">Todas las relaciones</option><option v-for="(label, value) in relationLabels" :key="value" :value="value">{{ label }}</option></select></label>
      <button type="button" @click="reset">Limpiar filtros</button>
    </form>
    <p class="graph-note">Las entradas protegidas no participan en los filtros hasta revelarlas. Los enlaces y las fuentes de una relación se muestran cuando sus dos entradas y la relación están reveladas.</p>
    <p role="status">{{ visible.length }} entradas visibles · {{ filtered.length - visible.length }} protegidas · {{ edges.length }} relaciones visibles<span v-if="selected"> · Selección: {{ selected.title }}</span></p>
    <p v-if="!graph.nodes.length" class="graph-empty">Todavía no hay entradas en el archivo.</p>
    <p v-else-if="!filtered.length" class="graph-empty">No hay entradas para estos filtros. Prueba otra combinación.</p>
    <p v-if="!graph.edges.length" class="graph-empty">Todavía no hay relaciones documentadas. No se han añadido conexiones sin evidencia para completar el dibujo.</p>
    <div class="graph-layout">
      <section class="graph-map" aria-label="Mapa de conexiones">
        <h2>El mapa del archivo</h2>
        <p class="graph-note">La posición es visual: no expresa cercanía geográfica, fechas ni fuerza de la evidencia.</p>
        <svg v-if="visible.length" viewBox="0 0 500 360" aria-hidden="true" focusable="false">
          <defs><marker id="graph-arrow" viewBox="0 0 10 10" refX="19" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" /></marker></defs>
          <line v-for="edge in edges" :key="edge.key" :x1="positioned.get(edge.from)!.x" :y1="positioned.get(edge.from)!.y" :x2="positioned.get(edge.to)!.x" :y2="positioned.get(edge.to)!.y" marker-end="url(#graph-arrow)" />
          <g v-for="node in positions" :key="node.id" :class="{ 'is-selected': selectedId === node.id }">
            <circle :cx="node.x" :cy="node.y" r="19" /><text :x="node.x" :y="node.y + 5" text-anchor="middle">{{ node.number }}</text>
          </g>
        </svg>
        <p v-else class="graph-empty">Revela una entrada para verla en el mapa.</p>
        <p class="graph-note">{{ diagramDescription }}</p>
        <h3>Entradas del mapa</h3>
        <ul class="graph-node-list">
          <li v-for="node in filtered" :key="node.id">
            <button v-if="isExposed(node)" type="button" :aria-pressed="selected?.id === node.id" aria-controls="graph-details" @click="selectedId = node.id">
              <span class="graph-number">{{ positioned.get(node.id)?.number }}</span> {{ node.title }}
              <small>{{ collectionLabels[node.collection] }} · {{ classificationLabels[node.classification] }} · {{ reviewLabels[node.reviewStatus] }}</small>
            </button>
            <p v-else>Entrada protegida</p>
            <button v-if="node.spoilerLevel !== 'none' && mode === 'warn'" type="button" :aria-expanded="isExposed(node)" @click="toggleNode(node.id)">{{ isExposed(node) ? 'Ocultar entrada' : 'Revelar entrada' }}</button>
          </li>
        </ul>
      </section>
      <section id="graph-details" class="graph-details" aria-label="Detalle de entrada y evidencia">
        <h2 ref="detailHeading" tabindex="-1">Seguir una conexión</h2>
        <template v-if="selected">
          <h3>{{ selected.title }}</h3>
          <p>{{ selected.summary }}</p>
          <p class="graph-meta">{{ classificationLabels[selected.classification] }} · {{ reviewLabels[selected.reviewStatus] }}</p>
          <a v-if="selected.href" class="back-link" :href="selected.href">Leer artículo →</a>
          <p v-else class="graph-note">Esta colección todavía no tiene una ruta de artículo.</p>
          <h3>Relaciones y fuentes</h3>
          <p v-if="!related.length">No hay relaciones visibles para esta entrada con los filtros y preferencias actuales.</p>
          <ol class="graph-evidence">
            <li v-for="edge in related" :key="edge.key">
              <h4>{{ nodeTitle(edge.from) }} → {{ relationLabels[edge.type] }} → {{ nodeTitle(edge.to) }}</h4>
              <p>{{ edge.explanation }}</p>
              <p class="graph-meta">{{ classificationLabels[edge.classification] }} · {{ reviewLabels[edge.reviewStatus] }}</p>
              <button type="button" @click="selectedId = edge.from === selectedId ? edge.to : edge.from">Explorar la otra entrada</button>
              <p class="eyebrow">FUENTES REGISTRADAS EN LA ENTRADA DE ORIGEN</p>
              <ul><li v-for="source in edge.evidence" :key="source.id"><strong>{{ source.title }}</strong><p>{{ source.supports }}</p><small>{{ source.reference }} {{ source.gameVersion ? `· Versión ${source.gameVersion}` : '' }}</small></li></ul>
            </li>
          </ol>
          <div v-for="edge in pending" :key="edge.key" class="graph-empty">
            <p>Relación protegida. Sus detalles y fuentes permanecen ocultos.</p>
            <button v-if="mode === 'warn'" type="button" @click="revealEdge(edge.key)">Revelar relación y fuentes</button>
          </div>
        </template>
        <p v-else>Selecciona una entrada de la lista para consultar su artículo y las relaciones documentadas.</p>
      </section>
    </div>
  </div>
</template>
