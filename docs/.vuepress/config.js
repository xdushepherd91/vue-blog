module.exports = {
    base: '/vue-blog/',
    title: 'xdushepherd91',
    description: '工作学习生活沉淀',
    // Public 文件路径
    logo: 'https://vuejs.org/images/logo.png',
    head: [
        ['link', {rel: 'icon', href: '/vue-blog/logo.png'}]
    ],
    plugins: ['@vuepress/plugin-search'],
    extendsMarkdown: md => {
        md.use(require('markdown-it-plantuml'));
        md.set({ breaks: true })
    },
    themeConfig: {
        navbar: [
            // NavbarItem
            {
                text: '沉淀',
                link: '/knowledge-accumulate',
            },
            {
                text: '读书笔记',
                link: '/reading',
            },
            {
                text: '项目管理',
                link: '/knowledge-accumulate/project-management',
            },
            {
                text: '架构',
                link: '/knowledge-accumulate/architect',
            },            {
                text: 'Java',
                link: '/knowledge-accumulate/java',
            },
            {
                text: '沟通',
                link: '/knowledge-accumulate/communication',
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
                        link: '/productive-tools/idea'
                    },
                    {
                        text: 'live template',
                        link: '/productive-tools/idea/live-template'
                    }
                ],
            },
        ],
    },
};