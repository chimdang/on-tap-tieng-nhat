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
/* Văn bản tiếng Nhật → HTML theo chế độ chữ viết (kanji / furigana / kana).
   Câu hỏi "… đọc là gì?" không gắn furigana (sẽ lộ đáp án) và bị loại khi ở chế độ "Chỉ kana". */
const READ_Q = /đọc là gì/;
const jp = t => (READ_Q.test(t) ? esc(t) : Furigana.render(t, state.script));
const quizOf = c => c.quiz.filter(q => state.script !== 'kana' || !READ_Q.test(q.q));
const fmtQ = s => jp(s).replace(/\(\s+\)/g, '<span class="blank"></span>');

/* ================= data ================= */
const CH = CHAPTERS.map(c => ({
  id: c.id,
  title: c.title,
  vocab: c.vocab.trim().split('\n').map((l, i) => {
    const [k, w, m] = l.split('|').map(x => x.trim());
    return { id: `${c.id}:${i}`, ch: c.id, k, w, m };
  }),
  grammar: c.grammar,
  quiz: c.quiz.map(q => ({ kind: 'grammar', ch: c.id, tag: 'Ngữ pháp', q: q[0], correct: q[1], opts: [q[1], q[2], q[3], q[4]], e: q[5] }))
}));
const byId = id => CH.find(c => c.id === id);
const ALL_WORDS = CH.flatMap(c => c.vocab);
const ALL_IDS = CH.map(c => c.id);

Furigana.init(EXTRA_READINGS, ALL_WORDS);

/* Dạng chữ Nhật của một từ: chế độ "Chỉ kana" dùng cách đọc, còn lại dùng kanji (nếu có) */
const disp = w => (w.k && state.script !== 'kana' ? w.k : w.w);

function finalize(q) {
  const opts = shuffle(q.opts);
  return { ...q, opts, a: opts.indexOf(q.correct) };
}

function distractors(w, textOf, n = 3, filter = () => true) {
  const seen = new Set([textOf(w)]);
  const same = shuffle(ALL_WORDS.filter(x => x.ch === w.ch && x !== w));
  const other = shuffle(ALL_WORDS.filter(x => x.ch !== w.ch));
  const out = [];
  for (const x of same.concat(other)) {
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
  if (kind === 'vj') {
    return finalize({ kind: 'vocab', ch: w.ch, tag: 'Việt → Nhật', q: `「${w.m}」 trong tiếng Nhật là?`, correct: disp(w), opts: [disp(w), ...distractors(w, disp)], e });
  }
  if (kind === 'rd') {
    return finalize({ kind: 'vocab', ch: w.ch, tag: 'Cách đọc', q: `Cách đọc của 「${w.k}」 là?`, correct: w.w, opts: [w.w, ...distractors(w, x => x.w, 3, x => x.k)], e });
  }
  return finalize({ kind: 'vocab', ch: w.ch, tag: 'Nhật → Việt', q: `「${disp(w)}」 có nghĩa là gì?`, correct: w.m, opts: [w.m, ...distractors(w, x => x.m)], e });
}

/* ================= state ================= */
const KEY = 'jp-review-v1';
const saved = store.get(KEY, {});
const state = Object.assign({
  script: 'kanji', tab: 'review', subject: 'vocab', chapter: 1, mode: 'study',
  vview: 'cards', order: 'orig', cdir: 'jv', cshuf: false, conly: false, cover: 'none',
  tcfg: { subjects: ['vocab', 'grammar'], chapters: ALL_IDS.slice(), n: 20, dir: 'mix', mins: 0 }
}, saved.ui || {});
const known = new Set(saved.known || []);
let history = saved.history || [];
const persist = () => store.set(KEY, { ui: state, known: [...known], history });

let practice = null;   // phiên luyện tập hiện tại
let cards = null;      // bộ thẻ ghi nhớ hiện tại
let test = { phase: 'setup' };

const app = $('#app');

/* ================= render: root ================= */
function render() {
  const tb = (id, label) => `<button class="tab ${state.tab === id ? 'on' : ''}" data-act="tab" data-v="${id}">${label}</button>`;
  const lock = test.phase === 'run';   // đang làm bài thì khóa đổi chữ viết để đề không bị lệch
  document.body.dataset.script = state.script;
  app.innerHTML = `<div class="tabs">${tb('review', '📚 Ôn tập')}${tb('test', '📝 Kiểm tra')}</div>
    <div class="panel"><div class="row">
      <span class="label">Chữ viết</span>
      ${seg('script', state.script, [['kanji', '漢字 Kanji'], ['furi', 'Furigana'], ['kana', 'Chỉ kana']], lock)}
      ${lock ? '<span class="note">🔒 Khóa khi đang làm bài</span>' : ''}
    </div></div>
    <div id="view"></div>`;
  if (state.tab === 'review') renderReview(); else renderTest();
}

const seg = (act, cur, items, off = false) =>
  `<div class="seg">${items.map(([v, l]) => `<button class="${String(cur) === String(v) ? 'on' : ''}" data-act="${act}" data-v="${v}" ${off ? 'disabled' : ''}>${l}</button>`).join('')}</div>`;

/* ================= ÔN TẬP ================= */
function renderReview() {
  const chips = CH.map(c => {
    const n = state.subject === 'vocab' ? c.vocab.length : quizOf(c).length;
    return `<button class="chip ${c.id === state.chapter ? 'on' : ''}" data-act="chapter" data-v="${c.id}">${c.title}<small>${n}</small></button>`;
  }).join('');
  $('#view').innerHTML = `
    <div class="panel">
      <div class="row">
        <span class="label">Nội dung</span>
        ${seg('subject', state.subject, [['vocab', '🈶 Từ vựng'], ['grammar', '📐 Ngữ pháp']])}
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
  return state.vview === 'cards' ? drawCards(host) : drawList(host);
}

/* ---------- học: ngữ pháp ---------- */
function drawGrammar(host) {
  const c = byId(state.chapter);
  host.innerHTML = c.grammar.map(g => {
    let ex = '';
    for (let i = 2; i + 1 < g.length; i += 2) ex += `<div class="g-ex"><div>${jp(g[i])}</div><div class="vn">${esc(g[i + 1])}</div></div>`;
    return `<div class="g"><div class="g-pat">${jp(g[0])}</div><div class="g-mean">${jp(g[1])}</div>${ex}</div>`;
  }).join('') + `<p class="note" style="text-align:center">Xem xong hãy chuyển sang <b>✍️ Luyện tập</b> để làm bài trắc nghiệm của ${c.title}.</p>`;
}

/* ---------- học: từ vựng — thẻ ghi nhớ ---------- */
function buildDeck() {
  let list = byId(state.chapter).vocab.slice();
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
    ? `<div class="card-face back" data-act="flip"><div class="card-main ${back.cls}">${jp(back.main)}</div>${back.sub ? `<div class="card-sub">${esc(back.sub)}</div>` : ''}</div>`
    : `<div class="card-face" data-act="flip"><div class="card-main ${front.cls}">${jp(front.main)}</div><div class="card-hint">Nhấn để lật thẻ · phím Space</div></div>`;
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

/* ---------- học: từ vựng — danh sách ---------- */
function drawList(host) {
  const c = byId(state.chapter);
  const rd = w => (w.k && state.script !== 'kana' ? w.w : '—');
  const cv = (on, t) => (on ? `<td class="cover"><span>${esc(t)}</span></td>` : `<td>${esc(t)}</td>`);
  const rows = c.vocab.map((w, i) => `<tr>
      <td class="note">${i + 1}</td>
      ${state.cover === 'w' ? `<td class="k cover"><span>${jp(disp(w))}</span></td>` : `<td class="k">${jp(disp(w))}</td>`}
      ${state.cover === 'w' ? cv(true, rd(w)) : `<td class="w">${esc(rd(w))}</td>`}
      ${cv(state.cover === 'm', w.m)}
    </tr>`).join('');
  host.innerHTML = `
    <div class="panel">
      <div class="row">
        ${seg('vview', state.vview, [['cards', '🃏 Thẻ ghi nhớ'], ['list', '📋 Danh sách']])}
        ${seg('cover', state.cover, [['none', 'Hiện hết'], ['m', 'Che nghĩa'], ['w', 'Che từ']])}
      </div>
      ${state.cover !== 'none' ? '<div class="row note">Nhấn vào ô bị che để xem đáp án.</div>' : ''}
    </div>
    <div class="panel table-wrap"><table class="vt">
      <thead><tr><th>#</th><th>Từ</th><th>Cách đọc</th><th>Nghĩa</th></tr></thead>
      <tbody>${rows}</tbody>
    </table></div>`;
}

/* ---------- luyện tập (có phản hồi ngay) ---------- */
function buildPractice() {
  const c = byId(state.chapter);
  let qs = state.subject === 'vocab' ? c.vocab.map(w => vocabQ(w, 'mix')) : quizOf(c).map(finalize);
  if (state.order === 'shuffle') qs = shuffle(qs);
  practice = { qs, ans: qs.map(() => -1), streak: 0 };
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
  $('#pFinish').innerHTML = done === total
    ? `<div class="panel score-box"><div class="score-big">${ok}<small>/${total}</small></div><div class="score-msg">${scoreMsg(ok / total)}</div><div style="margin-top:12px"><button class="btn primary" data-act="reset">↻ Làm lại chương này</button></div></div>`
    : '';
}

function answerPractice(opt) {
  const card = opt.closest('.q');
  const i = +card.dataset.i, q = practice.qs[i];
  if (practice.ans[i] !== -1) return;
  const o = +opt.dataset.o;
  practice.ans[i] = o;
  practice.streak = o === q.a ? practice.streak + 1 : 0;
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
  const avail = nV + nG;
  const chips = CH.map(c => `<button class="chip ${cfg.chapters.includes(c.id) ? 'on' : ''}" data-act="tch" data-v="${c.id}">${c.title}</button>`).join('');
  const hist = history.length
    ? `<h2 class="sec">Lịch sử gần đây</h2><div class="hist">${history.map(h =>
        `<div class="hist-item"><span>${new Date(h.t).toLocaleString('vi-VN', { dateStyle: 'short', timeStyle: 'short' })} · ${esc(h.label)}</span><b>${h.score}/${h.total} (${Math.round(h.score / h.total * 100)}%)</b></div>`).join('')}</div>`
    : '';
  return `
    <div class="panel">
      <div class="row"><span class="label">Nội dung</span>
        <button class="chip ${cfg.subjects.includes('vocab') ? 'on' : ''}" data-act="tsub" data-v="vocab">🈶 Từ vựng</button>
        <button class="chip ${cfg.subjects.includes('grammar') ? 'on' : ''}" data-act="tsub" data-v="grammar">📐 Ngữ pháp</button>
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
    <p class="note" style="text-align:center">Phạm vi đã chọn có <b>${nV}</b> từ vựng và <b>${nG}</b> câu ngữ pháp.</p>
    <button class="btn primary big" data-act="tstart" ${avail ? '' : 'disabled'}>▶ Bắt đầu kiểm tra</button>
    ${hist}`;
}

function startTest(qs) {
  const cfg = state.tcfg;
  if (!qs) {
    const chs = CH.filter(c => cfg.chapters.includes(c.id));
    const words = cfg.subjects.includes('vocab') ? chs.flatMap(c => c.vocab) : [];
    const gq = cfg.subjects.includes('grammar') ? chs.flatMap(c => quizOf(c)) : [];
    const total = Math.min(cfg.n || words.length + gq.length, words.length + gq.length);
    let nv, ng;
    if (words.length && gq.length) {
      ng = Math.min(gq.length, Math.round(total * .4));
      nv = Math.min(words.length, total - ng);
      ng = Math.min(gq.length, total - nv);
    } else { nv = Math.min(words.length, total); ng = Math.min(gq.length, total); }
    qs = shuffle([...pick(words, nv).map(w => vocabQ(w, cfg.dir)), ...pick(gq, ng).map(finalize)]);
  }
  clearInterval(test.timerId);
  test = {
    phase: 'run', qs, ans: qs.map(() => -1),
    startedAt: Date.now(), limit: cfg.mins * 60, timerId: setInterval(tick, 1000),
    label: `${cfg.subjects.length === 2 ? 'Từ vựng + Ngữ pháp' : cfg.subjects[0] === 'vocab' ? 'Từ vựng' : 'Ngữ pháp'} · ${chLabel(cfg.chapters)}`
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
  history = [{ t: Date.now(), score, total: test.qs.length, label: test.label }, ...history].slice(0, 8);
  persist();
  render();
  window.scrollTo(0, 0);
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

/* ================= events ================= */
function act(a, v) {
  switch (a) {
    /* chung */
    case 'tab': state.tab = v; persist(); return render();
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
        byId(state.chapter).vocab.forEach(w => known.delete(w.id));
        cards = null; persist(); drawStudy();
      }
      return;
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
    case 'tretry': return startTest(test.qs.filter((q, i) => test.ans[i] !== q.a).map(q => finalize(q)));
    case 'tnew': test = { phase: 'setup' }; return render();
    case 'twrong': test.onlyWrong = v === '1'; return renderTest();
    default: return;
  }
  persist();
  renderTest();
}

app.addEventListener('click', e => {
  const reveal = e.target.closest('td.cover');
  if (reveal) { reveal.classList.toggle('show'); return; }
  const btn = e.target.closest('[data-act]');
  if (btn) { act(btn.dataset.act, btn.dataset.v); return; }
  const opt = e.target.closest('.opt');
  if (!opt || opt.disabled) return;
  if (opt.closest('#practiceList')) answerPractice(opt);
  else if (opt.closest('#testList')) pickTestOption(opt);
});

document.addEventListener('keydown', e => {
  if (state.tab !== 'review' || state.mode !== 'study' || state.subject !== 'vocab' || state.vview !== 'cards') return;
  if (!cards || !cards.list.length) return;
  if (e.target.matches('input, textarea, select') || e.ctrlKey || e.metaKey || e.altKey) return;
  if (e.key === 'ArrowRight') act('cnext');
  else if (e.key === 'ArrowLeft') act('cprev');
  else if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'ArrowDown') { e.preventDefault(); act('flip'); }
});

render();
})();
