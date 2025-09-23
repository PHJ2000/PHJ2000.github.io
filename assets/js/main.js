---
---
// Glossary filter in sidebar
function filterGlossary(){
  const q = (document.getElementById('glossary-search')?.value || '').toLowerCase();
  const items = document.querySelectorAll('.glossary dl > div');
  items.forEach(div => {
    const term = div.querySelector('dt')?.textContent.toLowerCase() || '';
    const def = div.querySelector('dd')?.textContent.toLowerCase() || '';
    div.style.display = (term.includes(q) || def.includes(q)) ? '' : 'none';
  });
}

window.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('glossary-search');
  if(input){ input.addEventListener('input', filterGlossary); }
});

// TOC & reading progress bar
(function(){
  const area = document.querySelector('.prose');
  if(!area) return;
  const headings = [...area.querySelectorAll('h2, h3')];
  if(!headings.length) return;
  const toc = document.createElement('nav');
  toc.className = 'card toc';
  const ul = document.createElement('ul');
  ul.style.listStyle = 'none';
  ul.style.padding = '0';
  headings.forEach(h => {
    const id = h.id || h.textContent.trim().toLowerCase().replace(/\s+/g,'-');
    h.id = id;
    const li = document.createElement('li');
    li.className = `toc-item toc-item--${h.tagName.toLowerCase()}`;
    const link = document.createElement('a');
    link.href = `#${id}`;
    link.textContent = h.textContent;
    li.appendChild(link);
    ul.appendChild(li);
  });
  toc.appendChild(ul);
  const main = document.querySelector('main');
  main?.insertBefore(toc, main.firstChild);

  const bar = document.createElement('div');
  bar.className = 'reading-progress';
  document.body.appendChild(bar);

  const compute = () => {
    const areaTop = area.getBoundingClientRect().top + window.scrollY;
    const total = area.scrollHeight - window.innerHeight;
    const scrolled = Math.max(0, Math.min(total, window.scrollY - areaTop));
    bar.style.width = total > 0 ? `${(scrolled / total * 100).toFixed(1)}%` : '0%';
  };
  window.addEventListener('scroll', compute, { passive: true });
  compute();
})();

// Code block copy buttons
(function(){
  document.querySelectorAll('pre > code').forEach(code => {
    const pre = code.parentElement;
    if(pre.querySelector('button.copy-btn')) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = 'Copy';
    btn.className = 'copy-btn';
    btn.addEventListener('click', async () => {
      try{
        await navigator.clipboard.writeText(code.innerText);
        btn.textContent = 'Copied!';
        setTimeout(() => { btn.textContent = 'Copy'; }, 1200);
      }catch(err){
        console.error('Clipboard copy failed', err);
      }
    });
    pre.style.position = 'relative';
    pre.appendChild(btn);
  });
})();

// Glossary hover tooltips
(function(){
  const area = document.querySelector('.prose');
  if(!area) return;
  const dict = {{ site.data.glossary | jsonify }};
  const terms = Object.keys(dict || {}).sort((a,b) => b.length - a.length);
  if(!terms.length) return;
  const walker = document.createTreeWalker(area, NodeFilter.SHOW_TEXT, null);
  const skip = new Set(['CODE','PRE','A','H1','H2','H3','H4','H5','H6']);
  const nodes = [];
  while(walker.nextNode()){
    nodes.push(walker.currentNode);
  }
  nodes.forEach(node => {
    const parent = node.parentElement;
    if(!parent || skip.has(parent.tagName)) return;
    let text = node.textContent;
    let changed = false;
    terms.forEach(term => {
      const escaped = term.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
      const re = new RegExp(`\\b(${escaped})\\b`, 'g');
      if(re.test(text)){
        changed = true;
        const description = String(dict[term] || '').replace(/"/g,'&quot;');
        text = text.replace(re, `<abbr title="${description}">$1</abbr>`);
      }
    });
    if(changed){
      const span = document.createElement('span');
      span.innerHTML = text;
      parent.replaceChild(span, node);
    }
  });
})();
