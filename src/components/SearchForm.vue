<script setup lang="ts">
import { ref } from 'vue';
import { usePhonebookStore } from '../stores/usePhonebook';

const store = usePhonebookStore();
const searchQuery = ref('');

</script>

<template>
  <div class="relative">
    <div class="group">
      <label class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2 mb-2 block">Identitas Unik</label>
      <div class="relative">
        <User class="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" :size="18" />
        <input v-model="searchQuery" type="text" placeholder="Cari Nama" class="w-full pl-14 pr-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-semibold text-slate-700" />
      </div>
    </div>

  </div>
</template>