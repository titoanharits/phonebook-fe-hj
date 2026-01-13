<script setup lang="ts">
import { onMounted } from 'vue';
import { usePhonebookStore } from '../stores/usePhonebook';
import ContactTable from '../components/ContactTable.vue';
import Pagination from '../components/Pagination.vue';
import { UserPlus } from 'lucide-vue-next';

const store = usePhonebookStore();

onMounted(() => {
  if (store.contacts.length === 0) {
    store.fetchContacts();
  }
});
</script>

<template>
  <div class="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-6xl mx-auto">
      
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
        <div>
          <h1 class="text-4xl font-black text-slate-900 tracking-tight">
            Phonebook<span class="text-blue-600">.</span>
          </h1>
          <p class="text-slate-500 mt-1 font-medium">Contact Management System</p>
        </div>

        <RouterLink 
          to="/add" 
          class="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-blue-500/25 active:scale-95"
        >
          <UserPlus :size="20" />
          Tambah Kontak
        </RouterLink>
      </div>

      <ContactTable />

      <div class="mt-12">
        <Pagination />
      </div>

    </div>
  </div>
</template>