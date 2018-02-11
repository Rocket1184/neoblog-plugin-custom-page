# neoblog-plugin-custom-page

Add custom page route to NeoBlog.

## Usage

see [config.js](./config.js).

## Plugin options

```ts
new PluginCustomPage(options: IPluginOptions);

interface IPluginOptions {
    file: string,
    type?: PluginCustomPage.ARTICLE | PluginCustomPage.RAW,
    route: string
}
```

### file

The file to renderer. Can be absolute or realtive path.

### type

(Optional) How to renderer the file.

- `PluginCustomPage.ARTICLE`: (default) renderer this file as article.

- `PluginCustomPage.RAW`: renderer this file as article.

### route

Route for that file. It will be used in

```js
const router = new KoaRouter();

router.get(option.route, async ctx => {
    // ...
});
```
