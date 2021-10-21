rehype-video
===

[![Downloads](https://img.shields.io/npm/dm/rehype-video.svg?style=flat)](https://www.npmjs.com/package/rehype-video)
[![NPM version](https://img.shields.io/npm/v/rehype-video.svg?style=flat)](https://npmjs.org/package/rehype-video)
[![Build](https://github.com/jaywcjlove/rehype-video/actions/workflows/ci.yml/badge.svg)](https://github.com/jaywcjlove/rehype-video/actions/workflows/ci.yml)
[![Coverage Status](https://jaywcjlove.github.io/rehype-video/badges.svg)](https://jaywcjlove.github.io/rehype-video/lcov-report/)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/rehype-video)](https://bundlephobia.com/result?p=rehype-video)

Markdown supports video play with `.mp4` and `.mov` URLs. like [`github video`](https://github.blog/2021-05-13-video-uploads-available-github/) features.

## Installation

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c): Node 12+ is needed to use it and it must be import instead of require.

```bash
npm install rehype-video
```

## Usage

```js
import { unified } from 'unified';
import remark2rehype from 'remark-rehype';
import remarkParse from 'remark-parse';
import rehypeVideo from 'rehype-video';
import stringify from 'rehype-stringify';

const string = `
https://files.github.com/001.mp4 hi!

https://files.github.com/002.mp4

Good \`idea\`!!`;

const htmlStr = unified()
  .use(remarkParse)
  .use(remark2rehype, { allowDangerousHtml: true })
  .use(rehypeVideo)
  .use(stringify)
  .processSync(string)
  .toString();
```

Output:

```html
<p>https://files.github.com/001.mp4 hi!</p>
<video src="https://files.github.com/002.mp4"></video>
<p>Good <code>idea</code>!!</p>
```

### Example 1

```js
import { rehype } from 'rehype';
import rehypeVideo from 'rehype-video';

const mrkStr = `<p>https://github.com/004.mp4</p>`;
const htmlStr = rehype()
  .data('settings', { fragment: true })
  .use(rehypeVideo, { details: false })
  .processSync(mrkStr)
  .toString();
```

Output:

```html
<video muted controls style="max-height:640px;" src="https://github.com/004.mp4"></video>
```

### Example 2

```js
import { rehype } from 'rehype';
import rehypeVideo from 'rehype-video';

const mrkStr = `<p><a href="https://github.com/004.mp4">https://github.com/004.mp4</a></p`;
const htmlStr = rehype()
  .data('settings', { fragment: true })
  .use(rehypeVideo, { details: false })
  .processSync(mrkStr)
  .toString();
```

Output:

```html
<video muted controls style="max-height:640px;" src="https://github.com/004.mp4"></video>
```

## Options

```ts
export declare type RehypeVideoOptions = {
  /**
   * URL suffix verification.
   * @default /(.mp4|.mov)$/
   */
  test?: RegExp;
  /**
   * Support `<details>` tag.
   * @default true
   */
  details?: boolean;
};
```

## Related

- [`rehype-attr`](https://github.com/jaywcjlove/rehype-attr) New syntax to add attributes to Markdown.
- [`rehype-rewrite`](https://github.com/jaywcjlove/rehype-rewrite) Rewrite element with rehype.
- [`rehypejs`](https://github.com/rehypejs/rehype) HTML processor powered by plugins part of the @unifiedjs collective
- [`remark-parse`](https://www.npmjs.com/package/remark-parse) remark plugin to parse Markdown
- [`remark-rehype`](https://www.npmjs.com/package/remark-rehype) remark plugin to transform to rehype
- [`rehype-raw`](https://www.npmjs.com/package/rehype-raw) rehype plugin to reparse the tree (and raw nodes)
- [`rehype-stringify`](https://www.npmjs.com/package/rehype-stringify) rehype plugin to serialize HTML

## License

MIT © [Kenny Wong](https://github.com/jaywcjlove)