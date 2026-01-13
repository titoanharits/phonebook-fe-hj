<script setup lang="ts">
import { usePhonebookStore } from '../stores/usePhonebook';
const store = usePhonebookStore();
</script>

<template>
  <div class="flex items-center justify-between p-4 bg-white rounded-xl">
    <p class="text-sm text-slate-600">
      Menampilkan <span class="font-bold">{{ store.paginatedContacts.length }}</span> 
      dari <span class="font-bold">{{ store.totalItems }}</span> kontak
    </p>

    <nav class="flex gap-2">
      <button v-for="page in store.totalPages" :key="page"
              @click="store.setPage(page)"
              :class="[
                store.currentPage === page ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600',
                'px-4 py-2 rounded-lg font-bold transition-all hover:scale-105 active:scale-95'
              ]">
        {{ page }}
      </button>
    </nav>
  </div>
</template>