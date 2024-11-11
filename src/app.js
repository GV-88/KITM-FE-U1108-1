import utilities from './utilities';
import contentPlaceholder from './modules/components/contentPlaceholder';
import header from './modules/components/header';
import api from './modules/api';
import storage from './modules/storage';
import resultsList from './modules/resultsList';

const buildInitContent = async () => {};
const pageContainerElement = document.querySelector('body');
const headerElement = pageContainerElement.appendChild(header());
const containerElement = pageContainerElement.appendChild(
  utilities.createElementExt('div', 'container')
);
const mainElement = containerElement.appendChild(
  utilities.createElementExt('main')
);
const sidebarElement = containerElement.appendChild(
  utilities.createElementExt('aside', ['sidebar', 'sidebar--favorites'])
);
mainElement.appendChild(contentPlaceholder('initial'));

const formElement = headerElement.querySelector('#search-form'); //async???

formElement.addEventListener('submit', (e) => {
  e.preventDefault();
  // formElement
  //   .querySelectorAll('*[type="submit"]')
  //   .forEach((element) => utilities.setDisabledAttribute(element, false));
  utilities.setDisabledAttribute(
    formElement.querySelector('*[type="submit"]'),
    false
  );
  new FormData(formElement); //this constructor fires formdata event
});

formElement.addEventListener('formdata', async (e) => {
  const query = {};
  for (const pair of e.formData.entries()) {
    if (pair[1]) {
      query[pair[0]] = pair[1];
    }
  }
  if (query.searchstring) {
    storage.addToLocalStorageList(
      storage.movieSearchesListName,
      query.searchstring
    );
  }

  const response = await api.searchMovies(query);
  // formElement
  //   .querySelectorAll('*[type="submit"]')
  //   .array.forEach((element) =>
  //     utilities.setDisabledAttribute(element, true)
  //   );
  utilities.setDisabledAttribute(
    formElement.querySelector('*[type="submit"]'),
    true
  );
  utilities.clearChildren(mainElement);
  if (response?.Response) {
    mainElement.appendChild(resultsList(query, response));
  } else {
    mainElement.appendChild(
      contentPlaceholder(
        response?.Error === 'Movie not found!' ? 'searchResultEmpty' : 'other'
      )
    );
  }
});
