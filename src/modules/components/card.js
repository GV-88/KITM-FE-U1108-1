import utilities from '../../utilities';
import api from '../api';
import storage from '../storage';

// callback hell?
const card = function (
  initialData,
  isFavorite,
  behaviorType,
  getDetailsFn,
  onClickFn,
  onFavoriteFn
) {
  let isFavoriteLocal = isFavorite ?? false;

  const typeOptions = api.typeOptions;
  const typeIcons = {
    movie: 'fa-film',
    series: 'fa-tv',
    episode: 'fa-list-ol',
    game: 'fa-gamepad',
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
    utilities.createElementExt(
      'span',
      'type__text',
      {},
      typeOptions[initialData['Type']] ?? initialData['Type']
    )
  );

  const favElement = utilities.createElementExt(
    'i',
    [
      'card__fav',
      'fav__icon',
      isFavoriteLocal ? 'fa-solid' : 'fa-regular',
      'fa-star',
    ],
    { 'data-id': initialData.imdbID }
  );

  const detailsElement = utilities.createElementExt('div', 'card__details', {
    'data-id': initialData.imdbID,
  });

  const textContentElement = utilities.createElementExt('div', 'card__content');

  textContentElement.append(titleElement, yearElement, typeElement);

  const interactiveIconsElement = utilities.createElementExt(
    'div',
    'card__interactive-icons'
  );
  interactiveIconsElement.append(favElement);

  const cardElement = utilities.createElementExt(
    'div',
    ['card', 'card--movie'],
    { 'data-id': initialData.imdbID }
  );
  cardElement.append(
    pictureElement,
    textContentElement,
    detailsElement,
    interactiveIconsElement
  );

  const collapsePhase1 = async () => {
    cardElement.classList.remove('card--expanded');
    utilities.smoothRemove(
      interactiveIconsElement,
      interactiveIconsElement.querySelector('.card__collapse-button')
    );
    utilities.clearChildren(cardElement.querySelector('.card__details'));
  };

  const expand = () => {
    cardElement.classList.add('card--expanded');
    const collapseBtnElement = interactiveIconsElement.appendChild(
      utilities.createElementExt('i', [
        'card__collapse-button',
        'fa-solid',
        // 'fa-xmark',
        'fa-down-left-and-up-right-to-center',
      ])
    );
    collapseBtnElement.addEventListener('click', collapse, { once: true });
  };

  const collapse = async (e) => {
    e.stopPropagation();
    await collapsePhase1();
    setTimeout(
      cardElement.addEventListener('click', loadDetailsAndExpand, {
        once: true,
      }),
      100
    );
  };

  const loadDetailsAndExpand = async () => {
    cardElement.classList.add('card--busy');
    const detailsContent = await getDetailsFn(initialData.imdbID);
    if (detailsContent instanceof Node) {
      utilities.clearChildren(detailsElement);
      detailsElement.append(detailsContent);
      expand();
      cardElement.classList.remove('card--busy');
    } else {
      setTimeout(() => {
        cardElement.classList.remove('card--busy');
      }, 1000);
    }
  };

  favElement.addEventListener('click', async (e) => {
    e.stopPropagation();
    if (isFavoriteLocal) {
      await storage.removeFromFavMovies(initialData.imdbID);
      isFavoriteLocal = false;
    } else {
      await storage.addToFavMovies(initialData);
      isFavoriteLocal = true;
    }
    utilities.toggleIconFill(favElement, isFavoriteLocal);

    onFavoriteFn();
  });

  switch (behaviorType) {
    case 'expand':
      cardElement.addEventListener('click', loadDetailsAndExpand, {
        once: true,
      });
      break;
    case 'autoLoad':
      loadDetailsAndExpand();
      break;
    case 'callback':
      cardElement.addEventListener('click', onClickFn);
      break;
    default:
      break;
  }

  return cardElement;
};

export default card;
