import utilities from './utilities';
import contentPlaceholder from './modules/components/contentPlaceholder';
import header from './modules/components/header';
import api from './modules/api';
import storage from './modules/storage';
import resultsList from './modules/resultsList';
import searchDataList from './modules/components/searchDataList';
import favoritesList from './modules/favoritesList';

const buildInitContent = async () => {
  let favoritesIdList = [];

  const pageContainerElement = document.querySelector('body');
  const headerElement = pageContainerElement.appendChild(await header());
  const formElement = headerElement.querySelector('#search-form');
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

  const makeArtificialResult = (itemData) => {
    return {
      Response: true,
      totalResults: 1,
      Search: [itemData],
    };
  };

  const renderItemAsResult = (itemData) => {
    if (itemData) {
      utilities.clearChildren(mainElement);
      mainElement.appendChild(
        resultsList(
          { id: itemData.imdbID },
          makeArtificialResult(itemData),
          favoritesIdList,
          updateFavoritesFromStorage,
          true
        )
      );
    }
  };

  const updateFavoritesFromStorage = async () => {
    if (containerElement.classList.contains('container--has-sidebar')) {
      const favoritesData = await storage.getAllFavMovies();
      utilities.clearChildren(sidebarElement);
      if (favoritesData instanceof Array) {
        // callback hell?
        favoritesIdList = favoritesData.map((item) => item.imdbID);
        sidebarElement.appendChild(
          favoritesList(
            favoritesData,
            renderItemAsResult,
            updateFavoritesFromStorage
          )
        );
      }
    } else {
      favoritesIdList = await storage.getFavMoviesList();
    }
    utilities.toggleIconFill(
      headerElement.querySelector('.btn--toggle-sidebar .btn__icon'),
      favoritesIdList.length > 0
    );
  };

  const updateSearchesFromStorage = async () => {
    const pastSearches = await storage.getMovieSearches();
    const dataListElement = searchDataList(pastSearches);
    utilities.smoothRemove(
      formElement,
      formElement.querySelector('#datalist-searchstring')
    );
    dataListElement.id = 'datalist-searchstring';
    formElement.appendChild(dataListElement);
  };

  const animateSidebar = async (hasSidebar) => {
    const duration = 250;
    // sidebarElement.style.transition = `${duration}ms`;
    sidebarElement.classList.add(
      `sidebar--transitioning-${hasSidebar ? 'collapsed' : 'expanded'}`
    );
    setTimeout(() => {
      sidebarElement.classList.replace(
        `sidebar--transitioning-${hasSidebar ? 'collapsed' : 'expanded'}`,
        `sidebar--transitioning-${hasSidebar ? 'expanded' : 'collapsed'}`
      );
    }, 20);
    setTimeout(() => {
      sidebarElement.classList.remove(
        `sidebar--transitioning-collapsed`,
        `sidebar--transitioning-expanded`
      );
    }, 20 + duration);
  };

  headerElement
    .querySelector('.btn--toggle-sidebar')
    .addEventListener('click', (e) => {
      const hasSidebar = containerElement.classList.toggle(
        'container--has-sidebar'
      );
      // animateSidebar(hasSidebar);
      if (hasSidebar) {
        updateFavoritesFromStorage();
      } else {
        utilities.clearChildren(sidebarElement);
      }
    });

  headerElement.addEventListener('click', () => {
    headerElement.classList.remove('header--minimized');
  });

  mainElement.addEventListener('click', () => {
    headerElement.classList.add('header--minimized');
  });

  mainElement.addEventListener('click', () => {
    headerElement.classList.add('header--minimized');
  });

  mainElement.addEventListener('scroll', () => {
    headerElement.classList.add('header--minimized');
  });

  updateFavoritesFromStorage();

  updateSearchesFromStorage();

  formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    utilities.setDisabledAttribute(
      e.target.querySelector('*[type="submit"]'),
      false
    );
    new FormData(e.target); //this constructor fires formdata event
  });

  formElement.addEventListener('formdata', async (e) => {
    const query = {};
    for (const pair of e.formData.entries()) {
      if (pair[1]) {
        query[pair[0]] = pair[1];
      }
    }
    if (query.searchstring) {
      await storage.addToMovieSearches(query.searchstring);
      updateSearchesFromStorage();

      const response = await api.searchMovies(query);

      utilities.clearChildren(mainElement);
      if (response?.Response === 'True') {
        mainElement.appendChild(
          resultsList(
            query,
            response,
            favoritesIdList,
            updateFavoritesFromStorage
          )
        );
        headerElement.classList.add('header--minimized');
      } else {
        mainElement.appendChild(
          contentPlaceholder(
            response?.Error === 'Movie not found!'
              ? 'searchResultEmpty'
              : 'other'
          )
        );
      }
    }

    utilities.setDisabledAttribute(
      e.target.querySelector('*[type="submit"]'),
      true
    );
  });

  formElement.querySelector('.search-form__input--searchstring').focus();
};

buildInitContent();
