---
---
(async function(){
  const input = document.getElementById('q');
  const box = document.getElementById('search-results');
  if(!input || !box) return;
  box.hidden = true;
  try{
    const data = await fetch('{{ "/search.json" | relative_url }}').then(r=>r.json());
    const fuse = new Fuse(data, { keys: ['title','excerpt','categories','tags'], threshold: 0.35 });
    input.addEventListener('input', ()=>{
      const q = input.value.trim();
      if(!q){ box.style.display='none'; box.hidden = true; box.innerHTML=''; return; }
      const out = fuse.search(q).slice(0,8).map(r=>{
        const p = r.item;
        return `<div class="search-hit">
          <a href="${p.url}">${p.title}</a>
          <div class="meta">${p.date} · ${(p.categories||[]).join(', ')}</div>
          <p>${p.excerpt}</p>
        </div>`;
      }).join('');
      box.innerHTML = out || '<p>결과 없음</p>';
      box.style.display = 'block';
      box.hidden = false;
    });
  }catch(err){
    console.error('Search init failed', err);
  }
})();
