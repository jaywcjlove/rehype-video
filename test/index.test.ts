import { unified } from 'unified';
import { rehype } from 'rehype';
import gfm from 'remark-gfm';
import remark2rehype from 'remark-rehype';
import remarkParse from 'remark-parse';
import stringify from 'rehype-stringify';
import rehypeVideo from '../src/index.js';

it('rehype-video title test case', () => {
  const mrkStr = `https://github.com/002.mp4?!#title=rehype-video`;
  const expected = `<details open class=\"octicon octicon-video\"><summary><svg aria-hidden height=\"16\" width=\"16\" viewBox=\"0 0 16 16\" version=\"1.1\" data-view-component class=\"octicon octicon-device-camera-video\"><path fill-rule=\"evenodd\" d=\"M16 3.75a.75.75 0 00-1.136-.643L11 5.425V4.75A1.75 1.75 0 009.25 3h-7.5A1.75 1.75 0 000 4.75v6.5C0 12.216.784 13 1.75 13h7.5A1.75 1.75 0 0011 11.25v-.675l3.864 2.318A.75.75 0 0016 12.25v-8.5zm-5 5.075l3.5 2.1v-5.85l-3.5 2.1v1.65zM9.5 6.75v-2a.25.25 0 00-.25-.25h-7.5a.25.25 0 00-.25.25v6.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-4.5z\"></path></svg><span aria-label=\"Video description rehype-video\">rehype-video</span><span class=\"dropdown-caret\"></span></summary><video muted controls style=\"max-height:640px;\" src=\"https://github.com/002.mp4?!#title=rehype-video\"></video></details>`
  const htmlStr = unified()
    .use(remarkParse)
    .use(remark2rehype, { allowDangerousHtml: true })
    .use(rehypeVideo, { })
    .use(stringify)
    .processSync(mrkStr)
    .toString();
    expect(htmlStr).toEqual(expected);
});

it('rehype-video 1 test case', () => {
  const mrkStr = `
  https://github.com/001.mp4 hi!

  https://github.com/002.mp4

  Good \`idea\`!!
  `;
  const expected = `<p>https://github.com/001.mp4 hi!</p>\n<video muted controls style="max-height:640px;" src="https://github.com/002.mp4"></video>\n<p>Good <code>idea</code>!!</p>`
  const htmlStr = unified()
    .use(remarkParse)
    .use(remark2rehype, { allowDangerousHtml: true })
    .use(rehypeVideo, { details: false })
    .use(stringify)
    .processSync(mrkStr)
    .toString();
    expect(htmlStr).toEqual(expected);
});

it('rehype-video 2 test case', () => {
  const mrkStr = `
  https://github.com/001.mp4 hi!

  https://github.com/002.mp4
  Good \`idea\`!!
  `;
  const expected = `<p>https://github.com/001.mp4 hi!</p>\n<p>https://github.com/002.mp4\nGood <code>idea</code>!!</p>`;
  const htmlStr = unified()
    .use(remarkParse)
    .use(remark2rehype, { allowDangerousHtml: true })
    .use(rehypeVideo)
    .use(stringify)
    .processSync(mrkStr)
    .toString();
    expect(htmlStr).toEqual(expected);
});


it('rehype-video 3 test case', () => {
  const mrkStr = `
    https://github.com/001.mp4 hi!

    https://github.com/002.mp4

  https://github.com/003.mp4

https://github.com/004.mp4

`;
  const expected = `<pre><code>https://github.com/001.mp4 hi!\n\nhttps://github.com/002.mp4\n</code></pre>\n<video muted controls style="max-height:640px;" src="https://github.com/003.mp4"></video>\n<video muted controls style="max-height:640px;" src="https://github.com/004.mp4"></video>`
  const htmlStr = unified()
    .use(remarkParse)
    .use(gfm)
    .use(remark2rehype, { allowDangerousHtml: true })
    .use(rehypeVideo, { details: false })
    .use(stringify)
    .processSync(mrkStr)
    .toString();
    expect(htmlStr).toEqual(expected);

});

it('rehype-video 4 test case', () => {
  const mrkStr = `<p>https://github.com/004.mp4</p>`;
  const expected = `<video muted controls style="max-height:640px;" src="https://github.com/004.mp4"></video>`
  const htmlStr = rehype()
    .data('settings', { fragment: true })
    .use(rehypeVideo, { details: false })
    .processSync(mrkStr)
    .toString();
    expect(htmlStr).toEqual(expected);
});

it('rehype-video 5 test case', () => {
  const mrkStr = `<p><a href="https://github.com/004.mp4">https://github.com/004.mp4</a></p>`;
  const expected = `<video muted controls style="max-height:640px;" src="https://github.com/004.mp4"></video>`
  const htmlStr = rehype()
    .data('settings', { fragment: true })
    .use(rehypeVideo, { details: false })
    .processSync(mrkStr)
    .toString();
    expect(htmlStr).toEqual(expected);
});

it('rehype-video 6 test case', () => {
  const mrkStr = `<p><a href="./004.mp4">./004.mp4</a></p>`;
  const expected = `<video muted controls style="max-height:640px;" src="./004.mp4"></video>`
  const htmlStr = rehype()
    .data('settings', { fragment: true })
    .use(rehypeVideo, { details: false })
    .processSync(mrkStr)
    .toString();
    expect(htmlStr).toEqual(expected);
});

it('rehype-video 7 test case', () => {
  const mrkStr = `<p>./sdf 004.mp4</p>`;
  const expected = `<p>./sdf 004.mp4</p>`;
  const htmlStr = rehype()
    .data('settings', { fragment: true })
    .use(rehypeVideo, { details: false })
    .processSync(mrkStr)
    .toString();
    expect(htmlStr).toEqual(expected);
});

it('rehype-video options details=true test case', () => {
  const mrkStr = `
    https://github.com/001.mp4 hi!

https://github.com/003.mp4

`;
  const expected = `<pre><code>https://github.com/001.mp4 hi!\n</code></pre>\n<details open class="octicon octicon-video"><summary><svg aria-hidden height="16" width="16" viewBox="0 0 16 16" version="1.1" data-view-component class="octicon octicon-device-camera-video"><path fill-rule="evenodd" d="M16 3.75a.75.75 0 00-1.136-.643L11 5.425V4.75A1.75 1.75 0 009.25 3h-7.5A1.75 1.75 0 000 4.75v6.5C0 12.216.784 13 1.75 13h7.5A1.75 1.75 0 0011 11.25v-.675l3.864 2.318A.75.75 0 0016 12.25v-8.5zm-5 5.075l3.5 2.1v-5.85l-3.5 2.1v1.65zM9.5 6.75v-2a.25.25 0 00-.25-.25h-7.5a.25.25 0 00-.25.25v6.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-4.5z"></path></svg><span aria-label="Video description 003.mp4">003.mp4</span><span class="dropdown-caret"></span></summary><video muted controls style="max-height:640px;" src="https://github.com/003.mp4"></video></details>`
  const htmlStr = unified()
    .use(remarkParse)
    .use(gfm)
    .use(remark2rehype, { allowDangerousHtml: true })
    .use(rehypeVideo, {})
    .use(stringify)
    .processSync(mrkStr)
    .toString();
  
    expect(htmlStr).toEqual(expected);
});


it('rehype-video WebVTT query test case', () => {
  const mrkStr = `https://github.com/sintel-short.mp4?!#track['en']=captions/vtt/sintel-en.vtt&track['en:label']=English&track['en:kind']=subtitles&track['en:default']=true&track['de']=captions/vtt/sintel-de.vtt&track['de:label']=Deutsch&track['de:kind']=subtitles`;
  const expected = `<details open class=\"octicon octicon-video\"><summary><svg aria-hidden height=\"16\" width=\"16\" viewBox=\"0 0 16 16\" version=\"1.1\" data-view-component class=\"octicon octicon-device-camera-video\"><path fill-rule=\"evenodd\" d=\"M16 3.75a.75.75 0 00-1.136-.643L11 5.425V4.75A1.75 1.75 0 009.25 3h-7.5A1.75 1.75 0 000 4.75v6.5C0 12.216.784 13 1.75 13h7.5A1.75 1.75 0 0011 11.25v-.675l3.864 2.318A.75.75 0 0016 12.25v-8.5zm-5 5.075l3.5 2.1v-5.85l-3.5 2.1v1.65zM9.5 6.75v-2a.25.25 0 00-.25-.25h-7.5a.25.25 0 00-.25.25v6.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-4.5z\"></path></svg><span aria-label=\"Video description sintel-short.mp4\">sintel-short.mp4</span><span class=\"dropdown-caret\"></span></summary><video muted controls style=\"max-height:640px;\" src=\"https://github.com/sintel-short.mp4?!#track[&#x27;en&#x27;]=captions/vtt/sintel-en.vtt&#x26;track[&#x27;en:label&#x27;]=English&#x26;track[&#x27;en:kind&#x27;]=subtitles&#x26;track[&#x27;en:default&#x27;]=true&#x26;track[&#x27;de&#x27;]=captions/vtt/sintel-de.vtt&#x26;track[&#x27;de:label&#x27;]=Deutsch&#x26;track[&#x27;de:kind&#x27;]=subtitles\"><track kind=\"subtitles\" src=\"captions/vtt/sintel-en.vtt\" label=\"English\" default><track kind=\"subtitles\" src=\"captions/vtt/sintel-de.vtt\" label=\"Deutsch\"></video></details>`
  const htmlStr = unified()
    .use(remarkParse)
    .use(remark2rehype, { allowDangerousHtml: true })
    .use(rehypeVideo, { })
    .use(stringify)
    .processSync(mrkStr)
    .toString();
    expect(htmlStr).toEqual(expected);
});