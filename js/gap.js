/* Từ cần học gấp (data/hoc-gap.js): lật thẻ, ôn nhanh và bảng từ theo từng nhóm. */
(function () {
  'use strict';
  const JP = window.JP;
  const $ = JP.$;
  const esc = JP.esc;
  const host = $('v-gap');
  const GROUPS = window.HOC_GAP || [];
  const KEY = 'jp-gap';

  // từ nào trùng với từ vựng trên web thì dùng chung mã tiến độ, để cũng hiện trong "Ôn hôm nay"
  const clean = (s) => String(s || '').split('/')[0].replace(/[（(][^）)]*[）)]/g, '').replace(/[～〜\s]/g, '');
  const known = {};
  JP.vocab.forEach((e) => { known[clean(e.w) + '|' + clean(e.r || e.w)] = e.id; });
  GROUPS.forEach((g) => g.items.forEach((x) => {
    x.id = known[x.w + '|' + x.r] || 'gap|' + x.w + '|' + x.r;
    x.g = g.key;
  }));
  const ALL = [].concat.apply([], GROUPS.map((g) => g.items));
  const hasKanji = (x) => x.w !== x.r && /[㐀-鿿]/.test(x.w);

  const ui = Object.assign({ group: GROUPS.length ? GROUPS[0].key : 'all', mode: 'flash', hide: false }, JP.load(KEY, {}));
  const save = () => JP.store(KEY, ui);
  const list = () => (ui.group === 'all' ? ALL : ALL.filter((x) => x.g === ui.group));
  let flash = null, quiz = null, qopts = null, run = null;

  function stop() {
    if (flash) flash.active = false;
    if (quiz) quiz.active = false;
  }

  // ===== lật thẻ =====
  function card(x, flipped) {
    if (!flipped) return '<div class="fc-front"><p class="bigword" lang="ja">' + esc(x.w) + '</p><p class="flash-hint">Đọc to và đoán nghĩa, rồi bấm để lật</p></div>';
    return '<div class="fc-top">' + JP.sayBtn(x.r) + '<span class="fc-read" lang="ja">' + esc(x.r) + '</span></div>' +
      '<div class="fc-main"><p class="bigword" lang="ja">' + esc(x.w) + '</p><p class="fc-mean">' + esc(x.vi) + '</p></div>';
  }
  function showFlash() {
    $('gap-body').innerHTML = '<div class="group tool-row">' + JP.autoPick() + '</div><div id="gap-flash"></div>';
    JP.bindAuto($('gap-body'));
    flash = JP.flash($('gap-flash'), {
      items: () => JP.order(list()),
      render: card,
      speak: (x, flipped) => (flipped ? x.r : ''),
      onRate: (x, ok) => JP.rate(x.id, ok),
      empty: 'Xong cả nhóm này. Chọn nhóm khác hoặc chuyển sang "Ôn nhanh".',
    });
    flash.active = !host.hidden;
    flash.start();
  }

  // ===== ôn nhanh: mỗi từ phải trả lời đúng 1 lần, từ sai quay lại sau =====
  function distract(item, field) {
    const seen = {}; seen[item[field]] = true;
    const ranked = ALL.filter((o) => o !== item).map((o) => ({
      o, s: (o.g === item.g ? 2 : 0) + (Math.abs(o[field].length - item[field].length) <= 1 ? 1 : 0) +
        (field === 'r' && o.r.charAt(0) === item.r.charAt(0) ? 1 : 0) + Math.random() * 1.5,
    })).sort((a, b) => b.s - a.s);
    const out = [];
    ranked.forEach((v) => { if (out.length < 3 && !seen[v.o[field]]) { seen[v.o[field]] = true; out.push(v.o); } });
    return out;
  }
  function makeQ(x) {
    const kinds = hasKanji(x) ? ['read', 'mean', 'word'] : ['mean', 'word'];
    const m = kinds[Math.floor(Math.random() * kinds.length)];
    const field = m === 'read' ? 'r' : m === 'mean' ? 'vi' : 'w';
    const opts = JP.shuffle([x].concat(distract(x, field)));
    return {
      id: x.id, item: x,
      ask: m === 'read' ? 'Chọn cách đọc đúng' : m === 'mean' ? 'Chọn nghĩa đúng' : 'Chọn từ tiếng Nhật đúng',
      prompt: '<p class="bigword"' + (m === 'word' ? '' : ' lang="ja"') + '>' + esc(m === 'word' ? x.vi : x.w) + '</p>',
      hint: '', say: '', sayAfter: x.r,
      options: opts.map((o) => ({ html: esc(o[field]), plain: esc(o[field]), lang: m === 'mean' ? 'vi' : 'ja' })),
      answer: opts.indexOf(x),
      explain: '<b lang="ja">' + esc(x.w) + '</b>' + (x.r !== x.w ? ' (<span lang="ja">' + esc(x.r) + '</span>)' : '') + ': ' + esc(x.vi) + '.',
    };
  }
  function progress() {
    const el = $('gap-prog');
    if (el && run) el.innerHTML = 'Đã đúng <b>' + (run.total - run.queue.length) + '</b> trên ' + run.total + ' từ. Đã sai: ' + run.bad.length + ' từ.';
  }
  function nextQ() {
    if (!run.queue.length) {
      qopts.empty = '<div class="drill-sum"><h3>Xong ' + run.total + ' từ</h3>' +
        (run.bad.length ? '<p>Từ từng sai: <b lang="ja">' + run.bad.map((x) => esc(x.w)).join('、') + '</b></p>' : '<p>Không sai từ nào. Tốt lắm.</p>') +
        '<div class="row">' + (run.bad.length ? '<button class="btn btn-solid" data-gap="again-bad">Ôn lại từ sai</button>' : '') +
        '<button class="btn" data-gap="again">Ôn lại cả nhóm</button></div></div>';
      return null;
    }
    return makeQ(run.queue[0]);
  }
  function showQuiz(items) {
    if (quiz) quiz.active = false;
    const src = JP.shuffle(items || list());
    run = { queue: src, total: src.length, bad: [] };
    $('gap-body').innerHTML = '<p class="drill-count" id="gap-prog"></p><div class="group tool-row">' + JP.autoPick() + '</div><div id="gap-quiz"></div>';
    JP.bindAuto($('gap-body'));
    qopts = {
      next: nextQ,
      empty: '',
      onAnswer: (q, ok) => {
        const x = run.queue.shift();
        if (!ok) {
          if (run.bad.indexOf(x) < 0) run.bad.push(x);
          run.queue.splice(Math.min(3, run.queue.length), 0, x);   // hỏi lại sau vài câu
        }
        JP.rate(q.id, ok);
        progress();
      },
    };
    quiz = JP.quiz($('gap-quiz'), qopts);
    quiz.active = !host.hidden;
    progress();
    quiz.next();
  }

  // ===== bảng từ =====
  function showTable() {
    const groups = GROUPS.filter((g) => ui.group === 'all' || g.key === ui.group);
    $('gap-body').innerHTML = '<div class="group tool-row"><label class="pick"><input type="checkbox" id="gap-hide"' + (ui.hide ? ' checked' : '') + '><span>Che nghĩa</span></label>' +
      '<span class="gap-note">Khi che, bấm vào dòng để hiện.</span></div>' +
      groups.map((g) => '<section class="chap"><h3>' + esc(g.ten) + ' <small>' + g.items.length + ' từ</small></h3><ul class="gap-list' + (ui.hide ? ' is-hidden' : '') + '">' +
        g.items.map((x) => '<li><span class="gap-w" lang="ja">' + esc(x.w) + '</span><span class="gap-r" lang="ja">' + (x.r !== x.w ? esc(x.r) : '') + '</span><span class="gap-v">' + esc(x.vi) + '</span>' + JP.sayBtn(x.r, true) + '</li>').join('') +
        '</ul></section>').join('');
    $('gap-hide').addEventListener('change', (ev) => { ui.hide = ev.target.checked; save(); showTable(); });
  }

  function render() {
    stop();
    const pick = (v, l) => '<label class="pick"><input type="radio" name="gapg" value="' + v + '"' + (ui.group === v ? ' checked' : '') + '><span>' + esc(l) + '</span></label>';
    host.innerHTML = '<p class="back-row"><button class="link" data-gap="back">Về mục lục</button></p>' +
      '<h2 class="review-title">Từ cần học gấp</h2>' +
      '<p class="gap-note">Lọc từ phần trùng giữa từ vựng trên web và 4 đề của trường. Học lần lượt từ trái sang phải.</p>' +
      '<div class="group tool-row gap-groups">' + GROUPS.map((g) => pick(g.key, g.ten + ' (' + g.items.length + ')')).join('') + pick('all', 'Tất cả (' + ALL.length + ')') + '</div>' +
      '<div class="modes" role="group"><button class="mode" data-mode="flash">Lật thẻ</button><button class="mode" data-mode="quiz">Ôn nhanh</button><button class="mode" data-mode="table">Bảng từ</button></div>' +
      '<div id="gap-body"></div>';
    host.querySelectorAll('.mode').forEach((b) => b.setAttribute('aria-pressed', b.dataset.mode === ui.mode));
    host.querySelectorAll('input[name=gapg]').forEach((x) => x.addEventListener('change', () => { ui.group = x.value; save(); render(); }));
    if (ui.mode === 'quiz') showQuiz(); else if (ui.mode === 'table') showTable(); else showFlash();
  }

  host.addEventListener('click', (ev) => {
    const mode = ev.target.closest('.mode');
    if (mode) { ui.mode = mode.dataset.mode; save(); render(); return; }
    const b = ev.target.closest('[data-gap]');
    if (b) {
      if (b.dataset.gap === 'back') JP.go('home');
      else if (b.dataset.gap === 'again') showQuiz();
      else if (b.dataset.gap === 'again-bad') showQuiz(run.bad.slice());
      return;
    }
    if (ui.mode !== 'table') return;
    const say = ev.target.closest('[data-say]');
    if (say) { JP.say(say.dataset.say); return; }
    const li = ev.target.closest('.gap-list li');
    if (li) li.classList.toggle('is-shown');
  });

  JP.gapView = {
    count: ALL.length,
    show() { render(); window.scrollTo(0, 0); },
    hide() { stop(); },
  };
})();
