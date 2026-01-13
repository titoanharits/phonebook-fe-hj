<script setup lang="ts">
import { ref } from 'vue'; 
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import { User, Mail, Phone, MapPin, Save, HelpCircle} from 'lucide-vue-next';

// Definisi Props
interface FormProps {
  initialValues?: {
    username: string;
    name: string;
    email: string;
    phone: string;
    city: string;
  };
  submitLabel: string;
  loading?: boolean;
}

const props = defineProps<FormProps>();
const emit = defineEmits(['submit']);

// State Modal Confirm
const isConfirmOpen = ref(false);
const pendingValues = ref<any>(null);

// Skema Validasi
const schema = yup.object({
  username: yup.string().required('Username wajib diisi'),
  name: yup.string().required('Nama wajib diisi'),
  email: yup.string().email('Email tidak valid').required('Email wajib diisi'),
  phone: yup.string().required('Telepon wajib diisi').matches(/^[0-9]+$/, 'Nomor telepon hanya boleh berisi angka').min(6, 'Minimal 6 digit').max(13, 'Maksimal 13 digit'),
  city: yup.string().required('Kota wajib dipilih'),
});

// Setup Form dengan initialValues
const { handleSubmit, errors } = useForm({
  validationSchema: schema,
  initialValues: props.initialValues // untuk Edit
});

const { value: username } = useField('username');
const { value: name } = useField('name');
const { value: email } = useField('email');
const { value: phone } = useField('phone');
const { value: city } = useField('city');

const cities = ['Kota Surabaya', 'Kota Malang', 'Kab. Jember', 'Kota Blitar', 'Kab. Pacitan', 'Kota Probolinggo'];

const onFormSubmit = handleSubmit((values) => {
  pendingValues.value = values;
  isConfirmOpen.value = true;
});

const handleConfirm = () => {
  emit('submit', pendingValues.value);
  isConfirmOpen.value = false;
};
</script>

<template>
  <div class="relative">
    <form @submit="onFormSubmit" class="space-y-8 bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/40">
      
      <div class="space-y-6">
        <div class="group">
          <label class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2 mb-2 block">Identitas Unik</label>
          <div class="relative">
            <User class="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" :size="18" />
            <input v-model="username" type="text" placeholder="username" class="w-full pl-14 pr-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-semibold text-slate-700" />
          </div>
          <span v-if="errors.username" class="text-red-500 text-[11px] font-bold mt-2 ml-2 block italic">! {{ errors.username }}</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="group">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2 mb-2 block">Nama Lengkap</label>
            <input v-model="name" type="text" placeholder="Contoh: Budi Utomo" class="w-full px-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-semibold" />
            <span v-if="errors.name" class="text-red-500 text-[11px] font-bold mt-2 ml-2 block italic">! {{ errors.name }}</span>
          </div>
          <div class="group">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2 mb-2 block">Alamat Email</label>
            <div class="relative">
              <Mail class="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" :size="18" />
              <input v-model="email" type="email" placeholder="budi@mail.com" class="w-full pl-14 pr-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-semibold" />
            </div>
            <span v-if="errors.email" class="text-red-500 text-[11px] font-bold mt-2 ml-2 block italic">! {{ errors.email }}</span>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="group">
          <label class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2 mb-2 block">Nomor Telepon</label>
          <div class="relative">
            <Phone class="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" :size="18" />
            <input v-model="phone" type="text" placeholder="0812..." class="w-full pl-14 pr-6 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-semibold" />
          </div>
          <span v-if="errors.phone" class="text-red-500 text-[11px] font-bold mt-2 ml-2 block italic">! {{ errors.phone }}</span>
        </div>
        <div class="group">
          <label class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2 mb-2 block">Domisili</label>
          <div class="relative">
            <MapPin class="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" :size="18" />
            <select v-model="city" class="w-full pl-14 pr-10 py-4 bg-slate-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all font-semibold appearance-none">
              <option value="" disabled>Pilih Kota</option>
              <option v-for="c in cities" :key="c" :value="c">{{ c }}</option>
            </select>
          </div>
          <span v-if="errors.city" class="text-red-500 text-[11px] font-bold mt-2 ml-2 block italic">! {{ errors.city }}</span>
        </div>
      </div>

      <button type="submit" :disabled="loading" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-blue-500/25 active:scale-[0.98] disabled:bg-slate-200 flex items-center justify-center gap-3 tracking-widest">
        <Save v-if="!loading" :size="20" />
        {{ loading ? 'SINKRONISASI...' : submitLabel.toUpperCase() }}
      </button>
    </form>

    <div v-if="isConfirmOpen" class="fixed inset-0 z-999 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md">
      <div class="bg-white p-10 rounded-[2.5rem] max-w-sm w-full shadow-2xl border border-slate-100 animate-in zoom-in duration-300">
        <div class="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mb-8 mx-auto rotate-3 group hover:rotate-0 transition-transform">
          <HelpCircle :size="40" stroke-width="2.5" />
        </div>
        
        <h3 class="text-2xl font-black text-slate-900 text-center mb-3">Konfirmasi</h3>
        <p class="text-slate-500 text-center mb-10 text-sm font-medium leading-relaxed">
          Apakah data yang Anda masukkan sudah benar? Perubahan akan disimpan secara permanen.
        </p>
        
        <div class="grid grid-cols-2 gap-4">
          <button @click="isConfirmOpen = false" class="py-4 bg-slate-50 text-slate-500 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-colors">
            Batal
          </button>
          <button @click="handleConfirm" class="py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all active:scale-95">
            Ya, Simpan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>