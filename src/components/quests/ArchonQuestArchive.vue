<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { archonQuestArcAnchor, archonQuestEntryHref } from '../../data/archon-quests';
import type { ArchonQuestEntry, ArchonQuestSourceId } from '../../data/archon-quests';

type QuestSource = { label: string; href: string };
type ExpandedQuestEntry = ArchonQuestEntry & { narrative: string; outcome: string };

const props = defineProps<{
  entries: ExpandedQuestEntry[];
  sources: Record<ArchonQuestSourceId, QuestSource>;
  arcs: string[];
  versions: string[];
}>();

const query = ref('');
const selectedArc = ref('all');
const selectedVersion = ref('all');
const activeArc = ref(props.arcs[0] ?? '');

const normalizedQuery = computed(() => query.value.trim().toLocaleLowerCase('es'));
const filteredEntries = computed(() => props.entries.filter((entry) => {
  const matchesArc = selectedArc.value === 'all' || entry.arc === selectedArc.value;
  const matchesVersion = selectedVersion.value === 'all' || entry.version === selectedVersion.value;
  const searchable = `${entry.title} ${entry.act} ${entry.arc} ${entry.region} ${entry.version} ${entry.summary} ${entry.narrative} ${entry.outcome}`.toLocaleLowerCase('es');
  return matchesArc && matchesVersion && (!normalizedQuery.value || searchable.includes(normalizedQuery.value));
}));

const groupedEntries = computed(() => props.arcs
  .map((arc) => ({ arc, entries: filteredEntries.value.filter((entry) => entry.arc === arc) }))
  .filter((group) => group.entries.length));

const hasFilters = computed(() => Boolean(normalizedQuery.value) || selectedArc.value !== 'all' || selectedVersion.value !== 'all');

let scrollFrame: number | null = null;

const syncActiveArc = () => {
  scrollFrame = null;
  const sections = Array.from(document.querySelectorAll<HTMLElement>('.archon-group[data-arc]'));
  if (!sections.length) {
    activeArc.value = '';
    return;
  }

  const readingLine = window.innerHeight * 0.45;
  const current = sections.reduce((latest, section) => (
    section.getBoundingClientRect().top <= readingLine ? section : latest
  ), sections[0]);
  activeArc.value = current.dataset.arc ?? '';
};

const queueActiveArcSync = () => {
  if (scrollFrame !== null) return;
  scrollFrame = window.requestAnimationFrame(syncActiveArc);
};

const observeChapters = async () => {
  await nextTick();
  const visibleArcs = groupedEntries.value.map(({ arc }) => arc);
  if (!visibleArcs.includes(activeArc.value)) activeArc.value = visibleArcs[0] ?? '';
  queueActiveArcSync();
};

onMounted(() => {
  window.addEventListener('scroll', queueActiveArcSync, { passive: true });
  window.addEventListener('resize', queueActiveArcSync);
  observeChapters();
});
onBeforeUnmount(() => {
  window.removeEventListener('scroll', queueActiveArcSync);
  window.removeEventListener('resize', queueActiveArcSync);
  if (scrollFrame !== null) window.cancelAnimationFrame(scrollFrame);
});
watch([query, selectedArc, selectedVersion], observeChapters);

const resetFilters = () => {
  query.value = '';
  selectedArc.value = 'all';
  selectedVersion.value = 'all';
};
</script>

<template>
  <section class="archon-browser" aria-labelledby="archon-browser-title">
    <div class="archon-browser__heading">
      <div>
        <p class="eyebrow"><span></span> EXPLORAR EL ARCHIVO</p>
        <h2 id="archon-browser-title">Recorre la historia por actos</h2>
      </div>
      <p aria-live="polite"><strong>{{ filteredEntries.length }}</strong> de {{ entries.length }} actos</p>
    </div>

    <form class="archon-filters" role="search" @submit.prevent>
      <label class="archon-filter archon-filter--search">
        <span>Buscar</span>
        <input v-model="query" type="search" placeholder="Título, región o palabra clave" autocomplete="off">
      </label>
      <label class="archon-filter">
        <span>Capítulo</span>
        <select v-model="selectedArc">
          <option value="all">Todos los capítulos</option>
          <option v-for="arc in arcs" :key="arc" :value="arc">{{ arc }}</option>
        </select>
      </label>
      <label class="archon-filter">
        <span>Versión</span>
        <select v-model="selectedVersion">
          <option value="all">Todas las versiones</option>
          <option v-for="version in versions" :key="version" :value="version">{{ version }}</option>
        </select>
      </label>
      <button v-if="hasFilters" class="archon-filters__reset" type="button" @click="resetFilters">Limpiar filtros</button>
    </form>

    <nav v-if="groupedEntries.length" id="archon-chapter-nav" class="archon-chapter-nav" aria-label="Navegación por capítulos">
      <span class="archon-chapter-nav__label">Ir a</span>
      <div class="archon-chapter-nav__links">
        <a
          v-for="group in groupedEntries"
          :key="group.arc"
          :href="`#${archonQuestArcAnchor(group.arc)}`"
          :class="{ 'is-active': activeArc === group.arc }"
          :aria-current="activeArc === group.arc ? 'location' : undefined"
          @click="activeArc = group.arc"
        >
          <span>{{ group.arc }}</span>
          <small>{{ group.entries.length }}</small>
        </a>
      </div>
    </nav>

    <div v-if="groupedEntries.length" class="archon-groups" data-pagefind-ignore>
      <section
        v-for="group in groupedEntries"
        :id="archonQuestArcAnchor(group.arc)"
        :key="group.arc"
        class="archon-group"
        :data-arc="group.arc"
      >
        <header class="archon-group__header">
          <h3>{{ group.arc }}</h3>
          <div>
            <span>{{ group.entries.length }} {{ group.entries.length === 1 ? 'acto' : 'actos' }}</span>
            <a href="#archon-chapter-nav">Volver al índice <span aria-hidden="true">↑</span></a>
          </div>
        </header>
        <ol class="archon-list">
          <li v-for="entry in group.entries" :key="entry.id" class="archon-card">
            <div class="archon-card__index" aria-hidden="true">{{ String(entry.order).padStart(2, '0') }}</div>
            <div class="archon-card__body">
              <div class="archon-card__meta">
                <span>{{ entry.act }}</span>
                <span>{{ entry.region }}</span>
                <span>Versión {{ entry.version }}</span>
              </div>
              <h4>{{ entry.title }}</h4>
              <p class="archon-card__lead">{{ entry.summary }}</p>
              <div class="archon-card__narrative">
                <span>Resumen del acto</span>
                <p>{{ entry.narrative }}</p>
              </div>
              <aside class="archon-card__outcome">
                <strong>Qué deja establecido</strong>
                <p>{{ entry.outcome }}</p>
              </aside>
              <div class="archon-card__links">
                <a class="archon-card__article" :href="archonQuestEntryHref(entry.id)">
                  Leer acto completo <span aria-hidden="true">→</span>
                </a>
                <a :href="sources[entry.sourceId].href" target="_blank" rel="noreferrer">
                  Fuente de publicación <span aria-hidden="true">↗</span>
                  <span class="sr-only">: {{ sources[entry.sourceId].label }} (abre en una pestaña nueva)</span>
                </a>
                <a v-if="entry.articleHref" :href="entry.articleHref">
                  Ficha documental <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </li>
        </ol>
      </section>
    </div>

    <div v-else class="archon-empty" role="status">
      <strong>No encontramos actos con esos filtros.</strong>
      <p>Prueba otra búsqueda o vuelve a mostrar el archivo completo.</p>
      <button type="button" @click="resetFilters">Ver todos los actos</button>
    </div>
  </section>
</template>
