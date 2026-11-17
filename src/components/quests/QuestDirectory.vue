<script setup lang="ts">
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
const typeLabels = { archon: 'Misión de Arconte', story: 'Misión legendaria', world: 'Misión de mundo', event: 'Misión de evento' };
</script>

<template>
  <div class="quest-directory__controls">
    <aside class="directory-spoiler-warning" aria-label="Advertencia de spoilers">
      <strong>Advertencia de spoilers</strong>
      <span>Este índice muestra títulos y resúmenes de misiones. Revisa el nivel indicado antes de abrir una ficha.</span>
    </aside>
    <p role="status">{{ entries.length }} misiones</p>
  </div>
  <ol class="quest-list" data-pagefind-ignore>
    <li v-for="(entry, index) in entries" :key="entry.id">
      <a :href="`/misiones/${entry.id}/`">
        <span class="quest-list__number">{{ String(index + 1).padStart(2, '0') }}</span>
        <span class="quest-list__copy">
          <span class="quest-list__meta">{{ typeLabels[entry.questType] }} · {{ entry.reviewStatus === 'verified' ? 'Revisión verificada' : 'Revisión pendiente' }}<template v-if="entry.spoilerLevel !== 'none'"> · Spoilers hasta {{ entry.spoilerLevel }}</template></span>
          <strong>{{ entry.title }}</strong>
          <span>{{ entry.summary }}</span>
        </span>
        <span class="quest-list__arrow" aria-hidden="true">↗</span>
      </a>
    </li>
  </ol>
</template>
