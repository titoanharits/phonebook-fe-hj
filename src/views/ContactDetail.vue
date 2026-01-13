<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePhonebookStore } from '../stores/usePhonebook';

const route = useRoute();
const router = useRouter();
const store = usePhonebookStore();

onMounted(() => {
  const id = route.params.id as string;
  store.fetchContactById(id);
});

onUnmounted(() => {
  store.clearSelectedContact();
});
</script>

<template>
  <div class="max-w-3xl mx-auto">
    <button @click="router.back()" class="mb-6 flex items-center text-blue-600 hover:underline font-medium">
      ← Kembali ke Daftar
    </button>

    <div v-if="store.loading" class="animate-pulse bg-white p-8 rounded-3xl border border-slate-200">
      <div class="h-8 bg-slate-200 w-1/3 mb-4 rounded"></div>
      <div class="h-4 bg-slate-100 w-1/2 rounded"></div>
    </div>

    <div v-else-if="store.selectedContact" class="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
      <div class="bg-blue-600 p-8 text-white">
        <h1 class="text-3xl font-bold">{{ store.selectedContact.name }}</h1>
        <p class="opacity-80">@{{ store.selectedContact.username }}</p>
      </div>

      <div class="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <section>
          <h3 class="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Informasi Kontak</h3>
          <div class="space-y-4">
            <div>
              <p class="text-xs text-slate-500 uppercase">Email</p>
              <p class="font-medium text-slate-800">{{ store.selectedContact.email }}</p>
            </div>
            <div>
              <p class="text-xs text-slate-500 uppercase">Nomor Telepon</p>
              <p class="font-medium text-slate-800">{{ store.selectedContact.phone }}</p>
            </div>
          </div>
        </section>

        <section>
          <h3 class="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Lokasi</h3>
          <div class="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <p class="text-slate-800 font-medium">{{ store.selectedContact.address?.city }}</p>
            <p class="text-slate-500 text-sm italic">Data simulasi dari JSONPlaceholder</p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>