const PluginCustomPage = require('.');

module.exports = {
    title: 'PluginCustomPage',
    articleDir: 'node_modules/@neoblog/neoblog/example/article',
    plugins: [
        new PluginCustomPage({
            route: '/intro',
            file: 'node_modules/@neoblog/neoblog/example/article/mastering-markdown.md'
        }),
        new PluginCustomPage({
            route: '/raw-intro',
            type: PluginCustomPage.RAW,
            file: 'node_modules/@neoblog/neoblog/example/article/mastering-markdown.md'
        })
    ],
    // arguments passed to template. can be anything but null.
    templateArgs: {
        indexHeading: 'NeoBlog\'s Custom Page Plugin',
        side: {
            title: 'PluginCustomPage',
            items: [
                [
                    { name: 'Index', link: '/' },
                    { name: 'Intro', link: '/intro' },
                    { name: 'Raw Intro', link: '/raw-intro' }
                ],
                [
                    { text: `OS: ${process.platform} ${process.arch}` },
                    { text: `Node: ${process.version}` }
                ]
            ]
        }
    }
};
