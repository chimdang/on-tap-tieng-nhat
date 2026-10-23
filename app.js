(() => {
'use strict';

/* ================= helpers ================= */
const $ = (s, el = document) => el.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const shuffle = a => {
  a = a.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
const pick = (a, n) => shuffle(a).slice(0, n);
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* ignore */ } }
};
const mmss = s => { s = Math.max(0, Math.round(s)); return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`; };
const fmtDate = t => new Date(t).toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' });
const pct = e => (e.total ? Math.round(e.score / e.total * 100) : 0);
const tone = p => (p >= 75 ? 'good' : p >= 50 ? 'mid' : 'low');
/* Văn bản tiếng Nhật → HTML theo chế độ chữ viết (kanji / furigana / kana).
   Câu hỏi "… đọc là gì?" không gắn furigana (sẽ lộ đáp án) và bị loại khi ở chế độ "Chỉ kana". */
const READ_Q = /đọc là gì/;
/* Chuỗi bắt đầu bằng KMARK (ký tự ẩn) là nội dung kanji: luôn hiện nguyên chữ Hán, không gắn furigana / không đổi sang kana */
const KMARK = '⁣';
const kt = s => KMARK + s;
const jp = t => {
  t = String(t);
  if (t[0] === KMARK) return esc(t.slice(1));
  return READ_Q.test(t) ? esc(t) : Furigana.render(t, state.script);
};
const KIND = { vocab: 'Từ vựng', grammar: 'Ngữ pháp', kanji: 'Kanji' };
const quizOf = c => c.quiz.filter(q => state.script !== 'kana' || !READ_Q.test(q.q));
const fmtQ = s => jp(s).replace(/\(\s+\)/g, '<span class="blank"></span>');

/* ================= data ================= */
const CH = CHAPTERS.map(c => ({
  id: c.id,
  title: c.title,
  vocab: c.vocab.trim().split('\n').map((l, i) => {
    const [k, w, m, pos] = l.split('|').map(x => x.trim());
    return { id: `${c.id}:${i}`, ch: c.id, k, w, m, pos: pos || 'n' };
  }),
  grammar: c.grammar,
  quiz: c.quiz.map(q => ({ kind: 'grammar', ch: c.id, tag: 'Ngữ pháp', q: q[0], correct: q[1], opts: [q[1], q[2], q[3], q[4]], e: q[5] })),
  kanji: ((KANJI.find(x => x.ch === c.id) || { items: [] }).items).map((it, i) => ({ ...it, id: `k${c.id}:${i}`, ch: c.id }))
}));
const byId = id => CH.find(c => c.id === id);
const ALL_WORDS = CH.flatMap(c => c.vocab);
const ALL_IDS = CH.map(c => c.id);
/* từ ví dụ của kanji, theo chương và toàn bộ */
CH.forEach(c => { c.kw = c.kanji.flatMap(it => it.w.map(([w, r, m]) => ({ w, r, m, k: it.k, ch: c.id }))); });
const ALL_KW = CH.flatMap(c => c.kw);
const ALL_KANJI = CH.flatMap(c => c.kanji);

/* nguồn cách đọc cho furigana: từ vựng + từ ví dụ của kanji */
Furigana.init(EXTRA_READINGS, ALL_WORDS.concat(ALL_KW.map(e => ({ k: e.w, w: e.r }))));

/* ---------- loại từ ---------- */
const POS_LABEL = { n: 'Danh từ', v1: 'Động từ I', v2: 'Động từ II', v3: 'Động từ III', i: 'Tính từ い', na: 'Tính từ な', adv: 'Phó từ', suf: 'Hậu tố / trợ số từ', exp: 'Cụm từ / giao tiếp', oth: 'Khác' };
const POS_FILTERS = [['all', 'Tất cả'], ['n', 'Danh từ'], ['v', 'Động từ'], ['i', 'Tính từ い'], ['na', 'Tính từ な'], ['adv', 'Phó từ'], ['suf', 'Hậu tố / trợ số từ'], ['exp', 'Cụm từ'], ['oth', 'Khác']];
const posParts = w => (w.pos || 'n').split('+');
const posGroupOf = p => (p[0] === 'v' ? 'v' : p);
const inPos = (w, g) => g === 'all' || posParts(w).some(p => posGroupOf(p) === g);
const posBadges = w => posParts(w).map(p => `<span class="pos pos-${posGroupOf(p)}">${POS_LABEL[p] || p}</span>`).join('');
const shortM = m => m.replace(/\s*[［\[（(].*$/, '').trim() || m;   // nghĩa ngắn (bỏ phần chú thích) dùng cho đáp án trắc nghiệm

/* Dạng chữ Nhật của một từ: chế độ "Chỉ kana" dùng cách đọc, còn lại dùng kanji (nếu có) */
const disp = w => (w.k && state.script !== 'kana' ? w.k : w.w);

function finalize(q) {
  const opts = shuffle(q.opts);
  return { ...q, opts, a: opts.indexOf(q.correct) };
}

/* Chọn đáp án nhiễu: ưu tiên từ cùng loại từ và cùng chương để câu hỏi khó đúng mức */
function distractors(w, textOf, n = 3, filter = () => true) {
  const seen = new Set([textOf(w)]);
  const g = posGroupOf(posParts(w)[0]);
  const rank = x => (posGroupOf(posParts(x)[0]) === g ? 0 : 2) + (x.ch === w.ch ? 0 : 1);
  const pool = shuffle(ALL_WORDS.filter(x => x !== w)).sort((a, b) => rank(a) - rank(b));
  const out = [];
  for (const x of pool) {
    if (!filter(x)) continue;
    const t = textOf(x);
    if (seen.has(t)) continue;
    seen.add(t);
    out.push(t);
    if (out.length === n) break;
  }
  return out;
}

/* dir: 'jv' Nhật→Việt · 'vj' Việt→Nhật · 'mix' hỗn hợp (có cả câu hỏi cách đọc) */
function vocabQ(w, dir = 'mix') {
  const canRead = w.k && state.script === 'kanji';   // hỏi cách đọc chỉ có nghĩa khi chưa hiện furigana
  let kind = dir;
  if (dir === 'mix') kind = ['jv', 'vj', canRead ? 'rd' : 'jv'][Math.floor(Math.random() * 3)];
  if (kind === 'rd' && !canRead) kind = 'jv';
  const e = canRead ? `${w.w}（${w.k}）= ${w.m}` : `${disp(w)} = ${w.m}`;
  const notSame = x => disp(x) !== disp(w);            // từ trùng chữ (vd 高い: đắt / cao) không được làm đáp án nhiễu
  if (kind === 'vj') {
    return finalize({ kind: 'vocab', ch: w.ch, tag: 'Việt → Nhật', q: `「${shortM(w.m)}」 trong tiếng Nhật là?`, correct: disp(w), opts: [disp(w), ...distractors(w, disp)], e });
  }
  if (kind === 'rd') {
    return finalize({ kind: 'vocab', ch: w.ch, tag: 'Cách đọc', q: `Cách đọc của 「${w.k}」 là?`, correct: w.w, opts: [w.w, ...distractors(w, x => x.w, 3, x => x.k && notSame(x))], e });
  }
  return finalize({ kind: 'vocab', ch: w.ch, tag: 'Nhật → Việt', q: `「${disp(w)}」 có nghĩa là gì?`, correct: shortM(w.m), opts: [shortM(w.m), ...distractors(w, x => shortM(x.m), 3, notSame)], e });
}

/* ---------- câu hỏi kanji ---------- */
/* biến thể gần giống để làm đáp án nhiễu cho câu hỏi cách đọc (trường âm, âm đục, âm ngắt...) */
const MUT = [['ゅう', 'ゅ'], ['ょう', 'ょ'], ['ゆう', 'ゆ'], ['おお', 'お'], ['う', ''], ['っ', ''], ['か', 'が'], ['た', 'だ'], ['さ', 'ざ'], ['し', 'じ'],
  ['は', 'ば'], ['ひ', 'び'], ['き', 'ぎ'], ['ち', 'じ'], ['つ', 'づ'], ['こ', 'ご'], ['と', 'ど'], ['せ', 'ぜ'], ['ふ', 'ぷ'], ['く', 'ぐ']];
function mutate(r) {
  if (/[\/・]/.test(r)) return null;
  const cands = [];
  MUT.forEach(([a, b]) => [[a, b], [b, a]].forEach(([x, y]) => {
    if (!x) return;
    for (let i = r.indexOf(x); i !== -1; i = r.indexOf(x, i + 1)) cands.push(r.slice(0, i) + y + r.slice(i + x.length));
  }));
  const ok = cands.filter(c => c && c !== r);
  return ok.length ? ok[Math.floor(Math.random() * ok.length)] : null;
}

function pickTexts(pool, textOf, avoid, n, ok = () => true) {
  const seen = new Set(avoid), out = [];
  for (const x of shuffle(pool)) {
    if (!ok(x)) continue;
    const t = textOf(x);
    if (!t || seen.has(t)) continue;
    seen.add(t); out.push(t);
    if (out.length === n) break;
  }
  return out;
}

/* e: {w từ kanji, r cách đọc, m nghĩa, k chữ Hán gốc, ch}; kind: kr | km | kw */
function kanjiQ(e, kind) {
  if (!kind) kind = ['kr', 'km', 'kw'][Math.floor(Math.random() * 3)];
  if (kind === 'km' && !e.m) kind = 'kr';
  const same = ALL_KW.filter(x => x.ch === e.ch && x.w !== e.w);
  const ex = `${e.w}（${e.r}）= ${e.m || '—'}`;
  const mk = (tag, q, correct, wrong) => finalize({ kind: 'kanji', ch: e.ch, tag, q: kt(q), correct: kt(correct), opts: [correct, ...wrong].map(kt), e: kt(ex) });
  if (kind === 'km') {
    const wrong = pickTexts(same.concat(ALL_KW), x => x.m, [e.m], 3);
    return mk('Nghĩa', `「${e.w}」 có nghĩa là gì?`, e.m, wrong);
  }
  if (kind === 'kw') {
    const share = ALL_KW.filter(x => x.w !== e.w && x.r !== e.r && [...x.w].some(c => e.w.includes(c) && /[一-鿿]/.test(c)));
    let wrong = pickTexts(share, x => x.w, [e.w], 3);
    if (wrong.length < 3) wrong = wrong.concat(pickTexts(same, x => x.w, [e.w, ...wrong], 3 - wrong.length, x => x.r !== e.r));
    if (wrong.length < 3) wrong = wrong.concat(pickTexts(ALL_KW, x => x.w, [e.w, ...wrong], 3 - wrong.length, x => x.r !== e.r));
    return mk('Chọn chữ Hán', `Chữ Hán đúng của 「${e.r}」 là?`, e.w, wrong);
  }
  const muts = [];
  for (let i = 0; i < 12 && muts.length < 2; i++) { const m = mutate(e.r); if (m && !muts.includes(m) && !ALL_KW.some(x => x.r === m)) muts.push(m); }
  const wrong = muts.concat(pickTexts(same.concat(ALL_KW), x => x.r, [e.r, ...muts], 3 - muts.length));
  return mk('Cách đọc', `Cách đọc của 「${e.w}」 là?`, e.r, wrong);
}

function kanjiHV(it) {
  const wrong = pickTexts(ALL_KANJI, x => x.hv, [it.hv], 3);
  return finalize({ kind: 'kanji', ch: it.ch, tag: 'Hán Việt', q: kt(`Âm Hán Việt của 「${it.k}」 là?`), correct: kt(it.hv), opts: [it.hv, ...wrong].map(kt), e: kt(`${it.k} = ${it.hv}${it.on ? `　音: ${it.on}` : ''}${it.kun ? `　訓: ${it.kun}` : ''}`) });
}

/* ================= state ================= */
const KEY = 'jp-review-v1';
const saved = store.get(KEY, {});
const state = Object.assign({
  script: 'kanji', fx: true, name: '', hf: 'all', tab: 'review', subject: 'vocab', chapter: 1, mode: 'study',
  vview: 'cards', pos: 'all', order: 'orig', cdir: 'jv', cshuf: false, conly: false, cover: 'none',
  tcfg: { subjects: ['vocab', 'grammar'], chapters: ALL_IDS.slice(), n: 20, dir: 'mix', mins: 0 },
  jcfg: { paper: JLPT[JLPT.length - 1].id, mode: 'full', sec: 'v', timed: 1 }
}, saved.ui || {});
const DATA_V = 3;   // tăng khi từ vựng / ngữ pháp được làm lại: tiến độ "Đã nhớ" và sổ câu sai cũ của phần đó không còn khớp
const stale = saved.dv !== DATA_V;
const known = new Set((saved.known || []).filter(id => !stale || id[0] === 'k'));
/* Nhật ký làm bài. Bản cũ chỉ lưu {t, score, total, label} nên được chuyển sang định dạng mới (không có chi tiết). */
let log = saved.log || (saved.history || []).map(h => ({ ...h, id: h.t, type: 'test', legacy: true }));
let mist = stale ? Object.fromEntries(Object.entries(saved.mist || {}).filter(([, v]) => v.q.kind === 'kanji')) : (saved.mist || {});                                  // sổ câu sai: khóa → { q, n, t }
let tot = saved.tot || { ok: 0, done: 0, streak: 0 };         // tổng câu đúng / đã làm / chuỗi đúng kỷ lục
const persist = () => store.set(KEY, { dv: DATA_V, ui: state, known: [...known], log, mist, tot });

let practice = null;   // phiên luyện tập hiện tại
let cards = null;      // bộ thẻ ghi nhớ hiện tại
let test = { phase: 'setup' };
let jl = { phase: 'menu' };  // phiên làm đề JLPT hiện tại
const openIds = new Set();   // các mục lịch sử đang mở

/* ---------- ghi nhận kết quả ---------- */
const minQ = (q, pick) => ({ kind: q.kind, ch: q.ch, tag: q.tag, q: q.q, correct: q.correct, opts: q.opts, e: q.e, ...(pick == null ? {} : { pick }) });
const mkey = q => `${q.kind}|${q.q}|${q.correct}`;

function noteResult(q, right) {
  const k = mkey(q);
  if (right) delete mist[k];
  else mist[k] = { q: minQ(q), n: (mist[k] ? mist[k].n : 0) + 1, t: Date.now() };
}

function trimMist() {
  const keys = Object.keys(mist);
  if (keys.length > 200) keys.sort((a, b) => mist[a].t - mist[b].t).slice(0, keys.length - 200).forEach(k => delete mist[k]);
}

function makeEntry(type, label, qs, ans, dur) {
  const byCh = {}, kinds = {};
  const add = (o, key, ok) => { const a = o[key] || (o[key] = [0, 0]); a[1]++; if (ok) a[0]++; };
  qs.forEach((q, i) => { const ok = ans[i] === q.a; add(byCh, q.ch, ok); add(kinds, q.kind, ok); });
  const wrong = qs.map((q, i) => ({ q, i })).filter(x => ans[x.i] !== x.q.a).slice(0, 25)
    .map(x => minQ(x.q, ans[x.i] >= 0 ? x.q.opts[ans[x.i]] : ''));
  const t = Date.now();
  return { id: t, t, type, label, score: qs.filter((q, i) => ans[i] === q.a).length, total: qs.length, dur: Math.round(dur), byCh, kinds, wrong, name: state.name };
}

const pushLog = entry => { log = [entry, ...log].slice(0, 60); };

function updateTotals() {
  const a = $('#totOk'), b = $('#totStreak');
  if (a) a.textContent = tot.ok;
  if (b) b.textContent = tot.streak;
}

const app = $('#app');

/* ================= render: root ================= */
function render() {
  const tb = (id, label) => `<button class="tab ${state.tab === id ? 'on' : ''}" data-act="tab" data-v="${id}">${label}</button>`;
  const lock = test.phase === 'run';   // đang làm bài thì khóa đổi chữ viết để đề không bị lệch
  document.body.dataset.script = state.script;
  FX.setOn(state.fx);
  const focus = state.tab === 'jlpt' && jl.phase !== 'menu';   // đang làm đề: bỏ trang trí che trang đề
  app.classList.toggle('wide', focus);
  document.body.classList.toggle('focus', focus);
  app.innerHTML = `<div class="tabs">${tb('review', '📚 Ôn tập')}${tb('test', '📝 Kiểm tra')}${tb('jlpt', '🎧 Đề JLPT')}${tb('history', '📊 Lịch sử')}</div>
    ${state.tab === 'jlpt' && jl.phase !== 'menu' ? '' : `<div class="panel">
      <div class="row">
        <span class="label">Chữ viết</span>
        ${seg('script', state.script, [['kanji', '漢字 Kanji'], ['furi', 'Furigana'], ['kana', 'Chỉ kana']], lock)}
        ${lock ? '<span class="note">🔒 Khóa khi đang làm bài</span>' : ''}
      </div>
      <div class="row">
        <span class="label">Hiệu ứng</span>
        ${seg('fx', state.fx ? 1 : 0, [[1, '✨ Bật'], [0, 'Tắt']])}
        <span class="spacer"></span>
        <button class="pill cyan" data-act="name" title="Đổi tên">👤 ${esc(state.name || 'Đặt tên')}</button>
      </div>
    </div>
    <div class="strip">📊 Tổng câu đúng: <b id="totOk">${tot.ok}</b> &nbsp;|&nbsp; 🔥 Chuỗi kỷ lục: <b id="totStreak">${tot.streak}</b></div>`}
    <div id="view"></div>`;
  if (state.tab === 'review') renderReview();
  else if (state.tab === 'history') renderHistory();
  else if (state.tab === 'jlpt') renderJlpt();
  else renderTest();
}

const seg = (act, cur, items, off = false) =>
  `<div class="seg">${items.map(([v, l]) => `<button class="${String(cur) === String(v) ? 'on' : ''}" data-act="${act}" data-v="${v}" ${off ? 'disabled' : ''}>${l}</button>`).join('')}</div>`;

/* ================= ÔN TẬP ================= */
function renderReview() {
  const chips = CH.map(c => {
    const n = state.subject === 'vocab' ? c.vocab.length : state.subject === 'kanji' ? c.kanji.length : quizOf(c).length;
    return `<button class="chip ${c.id === state.chapter ? 'on' : ''}" data-act="chapter" data-v="${c.id}">${c.title}<small>${n}</small></button>`;
  }).join('');
  $('#view').innerHTML = `
    <div class="panel">
      <div class="row">
        <span class="label">Nội dung</span>
        ${seg('subject', state.subject, [['vocab', '🈶 Từ vựng'], ['grammar', '📐 Ngữ pháp'], ['kanji', '🈳 Kanji']])}
        <span class="spacer"></span>
        ${seg('mode', state.mode, [['study', '📖 Học'], ['practice', '✍️ Luyện tập']])}
      </div>
      <div class="row"><span class="label">Chương</span><div class="chips">${chips}</div></div>
    </div>
    <div id="study"></div>`;
  drawStudy();
}

function drawStudy() {
  const host = $('#study');
  if (!host) return;
  if (state.mode === 'practice') return drawPractice(host);
  if (state.subject === 'grammar') return drawGrammar(host);
  if (state.subject === 'kanji') return state.vview === 'cards' ? drawKCards(host) : drawKList(host);
  return state.vview === 'cards' ? drawCards(host) : drawList(host);
}

/* ---------- học: ngữ pháp ---------- */
function drawGrammar(host) {
  const c = byId(state.chapter);
  host.innerHTML = c.grammar.map((g, n) => {
    const notes = g[2] ? `<ul class="g-notes">${g[2].split(' ｜ ').map(t => `<li>${jp(t)}</li>`).join('')}</ul>` : '';
    const ex = g.slice(3).map(t => `<div class="g-ex">${jp(t)}</div>`).join('');
    return `<div class="g"><div class="g-pat"><span class="g-no">${n + 1}</span>${jp(g[0])}</div><div class="g-mean">${jp(g[1])}</div>${notes}${ex}</div>`;
  }).join('') + `<p class="note" style="text-align:center">Xem xong hãy chuyển sang <b>✍️ Luyện tập</b> để làm bài trắc nghiệm của ${c.title}.</p>`;
}

/* ---------- học: từ vựng — thẻ ghi nhớ ---------- */
/* chip lọc loại từ cho một danh sách từ vựng */
const effPos = words => (words.some(w => inPos(w, state.pos)) ? state.pos : 'all');
const posChips = words => {
  const cur = effPos(words);
  const chips = POS_FILTERS.map(([g, l]) => {
    const n = words.filter(w => inPos(w, g)).length;
    return n ? `<button class="chip ${cur === g ? 'on' : ''}" data-act="pos" data-v="${g}">${l}<small>${n}</small></button>` : '';
  }).join('');
  return `<div class="row"><span class="label">Loại từ</span><div class="chips">${chips}</div></div>`;
};

function buildDeck() {
  const ch = byId(state.chapter);
  let list = (state.subject === 'kanji' ? ch.kanji : ch.vocab.filter(w => inPos(w, effPos(ch.vocab)))).slice();
  if (state.conly) list = list.filter(w => !known.has(w.id));
  if (state.cshuf) list = shuffle(list);
  cards = { list, i: 0, flip: false };
}

function drawCards(host) {
  if (!cards) buildDeck();
  const all = byId(state.chapter).vocab;
  const knownCnt = all.filter(w => known.has(w.id)).length;
  const opts = `
    <div class="panel">
      <div class="row">
        ${seg('vview', state.vview, [['cards', '🃏 Thẻ ghi nhớ'], ['list', '📋 Danh sách']])}
        ${seg('cdir', state.cdir, [['jv', 'Nhật → Việt'], ['vj', 'Việt → Nhật']])}
      </div>
      <div class="row">
        <button class="chip ${state.cshuf ? 'on' : ''}" data-act="cshuf">🔀 Trộn thẻ</button>
        <button class="chip ${state.conly ? 'on' : ''}" data-act="conly">Chỉ từ chưa nhớ</button>
        <span class="spacer"></span>
        <span class="pill ok">✓ Đã nhớ ${knownCnt}/${all.length}</span>
        <button class="btn" data-act="cclear">Xóa tiến độ</button>
      </div>
      ${posChips(all)}
    </div>`;
  if (!cards.list.length) {
    host.innerHTML = opts + `<div class="empty">🎉 Bạn đã nhớ hết từ vựng của ${byId(state.chapter).title}!<br>Bỏ chọn “Chỉ từ chưa nhớ” để xem lại.</div>`;
    return;
  }
  const w = cards.list[cards.i];
  const front = state.cdir === 'jv' ? { main: disp(w), cls: '' } : { main: w.m, cls: 'vn' };
  const reading = state.script === 'kanji' && w.k ? w.w : '';   // furigana / kana đã cho sẵn cách đọc
  const back = state.cdir === 'jv' ? { main: w.m, cls: 'vn', sub: reading } : { main: disp(w), cls: '', sub: reading };
  const face = cards.flip
    ? `<div class="card-face back" data-act="flip"><div class="card-main ${back.cls}">${jp(back.main)}</div>${back.sub ? `<div class="card-sub">${esc(back.sub)}</div>` : ''}<div class="pos-row">${posBadges(w)}</div></div>`
    : `<div class="card-face" data-act="flip"><div class="card-main ${front.cls}">${jp(front.main)}</div><div class="pos-row">${posBadges(w)}</div><div class="card-hint">Nhấn để lật thẻ · phím Space</div></div>`;
  host.innerHTML = `${opts}
    <div class="deck-info"><span>Thẻ ${cards.i + 1} / ${cards.list.length}</span>${known.has(w.id) ? '<span class="card-mark">✓ Đã nhớ</span>' : '<span></span>'}</div>
    <div class="card3d">${face}</div>
    <div class="card-ctrl">
      <button class="btn bad" data-act="cmark" data-v="0">✗ Chưa nhớ</button>
      <button class="btn ok" data-act="cmark" data-v="1">✓ Đã nhớ</button>
    </div>
    <div class="card-nav">
      <button class="btn" data-act="cprev">◀ Trước</button>
      <button class="btn" data-act="flip">🔄 Lật</button>
      <button class="btn" data-act="cnext">Sau ▶</button>
    </div>`;
}

/* ---------- học: kanji — thẻ ghi nhớ & danh sách ---------- */
function drawKCards(host) {
  if (!cards) buildDeck();
  const all = byId(state.chapter).kanji;
  const knownCnt = all.filter(w => known.has(w.id)).length;
  const opts = `
    <div class="panel">
      <div class="row">${seg('vview', state.vview, [['cards', '🃏 Thẻ ghi nhớ'], ['list', '📋 Bảng kanji']])}</div>
      <div class="row">
        <button class="chip ${state.cshuf ? 'on' : ''}" data-act="cshuf">🔀 Trộn thẻ</button>
        <button class="chip ${state.conly ? 'on' : ''}" data-act="conly">Chỉ chữ chưa nhớ</button>
        <span class="spacer"></span>
        <span class="pill ok">✓ Đã nhớ ${knownCnt}/${all.length}</span>
        <button class="btn" data-act="cclear">Xóa tiến độ</button>
      </div>
    </div>`;
  if (!cards.list.length) {
    host.innerHTML = opts + `<div class="empty">🎉 Bạn đã nhớ hết kanji của ${byId(state.chapter).title}!<br>Bỏ chọn “Chỉ chữ chưa nhớ” để xem lại.</div>`;
    return;
  }
  const it = cards.list[cards.i];
  const face = cards.flip
    ? `<div class="card-face back kback" data-act="flip">${kanjiDetail(it, true)}</div>`
    : `<div class="card-face" data-act="flip"><div class="card-main kbig">${esc(it.k)}</div><div class="card-hint">Nhấn để lật thẻ · phím Space</div></div>`;
  host.innerHTML = `${opts}
    <div class="deck-info"><span>Thẻ ${cards.i + 1} / ${cards.list.length}</span>${known.has(it.id) ? '<span class="card-mark">✓ Đã nhớ</span>' : '<span></span>'}</div>
    <div class="card3d">${face}</div>
    <div class="card-ctrl">
      <button class="btn bad" data-act="cmark" data-v="0">✗ Chưa nhớ</button>
      <button class="btn ok" data-act="cmark" data-v="1">✓ Đã nhớ</button>
    </div>
    <div class="card-nav">
      <button class="btn" data-act="cprev">◀ Trước</button>
      <button class="btn" data-act="flip">🔄 Lật</button>
      <button class="btn" data-act="cnext">Sau ▶</button>
    </div>`;
}

/* chi tiết một chữ Hán: Hán Việt, âm Kun/On, từ ví dụ (cv = ẩn đọc/nghĩa để tự kiểm tra) */
function kanjiDetail(it, withKanji, cv = '') {
  const cls = cv === 'm' ? ' kcv' : '';
  const words = it.w.map(([w, r, m]) => `<div class="kw"><span class="kw-w">${esc(w)}</span><span class="kw-r${cls}">${esc(r)}</span><span class="kw-m${cls}">${esc(m)}</span></div>`).join('');
  return `${withKanji ? `<div class="kside"><span class="kmini">${esc(it.k)}</span></div>` : ''}
    <div class="khv${cls}">${esc(it.hv || '—')}</div>
    <div class="krow"><span class="kbadge">訓</span><span class="${cls.trim()}">${esc(it.kun || '—')}</span></div>
    <div class="krow"><span class="kbadge on">音</span><span class="${cls.trim()}">${esc(it.on || '—')}</span></div>
    <div class="kwords">${words}</div>`;
}

function drawKList(host) {
  const c = byId(state.chapter);
  const cv = state.cover === 'm' ? 'm' : '';
  const items = c.kanji.map(it => `<div class="kitem">
      <div class="kglyph ${state.cover === 'w' ? 'kcv' : ''}">${esc(it.k)}</div>
      <div class="kinfo">${kanjiDetail(it, false, cv)}</div>
    </div>`).join('');
  host.innerHTML = `
    <div class="panel">
      <div class="row">
        ${seg('vview', state.vview, [['cards', '🃏 Thẻ ghi nhớ'], ['list', '📋 Bảng kanji']])}
        ${seg('cover', state.cover, [['none', 'Hiện hết'], ['m', 'Che đọc & nghĩa'], ['w', 'Che chữ Hán']])}
      </div>
      ${state.cover !== 'none' ? '<div class="row note">Nhấn vào phần bị che để xem đáp án.</div>' : ''}
    </div>
    <div class="klist">${items}</div>`;
}

/* ---------- học: từ vựng — danh sách ---------- */
function drawList(host) {
  const c = byId(state.chapter);
  const rd = w => (w.k && state.script !== 'kana' ? w.w : '—');
  const cv = (on, t) => (on ? `<td class="cover"><span>${jp(t)}</span></td>` : `<td>${jp(t)}</td>`);
  const words = c.vocab.filter(w => inPos(w, effPos(c.vocab)));
  const rows = words.map((w, i) => `<tr>
      <td class="note">${i + 1}</td>
      ${state.cover === 'w' ? `<td class="k cover"><span>${jp(disp(w))}</span></td>` : `<td class="k">${jp(disp(w))}</td>`}
      ${state.cover === 'w' ? cv(true, rd(w)) : `<td class="w">${esc(rd(w))}</td>`}
      ${cv(state.cover === 'm', w.m)}
      <td>${posBadges(w)}</td>
    </tr>`).join('');
  host.innerHTML = `
    <div class="panel">
      <div class="row">
        ${seg('vview', state.vview, [['cards', '🃏 Thẻ ghi nhớ'], ['list', '📋 Danh sách']])}
        ${seg('cover', state.cover, [['none', 'Hiện hết'], ['m', 'Che nghĩa'], ['w', 'Che từ']])}
      </div>
      ${state.cover !== 'none' ? '<div class="row note">Nhấn vào ô bị che để xem đáp án.</div>' : ''}
      ${posChips(c.vocab)}
    </div>
    <div class="panel table-wrap"><table class="vt">
      <thead><tr><th>#</th><th>Từ</th><th>Cách đọc</th><th>Nghĩa</th><th>Loại từ</th></tr></thead>
      <tbody>${rows}</tbody>
    </table></div>`;
}

/* ---------- luyện tập (có phản hồi ngay) ---------- */
function buildPractice() {
  const c = byId(state.chapter);
  let qs;
  if (state.subject === 'vocab') qs = c.vocab.filter(w => inPos(w, effPos(c.vocab))).map(w => vocabQ(w, 'mix'));
  else if (state.subject === 'kanji') qs = [...c.kw.map(e => kanjiQ(e)), ...c.kanji.filter(it => it.hv).map(kanjiHV)];
  else qs = quizOf(c).map(finalize);
  if (state.order === 'shuffle') qs = shuffle(qs);
  practice = {
    qs, ans: qs.map(() => -1), streak: 0, logged: false, startedAt: 0,
    label: `${KIND[state.subject]} · ${c.title}`
  };
}

function qCard(q, i) {
  return `<section class="q" data-i="${i}">
    <div class="q-head"><span class="q-no">Câu ${i + 1}:</span><span>${fmtQ(q.q)}</span>${q.tag ? `<span class="q-tag">${esc(q.tag)}</span>` : ''}</div>
    <div class="opts">${q.opts.map((o, j) => `<button class="opt" data-o="${j}">${jp(o)}</button>`).join('')}</div>
    <div class="explain hide"></div>
  </section>`;
}

function drawPractice(host) {
  if (!practice) buildPractice();
  host.innerHTML = `
    <div class="panel">
      ${state.subject === 'vocab' ? posChips(byId(state.chapter).vocab) + '<div style="height:10px"></div>' : ''}
      <div class="stats">
        <span class="pill" id="pDone"></span>
        <span class="pill ok" id="pOk"></span>
        <span class="pill bad" id="pBad"></span>
        <span class="pill warn" id="pStreak"></span>
        <span class="spacer"></span>
        ${seg('order', state.order, [['orig', 'Gốc'], ['shuffle', 'Trộn']])}
        <button class="btn" data-act="reset">↻ Làm lại</button>
      </div>
      <div class="bar" style="margin-top:10px"><i id="pBar"></i></div>
    </div>
    <div id="practiceList">${practice.qs.map(qCard).join('')}</div>
    <div id="pFinish"></div>`;
  practice.qs.forEach((q, i) => {
    if (practice.ans[i] !== -1) applyAnswer($(`#practiceList [data-i="${i}"]`), q, practice.ans[i]);
  });
  updatePracticeStats();
}

function applyAnswer(card, q, chosen) {
  card.querySelectorAll('.opt').forEach((b, j) => {
    b.disabled = true;
    if (j === q.a) b.classList.add('right');
    else if (j === chosen) b.classList.add('wrong');
  });
  const ex = $('.explain', card);
  if (q.e) { ex.innerHTML = jp(q.e); ex.classList.remove('hide'); }
}

function updatePracticeStats() {
  const p = practice, total = p.qs.length;
  const done = p.ans.filter(a => a !== -1).length;
  const ok = p.qs.filter((q, i) => p.ans[i] === q.a).length;
  $('#pDone').textContent = `✅ ${done}/${total}`;
  $('#pOk').textContent = `✔ Đúng ${ok}`;
  $('#pBad').textContent = `✖ Sai ${done - ok}`;
  $('#pStreak').textContent = `🔥 Chuỗi ${p.streak}`;
  $('#pBar').style.width = `${(done / total) * 100}%`;
  if (done === total && !p.logged) {       // hoàn thành lượt luyện tập → ghi vào lịch sử
    p.logged = true;
    pushLog(makeEntry('practice', p.label, p.qs, p.ans, (Date.now() - p.startedAt) / 1000));
    persist();
    if (ok / total >= .75) FX.confetti();
  }
  $('#pFinish').innerHTML = done === total
    ? `<div class="panel score-box"><div class="score-big">${ok}<small>/${total}</small></div><div class="score-msg">${scoreMsg(ok / total)}</div><div style="margin-top:12px"><button class="btn primary" data-act="reset">↻ Làm lại chương này</button></div></div>`
    : '';
}

function answerPractice(opt) {
  const card = opt.closest('.q');
  const i = +card.dataset.i, q = practice.qs[i];
  if (practice.ans[i] !== -1) return;
  const o = +opt.dataset.o;
  if (!practice.startedAt) practice.startedAt = Date.now();
  practice.ans[i] = o;
  practice.streak = o === q.a ? practice.streak + 1 : 0;
  tot.done++;
  if (o === q.a) tot.ok++;
  tot.streak = Math.max(tot.streak, practice.streak);
  noteResult(q, o === q.a);
  trimMist();
  persist();
  updateTotals();
  if (practice.streak && practice.streak % 5 === 0) FX.toast(`🔥 ${practice.streak} câu đúng liên tiếp!`);
  applyAnswer(card, q, o);
  updatePracticeStats();
}

/* ================= KIỂM TRA ================= */
const scoreMsg = r => (r >= .9 ? 'Xuất sắc! 🎉' : r >= .75 ? 'Tốt lắm! 👏' : r >= .5 ? 'Tạm ổn, ôn thêm chút nữa nhé 💪' : 'Cần ôn lại kỹ hơn 📚');

function chLabel(ids) {
  const s = ids.slice().sort((a, b) => a - b);
  if (s.length === ALL_IDS.length) return 'Chương 1–12';
  if (s.length === 1) return `Chương ${s[0]}`;
  const contiguous = s.every((v, i) => i === 0 || v === s[i - 1] + 1);
  return contiguous ? `Chương ${s[0]}–${s[s.length - 1]}` : `${s.length} chương`;
}

function renderTest() {
  const v = $('#view');
  if (test.phase === 'run') { v.innerHTML = runHTML(); tick(); }
  else if (test.phase === 'result') v.innerHTML = resultHTML();
  else v.innerHTML = setupHTML();
}

function setupHTML() {
  const cfg = state.tcfg;
  const chs = CH.filter(c => cfg.chapters.includes(c.id));
  const nV = cfg.subjects.includes('vocab') ? chs.reduce((s, c) => s + c.vocab.length, 0) : 0;
  const nG = cfg.subjects.includes('grammar') ? chs.reduce((s, c) => s + quizOf(c).length, 0) : 0;
  const nK = cfg.subjects.includes('kanji') ? chs.reduce((s, c) => s + c.kw.length + c.kanji.filter(it => it.hv).length, 0) : 0;
  const avail = nV + nG + nK;
  const chips = CH.map(c => `<button class="chip ${cfg.chapters.includes(c.id) ? 'on' : ''}" data-act="tch" data-v="${c.id}">${c.title}</button>`).join('');
  const mistN = Object.keys(mist).length;
  const hist = log.length
    ? `<h2 class="sec">Gần đây</h2><div class="hist">${log.slice(0, 3).map(h =>
        `<div class="hist-item"><span>${{ test: '📝', jlpt: '🎧' }[h.type] || '✍️'} ${fmtDate(h.t)} · ${esc(h.label)}</span><b>${h.score}/${h.total} (${pct(h)}%)</b></div>`).join('')}</div>
       <div class="row" style="justify-content:center;margin-top:10px"><button class="btn" data-act="tab" data-v="history">📊 Xem toàn bộ lịch sử →</button></div>`
    : '';
  return `
    <div class="panel">
      <div class="row"><span class="label">Nội dung</span>
        <button class="chip ${cfg.subjects.includes('vocab') ? 'on' : ''}" data-act="tsub" data-v="vocab">🈶 Từ vựng</button>
        <button class="chip ${cfg.subjects.includes('grammar') ? 'on' : ''}" data-act="tsub" data-v="grammar">📐 Ngữ pháp</button>
        <button class="chip ${cfg.subjects.includes('kanji') ? 'on' : ''}" data-act="tsub" data-v="kanji">🈳 Kanji</button>
      </div>
      <div class="row"><span class="label">Chương</span><div class="chips">${chips}</div></div>
      <div class="row"><span class="label"></span>
        <button class="btn" data-act="tall">Chọn tất cả</button>
        <button class="btn" data-act="tnone">Bỏ chọn</button>
      </div>
      <div class="row"><span class="label">Số câu</span>${seg('tn', cfg.n, [[10, '10'], [20, '20'], [30, '30'], [50, '50'], [0, 'Tất cả']])}</div>
      <div class="row"><span class="label">Kiểu từ vựng</span>${seg('tdir', cfg.dir, [['mix', 'Hỗn hợp'], ['jv', 'Nhật → Việt'], ['vj', 'Việt → Nhật']])}</div>
      <div class="row"><span class="label">Thời gian</span>${seg('tmin', cfg.mins, [[0, 'Không giới hạn'], [5, '5 phút'], [10, '10 phút'], [20, '20 phút']])}</div>
    </div>
    <p class="note" style="text-align:center">Phạm vi đã chọn có <b>${nV}</b> câu từ vựng, <b>${nG}</b> câu ngữ pháp và <b>${nK}</b> câu kanji.</p>
    <button class="btn primary big" data-act="tstart" ${avail ? '' : 'disabled'}>▶ Bắt đầu kiểm tra</button>
    ${mistN ? `<button class="btn big" style="margin-top:8px" data-act="mretry">🔁 Luyện lại ${Math.min(mistN, 30)} câu từng làm sai</button>` : ''}
    ${hist}`;
}

function startTest(qs, label) {
  const cfg = state.tcfg;
  if (!qs) {
    const chs = CH.filter(c => cfg.chapters.includes(c.id));
    /* mỗi nội dung là một "kho": items có sẵn, hàm tạo câu hỏi và tỉ trọng mong muốn */
    const pools = [];
    if (cfg.subjects.includes('vocab')) pools.push({ w: 4.5, items: chs.flatMap(c => c.vocab), make: w => vocabQ(w, cfg.dir) });
    if (cfg.subjects.includes('grammar')) pools.push({ w: 2.5, items: chs.flatMap(c => quizOf(c)), make: finalize });
    if (cfg.subjects.includes('kanji')) {
      pools.push({
        w: 3, make: x => (x.it ? kanjiHV(x.it) : kanjiQ(x)),
        items: chs.flatMap(c => [...c.kw, ...c.kanji.filter(it => it.hv).map(it => ({ it }))])
      });
    }
    const avail = pools.reduce((s, p) => s + p.items.length, 0);
    const total = Math.min(cfg.n || avail, avail);
    const wsum = pools.reduce((s, p) => s + p.w, 0);
    pools.forEach(p => { p.n = Math.min(p.items.length, Math.round(total * p.w / wsum)); });
    let left = total - pools.reduce((s, p) => s + p.n, 0);          // chia lại phần dư / thiếu do làm tròn và giới hạn số câu
    for (let guard = 0; left !== 0 && guard < 50; guard++) {
      const p = pools.find(x => (left > 0 ? x.n < x.items.length : x.n > 0));
      if (!p) break;
      p.n += left > 0 ? 1 : -1; left += left > 0 ? -1 : 1;
    }
    qs = shuffle(pools.flatMap(p => pick(p.items, p.n).map(p.make)));
  }
  clearInterval(test.timerId);
  test = {
    phase: 'run', qs, ans: qs.map(() => -1),
    startedAt: Date.now(), limit: cfg.mins * 60, timerId: setInterval(tick, 1000),
    label: label || `${['vocab', 'grammar', 'kanji'].filter(s => cfg.subjects.includes(s)).map(s => KIND[s]).join(' + ')} · ${chLabel(cfg.chapters)}`
  };
  render();
  window.scrollTo(0, 0);
}

function runHTML() {
  const n = test.qs.length;
  return `
    <div class="sticky">
      <div class="stats">
        <span class="pill">Đã làm <b id="tDone">0</b>/${n}</span>
        <span class="pill warn timer" id="tTimer">⏱ 00:00</span>
        <span class="spacer"></span>
        <button class="btn" data-act="tquit">Thoát</button>
        <button class="btn primary" data-act="tsubmit">Nộp bài</button>
      </div>
      <div class="bar" style="margin-top:8px"><i id="tBar"></i></div>
    </div>
    <div id="testList">${test.qs.map(qCard).join('')}</div>
    <button class="btn primary big" data-act="tsubmit">Nộp bài</button>`;
}

function tick() {
  if (test.phase !== 'run') return;
  const used = (Date.now() - test.startedAt) / 1000;
  const el = $('#tTimer');
  if (test.limit) {
    const left = test.limit - used;
    if (el) { el.textContent = `⏱ ${mmss(left)}`; el.classList.toggle('low', left <= 30); }
    if (left <= 0) submitTest(true);
  } else if (el) el.textContent = `⏱ ${mmss(used)}`;
}

function pickTestOption(opt) {
  const card = opt.closest('.q');
  const i = +card.dataset.i;
  test.ans[i] = +opt.dataset.o;
  card.querySelectorAll('.opt').forEach((b, j) => b.classList.toggle('sel', j === test.ans[i]));
  const done = test.ans.filter(a => a !== -1).length;
  $('#tDone').textContent = done;
  $('#tBar').style.width = `${(done / test.qs.length) * 100}%`;
}

function submitTest(auto) {
  const left = test.ans.filter(a => a === -1).length;
  if (!auto && left && !confirm(`Còn ${left} câu chưa làm. Bạn vẫn muốn nộp bài?`)) return;
  clearInterval(test.timerId);
  const score = test.qs.filter((q, i) => test.ans[i] === q.a).length;
  test.phase = 'result';
  test.score = score;
  test.duration = Math.min((Date.now() - test.startedAt) / 1000, test.limit || Infinity);
  test.onlyWrong = score < test.qs.length;

  let run = 0;                                   // chuỗi đúng liên tiếp dài nhất trong bài
  test.qs.forEach((q, i) => {
    const ok = test.ans[i] === q.a;
    run = ok ? run + 1 : 0;
    tot.streak = Math.max(tot.streak, run);
    if (test.ans[i] !== -1) { tot.done++; noteResult(q, ok); }
    if (ok) tot.ok++;
  });
  trimMist();
  pushLog(makeEntry('test', test.label, test.qs, test.ans, test.duration));
  persist();
  render();
  window.scrollTo(0, 0);
  if (score / test.qs.length >= .75) FX.confetti();
}

function resultHTML() {
  const { qs, ans, score } = test, total = qs.length;
  const bar = (r) => `<div class="bar"><i style="width:${r * 100}%"></i></div>`;
  const group = (label, items) => {
    if (!items.length) return '';
    const ok = items.filter(x => ans[x.i] === x.q.a).length;
    return `<div class="bk"><span>${label}</span>${bar(ok / items.length)}<b>${ok}/${items.length}</b></div>`;
  };
  const indexed = qs.map((q, i) => ({ q, i }));
  const byKind = k => indexed.filter(x => x.q.kind === k);
  const chIds = [...new Set(qs.map(q => q.ch))].sort((a, b) => a - b);
  const wrong = indexed.filter(x => ans[x.i] !== x.q.a);
  const shown = test.onlyWrong ? wrong : indexed;

  const review = shown.map(({ q, i }) => {
    const chosen = ans[i], right = chosen === q.a;
    const opts = q.opts.map((o, j) => `<button class="opt ${j === q.a ? 'right' : j === chosen ? 'wrong' : ''}" disabled>${jp(o)}</button>`).join('');
    const line = chosen === -1 ? `<div class="ans-line bad">Bạn chưa trả lời.</div>` : right ? `<div class="ans-line ok">✔ Chính xác</div>` : `<div class="ans-line bad">✖ Bạn chọn: ${jp(q.opts[chosen])}</div>`;
    return `<section class="q">
      <div class="q-head"><span class="q-no">Câu ${i + 1}:</span><span>${fmtQ(q.q)}</span><span class="q-tag">${esc(q.tag)} · Chương ${q.ch}</span></div>
      <div class="opts">${opts}</div>${line}${q.e ? `<div class="explain">${jp(q.e)}</div>` : ''}
    </section>`;
  }).join('');

  return `
    <div class="panel score-box">
      <div class="score-big">${score}<small>/${total}</small></div>
      <div class="score-msg">${Math.round(score / total * 100)}% · ${scoreMsg(score / total)}</div>
      <div class="note" style="margin-top:4px">Thời gian làm bài: ${mmss(test.duration)}</div>
      <div class="breakdown">
        ${group('Từ vựng', byKind('vocab'))}
        ${group('Ngữ pháp', byKind('grammar'))}
        ${group('Kanji', byKind('kanji'))}
        ${chIds.length > 1 ? chIds.map(id => group(`Chương ${id}`, indexed.filter(x => x.q.ch === id))).join('') : ''}
      </div>
      <div class="row" style="justify-content:center;margin-top:16px">
        ${wrong.length ? `<button class="btn primary" data-act="tretry">🔁 Làm lại ${wrong.length} câu sai</button>` : ''}
        <button class="btn" data-act="tnew">⚙ Bài kiểm tra mới</button>
      </div>
    </div>
    <div class="row" style="margin-bottom:10px"><span class="label" style="min-width:auto">Xem lại bài</span>
      ${seg('twrong', test.onlyWrong ? 1 : 0, [[1, `Câu sai (${wrong.length})`], [0, `Tất cả (${total})`]])}
    </div>
    ${review || '<div class="empty">🎉 Bạn trả lời đúng tất cả!</div>'}`;
}

/* ================= ĐỀ JLPT ================= */
const jpaper = id => JLPT.find(p => p.id === id) || JLPT[0];
const jsec = () => jpaper(jl.paper).sections.find(s => s.id === jl.queue[jl.idx]);
const jtotal = s => s.groups.reduce((n, g) => n + g.ans.length, 0);
const jsrc = (p, f) => `jlpt/${p.id}/${f}`;
const jdone = s => jl.ans[s.id].flat().filter(Boolean).length;
const bkRow = (label, ok, n) => {
  const p = n ? Math.round(ok / n * 100) : 0;
  return `<div class="bk"><span>${esc(label)}</span><div class="bar ${tone(p)}"><i style="width:${p}%"></i></div><b>${ok}/${n}</b></div>`;
};

function renderJlpt() {
  const v = $('#view');
  if (jl.phase === 'menu') v.innerHTML = jMenuHTML();
  else if (jl.phase === 'final') v.innerHTML = jFinalHTML();
  else { v.innerHTML = jRunHTML(); jTick(); }
}

function jMenuHTML() {
  const cfg = state.jcfg, p = jpaper(cfg.paper);
  const papers = JLPT.map(x => `<button class="paper ${x.id === p.id ? 'on' : ''}" data-act="jpaper" data-v="${x.id}"><b>${esc(x.title)}</b><small>${esc(x.desc)}</small></button>`).join('');
  const rows = p.sections.map(s => `<tr><td>${esc(s.vi)}<div class="note">${esc(s.name)}</div></td><td>${jtotal(s)} câu</td><td>${s.min ? `${s.min} phút` : 'Theo file audio'}</td></tr>`).join('');
  return `
    <div class="panel">
      <div class="sec-title">1 · Chọn đề thi</div>
      <div class="paper-list">${papers}</div>
    </div>
    <div class="panel">
      <div class="sec-title">2 · Cách làm bài</div>
      <div class="row"><span class="label">Hình thức</span>${seg('jmode', cfg.mode, [['full', '🎓 Thi cả bài (3 phần liên tiếp)'], ['section', '🎯 Luyện từng phần']])}</div>
      ${cfg.mode === 'section' ? `<div class="row"><span class="label">Phần thi</span>${seg('jsec', cfg.sec, p.sections.map(s => [s.id, s.vi]))}</div>` : ''}
      <div class="row"><span class="label">Thời gian</span>${seg('jtime', cfg.timed ? 1 : 0, [[1, '⏱ Tính giờ như thi thật'], [0, 'Không giới hạn']])}</div>
      <div class="table-wrap" style="margin-top:12px"><table class="vt"><thead><tr><th>Phần thi</th><th>Số câu</th><th>Thời gian</th></tr></thead><tbody>${rows}</tbody></table></div>
    </div>
    <button class="btn primary big" data-act="jstart">▶ Bắt đầu làm đề</button>
    <p class="note" style="text-align:center;margin-top:12px">Đề và file nghe lấy từ tài liệu luyện thi chính thức của kỳ thi JLPT. Bạn xem trang đề, chọn đáp án ở “Phiếu trả lời”; phần nghe có thể nghe lại tùy ý khi luyện.</p>`;
}

function jSheetHTML(p, s, review) {
  const ans = jl.ans[s.id];
  const tracks = (s.tracks || []).map(t => `<div class="jg"><div class="jg-name">🎧 ${esc(t.label)}</div><audio controls preload="none" src="${jsrc(p, t.file)}"></audio></div>`).join('');
  const groups = s.groups.map((g, gi) => `<div class="jg">
      <div class="jg-name">${esc(g.name)}</div>
      ${g.audio ? `<audio controls preload="none" src="${jsrc(p, g.audio)}"></audio>` : ''}
      ${g.ans.map((right, qi) => {
        const mine = ans[gi][qi];
        const bubs = Array.from({ length: g.choices }, (_, i) => {
          const c = i + 1;
          const cls = review ? (c === right ? 'right' : c === mine ? 'wrong' : '') : (c === mine ? 'sel' : '');
          return `<button class="bub ${cls}" data-act="jans" data-v="${gi}.${qi}.${c}" ${review ? 'disabled' : ''}>${c}</button>`;
        }).join('');
        return `<div class="jq" data-g="${gi}" data-q="${qi}"><b>${g.start + qi}</b>${bubs}</div>`;
      }).join('')}
    </div>`).join('');
  return tracks + groups;
}

function jRunHTML() {
  const p = jpaper(jl.paper), s = jsec(), review = jl.phase === 'review';
  const total = jtotal(s), last = jl.idx === jl.queue.length - 1;
  const r = jl.res[s.id];
  const nextBtn = last
    ? (jl.queue.length > 1 ? '<button class="btn primary" data-act="jfinal">🏁 Xem kết quả tổng</button>' : '<button class="btn primary" data-act="jmenu">↩ Về danh sách đề</button>')
    : '<button class="btn primary" data-act="jnext">Phần tiếp theo →</button>';
  const head = `<div class="sticky"><div class="stats">
      <span class="pill">${esc(s.vi)}${jl.queue.length > 1 ? ` · ${jl.idx + 1}/${jl.queue.length}` : ''}</span>
      <span class="pill">${review ? 'Điểm' : 'Đã làm'} <b id="jDone">${review ? r.ok : jdone(s)}</b>/${total}</span>
      ${review ? '' : '<span class="pill warn timer" id="jTimer">⏱ 00:00</span>'}
      <span class="spacer"></span>
      ${review ? nextBtn : '<button class="btn" data-act="jquit">Thoát</button><button class="btn primary" data-act="jsubmit">Nộp phần này</button>'}
    </div><div class="bar" style="margin-top:8px"><i id="jBar" style="width:${review ? r.ok / total * 100 : jdone(s) / total * 100}%"></i></div></div>`;
  const summary = review ? `<div class="panel score-box">
      <div class="score-big">${r.ok}<small>/${r.total}</small></div>
      <div class="score-msg">${Math.round(r.ok / r.total * 100)}% · ${scoreMsg(r.ok / r.total)}</div>
      <div class="note" style="margin-top:4px">Thời gian làm phần này: ${mmss(r.dur)} · Xanh = đáp án đúng, đỏ = bạn chọn sai</div>
      <div class="breakdown">${r.groups.map(g => bkRow(g.name, g.ok, g.n)).join('')}</div>
    </div>` : '';
  const pages = s.pages.map(f => `<img class="jl-page" loading="lazy" src="${jsrc(p, f)}" alt="Trang đề">`).join('');
  const script = review && s.id === 'l' && p.script.length
    ? `<details class="jl-script"><summary>📜 Xem lời thoại (script) của phần nghe</summary>${p.script.map(f => `<img class="jl-page" loading="lazy" src="${jsrc(p, f)}" alt="Lời thoại">`).join('')}</details>` : '';
  return `${head}${summary}
    <div class="jl-layout">
      <div class="jl-pages">${pages}${script}</div>
      <aside class="jl-sheet" id="jSheet"><div class="sec-title">📝 Phiếu trả lời</div>${jSheetHTML(p, s, review)}</aside>
    </div>
    <button class="jl-fab" data-act="jsheet">📝 Phiếu</button>`;
}

function jTick() {
  if (jl.phase !== 'run') return;
  const used = (Date.now() - jl.secStart) / 1000, el = $('#jTimer');
  if (jl.limit) {
    const left = jl.limit - used;
    if (el) { el.textContent = `⏱ ${mmss(left)}`; el.classList.toggle('low', left <= 60); }
    if (left <= 0) jSubmit(true);
  } else if (el) el.textContent = `⏱ ${mmss(used)}`;
}

function jStart() {
  const cfg = state.jcfg, p = jpaper(cfg.paper);
  clearInterval(jl.timerId);
  jl = { phase: 'run', paper: p.id, queue: cfg.mode === 'full' ? p.sections.map(s => s.id) : [cfg.sec], idx: 0, ans: {}, res: {}, timed: !!cfg.timed };
  p.sections.forEach(s => { jl.ans[s.id] = s.groups.map(g => g.ans.map(() => 0)); });
  jBegin();
}

function jBegin() {
  const s = jsec();
  jl.phase = 'run';
  jl.secStart = Date.now();
  jl.limit = jl.timed && s.min ? s.min * 60 : 0;
  clearInterval(jl.timerId);
  jl.timerId = setInterval(jTick, 1000);
  render();
  window.scrollTo(0, 0);
}

function jAnswer(v) {
  const s = jsec();
  const [gi, qi, c] = v.split('.').map(Number);
  const a = jl.ans[s.id][gi];
  a[qi] = a[qi] === c ? 0 : c;
  const row = $(`#jSheet .jq[data-g="${gi}"][data-q="${qi}"]`);
  row.querySelectorAll('.bub').forEach((b, i) => b.classList.toggle('sel', i + 1 === a[qi]));
  const done = jdone(s);
  $('#jDone').textContent = done;
  $('#jBar').style.width = `${done / jtotal(s) * 100}%`;
}

function jSubmit(auto) {
  const p = jpaper(jl.paper), s = jsec(), ans = jl.ans[s.id];
  const blank = ans.flat().filter(a => !a).length;
  if (!auto && blank && !confirm(`Còn ${blank} câu chưa chọn. Bạn vẫn muốn nộp phần này?`)) return;
  clearInterval(jl.timerId);
  const miss = [], groups = [];
  let ok = 0;
  s.groups.forEach((g, gi) => {
    let gok = 0;
    g.ans.forEach((right, qi) => {
      const mine = ans[gi][qi];
      if (mine === right) gok++; else miss.push({ no: g.start + qi, g: g.name, mine, ans: right });
    });
    ok += gok;
    groups.push({ name: g.name, ok: gok, n: g.ans.length });
  });
  const total = jtotal(s);
  const dur = Math.min((Date.now() - jl.secStart) / 1000, jl.limit || Infinity);
  jl.res[s.id] = { ok, total, groups, miss, dur };
  jl.phase = 'review';
  tot.done += total - blank;
  tot.ok += ok;
  const t = Date.now();
  pushLog({ id: t, t, type: 'jlpt', label: `JLPT N5 · ${p.short} · ${s.vi}`, score: ok, total, dur: Math.round(dur), wrong: [], name: state.name, jl: { paper: p.id, paperTitle: p.title, sec: s.id, miss } });
  persist();
  render();
  window.scrollTo(0, 0);
  if (ok / total >= .75) FX.confetti();
}

function jFinalHTML() {
  const p = jpaper(jl.paper);
  const rs = p.sections.filter(s => jl.res[s.id]).map(s => ({ s, r: jl.res[s.id] }));
  const lang = rs.filter(x => x.s.id !== 'l'), lis = rs.find(x => x.s.id === 'l');
  const lok = lang.reduce((n, x) => n + x.r.ok, 0), ltot = lang.reduce((n, x) => n + x.r.total, 0);
  const full = lang.length === 2 && lis;
  const sl = full ? Math.round(lok / ltot * 120) : 0, ss = full ? Math.round(lis.r.ok / lis.r.total * 60) : 0;
  const pass = full && sl + ss >= 80 && sl >= 38 && ss >= 19;
  const all = rs.reduce((n, x) => n + x.r.ok, 0), allT = rs.reduce((n, x) => n + x.r.total, 0);
  return `
    <div class="panel score-box">
      <div class="sec-title">${esc(p.title)}</div>
      <div class="score-big">${all}<small>/${allT}</small></div>
      <div class="score-msg">${Math.round(all / allT * 100)}% · ${scoreMsg(all / allT)}</div>
      <div class="breakdown">${rs.map(x => bkRow(x.s.vi, x.r.ok, x.r.total)).join('')}</div>
      ${full ? `<div class="jl-est ${pass ? 'good' : 'low'}">
          <div><b>Điểm quy đổi ước tính</b> (không phải điểm chính thức)</div>
          <div class="jl-est-row"><span>Kiến thức ngôn ngữ</span><b>${sl}/120</b><small>tối thiểu 38</small></div>
          <div class="jl-est-row"><span>Nghe hiểu</span><b>${ss}/60</b><small>tối thiểu 19</small></div>
          <div class="jl-est-row"><span>Tổng</span><b>${sl + ss}/180</b><small>đỗ N5 từ 80</small></div>
          <div class="jl-verdict">${pass ? '🎉 Với kết quả này bạn đạt mức đỗ N5.' : '📚 Chưa đạt mức đỗ — hãy xem lại các câu sai ở từng phần.'}</div>
        </div>
        <p class="note">JLPT chấm theo thang điểm quy đổi tùy độ khó từng đề, nên con số này chỉ để tham khảo.</p>` : ''}
      <div class="row" style="justify-content:center;margin-top:16px">
        <button class="btn primary" data-act="jmenu">↩ Làm đề khác</button>
        <button class="btn" data-act="tab" data-v="history">📊 Xem lịch sử</button>
      </div>
    </div>`;
}

/* ================= LỊCH SỬ ================= */
function renderHistory() {
  const n = log.length;
  const mistN = Object.keys(mist).length;
  if (!n && !mistN) {
    $('#view').innerHTML = `<div class="panel empty">📭 Chưa có lượt làm bài nào.<br>Hoàn thành một bài <b>Luyện tập</b> hoặc <b>Kiểm tra</b> để xem thống kê tại đây.</div>`;
    return;
  }
  const avg = n ? Math.round(log.reduce((s, e) => s + pct(e), 0) / n) : 0;
  const best = n ? Math.max(...log.map(pct)) : 0;

  const byCh = {}, kinds = {};
  const sum = (o, k, [ok, t]) => { const a = o[k] || (o[k] = [0, 0]); a[0] += ok; a[1] += t; };
  log.forEach(e => {
    Object.entries(e.byCh || {}).forEach(([c, v]) => sum(byCh, c, v));
    Object.entries(e.kinds || {}).forEach(([k, v]) => sum(kinds, k, v));
  });
  const accRow = (label, v) => {
    if (!v || !v[1]) return `<div class="bk"><span>${label}</span><div class="bar"><i style="width:0"></i></div><b>—</b></div>`;
    const p = Math.round(v[0] / v[1] * 100);
    return `<div class="bk"><span>${label}</span><div class="bar ${tone(p)}"><i style="width:${p}%"></i></div><b title="${v[0]}/${v[1]}">${p}%</b></div>`;
  };

  const recent = log.slice(0, 20).reverse();
  const trend = recent.map(e => `<i class="${tone(pct(e))}" style="height:${Math.max(pct(e), 4)}%" title="${esc(e.label)} · ${pct(e)}% · ${fmtDate(e.t)}"></i>`).join('');

  const list = log.filter(e => state.hf === 'all' || e.type === state.hf);
  const cnt = t => log.filter(e => e.type === t).length;

  const items = list.map(e => {
    const open = openIds.has(String(e.id));
    const p = pct(e);
    let body = '';
    if (open) {
      if (e.legacy) body = '<div class="note">Bài làm từ phiên bản cũ nên không có chi tiết.</div>';
      else if (e.type === 'jlpt') {
        const miss = e.jl.miss;
        body = `<div class="note" style="margin:8px 0">Đề: ${esc(e.jl.paperTitle)}</div>
          ${miss.length ? `<table class="vt"><thead><tr><th>Câu</th><th>Mục</th><th>Bạn chọn</th><th>Đáp án</th></tr></thead><tbody>${miss.map(m =>
            `<tr><td>${m.no}</td><td>${esc(m.g)}</td><td class="${m.mine ? '' : 'note'}">${m.mine || 'Bỏ trống'}</td><td class="w">${m.ans}</td></tr>`).join('')}</tbody></table>`
            : '<div class="empty">🎉 Đúng tất cả!</div>'}
          <div class="row" style="justify-content:center;margin-top:12px"><button class="btn primary" data-act="jredo" data-v="${e.id}">🔁 Làm lại phần này</button></div>`;
      } else {
        const kRows = Object.entries(e.kinds || {}).map(([k, v]) => accRow(KIND[k] || k, v)).join('');
        const cRows = Object.keys(e.byCh || {}).length > 1
          ? Object.keys(e.byCh).sort((a, b) => a - b).map(c => accRow(`Chương ${c}`, e.byCh[c])).join('') : '';
        const wrongs = (e.wrong || []).map((q, i) => `<section class="q">
            <div class="q-head"><span class="q-no">Câu ${i + 1}:</span><span>${fmtQ(q.q)}</span><span class="q-tag">${esc(q.tag)} · Chương ${q.ch}</span></div>
            <div class="opts">${q.opts.map(o => `<button class="opt ${o === q.correct ? 'right' : o === q.pick ? 'wrong' : ''}" disabled>${jp(o)}</button>`).join('')}</div>
            ${q.pick === '' ? '<div class="ans-line bad">Bạn chưa trả lời.</div>' : ''}${q.e ? `<div class="explain">${jp(q.e)}</div>` : ''}
          </section>`).join('');
        body = `<div class="breakdown">${kRows}${cRows}</div>
          ${wrongs ? `<h2 class="sec">Các câu sai (${e.wrong.length}${e.score + e.wrong.length < e.total ? '+' : ''})</h2>${wrongs}
            <div class="row" style="justify-content:center"><button class="btn primary" data-act="hretry" data-v="${e.id}">🔁 Làm lại ${e.wrong.length} câu sai</button></div>`
            : '<div class="empty">🎉 Trả lời đúng tất cả!</div>'}`;
      }
    }
    return `<div class="h-item ${open ? 'open' : ''}">
      <button class="h-head" data-act="hopen" data-v="${e.id}">
        <span class="h-ico">${{ test: '📝', jlpt: '🎧' }[e.type] || '✍️'}</span>
        <span class="h-main"><b>${esc(e.label)}</b><small>${fmtDate(e.t)}${e.dur ? ` · ⏱ ${mmss(e.dur)}` : ''}${e.name ? ` · 👤 ${esc(e.name)}` : ''}</small></span>
        <span class="score-pill ${tone(p)}">${e.score}/${e.total} · ${p}%</span>
        <span class="chev">▾</span>
      </button>
      ${open ? `<div class="h-body">${body}</div>` : ''}
    </div>`;
  }).join('');

  $('#view').innerHTML = `
    <div class="sum">
      <div class="stat"><b>${n}</b><span>Lượt làm bài</span></div>
      <div class="stat"><b>${avg}%</b><span>Điểm trung bình</span></div>
      <div class="stat"><b>${best}%</b><span>Cao nhất</span></div>
      <div class="stat"><b>${tot.ok}<small>/${tot.done}</small></b><span>Câu đúng / đã làm</span></div>
    </div>
    ${n ? `<div class="panel"><div class="sec-title">Điểm các lượt gần đây</div><div class="trend">${trend}</div></div>
    <div class="panel"><div class="sec-title">Độ chính xác theo nội dung</div>
      <div class="breakdown">
        ${accRow('Từ vựng', kinds.vocab)}${accRow('Ngữ pháp', kinds.grammar)}${accRow('Kanji', kinds.kanji)}
        <hr class="sep">
        ${CH.map(c => accRow(c.title, byCh[c.id])).join('')}
      </div>
    </div>` : ''}
    <div class="row" style="margin-bottom:12px">
      <button class="btn primary" data-act="mretry" ${mistN ? '' : 'disabled'}>🔁 Luyện lại câu từng sai (${mistN})</button>
      <span class="spacer"></span>
      <button class="btn bad" data-act="hclear">🗑 Xóa lịch sử</button>
    </div>
    ${n ? `<div class="row" style="margin-bottom:10px">${seg('hf', state.hf, [['all', `Tất cả (${n})`], ['test', `📝 Kiểm tra (${cnt('test')})`], ['practice', `✍️ Luyện tập (${cnt('practice')})`], ['jlpt', `🎧 JLPT (${cnt('jlpt')})`]])}</div>
    <div class="h-list">${items || '<div class="empty">Không có lượt nào trong mục này.</div>'}</div>` : ''}`;
}

/* ================= events ================= */
function act(a, v) {
  switch (a) {
    /* chung */
    case 'tab': state.tab = v; persist(); return render();
    case 'fx': state.fx = v === '1'; persist(); return render();
    case 'name': {
      const nm = prompt('Nhập tên của bạn (hiện trong lịch sử):', state.name);
      if (nm !== null) { state.name = nm.trim().slice(0, 20); persist(); render(); }
      return;
    }

    /* đề JLPT */
    case 'jpaper': state.jcfg.paper = v; persist(); return renderJlpt();
    case 'jmode': state.jcfg.mode = v; persist(); return renderJlpt();
    case 'jsec': state.jcfg.sec = v; persist(); return renderJlpt();
    case 'jtime': state.jcfg.timed = +v; persist(); return renderJlpt();
    case 'jstart': persist(); return jStart();
    case 'jans': return jAnswer(v);
    case 'jsubmit': return jSubmit(false);
    case 'jnext': jl.idx++; return jBegin();
    case 'jfinal': jl.phase = 'final'; render(); return window.scrollTo(0, 0);
    case 'jmenu': clearInterval(jl.timerId); jl = { phase: 'menu' }; render(); return window.scrollTo(0, 0);
    case 'jquit':
      if (confirm('Thoát bài làm? Kết quả phần đang làm sẽ không được lưu.')) { clearInterval(jl.timerId); jl = { phase: 'menu' }; render(); }
      return;
    case 'jsheet': { const sh = $('#jSheet'); if (sh) sh.classList.toggle('open'); return; }
    case 'jredo': {
      const e = log.find(x => String(x.id) === v);
      if (!e || !e.jl) return;
      state.jcfg = { ...state.jcfg, paper: e.jl.paper, mode: 'section', sec: e.jl.sec };
      state.tab = 'jlpt'; persist();
      return jStart();
    }

    /* lịch sử */
    case 'hf': state.hf = v; persist(); return renderHistory();
    case 'hopen': if (openIds.has(v)) openIds.delete(v); else openIds.add(v); return renderHistory();
    case 'hretry': {
      const e = log.find(x => String(x.id) === v);
      if (!e || !e.wrong.length) return;
      state.tab = 'test'; persist();
      return startTest(e.wrong.map(q => finalize(q)), `Làm lại câu sai · ${e.label}`);
    }
    case 'mretry': {
      const qs = shuffle(Object.values(mist).map(x => x.q)).slice(0, 30).map(q => finalize(q));
      if (!qs.length) return;
      state.tab = 'test'; persist();
      return startTest(qs, 'Luyện lại câu từng sai');
    }
    case 'hclear':
      if (confirm('Xóa toàn bộ lịch sử, sổ câu sai và số liệu tổng? Không thể hoàn tác.')) {
        log = []; mist = {}; tot = { ok: 0, done: 0, streak: 0 }; openIds.clear();
        persist(); render();
      }
      return;
    case 'script':
      if (test.phase === 'run') return;
      state.script = v; practice = null; persist(); return render();

    /* ôn tập */
    case 'subject': state.subject = v; practice = null; cards = null; persist(); return renderReview();
    case 'mode': state.mode = v; persist(); return renderReview();
    case 'chapter': state.chapter = +v; practice = null; cards = null; persist(); return renderReview();
    case 'vview': state.vview = v; persist(); return drawStudy();
    case 'order': state.order = v; practice = null; persist(); return drawStudy();
    case 'reset': practice = null; drawStudy(); return window.scrollTo(0, 0);
    case 'cdir': state.cdir = v; cards.flip = false; persist(); return drawStudy();
    case 'cshuf': state.cshuf = !state.cshuf; cards = null; persist(); return drawStudy();
    case 'conly': state.conly = !state.conly; cards = null; persist(); return drawStudy();
    case 'cclear':
      if (confirm('Xóa tiến độ “Đã nhớ” của chương này?')) {
        (state.subject === 'kanji' ? byId(state.chapter).kanji : byId(state.chapter).vocab).forEach(w => known.delete(w.id));
        cards = null; persist(); drawStudy();
      }
      return;
    case 'pos': state.pos = v; cards = null; practice = null; persist(); return drawStudy();
    case 'cover': state.cover = v; persist(); return drawStudy();
    case 'flip': cards.flip = !cards.flip; return drawStudy();
    case 'cnext': cards.i = (cards.i + 1) % cards.list.length; cards.flip = false; return drawStudy();
    case 'cprev': cards.i = (cards.i - 1 + cards.list.length) % cards.list.length; cards.flip = false; return drawStudy();
    case 'cmark': {
      const w = cards.list[cards.i];
      if (v === '1') known.add(w.id); else known.delete(w.id);
      persist();
      if (state.conly && v === '1') {            // từ đã nhớ rời khỏi bộ thẻ
        cards.list.splice(cards.i, 1);
        if (cards.i >= cards.list.length) cards.i = 0;
      } else cards.i = (cards.i + 1) % cards.list.length;
      cards.flip = false;
      return drawStudy();
    }

    /* kiểm tra */
    case 'tsub': {
      const s = state.tcfg.subjects;
      state.tcfg.subjects = s.includes(v) ? s.filter(x => x !== v) : [...s, v];
      break;
    }
    case 'tch': {
      const c = state.tcfg.chapters, id = +v;
      state.tcfg.chapters = c.includes(id) ? c.filter(x => x !== id) : [...c, id];
      break;
    }
    case 'tall': state.tcfg.chapters = ALL_IDS.slice(); break;
    case 'tnone': state.tcfg.chapters = []; break;
    case 'tn': state.tcfg.n = +v; break;
    case 'tdir': state.tcfg.dir = v; break;
    case 'tmin': state.tcfg.mins = +v; break;
    case 'tstart': persist(); return startTest();
    case 'tsubmit': return submitTest(false);
    case 'tquit':
      if (confirm('Thoát bài kiểm tra? Kết quả sẽ không được lưu.')) { clearInterval(test.timerId); test = { phase: 'setup' }; render(); }
      return;
    case 'tretry': return startTest(test.qs.filter((q, i) => test.ans[i] !== q.a).map(q => finalize(q)), `Làm lại câu sai · ${test.label}`);
    case 'tnew': test = { phase: 'setup' }; return render();
    case 'twrong': test.onlyWrong = v === '1'; return renderTest();
    default: return;
  }
  persist();
  renderTest();
}

app.addEventListener('click', e => {
  const reveal = e.target.closest('td.cover, .kcv');
  if (reveal) { reveal.classList.toggle('show'); return; }
  const btn = e.target.closest('[data-act]');
  if (btn) { act(btn.dataset.act, btn.dataset.v); return; }
  const opt = e.target.closest('.opt');
  if (!opt || opt.disabled) return;
  if (opt.closest('#practiceList')) answerPractice(opt);
  else if (opt.closest('#testList')) pickTestOption(opt);
});

document.addEventListener('keydown', e => {
  if (state.tab !== 'review' || state.mode !== 'study' || state.subject === 'grammar' || state.vview !== 'cards') return;
  if (!cards || !cards.list.length) return;
  if (e.target.matches('input, textarea, select') || e.ctrlKey || e.metaKey || e.altKey) return;
  if (e.key === 'ArrowRight') act('cnext');
  else if (e.key === 'ArrowLeft') act('cprev');
  else if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'ArrowDown') { e.preventDefault(); act('flip'); }
});

FX.init();
render();
})();
