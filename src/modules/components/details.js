import utilities from '../../utilities';

const details = function (data) {
  const fields = {
    Rated: { label: 'Reitingas' },
    Runtime: { label: 'Trukmė' },
    Genre: { label: 'Žanras' },
    Director: { label: 'Režisierius' },
    Actors: { label: 'Aktoriai' },
    Plot: { label: 'Siužetas' },
  };

  const detailsElement = utilities.createElementExt('div', 'details', {
    'data-id': data.imdbID,
  });
  for (const key in fields) {
    if (data[key]) {
      const fieldElement = utilities.createElementExt(
        'div',
        'details__field-block'
      );
      fieldElement.append(
        utilities.createElementExt(
          'div',
          'details__field-label',
          {},
          fields[key].label
        ),
        utilities.createElementExt('div', 'details__field-value', {}, data[key])
      );
      detailsElement.append(fieldElement);
    }
  }

  return detailsElement;
};

export default details;
