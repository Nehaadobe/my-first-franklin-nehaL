import { createOptimizedPicture, fetchPlaceholders, getMetadata } from '../../scripts/lib-franklin.js';

export default async function decorate(block) {

  const locale = getMetadata('locale') || '/na/en';
  const placeholders = await fetchPlaceholders(locale);
  
  
  /* change to ul, li */
  const ul = document.createElement('ul');
  
  [...block.children].forEach((row) => {
    const moreText = document.createElement('a');
    moreText.setAttribute('href', '#');
    moreText.setAttribute("class","more");
    moreText.innerHTML = placeholders.more;
    const li = document.createElement('li');
    li.innerHTML = row.innerHTML;
    [...li.children].forEach((div) => {
      li.append(moreText)
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}
