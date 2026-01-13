import { createRouter, createWebHistory } from 'vue-router';
import ContactIndex from '../views/ContactIndex.vue';
import ContactDetail from '../views/ContactDetail.vue'

const routes = [
    { path: '/', component: ContactIndex},
    { path: '/contact/:id', component: ContactDetail, props: true},
    { path: '/add',component: () => import('../views/AddContact.vue')},
    {path: '/edit/:id', component: () => import('../views/EditContact.vue'), props: true}
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
});