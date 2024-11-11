const storage = {
  getListFromLocalStorage: function (key) {
    let values = localStorage.getItem(key);
    if (values === null) {
      values = [];
    } else {
      values = JSON.parse(values);
    }
    return values;
  },
  addToLocalStorageList: function (key, val, maxCount) {
    // "this" does not work with arrow functions
    let valuesSet = new Set(this.getListFromLocalStorage(key));
    if (maxCount && maxCount <= valuesSet.size) {
      return -1;
    }
    valuesSet.add(val);
    localStorage.setItem(key, JSON.stringify(Array.from(valuesSet)));
    return 1;
  },
  removeFromLocalStorageList: function (key, val) {
    let valuesSet = new Set(this.getListFromLocalStorage(key));
    valuesSet.delete(val);
    localStorage.setItem(key, JSON.stringify(Array.from(valuesSet)));
  },
  movieSearchesListName: 'OMDb_searches',
  movieDetailsPrefix: 'OMDb_details_',
  movieFavoritesPrefix: 'OMDb_fav_',
  movieFavoritesListName: 'OMDb_fav',
  movieFavoritesMaxStorage: 8,
  getMovieDetails: async function (id) {
    let data = sessionStorage.getItem(this.movieDetailsPrefix + id);
    return data === null ? null : JSON.parse(data);
  },
  saveMovieDetails: function (data) {
    sessionStorage.setItem(
      this.movieDetailsPrefix + data.imdbID,
      JSON.stringify(data)
    );
  },
  getFavMoviesList: function () {
    return this.getListFromLocalStorage(this.movieFavoritesListName);
  },
  getAllFavMovies: function () {
    let values = [];
    const ids = this.getFavMoviesList;
    if (Array.isArray(ids)) {
      for (const id of ids) {
        let data = sessionStorage.getItem(this.movieFavoritesPrefix + id);
        if (data !== null) {
          values.push(JSON.parse(data));
        }
      }
    }
    return values;
  },
  addToFavMovies: function (data) {
    if (
      this.addToLocalStorageList(
        this.movieFavoritesListName,
        data.imdbID,
        this.movieFavoritesMaxStorage
      ) === 1
    ) {
      localStorage.setItem(
        this.movieFavoritesPrefix + data.imdbID,
        JSON.stringify(data)
      );
      return 1;
    }
    return 0;
  },
  removeFromFavMovies: function (id) {
    this.removeFromLocalStorageList(this.movieFavoritesListName, id);
    localStorage.removeItem(this.movieFavoritesPrefix + id);
  },
};

export default storage;
