import utilities from '../../utilities';
import button from './button';
import searchForm from './searchForm';

const header = async function () {
  const headerElement = utilities.createElementExt('header', 'header');
  const titleElement = headerElement
    .appendChild(
      utilities.createElementExt('div', [
        'header__block',
        'header__block--title',
      ])
    )
    .appendChild(utilities.createElementExt('h1', 'header__title'));
  titleElement.innerHTML = `Filmų paieška (<a href="https://www.omdbapi.com/" target="_blank">OMDb API</a>)`;

  const formElement = headerElement
    .appendChild(
      utilities.createElementExt('div', [
        'header__block',
        'header__block--search-form',
      ])
    )
    .appendChild(await searchForm());

  const favButtonElement = headerElement
    .appendChild(
      utilities.createElementExt('div', [
        'header__block',
        'header__block--extra-options',
      ])
    )
    .appendChild(button('įsiminti', ['fa-regular', 'fa-star']));
  favButtonElement.classList.add('btn--toggle-sidebar');

  return headerElement;
};

export default header;
