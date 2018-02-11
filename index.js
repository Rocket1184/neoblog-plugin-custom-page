'use strict';

const fs = require('fs');
const path = require('path');
const util = require('util');

const readFile = util.promisify(fs.readFile);

const Router = require('koa-router');

class PluginCustomPage {
    static get meta() {
        return {
            name: 'neoblog-plugin-custom-page',
            version: '0.1.0',
            description: 'add custom page under specific route.',
            author: 'rocka <i@rocka.me>',
        };
    }

    static get ARTICLE() { return 1; }
    static get RAW() { return 2; }

    constructor(options) {
        if (typeof options.route !== 'string') throw new Error('route must string.');
        this.route = options.route;
        this.type = options.type || PluginCustomPage.ARTICLE;
        if (typeof options.file !== 'string') throw new Error('file must string.');
        this.file = options.file;
        try {
            this.content = '';
        } catch (err) {
            throw new Error(`Error when reading file ${this.file}:\n${err.message}`);
        }
        this.router = new Router();
        this.router.get(this.route, async ctx => {
            ctx.body = this.content;
        });
        Object.assign(this, PluginCustomPage.meta, {
            routes: this.router.routes()
        });
    }

    async install(server) {
        const pathObj = path.parse(this.file);
        const file = {
            path: path.isAbsolute(this.file) ? this.file : path.join(process.cwd(), this.file),
            base: pathObj.name,
            ext: pathObj.ext.slice(1)
        };
        switch (this.type) {
            case PluginCustomPage.ARTICLE:
                this.content = server.page.render('article.pug', {
                    ...server.config.templateArgs,
                    article: await server.parser.parse(file)
                });
                break;
            case PluginCustomPage.RAW:
                this.content = (await readFile(file.path)).toString();
                break;
            default:
                throw new Error(`unexpected type: ${this.type}.\nshould be PluginCustomPage.ARTICLE/RAW`)    
        }
    }
}

module.exports = PluginCustomPage;
