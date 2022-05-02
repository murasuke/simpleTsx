import hs from 'hyperscript';

/**
 * キャメルケースからケバブケースに変換する
 * @param p
 * @returns
 */
const camelToKebab = (p: string) => {
  return p.replace(/([A-Z])/g, (s) => {
    return '-' + s.charAt(0).toLowerCase();
  });
};

/**
 * hyperscriptラップ関数
 * ・hyperscriptではKebabCaseのみ有効。CamelCaseでもStyleが有効になるように変換する
 * h('div', { style: { 'background-color': '#f22' } }, 'style')・・・OK
 * h('div', { style: { backgroundColor: '#f22' } }, 'style')・・・NG(styleが適用されない)
 * @param tagName
 * @param attrs
 * @param children
 * @returns
 * @example <div style={{ backgroundColor: '#f33' }}>
 *   ⇒ <div style={{ background-color: '#f33' }}>に変換してhyperscriptへ渡す
 */
const h = (tagName: string, attrs?: Object, ...children: any[]): Element => {
  if ('object' === typeof attrs) {
    const l = attrs as any;
    for (let k in l) {
      if (k === 'style' && 'string' !== typeof l[k]) {
        for (let s in l[k]) {
          if (s !== camelToKebab(s)) {
            // styleの指定をkebab-caseに変換
            l[k][camelToKebab(s)] = l[k][s];
            // camelCaseの属性を削除
            delete l[k][s];
          }
        }
      }
    }
  }
  return hs(tagName, attrs, ...children);
};

/**
 * HTMLElementTagNameMapの属性をすべてpartial(任意)に変更する(孫を含め再帰的に適用する)
 * ⇒<div></div>と記載した際にコンパイルエラーとしないようにするため
 */
type NestedPartial<T> = {
  [K in keyof T]?: T[K] extends Array<infer R>
    ? Array<NestedPartial<R>>
    : NestedPartial<T[K]>;
};

/**
 * TSXの型指定
 * ・HTMLElementTagNameMap型に含まれる「タグ」名のみを有効とする
 * 　<div> ・・・ コンパイル可能
 *   <test> ・・・コンパイルエラー
 */
declare global {
  namespace JSX {
    interface IntrinsicElements extends NestedPartial<HTMLElementTagNameMap> {}
    // 存在しないタグ名であってもエラーにしないようにする場合は、下記に置き換える
    // interface IntrinsicElements {
    //   [tagName: string]: any;
    // }
  }
}

export default h;
