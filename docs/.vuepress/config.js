module.exports = {
    title: '王千一的个人博客',
    description: 'Just playing around',
    // Public 文件路径
    logo: 'https://vuejs.org/images/logo.png',
    head: [
        ['link', { rel: 'icon', href: '/logo.png' }]
    ],
    plugins: ['@vuepress/plugin-search'],
    themeConfig: {
        navbar: [
            // NavbarItem
            {
                text: '概述',
                link: '/',
            },
            // NavbarGroup
            {
                text: 'Group',
                children: ['/group/foo.md', '/group/bar.md'],
            },
            // 字符串 - 页面文件路径
            '/bar/README.md',
        ],
    },
}