import { FilterXSS } from 'xss';

const options = {
  whiteList: {
    address: [], article: [], aside: [], footer: [], header: [], h1: ['class', 'id', 'style'],
    h2: ['class', 'id', 'style'], h3: ['class', 'id', 'style'], h4: ['class', 'id', 'style'],
    h5: ['class', 'id', 'style'], h6: ['class', 'id', 'style'], hgroup: [], main: [], nav: [],
    section: [], blockquote: [], dd: [], div: ['class', 'id', 'style'], dl: [], dt: [],
    figcaption: [], figure: [], hr: [], li: [], ol: [], p: ['class', 'id', 'style'],
    pre: [], ul: [], a: ['class', 'id', 'style', 'href', 'name', 'target', 'rel'],
    abbr: [], b: [], bdi: [], bdo: [], br: [], cite: [], code: [], data: [], dfn: [],
    em: [], i: [], kbd: [], mark: [], q: [], rb: [], rp: [], rt: [], rtc: [], ruby: [],
    s: [], samp: [], small: [], span: ['class', 'id', 'style'], strong: [], sub: [], sup: [],
    time: [], u: [], var: [], wbr: [], caption: [], col: [], colgroup: [], table: [],
    tbody: [], td: [], tfoot: [], th: [], thead: [], tr: [],
    img: ['class', 'id', 'style', 'src', 'srcset', 'alt', 'title', 'width', 'height', 'loading'],
    iframe: ['class', 'id', 'style', 'src', 'width', 'height', 'frameborder', 'allow', 'allowfullscreen', 'title'],
    video: ['class', 'id', 'style', 'src', 'poster', 'controls', 'width', 'height', 'autoplay', 'muted', 'loop'],
    source: ['src', 'type']
  },
  stripIgnoreTag: true,
  stripIgnoreTagBody: ['script', 'style', 'xml', 'object', 'embed'],
  onTagAttr: function (tag: string, name: string, value: string) {
    if (tag === 'iframe' && name === 'src') {
      if (!value.startsWith('https://www.youtube.com/') && !value.startsWith('https://youtube.com/') && !value.startsWith('https://player.vimeo.com/')) {
        return '';
      }
    }
    return undefined;
  }
};

const myxss = new FilterXSS(options);

export function sanitize(html: string): string {
  return myxss.process(html);
}
