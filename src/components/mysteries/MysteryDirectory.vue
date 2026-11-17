<script setup lang="ts">
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
const statusLabels = { open: 'Abierto', 'partially-solved': 'Parcialmente resuelto', resolved: 'Resuelto' };
</script>

<template>
  <div class="mystery-directory__controls">
    <aside class="directory-spoiler-warning" aria-label="Advertencia de spoilers">
      <strong>Advertencia de spoilers</strong>
      <span>Este índice muestra títulos y resúmenes de expedientes. Revisa el nivel indicado antes de abrir una ficha.</span>
    </aside>
    <p role="status">{{ entries.length }} expedientes</p>
  </div>
  <ol class="mystery-list" data-pagefind-ignore>
    <li v-for="(entry, index) in entries" :key="entry.id">
      <a :href="`/misterios/${entry.id}/`">
        <span class="mystery-list__number">{{ String(index + 1).padStart(2, '0') }}</span>
        <span class="mystery-list__copy">
          <span class="mystery-list__meta">{{ statusLabels[entry.status] }} · {{ entry.reviewStatus === 'verified' ? 'Revisión verificada' : 'Revisión pendiente' }}<template v-if="entry.spoilerLevel !== 'none'"> · Spoilers hasta {{ entry.spoilerLevel }}</template></span>
          <strong>{{ entry.title }}</strong>
          <span>{{ entry.summary }}</span>
        </span>
        <span class="mystery-list__arrow" aria-hidden="true">↗</span>
      </a>
    </li>
  </ol>
</template>
