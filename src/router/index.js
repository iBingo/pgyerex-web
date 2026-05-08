import { createRouter, createWebHashHistory } from 'vue-router'
import AppLayout from '../layouts/AppLayout.vue'
import { pages } from '../config/pages'

const routes = [
  {
    path: '/',
    component: AppLayout,
    redirect: { name: 'projects' },
    children: [
      {
        path: 'legal/projects',
        name: 'projects',
        component: () => import('../pages/ProjectListPage.vue'),
        meta: pages.projects
      },
      {
        path: 'legal/privacy-policies',
        name: 'privacy-list',
        component: () => import('../pages/PrivacyListPage.vue'),
        meta: pages['privacy-list']
      },
      {
        path: 'legal/user-agreements',
        name: 'agreement-list',
        component: () => import('../pages/AgreementListPage.vue'),
        meta: pages['agreement-list']
      },
      {
        path: 'legal/privacy/new',
        name: 'privacy',
        component: () => import('../pages/PrivacyPage.vue'),
        meta: pages.privacy
      },
      {
        path: 'legal/agreement/new',
        name: 'agreement',
        component: () => import('../pages/AgreementPage.vue'),
        meta: pages.agreement
      },
      {
        path: 'legal/config',
        name: 'config',
        component: () => import('../pages/ConfigPage.vue'),
        meta: pages.config
      },
      {
        path: 'legal/i18n/overview',
        name: 'i18n-overview',
        component: () => import('../pages/I18nOverviewPage.vue'),
        meta: pages['i18n-overview']
      },
      {
        path: 'legal/i18n/copies',
        name: 'i18n-copy-list',
        component: () => import('../pages/I18nCopyListPage.vue'),
        meta: pages['i18n-copy-list']
      },
      {
        path: 'legal/i18n/import',
        name: 'i18n-import',
        component: () => import('../pages/I18nImportPage.vue'),
        meta: pages['i18n-import']
      },
      {
        path: 'legal/i18n/tasks',
        name: 'i18n-task',
        component: () => import('../pages/I18nTaskPage.vue'),
        meta: pages['i18n-task']
      },
      {
        path: 'legal/i18n/tasks/new',
        name: 'i18n-task-create',
        component: () => import('../pages/I18nTaskCreatePage.vue'),
        meta: pages['i18n-task-create']
      },
      {
        path: 'legal/i18n/download',
        name: 'i18n-download',
        component: () => import('../pages/I18nDownloadPage.vue'),
        meta: pages['i18n-download']
      },
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/legal/projects'
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
