<script setup lang="ts">
import { usePhonebookStore } from '../stores/usePhonebook';

const store = usePhonebookStore();
</script>

<template>
  <Transition name="fade">
    <div v-if="store.isDeleteModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div class="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 border border-slate-100">
        
        <div class="text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-50 mb-4">
            <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          
          <h3 class="text-lg font-bold text-slate-800">Hapus Kontak?</h3>
          <p class="mt-2 text-sm text-slate-500">
            Apakah Anda yakin ingin menghapus <span class="font-semibold text-slate-900">{{ store.selectedContact?.name }}</span>?
          </p>
        </div>

        <div class="mt-6 flex gap-3">
          <button 
            @click="store.closeDeleteModal"
            class="flex-1 px-4 py-2.5 text-sm font-medium text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-all"
          >
            Batal
          </button>
          <button 
            @click="store.deleteContact"
            :disabled="store.loading"
            class="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-red-600 rounded-xl hover:bg-red-700 transition-all disabled:opacity-50"
          >
            {{ store.loading ? 'Menghapus...' : 'Ya, Hapus' }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>