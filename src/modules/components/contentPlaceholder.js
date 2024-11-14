import utilities from '../../utilities';

const contentPlaceholder = function (type, injectContent) {
  const contentElement = utilities.createElementExt(
    'div',
    'content-placeholder'
  );
  // https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent#differences_from_innertext
  switch (type) {
    case 'initial':
      contentElement.innerHTML = `
      <p>Sveiki, čia galite rasti informaciją apie kino filmus. Pradėkite įvesdami į paiešką norimą pavadinimą.</p>
      <p>Filmų duomenys iš <a href="https://www.omdbapi.com/" target="_blank"> OMDb API <i class="fa-solid fa-arrow-up-right-from-square"></i></a></p>`;
      break;
    case 'searchResultEmpty':
      contentElement.innerText = 'Nerasta duomenų...';
      break;
    default:
      contentElement.innerText = '...';
      break;
  }
  if (typeof injectContent === 'string') {
    contentElement.innerText = injectContent;
  }
  return contentElement;
};

export default contentPlaceholder;
