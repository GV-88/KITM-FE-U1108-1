import utilities from '../utilities';
import api from './api';
import button from './components/button';
import card from './components/card';
import details from './components/details';

const resultsList = function (query, resultData) {
  const state = { nextPage: 1, loadedCount: 0, totalCount: undefined };
  const resultsElement = utilities.createElementExt('div', 'results');
  const resultsGridElement = utilities.createElementExt('div', 'results__grid');
  const pageSummaryElement = utilities.createElementExt(
    'div',
    'results__page-summary'
  );
  const pageInfoElement = utilities.createElementExt(
    'span',
    'results__page-info'
  );
  const loadMoreButtonElement = button('Daugiau!');
  loadMoreButtonElement.classList.add(
    'results__button',
    'results__button--more'
  );
  pageSummaryElement.append(pageInfoElement, loadMoreButtonElement);
  resultsElement.append(resultsGridElement, pageSummaryElement);
  const appendResults = (response) => {
    if (response?.Search) {
      state.totalCount = response?.totalResults;
      state.loadedCount += response.Search.length;
      state.nextPage += 1;
      query.page = state.nextPage;
      for (const item of response.Search) {
        resultsGridElement.appendChild(
          card(item, async (id) => {
            const detailsData = await api.getSingleMovieDetails(id);
            return details(detailsData);
          })
        );
      }
      pageInfoElement.innerText = `Rodoma ${state.loadedCount} iš ${state.totalCount} rezultatų`;
      utilities.setDisabledAttribute(
        loadMoreButtonElement,
        state.loadedCount < state.totalCount
      );
    }
  };

  appendResults(resultData);
  loadMoreButtonElement.addEventListener('click', async () => {
    const response = await api.searchMovies(query);
    appendResults(response);
  });

  return resultsElement;
};

export default resultsList;