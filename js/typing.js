/* Điền nghĩa: hiện từ tiếng Nhật, tự gõ nghĩa tiếng Việt. Từ sai được hỏi lại sau vài câu.
   Vì một nghĩa có nhiều cách viết, câu không khớp sẽ hiện đáp án để người học tự quyết "tính đúng" hay "sai". */
(function () {
  'use strict';
  const JP = window.JP;
  const $ = JP.$;
  const esc = JP.esc;
  const host = $('v-type');
  const KEY = 'jp-type';
  const ui = Object.assign({ source: 'chap', size: 20 }, JP.load(KEY, {}));
  const save = () => JP.store(KEY, ui);

  // ---- chấm câu trả lời
  const norm = (s) => String(s).normalize('NFC').toLowerCase().replace(/[.!?…"'“”~～:\-]/g, ' ').replace(/\s+/g, ' ').trim();
  const noMark = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').normalize('NFC');
  const LEAD = /^(cái|con|quả|trái|chiếc|việc|sự|màu|bên|phía|buổi|cuốn|quyển|căn|ngôi|bức|tờ) /;
  // các cách trả lời được chấp nhận, suy ra từ nghĩa trong dữ liệu
  function variants(vi) {
    const out = new Set();
    const add = (t) => {
      const v = norm(t);
      if (!v) return;
      out.add(v);
      if (LEAD.test(v)) out.add(v.replace(LEAD, ''));
    };
    const bare = String(vi).replace(/[（(][^）)]*[）)]/g, ' ');
    [vi, bare].forEach((src) => {
      add(src);
      String(src).split(/[,;\/、，]|[①②③④⑤]|\shoặc\s/).forEach(add);
    });
    return out;
  }
  // 'ok' khớp hẳn, 'mark' khớp nhưng thiếu dấu, 'no' không khớp
  function grade(answer, vi) {
    const a = norm(answer);
    if (!a) return 'no';
    const vs = variants(vi);
    const forms = LEAD.test(a) ? [a, a.replace(LEAD, '')] : [a];
    if (forms.some((f) => vs.has(f))) return 'ok';
    const plain = new Set(Array.from(vs, noMark));
    if (forms.some((f) => f === noMark(f) && plain.has(f))) return 'mark';
    return 'no';
  }

  // ---- phiên làm bài
  const clean = (s) => String(s || '').split('/')[0].replace(/\s/g, '');
  let run = null, cur = null, state = 'ask', scope = null;

  function pool() {
    if (ui.source === 'gap') return [].concat.apply([], (window.HOC_GAP || []).map((g) => g.items));
    return scope.filter(JP.vocab).filter((e) => e.vi);
  }
  function start(items) {
    let list = items;
    if (!list) {
      const all = pool();
      list = JP.order(all);                      // đến hạn ôn trước, rồi từ chưa học
      if (ui.size) list = list.slice(0, ui.size);
      list = JP.shuffle(list);
    }
    run = { queue: list.slice(), total: list.length, done: 0, bad: [] };
    next();
  }
  function wordHtml(x) {
    return JP.furi() && x.r && x.r !== x.w ? JP.rubyWord(x) : esc(x.w);
  }
  function progress() {
    const el = $('ty-prog');
    if (el) el.innerHTML = 'Đã đúng <b>' + run.done + '</b> trên ' + run.total + ' từ. Còn ' + run.queue.length + '.' + (run.bad.length ? ' Từng sai: ' + run.bad.length + '.' : '');
  }
  function next() {
    cur = run.queue[0] || null;
    state = 'ask';
    progress();
    const body = $('ty-card');
    if (!cur) {
      body.innerHTML = run.total
        ? '<div class="drill-sum"><h3>Xong ' + run.total + ' từ</h3>' +
          (run.bad.length ? '<ul class="ty-bad">' + run.bad.map((x) => '<li><b lang="ja">' + esc(x.w) + '</b>' + (x.r && x.r !== x.w ? ' <span lang="ja">(' + esc(x.r) + ')</span>' : '') + ': ' + esc(x.vi) + '</li>').join('') + '</ul>' : '<p>Không sai từ nào. Tốt lắm.</p>') +
          '<div class="row">' + (run.bad.length ? '<button class="btn btn-solid" data-ty="again-bad">Làm lại từ sai</button>' : '') + '<button class="btn" data-ty="restart">Lượt mới</button></div></div>'
        : '<p>Chưa chọn từ nào. Hãy chọn thêm chương hoặc bài.</p>';
      return;
    }
    body.innerHTML =
      '<div class="ty-word"><p class="bigword" lang="ja">' + wordHtml(cur) + '</p>' + JP.sayBtn(clean(cur.r || cur.w)) + '</div>' +
      '<form class="ty-form" autocomplete="off"><input type="text" id="ty-in" class="ty-in" placeholder="Gõ nghĩa tiếng Việt rồi bấm Enter" aria-label="Nghĩa tiếng Việt" autocapitalize="off" spellcheck="false">' +
      '<button class="btn btn-solid" type="submit">Trả lời</button><button class="btn" type="button" data-ty="skip">Không biết</button></form>' +
      '<div id="ty-res" aria-live="polite"></div>';
    if (!host.hidden) { $('ty-in').focus(); JP.autoSay(clean(cur.r || cur.w)); }
  }
  function finish(ok) {                          // ghi kết quả của từ đang hỏi rồi sang từ tiếp
    const x = run.queue.shift();
    if (ok) run.done++;
    else {
      if (run.bad.indexOf(x) < 0) run.bad.push(x);
      run.queue.splice(Math.min(3, run.queue.length), 0, x);
    }
    JP.rate(x.id, ok);
    next();
  }
  function answer(text) {
    if (!cur || state !== 'ask') return;
    const g = grade(text, cur.vi);
    state = g === 'no' ? 'judge' : 'right';
    $('ty-in').readOnly = true;
    host.querySelectorAll('.ty-form button').forEach((b) => { b.disabled = true; });
    const full = '<p class="ty-full"><b lang="ja">' + esc(cur.w) + '</b>' + (cur.r && cur.r !== cur.w ? ' <span lang="ja">(' + esc(cur.r) + ')</span>' : '') + ': ' + esc(cur.vi) + '</p>';
    $('ty-res').innerHTML = !norm(text)
      ? '<p class="verdict ng">Đáp án</p>' + full + '<button class="btn btn-solid" data-ty="wrong">Tiếp theo (hỏi lại sau)</button>'
      : g === 'no'
      ? '<p class="verdict ng">Chưa khớp</p>' + full + '<div class="row"><button class="btn btn-solid" data-ty="wrong">Tôi sai, hỏi lại sau</button><button class="btn" data-ty="right">Nghĩa giống nhau, tính đúng</button></div>'
      : '<p class="verdict ok">' + (g === 'mark' ? 'Đúng (bạn gõ thiếu dấu)' : 'Đúng') + '</p>' + full + '<button class="btn btn-solid" data-ty="go">Từ tiếp theo</button>';
    const b = host.querySelector('#ty-res .btn-solid');
    if (b) b.focus();
  }

  // ---- khung trang
  function render() {
    const pick = (name, v, l, on) => '<label class="pick"><input type="radio" name="' + name + '" value="' + v + '"' + (on ? ' checked' : '') + '><span>' + l + '</span></label>';
    host.innerHTML =
      '<p class="back-row"><button class="link" data-ty="back">Về mục lục</button></p>' +
      '<h2 class="review-title">Điền nghĩa từ vựng</h2>' +
      '<div class="group tool-row ty-opts">' + pick('tysrc', 'chap', 'Theo chương', ui.source === 'chap') + pick('tysrc', 'gap', 'Từ cần học gấp', ui.source === 'gap') + '</div>' +
      '<div id="ty-scope"' + (ui.source === 'chap' ? '' : ' hidden') + '></div>' +
      '<div class="group tool-row ty-opts"><span class="group-label">Số từ mỗi lượt</span>' +
      [[10, '10'], [20, '20'], [50, '50'], [0, 'Tất cả']].map(([v, l]) => pick('tysize', v, l, ui.size === v)).join('') + JP.furiPick() + JP.autoPick() + '</div>' +
      '<p class="drill-count" id="ty-prog"></p><div id="ty-card"></div>';
    scope = JP.scope($('ty-scope'), 'type', { sections: true, onChange: () => start() });
    host.querySelectorAll('input[name=tysrc]').forEach((x) => x.addEventListener('change', () => { ui.source = x.value; save(); $('ty-scope').hidden = ui.source !== 'chap'; start(); }));
    host.querySelectorAll('input[name=tysize]').forEach((x) => x.addEventListener('change', () => { ui.size = +x.value; save(); start(); }));
    JP.bindFuri(host, () => { const p = host.querySelector('.ty-word .bigword'); if (p && cur) p.innerHTML = wordHtml(cur); });
    JP.bindAuto(host);
    start();
  }

  host.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const t = $('ty-in').value;
    if (t.trim()) answer(t);
  });
  host.addEventListener('click', (ev) => {
    const say = ev.target.closest('.ty-word [data-say]');
    if (say) { JP.say(say.dataset.say); return; }
    const b = ev.target.closest('[data-ty]');
    if (!b) return;
    const a = b.dataset.ty;
    if (a === 'back') JP.go('home');
    else if (a === 'skip') answer('');
    else if (a === 'right' || a === 'go') finish(true);
    else if (a === 'wrong') finish(false);
    else if (a === 'restart') start();
    else if (a === 'again-bad') start(run.bad.slice());
  });

  JP.typingView = {
    grade,
    show() { render(); window.scrollTo(0, 0); const i = $('ty-in'); if (i) i.focus(); },
    hide() {},
  };
})();
