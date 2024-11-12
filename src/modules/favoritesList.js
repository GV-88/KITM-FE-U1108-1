import utilities from '../utilities';
import card from './components/card';

const favoritesList = function (favoritesData, onInspectFn, onFavoriteFn) {
  const favoritesElement = utilities.createElementExt('div', 'results');
  const gridElement = favoritesElement.appendChild(
    utilities.createElementExt('div', 'favorites__grid')
  );

  if (favoritesData instanceof Array) {
    for (const item of favoritesData) {
      gridElement.appendChild(
        card(
          item,
          true,
          'callback',
          null,
          () => {
            //TODO: this callback should re-create the results list with a single auto-expanding card
            onInspectFn(item);
          },
          onFavoriteFn
        )
      );
    }
  }

  return favoritesElement;
};

export default favoritesList;
