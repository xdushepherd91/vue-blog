module.exports = {
    base: '/vue-blog/',
    title: '王千一的个人博客',
    description: 'Just playing around',
    // Public 文件路径
    logo: 'https://vuejs.org/images/logo.png',
    head: [
        ['link', {rel: 'icon', href: '/vue-blog/logo.png'}]
    ],
    plugins: ['@vuepress/plugin-search'],
    themeConfig: {
        navbar: [
            // NavbarItem
            {
                text: '思考沉淀',
                link: '/',
            },
            {
                text: '项目管理',
                link: '/project-management',
            },
            {
                text: '架构',
                link: '/project-management',
            },
            {
                text: '沟通',
                link: '/project-management',
            },
            {
                text: '优质资源备份',
                link: '/excellent-resources',
            },
            {
                text: '生产力工具',
                children: [
                    {
                        text: '生产力工具介绍',
                        link: '/productive-tools'
                    },
                    {
                        text: 'idea快捷键',
                        link: '/productive-tools/idea-guide'
                    }
                ],
            },
        ],
    },
}