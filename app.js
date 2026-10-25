(() => {
  'use strict';
  const key = 'suishou-tasks-v1';
  const $ = id => document.getElementById(id);
  let tasks = [], filter = 'all';
  try {
    const data = JSON.parse(localStorage.getItem(key) || '[]');
    if (Array.isArray(data)) tasks = data.filter(t => t && typeof t.id === 'string' && typeof t.text === 'string' && typeof t.done === 'boolean');
  } catch { $('status').textContent = '无法读取本机记录，你仍可以使用清单。'; }
  $('date').textContent = new Intl.DateTimeFormat('zh-CN', {month:'long',day:'numeric',weekday:'long'}).format(new Date());
  function save() {
    try { localStorage.setItem(key, JSON.stringify(tasks)); $('status').textContent = ''; }
    catch { $('status').textContent = '浏览器未能保存，关闭页面后记录可能丢失。'; }
    render();
  }
  function render() {
    const done = tasks.filter(t => t.done).length;
    $('count').textContent = `${done} / ${tasks.length} 已完成`;
    $('progress').max = tasks.length || 1;
    $('progress').value = done;
    $('remaining').textContent = tasks.length ? `还有 ${tasks.length - done} 件小事` : '给今天一个轻松的开始';
    $('clear').disabled = done === 0;
    $('list').replaceChildren();
    const visible = tasks.filter(t => filter === 'all' || (filter === 'done' ? t.done : !t.done));
    $('empty').hidden = visible.length > 0;
    $('empty').textContent = tasks.length ? '这个分类还没有任务。' : '清单还是空的，从一件小事开始吧 ☀';
    for (const task of visible) {
      const li = document.createElement('li');
      li.className = task.done ? 'done' : '';
      const label = document.createElement('label');
      const check = document.createElement('input');
      check.type = 'checkbox'; check.checked = task.done;
      check.addEventListener('change', () => { task.done = check.checked; save(); });
      const text = document.createElement('span'); text.textContent = task.text;
      label.append(check, text);
      const remove = document.createElement('button'); remove.type = 'button'; remove.className = 'delete'; remove.textContent = '×';
      remove.setAttribute('aria-label', `删除：${task.text}`);
      remove.addEventListener('click', () => { tasks = tasks.filter(t => t !== task); save(); });
      li.append(label, remove); $('list').append(li);
    }
  }
  $('form').addEventListener('submit', event => {
    event.preventDefault();
    const text = $('task').value.trim();
    if (!text) { $('status').textContent = '请先输入一件想做的事。'; $('task').focus(); return; }
    tasks.push({id: `${Date.now()}-${Math.random().toString(36).slice(2)}`, text, done: false});
    $('task').value = ''; save(); $('task').focus();
  });
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    filter = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    render();
  }));
  $('clear').addEventListener('click', () => { tasks = tasks.filter(t => !t.done); save(); });
  render();
})();
