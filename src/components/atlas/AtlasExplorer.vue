<script setup lang="ts">
import { computed, ref } from 'vue';
import type { AtlasCategory, AtlasEntry } from '../../data/atlas';

const props = defineProps<{
  entries: AtlasEntry[];
  categories: { id: 'all' | AtlasCategory; label: string }[];
  categoryLabels: Record<AtlasCategory, string>;
}>();

const activeCategory = ref<'all' | AtlasCategory>('all');
const search = ref('');

const filteredEntries = computed(() => {
  const query = search.value.trim().toLocaleLowerCase('es');
  return props.entries.filter((entry) => {
    const matchesCategory = activeCategory.value === 'all' || entry.category === activeCategory.value;
    const searchable = [entry.name, entry.subtitle, entry.description, props.categoryLabels[entry.category]]
      .join(' ')
      .toLocaleLowerCase('es');
    return matchesCategory && (!query || searchable.includes(query));
  });
});

const countLabel = computed(() => {
  const count = filteredEntries.value.length;
  return `${count} ${count === 1 ? 'entrada' : 'entradas'}`;
});
</script>

<template>
  <section class="atlas-explorer" aria-label="Explorador del Atlas">
    <div class="atlas-toolbar">
      <div class="atlas-filters" role="group" aria-label="Filtrar por categoría">
        <button
          v-for="category in categories"
          :key="category.id"
          type="button"
          class="atlas-filter"
          :class="{ 'is-active': activeCategory === category.id }"
          :aria-pressed="activeCategory === category.id"
          @click="activeCategory = category.id"
        >{{ category.label }}</button>
      </div>
      <label class="atlas-search">
        <span aria-hidden="true">⌕</span>
        <span class="sr-only">Buscar en el Atlas</span>
        <input v-model="search" type="search" placeholder="Buscar una entrada..." />
      </label>
    </div>

    <div class="atlas-results-meta">
      <span>{{ countLabel }}</span>
      <span>ENTRADAS DEL ARCHIVO</span>
    </div>

    <div v-if="filteredEntries.length" class="atlas-results">
      <article v-for="entry in filteredEntries" :key="entry.id" class="atlas-entry">
        <div class="atlas-entry__visual" :class="`atlas-entry__visual--${entry.id}`" aria-hidden="true">
          <span class="atlas-entry__symbol">{{ entry.category === 'civilization' ? '✧' : '◇' }}</span>
          <span class="atlas-entry__index">{{ String(entry.order).padStart(2, '0') }}</span>
        </div>
        <div class="atlas-entry__body">
          <div class="atlas-entry__meta">
            <span>{{ categoryLabels[entry.category] }}</span>
            <span v-if="entry.element">{{ entry.element }}</span>
          </div>
          <h2>{{ entry.name }}</h2>
          <p class="atlas-entry__subtitle">{{ entry.subtitle }}</p>
          <p class="atlas-entry__description">{{ entry.description }}</p>
          <div class="atlas-entry__footer">
            <span class="atlas-entry__status" :class="{ 'is-ready': entry.status === 'available' }">
              {{ entry.status === 'available' ? (entry.category === 'nation' ? 'Ficha documentada' : 'Crónica relacionada') : 'Entrada en preparación' }}
            </span>
            <a v-if="entry.href" :href="entry.href" class="atlas-entry__link">{{ entry.category === 'nation' ? 'Abrir ficha' : 'Leer crónica' }} <span aria-hidden="true">↗</span></a>
            <span v-else class="atlas-entry__coming">Próximamente</span>
          </div>
        </div>
      </article>
    </div>

    <div v-else class="atlas-empty" role="status">
      <span aria-hidden="true">⌕</span>
      <h2>No encontramos esa entrada</h2>
      <p>Prueba con otro término o cambia la categoría seleccionada.</p>
      <button type="button" @click="search = ''; activeCategory = 'all'">Limpiar filtros</button>
    </div>
  </section>
</template>
