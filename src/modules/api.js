import ajaxService from './ajaxService';
import storage from './storage';

const api = {
  searchMovies: async function (query) {
    return ajaxService(query);
  },
  getSingleMovieDetails: async function (id) {
    let data = await storage.getMovieDetails(id);
    if (data === null) {
      data = await ajaxService({ id: id });
      if (data['Response'] && data['imdbID']) {
        storage.saveMovieDetails(data);
      }
    }
    return data;
  },
  typeOptions: {
    movie: 'filmas',
    series: 'serialas',
    episode: 'serija',
    game: 'žaidimas',
  },
};

export default api;
