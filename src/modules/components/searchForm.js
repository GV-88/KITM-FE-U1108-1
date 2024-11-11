import utilities from '../../utilities';
import storage from '../storage';
import button from './button';

const searchForm = function () {
  const formElement = utilities.createElementExt('form', 'search-form', {
    id: 'search-form',
  });
  formElement.appendChild(
    utilities.createElementExt(
      'input',
      ['search-form__input', 'search-form__input--searchstring'],
      {
        id: 'input-searchstring',
        name: 'searchstring',
        placeholder: 'pavadinimas',
        type: 'search',
        list: 'datalist-searchstring',
      }
    )
  );
  const dataListElement = formElement.appendChild(
    utilities.createElementExt('datalist', [], { id: 'datalist-searchstring' })
  );
  const pastSearches = storage.getListFromLocalStorage(
    storage.movieSearchesListName
  );
  for (const key in pastSearches) {
    dataListElement.appendChild(
      utilities.createElementExt('option', [], { value: pastSearches[key] })
    );
  }
  formElement.appendChild(
    utilities.createElementExt(
      'input',
      ['search-form__input', 'search-form__input--year'],
      {
        id: 'input-year',
        name: 'year',
        placeholder: 'metai',
        type: 'number',
        min: 1900,
        max: new Date().getFullYear() + 5,
      }
    )
  );
  const selectTypeElement = utilities.createElementExt(
    'select',
    ['search-form__input', 'search-form__input--type'],
    {
      id: 'input-type',
      name: 'type',
    }
  );
  selectTypeElement.appendChild(
    utilities.createElementExt(
      'option',
      'select-placeholder',
      { value: '', selected: '' },
      'tipas'
    )
  );
  const typeOtions = { movie: 'filmas', series: 'serialas', episode: 'serija' };
  for (const key in typeOtions) {
    selectTypeElement.appendChild(
      utilities.createElementExt('option', [], { value: key }, typeOtions[key])
    );
  }
  formElement.appendChild(selectTypeElement);
  const submitButtonElement = formElement.appendChild(
    button('paieška', 'fa-magnifying-glass')
  );
  submitButtonElement.type = 'submit';
  const extraOptionsButtonElement = formElement.appendChild(
    button(null, 'fa-gear')
  );
  extraOptionsButtonElement.type = 'button';
  return formElement;
};

export default searchForm;
