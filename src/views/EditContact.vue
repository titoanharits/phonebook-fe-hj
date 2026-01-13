<script setup lang="ts">
import { computed } from 'vue';
import ContactForm from '../components/ContactForm.vue';
import { usePhonebookStore } from '../stores/usePhonebook';
import { useRouter } from 'vue-router';

const props = defineProps<{ id: string }>();
const store = usePhonebookStore();
const router = useRouter();

// Ambil data user lama dan ubah ke format flat untuk form
const initialValues = computed(() => {
  const user = store.contacts.find(u => u.id === Number(props.id));
  if (!user) return undefined;
  
  return {
    username: user.username,
    name: user.name,
    email: user.email,
    phone: user.phone,
    city: user.address?.city || ''
  };
});

const handleUpdate = async (values: any) => {
  const payload = {
    ...values,
    address: { city: values.city }
  };
  await store.updateContact(Number(props.id), payload, router);
}
</script>

<template>
  <div class="max-w-2xl mx-auto">
    <h1 class="text-3xl font-black mb-8">Edit Contact</h1>
    <ContactForm 
      v-if="initialValues"
      submitLabel="Update User" 
      :initialValues="initialValues"
      :loading="store.loading" 
      @submit="handleUpdate" 
    />
  </div>
</template>