// 간단한 용어집 검색
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
