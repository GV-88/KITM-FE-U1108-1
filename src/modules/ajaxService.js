const ajaxService = async (query) => {
  const queryParamsTranslation = {
    searchstring: 's',
    id: 'i',
    year: 'y',
    type: 'type',
    page: 'page',
  };
  const envStatus = process.env.MIX_STATUS;
  const apiKey = process.env.MIX_API_KEY;
  const baseUrl =
    envStatus === 'dev' ? 'http://localhost' : 'http://www.omdbapi.com';
  let url = new URL(baseUrl);
  if (envStatus === 'dev') {
    url.port = window.location.port;
    url.pathname = `/test_data/response_sample_${query['id'] ? 'i' : 's'}_${
      query['id'] ?? query['page'] ?? '1'
    }.json`;
  }
  url.searchParams.append('apikey', apiKey);
  for (const key in query) {
    url.searchParams.append(queryParamsTranslation[key], query[key]);
  }
  try {
    const response = await fetch(url);
    if (
      response?.headers &&
      (response.headers.get('Content-Type') ?? '')
        .toLowerCase()
        .includes('application/json')
    ) {
      return response.json();
    } else {
      throw new Error('unexpected content type');
    }
  } catch (error) {
    console.log(error);
    return { Response: false, Error: error };
  }
};

export default ajaxService;
