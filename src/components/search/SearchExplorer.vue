<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

interface PagefindResultData {
  url: string;
  excerpt: string;
  plain_excerpt?: string;
  meta?: {
    title?: string;
  };
}

interface PagefindResult {
  id: string;
  data: () => Promise<PagefindResultData>;
}

interface PagefindApi {
  init: () => Promise<void>;
  search: (query: string) => Promise<{ results: PagefindResult[] }>;
}

interface SearchResult extends PagefindResultData {
  id: string;
}

const props = withDefaults(defineProps<{ initialQuery?: string }>(), {
  initialQuery: '',
});

const query = ref(props.initialQuery);
const results = ref<SearchResult[]>([]);
const isLoading = ref(false);
const hasSearched = ref(false);
const errorMessage = ref('');
let pagefind: PagefindApi | null = null;

const trimmedQuery = computed(() => query.value.trim());

onMounted(async () => {
  try {
    // Pagefind genera este módulo después de `astro build`; no existe en `astro dev`.
    const bundlePath = '/pagefind/pagefind.js';
    pagefind = await import(/* @vite-ignore */ bundlePath) as PagefindApi;
    await pagefind.init();

    if (trimmedQuery.value.length >= 2) {
      await runSearch();
    }
  } catch {
    errorMessage.value = 'El índice de búsqueda todavía no está disponible. Ejecuta npm run build para generarlo y prueba con npm run preview.';
  }
});

async function runSearch() {
  if (trimmedQuery.value.length < 2) {
    results.value = [];
    hasSearched.value = false;
    errorMessage.value = '';
    return;
  }

  if (!pagefind) {
    errorMessage.value = 'El índice de búsqueda no está disponible en este entorno.';
    return;
  }

  isLoading.value = true;
  errorMessage.value = '';

  try {
    const response = await pagefind.search(trimmedQuery.value);
    const loadedResults = await Promise.all(
      response.results.slice(0, 20).map(async (result) => ({
        id: result.id,
        ...(await result.data()),
      })),
    );
    results.value = loadedResults;
    hasSearched.value = true;
  } catch {
    errorMessage.value = 'No pudimos completar la búsqueda. Inténtalo nuevamente.';
    results.value = [];
  } finally {
    isLoading.value = false;
  }
}

function submitSearch() {
  void runSearch();
}
</script>

<template>
  <div class="search-explorer">
    <form class="search-explorer__form" role="search" @submit.prevent="submitSearch">
      <label class="sr-only" for="archive-search">Buscar en Teyvat Archives</label>
      <span class="search-explorer__icon" aria-hidden="true">⌕</span>
      <input
        id="archive-search"
        v-model="query"
        type="search"
        name="q"
        minlength="2"
        placeholder="Ej. Khaenri'ah, Arcontes, Abismo..."
        autocomplete="off"
        @input="hasSearched = false"
      />
      <button type="submit" :disabled="isLoading || trimmedQuery.length < 2">
        {{ isLoading ? 'Buscando…' : 'Buscar' }}
        <span aria-hidden="true">↗</span>
      </button>
    </form>

    <p class="search-explorer__hint">Escribe al menos dos caracteres para comenzar.</p>

    <p v-if="errorMessage" class="search-explorer__status" role="status">
      {{ errorMessage }}
    </p>
    <p v-else-if="isLoading" class="search-explorer__status" role="status" aria-live="polite">
      Consultando el archivo…
    </p>

    <section v-if="hasSearched && !isLoading" class="search-results" aria-live="polite">
      <div class="search-results__heading">
        <p class="eyebrow">RESULTADOS</p>
        <span>{{ results.length }} {{ results.length === 1 ? 'coincidencia' : 'coincidencias' }}</span>
      </div>

      <div v-if="results.length" class="search-results__list">
        <article v-for="result in results" :key="result.id" class="search-result">
          <div class="search-result__body">
            <h2><a :href="result.url">{{ result.meta?.title || 'Entrada del archivo' }}</a></h2>
            <p class="search-result__excerpt" v-html="result.excerpt"></p>
            <a class="search-result__link" :href="result.url">Abrir entrada <span aria-hidden="true">↗</span></a>
          </div>
        </article>
      </div>

      <div v-else class="search-results__empty">
        <span aria-hidden="true">✧</span>
        <h2>No encontramos coincidencias.</h2>
        <p>Prueba con otro nombre o concepto. El archivo seguirá creciendo con nuevas entradas verificadas.</p>
      </div>
    </section>
  </div>
</template>
