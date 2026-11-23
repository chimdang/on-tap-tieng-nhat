/* Học nhanh một nhóm kanji (mở từ kế hoạch): bước 1 xem từng chữ, bước 2 ôn nhanh cho tới khi nhớ hết.
   Chỉ dùng đúng các chữ của việc đó. Ôn nhanh: mỗi chữ phải trả lời đúng 2 lần, sai thì lặp lại sớm. */
(function () {
  'use strict';
  const JP = window.JP;
  const $ = JP.$;
  const esc = JP.esc;
  const KEY = 'jp-drill';
  const NEED = 2;                      // số lần đúng cần có cho mỗi chữ
  const EXTRA = { '見': [{ w: '見ます', r: 'みます', vi: 'Xem, nhìn' }] };   // chữ chưa có từ ví dụ trong dữ liệu

  const host = $('v-drill');
  const ALLW = [];
  JP.kanji.forEach((e) => wordsOf(e).forEach((x) => ALLW.push({ w: x.w, r: x.r, vi: x.vi, k: e.k })));
  function wordsOf(e) { return e.words && e.words.length ? e.words : (EXTRA[e.k] || []); }
  const kanjiIn = (s) => Array.from(s).filter((c) => JP.kanjiBy[c]);
  const sharedK = (a, b) => { const cb = kanjiIn(b); return kanjiIn(a).filter((c) => cb.indexOf(c) >= 0).length; };
  const firstRd = (r) => r.split('/')[0].replace(/\s/g, '');

  let st = Object.assign({ chars: [], mode: 'learn' }, JP.load(KEY, {}));
  let idx = 0, quiz = null, run = null, qopts = null;

  function chars() { return st.chars.map((c) => JP.kanjiBy[c]).filter(Boolean); }

  // ===== bước 1: học =====
  function chips(active) {
    return '<div class="drill-chips">' + chars().map((e, i) =>
      '<button class="drill-chip' + (i === active ? ' is-on' : '') + '" data-i="' + i + '" lang="ja">' + esc(e.k) + '</button>').join('') + '</div>';
  }
  function learnHtml() {
    const l = chars(), e = l[idx];
    const ws = wordsOf(e);
    const rd = (a) => a.length ? a.map((x) => '<span class="rd">' + esc(x) + JP.sayBtn(x.replace(/[・･]/g, ''), true) + '</span>').join('') : '<span class="none">Không có</span>';
    return chips(idx) +
      '<div class="learn"><div class="learn-pad"><div class="cell pad-cell drill-big"><span class="ghost" lang="ja">' + esc(e.k) + '</span></div>' +
      '<div class="row pager"><button class="btn" data-dr="prev">Chữ trước</button><span class="pager-pos">' + (idx + 1) + ' / ' + l.length + '</span>' +
      (idx < l.length - 1 ? '<button class="btn btn-solid" data-dr="next">Chữ tiếp theo</button>' : '<button class="btn btn-solid" data-dr="to-quiz">Sang ôn nhanh</button>') + '</div></div>' +
      '<div class="learn-info"><h2 class="hv">' + esc(e.vi || 'Không có âm Hán Việt') + '</h2>' +
      '<dl class="readings"><dt>Âm On</dt><dd lang="ja">' + rd(e.on) + '</dd><dt>Âm Kun</dt><dd lang="ja">' + rd(e.kun) + '</dd></dl>' +
      '<h3 class="words-title">Từ ví dụ</h3><ul class="words">' + ws.map((x) =>
        '<li><span class="w" lang="ja">' + JP.rubyWord(x) + '</span><span class="m">' + esc(x.vi) + JP.sayBtn(firstRd(x.r), true) + '</span></li>').join('') + '</ul>' +
      '<p class="drill-tip">Đọc to từng từ, rồi viết chữ <b lang="ja">' + esc(e.k) + '</b> ra giấy 3 lần. <button class="link" data-dr="pad">Mở ô tập viết</button></p></div></div>';
  }
  function showLearn() {
    $('dr-body').innerHTML = learnHtml();
    const w = chars()[idx].words[0] || (EXTRA[chars()[idx].k] || [])[0];
    if (w) JP.autoSay(firstRd(w.r));
  }

  // ===== bước 2: ôn nhanh =====
  function distract(item, field, pool, drillSet) {
    const seen = {}; seen[item[field]] = true;
    const same = (o) => (item.w ? o.w === item.w : o.k === item.k);
    const ranked = pool.filter((o) => o[field] && !same(o)).map((o) => ({
      o, s: (item.w && o.w ? sharedK(item.w, o.w) * 2 : 0) + (drillSet[o.k] ? 1.5 : 0) +
        (Array.from(o[field]).length === Array.from(item[field]).length ? 1 : 0) + Math.random(),
    })).sort((a, b) => b.s - a.s);
    const out = [];
    ranked.forEach((x) => { if (out.length < 3 && !seen[x.o[field]]) { seen[x.o[field]] = true; out.push(x.o); } });
    return out;
  }
  function typesOf(e) {
    const t = [];
    if (e.vi) t.push('hv');
    if (wordsOf(e).length) { t.push('read'); t.push('write'); }
    if (!t.length || e.on.length) t.push('on');
    return t;
  }
  function makeQ(e) {
    const s = run.s[e.k];
    const types = typesOf(e);
    const m = types[s.asked % types.length];
    s.asked++;
    const dset = run.set;
    const ws = wordsOf(e);
    const base = { kid: e.k };
    if (m === 'hv' || m === 'on') {
      const field = m === 'hv' ? 'vi' : 'onS';
      const pool = JP.kanji.map((x) => ({ k: x.k, vi: x.vi, onS: x.on.join('、') })).filter((x) => x[field]);
      const item = { k: e.k, vi: e.vi, onS: e.on.join('、') };
      const opts = JP.shuffle([item].concat(distract(item, field, pool, dset)));
      return Object.assign(base, {
        ask: m === 'hv' ? 'Chọn âm Hán Việt của chữ này' : 'Chọn âm On của chữ này',
        prompt: '<p class="bigword" lang="ja">' + esc(e.k) + '</p>', hint: '',
        say: '', sayAfter: ws[0] ? firstRd(ws[0].r) : '',
        options: opts.map((o) => ({ html: esc(o[field]), plain: esc(o[field]), lang: m === 'hv' ? 'vi' : 'ja' })),
        answer: opts.indexOf(item), right: item[field],
        explain: '<b lang="ja">' + esc(e.k) + '</b> có âm Hán Việt là <b>' + esc(e.vi || '-') + '</b>. Âm On: <span lang="ja">' + esc(e.on.join('、') || 'không có') + '</span>. Âm Kun: <span lang="ja">' + esc(e.kun.join('、') || 'không có') + '</span>.',
      });
    }
    const w = ws[s.asked % ws.length];
    const item = { w: w.w, r: w.r, vi: w.vi, k: e.k };
    const field = m === 'read' ? 'r' : 'w';
    const opts = JP.shuffle([item].concat(distract(item, field, ALLW, dset)));
    const expl = '<b lang="ja">' + esc(w.w) + '</b> đọc là <b lang="ja">' + esc(JP.slash(w.r)) + '</b>, nghĩa là ' + esc(w.vi.charAt(0).toLowerCase() + w.vi.slice(1)) + '.';
    return Object.assign(base, {
      ask: m === 'read' ? 'Chọn cách đọc đúng của từ này' : 'Chọn chữ kanji đúng với cách đọc này',
      prompt: '<p class="bigword" lang="ja">' + esc(m === 'read' ? w.w : w.r) + '</p>',
      hint: m === 'write' ? 'Nghĩa: ' + w.vi : '',
      say: m === 'write' ? firstRd(w.r) : '', sayAfter: firstRd(w.r),
      options: opts.map((o) => ({ html: esc(m === 'read' ? JP.slash(o.r) : o.w), plain: esc(m === 'read' ? JP.slash(o.r) : o.w), lang: 'ja' })),
      answer: opts.indexOf(item), right: item[field], explain: expl,
    });
  }
  function startRun(list) {
    run = { set: {}, s: {}, last: null, list };
    list.forEach((e) => { run.set[e.k] = true; run.s[e.k] = { streak: 0, asked: Math.floor(Math.random() * 3), wrong: 0, done: false }; });
  }
  function nextQ() {
    const pend = run.list.filter((e) => run.s[e.k].streak < NEED);
    if (!pend.length) { qopts.empty = summary(); return null; }
    let cand = pend.filter((e) => e.k !== run.last);
    if (!cand.length) cand = pend;
    // chữ vừa sai được ưu tiên, còn lại chọn ngẫu nhiên
    const hard = cand.filter((e) => run.s[e.k].streak === 0 && run.s[e.k].wrong > 0);
    const from = hard.length && Math.random() < 0.6 ? hard : cand;
    const e = from[Math.floor(Math.random() * from.length)];
    run.last = e.k;
    const q = makeQ(e);
    if (q.answer < 0 || q.options.length < 2) return nextQ();
    return q;
  }
  function progress() {
    const el = $('dr-prog');
    if (!el || !run) return;
    const n = run.list.filter((e) => run.s[e.k].streak >= NEED).length;
    el.innerHTML = '<p class="drill-count">Đã nhớ <b>' + n + '</b> trên ' + run.list.length + ' chữ. Mỗi chữ cần đúng ' + NEED + ' lần.</p><div class="drill-chips">' +
      run.list.map((e) => {
        const s = run.s[e.k];
        const cls = s.streak >= NEED ? 'is-ok' : s.wrong && s.streak === 0 ? 'is-ng' : s.streak ? 'is-half' : '';
        return '<span class="drill-chip ' + cls + '" lang="ja">' + esc(e.k) + '</span>';
      }).join('') + '</div>';
  }
  function summary() {
    const bad = run.list.filter((e) => run.s[e.k].wrong > 0);
    return '<div class="drill-sum"><h3>Xong, đã nhớ cả ' + run.list.length + ' chữ</h3>' +
      (bad.length
        ? '<p>Chữ từng sai: <b lang="ja">' + bad.map((e) => esc(e.k)).join(' ') + '</b>. Viết lại các chữ này ra giấy và đọc to từ ví dụ.</p>'
        : '<p>Không sai chữ nào. Tốt lắm.</p>') +
      '<div class="row">' + (bad.length ? '<button class="btn btn-solid" data-dr="again-bad">Ôn lại chữ sai</button>' : '') +
      '<button class="btn" data-dr="again-all">Ôn lại cả nhóm</button><button class="btn" data-dr="to-learn">Xem lại từng chữ</button><button class="btn btn-solid" data-dr="back">Về kế hoạch</button></div></div>';
  }
  function showQuiz(list) {
    if (quiz) quiz.active = false;
    $('dr-body').innerHTML = '<div id="dr-prog"></div><div class="group tool-row">' + JP.autoPick() + '</div><div id="dr-quiz"></div>';
    JP.bindAuto($('dr-body'));
    startRun(list || chars());
    qopts = {
      next: nextQ,
      empty: '',
      onAnswer: (q, ok) => {
        const s = run.s[q.kid];
        if (ok) { s.streak++; if (s.streak >= NEED && !s.done) { s.done = true; JP.rate('k|' + q.kid, true); } }
        else { s.streak = 0; s.wrong++; s.done = false; JP.rate('k|' + q.kid, false); }
        progress();
      },
    };
    quiz = JP.quiz($('dr-quiz'), qopts);
    quiz.active = !host.hidden;
    progress();
    quiz.next();
  }

  function render() {
    if (quiz) quiz.active = false;
    const l = chars();
    if (!l.length) {
      host.innerHTML = '<p class="back-row"><button class="link" data-dr="back">Về kế hoạch</button></p><p>Chưa chọn nhóm chữ nào. Mở một việc "Học và tập viết" trong kế hoạch rồi bấm nút "Học và ôn nhanh".</p>';
      return;
    }
    host.innerHTML = '<p class="back-row"><button class="link" data-dr="back">Về kế hoạch</button></p>' +
      '<h2 class="review-title">Học nhanh ' + l.length + ' chữ: <span lang="ja">' + esc(l.map((e) => e.k).join(' ')) + '</span></h2>' +
      '<div class="modes" role="group"><button class="mode" data-mode="learn">1. Học từng chữ</button><button class="mode" data-mode="quiz">2. Ôn nhanh</button></div><div id="dr-body"></div>';
    modes();
    if (st.mode === 'quiz') showQuiz(); else showLearn();
  }
  function modes() { host.querySelectorAll('.mode').forEach((b) => b.setAttribute('aria-pressed', b.dataset.mode === st.mode)); }
  function setMode(m) { st.mode = m; JP.store(KEY, st); render(); window.scrollTo(0, 0); }

  host.addEventListener('click', (ev) => {
    const say = ev.target.closest('[data-say]');
    if (say) { JP.say(say.dataset.say); return; }
    const mode = ev.target.closest('.mode');
    if (mode) { setMode(mode.dataset.mode); return; }
    const chip = ev.target.closest('button.drill-chip');
    if (chip) { idx = +chip.dataset.i; showLearn(); return; }
    const b = ev.target.closest('[data-dr]');
    if (!b) return;
    const a = b.dataset.dr, l = chars();
    if (a === 'back') { JP.go('home'); setTimeout(() => { const p = $('planner'); if (p) p.scrollIntoView(); }, 50); }
    else if (a === 'prev') { idx = (idx - 1 + l.length) % l.length; showLearn(); }
    else if (a === 'next') { idx = Math.min(l.length - 1, idx + 1); showLearn(); }
    else if (a === 'to-quiz') setMode('quiz');
    else if (a === 'to-learn') { idx = 0; setMode('learn'); }
    else if (a === 'again-all') { showQuiz(); }
    else if (a === 'again-bad') { showQuiz(run.list.filter((e) => run.s[e.k].wrong > 0)); }
    else if (a === 'pad') { JP.kanjiView.open(l[idx].k); JP.go('kanji'); }
  });
  JP.on('key', (ev) => {
    if (host.hidden || st.mode !== 'learn' || !chars().length) return;
    const l = chars();
    if (ev.key === 'ArrowLeft') { idx = (idx - 1 + l.length) % l.length; showLearn(); }
    else if (ev.key === 'ArrowRight') { idx = Math.min(l.length - 1, idx + 1); showLearn(); }
  });

  JP.drill = {
    open(list, mode) {
      st = { chars: Array.from(new Set(list)).filter((c) => JP.kanjiBy[c]), mode: mode || 'learn' };
      idx = 0; JP.store(KEY, st);
      JP.go('drill');
    },
  };
  JP.drillView = {
    show() { render(); window.scrollTo(0, 0); },
    hide() { if (quiz) quiz.active = false; },
  };
})();
