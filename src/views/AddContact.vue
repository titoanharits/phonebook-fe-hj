<script setup lang="ts">
import ContactForm from '../components/ContactForm.vue';
import { usePhonebookStore } from '../stores/usePhonebook';
import { useRouter } from 'vue-router';

const store = usePhonebookStore();
const router = useRouter();

const handleAdd = async (values: any) => {
  const payload = {
    ...values,
    address: { city: values.city }
  };

  await store.addContact(payload, router);
};
</script>

<template>
  <div class="max-w-2xl mx-auto">
    <h1 class="text-3xl font-black mb-8">New Contact</h1>
    <ContactForm submitLabel="Create User" :loading="store.loading" @submit="handleAdd" />
  </div>
</template>