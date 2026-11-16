<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue';
import { clearProgress, loadProgress, readingPosition, readingStorageKey, resumePosition, saveProgress,
  type ProgressStorage, type ReadingProgress } from '../../lib/reading-progress';

const props = defineProps<{ entryId: string; revision: string }>();
const key = readingStorageKey('chronicles', props.entryId);
const record = ref<ReadingProgress | null>(null);
const ready = ref(false);
const persistent = ref(true);
const notice = ref('');
const completionButton = ref<HTMLButtonElement | null>(null);
const outdated = computed(() => record.value !== null && record.value.revision !== props.revision);
const completed = computed(() => record.value?.completed && !outdated.value);
let storage: ProgressStorage | null = null;
let tracking = false;
let dirty = false;
let timer: ReturnType<typeof setTimeout> | undefined;

function layout() {
  const content = document.getElementById('contenido-articulo');
  if (!content) return null;
  const top = content.getBoundingClientRect().top + window.scrollY;
  const bottom = content.getBoundingClientRect().bottom + window.scrollY;
  const elements = [content, ...content.querySelectorAll<HTMLElement>('.prose > h2[id], .source-register[id]')];
  return { content, top, bottom, elements, markers: elements.map(element => ({ id: element.id,
    top: element.getBoundingClientRect().top + window.scrollY })) };
}
function cancelTracking() {
  tracking = false; dirty = false;
  if (timer !== undefined) clearTimeout(timer);
  timer = undefined;
}
function store(next: ReadingProgress) {
  record.value = next;
  persistent.value = saveProgress(storage, key, next);
}
function snapshot(markCompleted = completed.value ?? false) {
  const measured = layout();
  if (!measured) return;
  const position = readingPosition(window.scrollY, window.innerHeight, measured.top, measured.bottom, measured.markers);
  if (!position) return;
  store({ version: 1, revision: props.revision, ...position, completed: markCompleted, savedAt: Date.now() });
}
function flush() {
  if (timer !== undefined) clearTimeout(timer);
  timer = undefined;
  if (!dirty || !tracking) return;
  dirty = false;
  const measured = layout();
  if (measured && window.scrollY + Math.min(120, window.innerHeight * 0.2) >= measured.top) snapshot();
}
function scrollChanged() {
  if (!tracking || !ready.value) return;
  dirty = true;
  if (timer === undefined) timer = setTimeout(flush, 800);
}
function startTracking(event: Event) {
  const target = event.target;
  if (target instanceof HTMLElement && (target.isContentEditable || target.closest('input, textarea, select'))) return;
  if (event instanceof KeyboardEvent && !['PageDown', 'PageUp', 'Home', 'End', 'ArrowDown', 'ArrowUp', ' ', 'Tab'].includes(event.key)) return;
  tracking = true;
}
function anchorClicked(event: MouseEvent) {
  if (event.target instanceof Element && event.target.closest('a[href^="#"]')) tracking = true;
}
function pageHidden() { flush(); cancelTracking(); }
function visibilityChanged() { if (document.hidden) pageHidden(); }
function syncFromStorage() {
  cancelTracking();
  const loaded = loadProgress(storage, key);
  record.value = loaded.record; persistent.value = loaded.available;
  notice.value = loaded.invalid ? 'No se pudo recuperar la posición anterior. Puedes guardar una nueva al avanzar.' : '';
}
function storageChanged(event: StorageEvent) {
  if (event.key === key || event.key === null) syncFromStorage();
}
function pageShown(event: PageTransitionEvent) { if (event.persisted) syncFromStorage(); }
function resume() {
  if (!record.value) return;
  cancelTracking();
  const measured = layout();
  if (!measured) return;
  const index = measured.markers.findIndex(marker => marker.id === record.value?.anchor);
  const start = measured.markers[Math.max(0, index)]?.top ?? measured.top;
  const end = measured.markers[Math.max(0, index) + 1]?.top ?? measured.bottom;
  const closed = [...measured.content.querySelectorAll<HTMLDetailsElement>('details.spoiler-section:not([open])')]
    .some(element => { const top = element.getBoundingClientRect().top + window.scrollY; return top >= start && top < end; });
  const destination = resumePosition(record.value, props.revision, measured.markers, measured.bottom, window.innerHeight, closed);
  if (!destination) return;
  const target = measured.elements.find(element => element.id === destination.anchor);
  if (target) { target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true }); }
  // Respect an explicit request even when the browser would restore a hash or scroll position.
  window.scrollTo({ top: destination.top, behavior: 'instant' });
  notice.value = destination.missing ? 'La sección guardada ya no existe. Volviste al inicio del artículo.'
    : destination.changed ? 'El artículo cambió. Volviste al inicio de la sección guardada para revisarla.'
    : destination.closed ? 'Volviste a la sección guardada. Su contenido con spoilers sigue oculto.'
    : 'Volviste a tu posición guardada.';
}
function toggleCompleted() {
  cancelTracking();
  snapshot(!completed.value);
  notice.value = completed.value ? 'Artículo marcado como leído por ti.' : 'Artículo marcado como pendiente.';
}
async function reset() {
  cancelTracking();
  const removed = clearProgress(storage, key);
  record.value = null;
  notice.value = removed ? 'Progreso de este artículo borrado.' : 'Se borró la posición de esta página, pero no se pudo borrar el registro del navegador.';
  if (!removed) persistent.value = false;
  await nextTick();
  completionButton.value?.focus();
}
onMounted(() => {
  try { storage = window.localStorage; } catch { storage = null; }
  const loaded = loadProgress(storage, key);
  record.value = loaded.record; persistent.value = loaded.available;
  if (loaded.invalid) notice.value = 'No se pudo recuperar la posición anterior. Puedes guardar una nueva al avanzar.';
  ready.value = true;
  window.addEventListener('scroll', scrollChanged, { passive: true });
  window.addEventListener('wheel', startTracking, { passive: true });
  window.addEventListener('touchmove', startTracking, { passive: true });
  window.addEventListener('pointerdown', startTracking, { passive: true });
  window.addEventListener('keydown', startTracking);
  window.addEventListener('click', anchorClicked);
  window.addEventListener('pagehide', pageHidden);
  window.addEventListener('pageshow', pageShown);
  window.addEventListener('storage', storageChanged);
  window.addEventListener('teyvat-spoiler-change', cancelTracking);
  document.addEventListener('visibilitychange', visibilityChanged);
});
onUnmounted(() => {
  flush(); cancelTracking();
  window.removeEventListener('scroll', scrollChanged);
  window.removeEventListener('wheel', startTracking);
  window.removeEventListener('touchmove', startTracking);
  window.removeEventListener('pointerdown', startTracking);
  window.removeEventListener('keydown', startTracking);
  window.removeEventListener('click', anchorClicked);
  window.removeEventListener('pagehide', pageHidden);
  window.removeEventListener('pageshow', pageShown);
  window.removeEventListener('storage', storageChanged);
  window.removeEventListener('teyvat-spoiler-change', cancelTracking);
  document.removeEventListener('visibilitychange', visibilityChanged);
});
</script>

<template>
  <section class="reading-progress" aria-label="Tu progreso de lectura" data-pagefind-ignore>
    <p class="eyebrow">TU LECTURA</p>
    <p v-if="!ready">Cargando tu progreso…</p>
    <template v-else>
      <p v-if="outdated">El artículo cambió desde tu última visita. Tu posición anterior es una referencia para revisarlo.</p>
      <p v-else-if="completed">Marcado como leído.</p>
      <p v-else-if="record">Posición aproximada: {{ record.percent }} %.</p>
      <p v-else>Tu posición se guardará al avanzar por el artículo.</p>
      <meter v-if="record && !outdated" min="0" max="100" :value="record.percent" aria-label="Posición aproximada en el artículo">{{ record.percent }} %</meter>
      <div class="reading-progress__actions">
        <button v-if="record" type="button" @click="resume">Continuar lectura</button>
        <button ref="completionButton" type="button" :aria-pressed="!!completed" @click="toggleCompleted">{{ completed ? 'Marcar como pendiente' : 'Marcar como leído' }}</button>
        <button v-if="record" type="button" @click="reset">Borrar progreso</button>
      </div>
      <p class="reading-progress__note">Solo en este navegador. La posición no confirma que hayas leído las secciones con spoilers.</p>
      <p v-if="!persistent" class="reading-progress__note">No se pudo guardar en el navegador. El progreso solo se conserva mientras esta página esté abierta.</p>
      <p class="reading-progress__notice" role="status">{{ notice }}</p>
    </template>
  </section>
</template>
