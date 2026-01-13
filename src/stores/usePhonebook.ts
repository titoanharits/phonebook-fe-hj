import {defineStore} from 'pinia';
import axios from 'axios';
import { toast } from 'vue3-toastify';
import type { Router } from 'vue-router';
import type { User } from '../types';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export const usePhonebookStore = defineStore('phonebook', {
    state: () => ({
        contacts: [] as User[],
        loading: false,
        currentPage: 1,
        itemsPerPage: 3,
        selectedContact: null as User | null,
        isDeleteModalOpen: false
    }),
    //State Lokal
    getters: {
        totalItems: (state) => state.contacts.length,

        totalPages(): number{
            return Math.ceil(this.totalItems / this.itemsPerPage)
        },

        paginatedContacts: (state) => {
            const start = (state.currentPage - 1) * state.itemsPerPage;
            const end = start + state.itemsPerPage;
            return state.contacts.slice(start, end);
        },

        availableCities: (state) => {
            // Mengambil property address.city
            const cities = state.contacts
                .map(u => u.address?.city)
                .filter((city): city is string => !!city);
            
            return [...new Set(cities)].sort();
        }
    },
    actions: {
        //Fetch Data
        async fetchContacts() {
            if (this.contacts.length > 0) return;
            this.loading = true;
            try {
                const { data } = await axios.get<User[]>(API_URL);
                 this.contacts = data;
            } finally {
                this.loading = false;
            }
        },
        //Tambah Contact
        async addContact(contact: Omit<User, 'id'>, router: Router) {
            this.loading = true;
            try {
                const { data } = await axios.post<User>(API_URL, contact);
                const newUser: User = { ...data, id: Date.now() }; 
                this.contacts.unshift(newUser);
                await router.push('/');
                toast.success('Kontak berhasil ditambahkan!');
                return true;
            } catch (error) {
                toast.error('Gagal menambah kontak');
                return false;
            } finally {
                this.loading = false;
            }
        },
        openDeleteModal(user: User) {
            this.selectedContact = user;
            this.isDeleteModalOpen = true;
        },

        closeDeleteModal() {
            this.isDeleteModalOpen = false;
            // Jangan langsung null-kan selectedContact agar transisi keluar modal tidak 'flicker'
            setTimeout(() => { if(!this.isDeleteModalOpen) this.selectedContact = null }, 300);
        },

        async deleteContact() {
            if (!this.selectedContact) return;
            
            this.loading = true;
            const id = this.selectedContact.id;
            
            try {
                await axios.delete(`${API_URL}/${id}`);
                this.contacts = this.contacts.filter(u => u.id !== id);
                
                toast.success('Kontak telah dihapus');
                this.closeDeleteModal(); // Tutup modal setelah berhasil
            } catch (error) {
                toast.error('Gagal menghapus kontak');
            } finally {
                this.loading = false;
            }
        },
        async updateContact(id: number, payload: Omit<User, 'id'>, router: Router) {
            this.loading = true;
            try {
                await axios.put(`${API_URL}/${id}`, payload);
                
                // Update data di state lokal agar UI berubah
                const index = this.contacts.findIndex(u => u.id === id);
                if (index !== -1) {
                    this.contacts[index] = { ...payload, id };
                }
                await router.push('/');
                toast.success('Kontak berhasil diperbarui!');
                return true;
            } catch (error) {
                toast.error('Gagal memperbarui kontak');
            return false;
            } finally {
                this.loading = false;
            }
        },
        async fetchContactById(id: string | number) {
            this.loading = true;
            try {
                //Cek state lokal
                const localContact = this.contacts.find(u => u.id === Number(id));

                if (localContact) {
                    this.selectedContact = { ...localContact };
                } else {
                    const { data } = await axios.get<User>(`${API_URL}/${id}`);
                    this.selectedContact = data;
                }
            } catch (error) {
                console.error("Detail tidak ditemukan di server/local", error);
                toast.error('Kontak tidak ditemukan');
                this.selectedContact = null;
            } finally {
                this.loading = false;
            }
        },
        clearSelectedContact() {
            this.selectedContact = null;
        },
        setPage(page: number) {
            this.currentPage = page;
        }
    }
})