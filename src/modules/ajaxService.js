const ajaxService = (query) => {
  const queryParamsTranslation = {
    searchstring: 's',
    id: 'i',
    year: 'y',
    type: 'type',
    page: 'page',
  };
  const envStatus = process.env.STATUS;
  const apiKey = process.env.API_KEY;
  const baseUrl =
    envStatus === 'dev' ? process.env.DUMMY_URL : 'http://www.omdbapi.com';
  let path = '';
  if (envStatus === 'dev') {
    // const key = `DUMMY_RES_${query['id'] ? 'I' : 'S'}_${query['page'] ?? '1'}`;
    // console.log(process.env[key]); //UNDEFINED??? WTF???
    // //TODO: solve the mystery

    // path = process.env[key];

    path = `response_sample_${query['id'] ? 'i' : 's'}_${
      query['id'] ?? query['page'] ?? '1'
    }.json`;
  }
  let url = new URL(path, baseUrl);
  url.searchParams.append('apikey', apiKey);
  for (const key in query) {
    url.searchParams.append(queryParamsTranslation[key], query[key]);
  }
  return fetch(url)
    .then((response) => {
      if (response.status >= 400) {
        return { Response: false, Error: response.statusText };
      }
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      return { Response: false, Error: err.toString() };
    });

  //TODO: error handling, async/await syntax
};

export default ajaxService;
