/*
  Furigana: gắn cách đọc cho chữ Hán trong mọi đoạn văn bản.
  Từ điển được dựng từ danh sách từ vựng (Kanji|Cách đọc) và EXTRA_READINGS trong data.js.
  Chế độ: 'kanji' (giữ nguyên) · 'furi' (kanji + furigana) · 'kana' (chỉ kana)
*/
const Furigana = (() => {
  const KANJI = /[一-鿿]/;
  const PURE = /^[一-鿿]+$/;
  const index = new Map();   // ký tự đầu → danh sách mục, dài trước
  const seen = new Set();

  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function push(e) {
    seen.add(e.s);
    const k = e.s[0];
    if (!index.has(k)) index.set(k, []);
    index.get(k).push(e);
  }

  /* Tách phần kana đầu/cuối giống nhau để furigana chỉ nằm trên chữ Hán (食べ → た + 食 + べ) */
  function add(surface, reading) {
    surface = surface.trim();
    reading = reading.split('/')[0].trim();
    if (!KANJI.test(surface) || !reading || seen.has(surface)) return;
    let pre = 0;
    while (pre < surface.length - 1 && pre < reading.length - 1 && surface[pre] === reading[pre]) pre++;
    let suf = 0;
    while (suf < surface.length - pre - 1 && suf < reading.length - pre - 1 &&
           surface[surface.length - 1 - suf] === reading[reading.length - 1 - suf]) suf++;
    const e = {
      s: surface,
      pre: surface.slice(0, pre),
      base: surface.slice(pre, surface.length - suf),
      rt: reading.slice(pre, reading.length - suf),
      tail: surface.slice(surface.length - suf)
    };
    push(e);
    /* gốc động/tính từ (食 trong 食べました) dùng làm mục dự phòng */
    if (pre === 0 && e.tail && PURE.test(e.base) && !seen.has(e.base)) {
      push({ s: e.base, pre: '', base: e.base, rt: e.rt, tail: '' });
    }
  }

  function init(extras, words) {
    index.clear(); seen.clear();
    extras.trim().split('\n').forEach(l => {
      const [s, r] = l.split('|');
      if (s && r) add(s, r);
    });
    words.forEach(w => { if (w.k) add(w.k, w.w); });
    index.forEach(list => list.sort((a, b) => b.s.length - a.s.length));
  }

  function render(text, mode) {
    if (mode === 'kanji' || !KANJI.test(text)) return esc(text);
    let out = '', i = 0;
    while (i < text.length) {
      const list = index.get(text[i]);
      const hit = list && list.find(e => text.startsWith(e.s, i));
      if (hit) {
        out += esc(hit.pre) +
          (mode === 'furi' ? `<ruby>${esc(hit.base)}<rt>${esc(hit.rt)}</rt></ruby>` : esc(hit.rt)) +
          esc(hit.tail);
        i += hit.s.length;
      } else { out += esc(text[i]); i++; }
    }
    return out;
  }

  /* kana-only dạng chuỗi thuần, dùng để kiểm tra còn sót kanji hay không */
  const plain = text => render(text, 'kana').replace(/&amp;|&lt;|&gt;|&quot;|&#39;/g, ' ');

  return { init, render, plain, KANJI };
})();

if (typeof module !== 'undefined') module.exports = Furigana;
