import utilities from '../../utilities';

const card = function (initialData, getDetailsFn) {
  const typeIcons = {
    movie: 'fa-film',
    series: 'fa-tv',
    episode: 'fa-list-ol',
  };

  const pictureElement = utilities.createElementExt('img', 'card__picture', {
    src: initialData.Poster,
    title: initialData.Title,
  });
  const titleElement = utilities.createElementExt(
    'h3',
    'card__title',
    { title: initialData.Title },
    initialData.Title
  );
  const yearElement = utilities.createElementExt(
    'div',
    'card__year',
    { title: `Metai: ${initialData.Year}` },
    initialData.Year
  );

  const typeElement = utilities.createElementExt('div', 'card__type', {
    title: initialData['Type'],
  });
  typeElement.append(
    utilities.createElementExt('i', [
      'type__icon',
      'fa-solid',
      typeIcons[initialData['Type']],
    ]),
    utilities.createElementExt('span', 'type__text', {}, initialData['Type'])
  );

  const favElement = utilities.createElementExt(
    'i',
    ['fav__icon', 'fa-regular', 'fa-star'],
    { 'data-id': initialData.imdbID }
  );
  //TODO: add interactivity; change between 'fa-regular' and 'fa-solid' depending on storage

  const detailsElement = utilities.createElementExt('div', 'card__details', {
    'data-id': initialData.imdbID,
  });

  const textContentElement = utilities.createElementExt('div', 'card__content');

  textContentElement.append(titleElement, yearElement, typeElement);

  const cardElement = utilities.createElementExt(
    'div',
    ['card', 'card--movie'],
    { 'data-id': initialData.imdbID }
  );
  cardElement.append(
    pictureElement,
    textContentElement,
    detailsElement,
    favElement
  );

  const clickHandler = async (e) => {
    cardElement.classList.add('card--busy');
    const detailsContent = await getDetailsFn(initialData.imdbID);
    utilities.clearChildren(detailsElement);
    detailsElement.append(detailsContent);
    cardElement.classList.add('card--expanded');
    cardElement.classList.remove('card--busy');
  };
  //TODO: interactivity to collapse back the expanded card

  cardElement.addEventListener('click', clickHandler, { once: true });

  return cardElement;
};

export default card;
