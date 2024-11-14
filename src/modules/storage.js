const storage = {
  getListFromLocalStorage: async function (key) {
    let values = localStorage.getItem(key);
    if (values === null) {
      values = [];
    } else {
      values = JSON.parse(values);
    }
    return values;
  },
  /**
   * For storing a list of primitive values; always refreshes newest and removes oldest if needed
   * @param {string} key identifier for the whole list
   * @param {*} val a unique primitive value to be added to the list
   * @param {number} maxCount optional: how many values to keep in storage
   * @returns removed values, if any
   */
  addToLocalStorageList: async function (key, val, maxCount) {
    //assume the array sort order persists;
    //always put newly accessed values at the front, remove oldest to keep maxCount
    let removedValues = [];
    let valuesArray = await this.getListFromLocalStorage(key);
    valuesArray = valuesArray.filter((i) => i !== val);
    valuesArray.unshift(val);
    if (maxCount) {
      while (valuesArray.length > maxCount) {
        removedValues.push(valuesArray.pop());
      }
    }
    localStorage.setItem(key, JSON.stringify(valuesArray));
    return removedValues;
  },
  removeFromLocalStorageList: async function (key, val) {
    let valuesSet = new Set(await this.getListFromLocalStorage(key));
    valuesSet.delete(val);
    localStorage.setItem(key, JSON.stringify(Array.from(valuesSet)));
  },
  movieSearchesListName: 'OMDb_searches',
  movieDetailsPrefix: 'OMDb_details_',
  movieFavoritesPrefix: 'OMDb_fav_',
  movieFavoritesListName: 'OMDb_fav',
  movieSearchesMaxStorage: 30,
  movieFavoritesMaxStorage: 20,
  getMovieSearches: async function () {
    return this.getListFromLocalStorage(this.movieSearchesListName);
  },
  addToMovieSearches: function (val) {
    this.addToLocalStorageList(
      this.movieSearchesListName,
      val,
      this.movieSearchesMaxStorage
    );
  },
  clearSearchHistory: function () {
    localStorage.removeItem(this.movieSearchesListName);
  },
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
  getFavMoviesList: async function () {
    return this.getListFromLocalStorage(this.movieFavoritesListName);
  },
  getAllFavMovies: async function () {
    let values = [];
    const ids = await this.getFavMoviesList();
    if (Array.isArray(ids)) {
      for (const id of ids) {
        let data = localStorage.getItem(this.movieFavoritesPrefix + id);
        if (data !== null) {
          values.push(JSON.parse(data));
        }
      }
    }
    return values;
  },
  addToFavMovies: async function (data) {
    const moviesToRemove = await this.addToLocalStorageList(
      this.movieFavoritesListName,
      data.imdbID,
      this.movieFavoritesMaxStorage
    );
    for (id of moviesToRemove) {
      localStorage.removeItem(this.movieFavoritesPrefix + id);
    }
    localStorage.setItem(
      this.movieFavoritesPrefix + data.imdbID,
      JSON.stringify(data)
    );
  },
  removeFromFavMovies: async function (id) {
    this.removeFromLocalStorageList(this.movieFavoritesListName, id);
    localStorage.removeItem(this.movieFavoritesPrefix + id);
  },
};

export default storage;
