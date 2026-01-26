<script setup lang="ts">
import ContactDeleteModal from './ContactDeleteModal.vue';
import { usePhonebookStore } from '../stores/usePhonebook';
import { Eye, Pencil, Trash2, Mail, MapPin, Phone } from 'lucide-vue-next';
import { RouterLink } from 'vue-router';

const store = usePhonebookStore();
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div 
      v-for="contact in store.paginatedContacts" 
      :key="contact.id"
      class="group bg-white rounded-3xl border border-slate-100 p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1"
    >
      <div class="flex items-center gap-4 mb-6">
        <div class="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center font-bold text-lg group-hover:bg-red-600 group-hover:text-white transition-colors">
          {{ contact.name.charAt(0) }}
        </div>
        <div class="overflow-hidden">
          <h3 class="font-bold text-red-900 truncate">{{ contact.name }}</h3>
          <p class="text-xs text-red-400 font-medium tracking-wide uppercase">@{{ contact.username }}</p>
        </div>
      </div>

      <div class="space-y-3 mb-8">
        <div class="flex items-center gap-3 text-slate-600">
          <Mail :size="16" class="text-blue-500" />
          <span class="text-sm truncate">{{ contact.email }}</span>
        </div>
        <div class="flex items-center gap-3 text-slate-600">
          <Phone :size="16" class="text-blue-500" />
          <span class="text-sm">{{ contact.phone }}</span>
        </div>
        <div class="flex items-center gap-3 text-slate-600">
          <MapPin :size="16" class="text-blue-500" />
          <span class="text-sm">{{ contact.address?.city }}</span>
        </div>
      </div>

      <div class="flex items-center justify-between pt-4 border-t border-slate-50">
        <div class="flex gap-1">
          <RouterLink 
            :to="`/contact/${contact.id}`" 
            class="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
            title="Lihat Detail"
          >
            <Eye :size="20" />
          </RouterLink>
          <RouterLink 
            :to="`/edit/${contact.id}`" 
            class="p-2.5 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-xl transition-all"
            title="Edit"
          >
            <Pencil :size="20" />
          </RouterLink>
        </div>

        <button 
          @click="store.openDeleteModal(contact)"
          class="p-2 text-slate-400 hover:text-red-600 transition-colors"
        >
          <Trash2 :size="20" />
        </button>
      </div>
    </div>
  </div>

  <div v-if="store.paginatedContacts.length === 0" class="text-center py-20">
    <div class="bg-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
      <Trash2 :size="40" />
    </div>
    <h3 class="text-slate-900 font-bold text-xl">Tidak ada kontak</h3>
    <p class="text-slate-500">Silakan tambahkan kontak baru.</p>
  </div>

  <ContactDeleteModal />
</template>