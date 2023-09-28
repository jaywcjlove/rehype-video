import type { Plugin } from 'unified';
import type { Root, Element } from 'hast';
import { visit } from 'unist-util-visit';
import { detailsNode } from './detailsNode.js';

export type RehypeVideoOptions = {
  /**
   * URL suffix verification.
   * @default /\/(.*)(.mp4|.mov)$/
   */
  test?: RegExp;
  /**
   * Support `<details>` tag to wrap <video>.
   * @default true
   */
  details?: boolean;
}

const properties = { muted: 'muted', controls: 'controls', style: 'max-height:640px;' };
const queryStringToObject = (url: string) =>
  [...new URLSearchParams(url.split('?!#')[1])].reduce(
    (a: Record<string, string>, [k, v]) => ((a[k] = v), a),
    {}
  );

function reElement(node: Element, details: boolean, href: string) {
  const filename = href.split('/').pop()?.replace(/(\?|!|\#|$).+/, '');
  node.properties = { ...properties, src: href };
  node.tagName = 'video';
  node.children = [];
  const { title = filename }= queryStringToObject(href);
  if (details) {
    const reNode = detailsNode(title);
    reNode.children.push({ ...node });
    node.children = reNode.children;
    node.tagName = reNode.tagName;
    node.properties = reNode.properties;
  }
}

const RehypeVideo: Plugin<[RehypeVideoOptions?], Root> = (options) => {
  const { test = /\/(.*)(.mp4|.mov)$/, details = true } = options || {};
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      const isChecked = (str: string) => test.test(str.replace(/(\?|!|\#|$).+/g, '').toLocaleLowerCase())
      const child = node.children[0];
      const delimiter = /((?:https?:\/\/)(?:(?:[a-z0-9]?(?:[a-z0-9\-]{1,61}[a-z0-9])?\.[^\.|\s])+[a-z\.]*[a-z]+|(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3})(?::\d{1,5})*[a-z0-9.,_\/~#&=;%+?\-\\(\\)]*)/g;
      // const delimiter = /((?:https?:\/\/)?(?:(?:[a-z0-9]?(?:[a-z0-9\-]{1,61}[a-z0-9])?\.[^\.|\s])+[a-z\.]*[a-z]+|(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3})(?::\d{1,5})*[a-z0-9.,_\/~#&=;%+?\-\\(\\)]*)/g;

      if (node.tagName === 'p' && node.children.length === 1) {
        if (child.type === 'text' && delimiter.test(child.value) && isChecked(child.value)) {
          reElement(node, details, child.value);
        }
        if (child.type === 'element' && child.tagName === 'a' && child.properties && typeof child.properties.href === 'string' && isChecked(child.properties.href)) {
          reElement(node, details, child.properties.href);
        }
      }
    });
  }
}

export default RehypeVideo;
