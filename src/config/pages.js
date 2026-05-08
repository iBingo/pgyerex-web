export const pageGroups = [
  {
    title: '法务',
    icon: 'RootListIcon',
    children: [
      {
        name: 'privacy-list',
        path: '/legal/privacy-policies',
        title: '隐私政策列表',
        description: '按项目统一查看隐私政策文档、状态与更新时间。',
        icon: 'SecuredIcon'
      },
      {
        name: 'agreement-list',
        path: '/legal/user-agreements',
        title: '用户协议列表',
        description: '按项目统一查看用户协议文档、状态与更新时间。',
        icon: 'FileIcon'
      },
      {
        name: 'config',
        path: '/legal/config',
        title: '配置',
        description: '管理生成文档时使用的本地配置。',
        icon: 'Setting1Icon'
      },
      {
        name: 'privacy',
        path: '/legal/privacy/new',
        title: '新建隐私政策',
        description: '填写应用和第三方 SDK 信息，实时生成可复制、可下载的隐私政策文本。',
        icon: 'ViewListIcon'
      },
      {
        name: 'agreement',
        path: '/legal/agreement/new',
        title: '新建用户协议',
        description: '填写应用和服务信息，实时生成参考通用法律声明结构的用户协议文本。',
        icon: 'FileIcon'
      }
    ]
  },
  {
    title: '国际化',
    icon: 'TranslateIcon',
    children: [
      {
        name: 'i18n-overview',
        path: '/legal/i18n/overview',
        title: '概览',
        description: '查看国际化语言覆盖、待处理任务和最近发布情况。',
        icon: 'RootListIcon'
      },
      {
        name: 'i18n-copy-list',
        path: '/legal/i18n/copies',
        title: '国际化文案',
        description: '集中查看多语言文案条目、状态与最近更新时间。',
        icon: 'ViewListIcon'
      },
      {
        name: 'i18n-import',
        path: '/legal/i18n/import',
        title: '导入',
        description: '导入国际化词条文件并校验缺失项、冲突项和语言覆盖率。',
        icon: 'FileIcon'
      },
      {
        name: 'i18n-task',
        path: '/legal/i18n/tasks',
        title: '任务',
        description: '查看导入、校验、发布和导出任务的执行状态与结果。',
        icon: 'Setting1Icon'
      },
      {
        name: 'i18n-download',
        path: '/legal/i18n/download',
        title: '下载',
        description: '按语言、环境和版本导出国际化资源包。',
        icon: 'Setting1Icon'
      }
    ]
  }
]

export const pages = pageGroups.reduce((acc, group) => {
  group.children.forEach((page) => {
    acc[page.name] = page
  })
  return acc
}, {})

pages.projects = {
  name: 'projects',
  path: '/legal/projects',
  title: '项目列表',
  description: '统一查看、搜索和切换当前可访问的项目。',
  icon: 'ViewListIcon'
}

pages['i18n-task-create'] = {
  name: 'i18n-task-create',
  path: '/legal/i18n/tasks/new',
  title: '新建任务',
  description: '配置翻译源、语种与文案筛选条件后创建国际化任务。',
  icon: 'Setting1Icon'
}
