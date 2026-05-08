<template>
  <t-layout class="starter-shell">
    <t-header class="starter-header">
      <div class="topbar-left">
        <div class="starter-logo">
          <span class="logo-mark">P</span>
          <span>Privacy Gen</span>
        </div>
        <t-button class="topbar-icon-button" variant="text" shape="square" title="折叠菜单">
          <menu-icon />
        </t-button>
        <div class="topbar-search">
          <search-icon />
          <input type="search" placeholder="请输入搜索内容" />
        </div>
      </div>

      <div class="topbar-actions">
        <t-popup
          v-model="notificationPopupVisible"
          trigger="click"
          placement="bottom-right"
          overlay-inner-class-name="notification-popup"
          :overlay-inner-style="{ padding: 0 }"
        >
          <t-badge :count="notificationCount">
            <t-button class="topbar-icon-button" variant="text" shape="square" title="通知中心">
              <mail-icon />
            </t-button>
          </t-badge>
          <template #content>
            <div class="notification-panel">
              <div class="notification-panel-header">
                <h3>通知中心</h3>
                <button
                  class="notification-clear"
                  type="button"
                  @click="handleClearNotifications"
                >
                  清空
                </button>
              </div>

              <div v-if="notifications.length" class="notification-list">
                <button
                  v-for="notification in notifications"
                  :key="notification.value"
                  class="notification-item"
                  type="button"
                >
                  <p class="notification-item-title">{{ notification.title }}</p>
                  <div class="notification-item-meta">
                    <span class="notification-item-category">{{ notification.category }}</span>
                    <span class="notification-item-time">{{ notification.time }}</span>
                  </div>
                </button>
              </div>

              <div v-else class="notification-empty">暂无通知</div>

              <button class="notification-more" type="button" @click="handleViewAllNotifications">
                查看全部
              </button>
            </div>
          </template>
        </t-popup>

        <t-button class="topbar-icon-button" variant="text" shape="square" title="代码仓库">
          <logo-github-icon />
        </t-button>

        <t-button class="topbar-icon-button" variant="text" shape="square" title="帮助">
          <help-circle-icon />
        </t-button>

        <t-dropdown
          :options="localeOptions"
          trigger="click"
          placement="bottom-right"
          @click="handleLocaleChange"
        >
          <t-button class="topbar-icon-button" variant="text" shape="square" title="国际化切换">
            <translate-icon />
          </t-button>
        </t-dropdown>

        <t-popup
          v-model="projectPopupVisible"
          trigger="click"
          placement="bottom-right"
          overlay-inner-class-name="project-popup"
          :overlay-inner-style="{ padding: 0 }"
        >
          <button class="topbar-project" type="button">
            <folder-open-icon />
            <span>{{ selectedProject.name }}</span>
            <chevron-down-icon />
          </button>
          <template #content>
            <div class="project-panel">
              <div class="project-panel-scroll">
                <section
                  v-for="group in projectGroups"
                  :key="group.title"
                  class="project-group"
                >
                  <p class="project-group-title">{{ group.title }}</p>
                  <div class="project-grid">
                    <button
                      v-for="project in group.children"
                      :key="project.value"
                      class="project-option"
                      :class="{ 'is-active': project.value === selectedProjectValue }"
                      type="button"
                      @click="handleProjectChange(project)"
                    >
                      <span class="project-option-icon">{{ project.shortName }}</span>
                      <span class="project-option-main">
                        <span class="project-option-name">
                          <span>{{ project.name }}</span>
                          <span class="project-option-tag">{{ project.status }}</span>
                        </span>
                        <span class="project-option-desc">{{ project.description }}</span>
                      </span>
                    </button>
                  </div>
                </section>
              </div>
              <button class="project-more" type="button" @click="handleViewMoreProjects">查看更多</button>
            </div>
          </template>
        </t-popup>

        <t-dropdown
          :options="userOptions"
          trigger="click"
          placement="bottom-right"
        >
          <button class="topbar-user" type="button">
            <user-circle-icon />
            <span>法务管理员</span>
            <chevron-down-icon />
          </button>
        </t-dropdown>
      </div>
    </t-header>

    <t-layout class="starter-body">
      <t-aside v-if="showProjectMenu" class="starter-aside">
        <t-menu
          :value="activeMenu"
          :expanded="expandedMenus"
          theme="light"
          class="nav-menu"
          @change="handleMenuChange"
          @expand="handleExpand"
        >
          <t-submenu
            v-for="group in pageGroups"
            :key="group.title"
            :value="group.title"
          >
            <template #icon>
              <component :is="resolveIcon(group.icon)" />
            </template>
            <template #title>
              {{ group.title }}
            </template>
            <t-menu-item
              v-for="page in group.children"
              :key="page.name"
              :value="page.name"
            >
              <template #icon>
                <component :is="resolveIcon(page.icon)" />
              </template>
              {{ page.title }}
            </t-menu-item>
          </t-submenu>
        </t-menu>
      </t-aside>

      <t-layout class="starter-main-layout">
        <div v-if="showPageHeading" class="page-heading">
          <p class="eyebrow">{{ currentGroupTitle }}</p>
          <h2>{{ pageTitle }}</h2>
          <p>{{ pageDescription }}</p>
        </div>
        <t-content class="starter-main-content">
          <router-view />
        </t-content>
      </t-layout>
    </t-layout>
  </t-layout>
</template>

<script setup>
import { computed, h, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  ChevronDownIcon,
  FileIcon,
  FolderOpenIcon,
  HelpCircleIcon,
  LogoGithubIcon,
  MailIcon,
  MenuIcon,
  LogoutIcon,
  RootListIcon,
  SearchIcon,
  SecuredIcon,
  Setting1Icon,
  TranslateIcon,
  UserCircleIcon,
  ViewListIcon
} from 'tdesign-icons-vue-next'
import {
  Aside as TAside,
  Badge as TBadge,
  Button as TButton,
  Content as TContent,
  Dropdown as TDropdown,
  Header as THeader,
  Layout as TLayout,
  Menu as TMenu,
  MenuItem as TMenuItem,
  Popup as TPopup,
  Submenu as TSubmenu
} from 'tdesign-vue-next'
import { pageGroups, pages } from '../config/pages'
import {
  defaultProjectRouteName,
  defaultProjectValue,
  existingProjects,
  PROJECT_STORAGE_KEY,
  projectGroups
} from '../config/projects'

const route = useRoute()
const router = useRouter()
const expandedMenus = ref(pageGroups.map((group) => group.title))
const selectedProjectValue = ref(localStorage.getItem(PROJECT_STORAGE_KEY) || defaultProjectValue)
const selectedLocaleValue = ref('zh-CN')
const projectPopupVisible = ref(false)
const notificationPopupVisible = ref(false)

const locales = [
  { value: 'zh-CN', label: '简体中文' },
  { value: 'en-US', label: 'English' }
]

const notifications = ref([
  {
    value: 'notice-privacy',
    title: '腾讯大厦一楼改造施工项目 已通过审核！',
    category: '合同动态',
    time: '2021-01-01 08:00'
  },
  {
    value: 'notice-config',
    title: '三季度生产原材料采购项目 开票成功！',
    category: '票务动态',
    time: '2021-01-01 08:00'
  },
  {
    value: 'notice-export',
    title: '2021-01-01 10:00的【国家电网线下签约】会议即将开始，请提前10分钟前往 会议室1 进行签到！',
    category: '会议通知',
    time: '2021-01-01 08:00'
  },
  {
    value: 'notice-agreement',
    title: '一季度生产原材料采购项目 开票成功！',
    category: '票务动态',
    time: '2021-01-01 08:00'
  }
])

const iconMap = {
  FileIcon,
  RootListIcon,
  SecuredIcon,
  Setting1Icon,
  TranslateIcon,
  ViewListIcon
}

const activeMenu = computed(() => route.name || 'home')
const pageMeta = computed(() => pages[route.name] || pages[defaultProjectRouteName] || pages.projects)
const pageTitle = computed(() => pageMeta.value.title)
const pageDescription = computed(() => pageMeta.value.description)
const showProjectMenu = computed(() => route.name !== 'projects')
const showPageHeading = computed(() => !['projects', 'i18n-task-create'].includes(route.name))
const selectedProject = computed(() => {
  return existingProjects.find((project) => project.value === selectedProjectValue.value) || existingProjects[0]
})
const localeOptions = computed(() => {
  return locales.map((locale) => ({
    value: locale.value,
    content: locale.label,
    active: locale.value === selectedLocaleValue.value
  }))
})
const notificationCount = computed(() => notifications.value.length)
const userOptions = computed(() => [
  {
    value: 'profile',
    content: '个人中心',
    prefixIcon: () => h(UserCircleIcon)
  },
  {
    value: 'settings',
    content: '账号设置',
    prefixIcon: () => h(Setting1Icon)
  },
  {
    value: 'help',
    content: '帮助文档',
    prefixIcon: () => h(HelpCircleIcon),
    divider: true
  },
  {
    value: 'logout',
    content: '退出登录',
    prefixIcon: () => h(LogoutIcon)
  }
])
const currentGroupTitle = computed(() => {
  const group = pageGroups.find((item) => item.children.some((page) => page.name === route.name))
  return group?.title || pageGroups[0]?.title || selectedProject.value?.name || ''
})

const resolveIcon = (iconName) => iconMap[iconName] || ViewListIcon

const handleMenuChange = (name) => {
  router.push({ name })
}

const handleExpand = (values) => {
  expandedMenus.value = values
}

watch(
  () => route.fullPath,
  () => {
    selectedProjectValue.value = localStorage.getItem(PROJECT_STORAGE_KEY) || defaultProjectValue
  }
)

const handleProjectChange = (data) => {
  selectedProjectValue.value = data.value
  localStorage.setItem(PROJECT_STORAGE_KEY, data.value)
  projectPopupVisible.value = false
}

const handleLocaleChange = (data) => {
  selectedLocaleValue.value = data.value
}

const handleViewMoreProjects = () => {
  projectPopupVisible.value = false
  router.push({ name: 'projects', query: { redirect: route.fullPath } })
}

const handleClearNotifications = () => {
  notifications.value = []
}

const handleViewAllNotifications = () => {
  notificationPopupVisible.value = false
}
</script>
