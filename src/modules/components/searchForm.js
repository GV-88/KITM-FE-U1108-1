import utilities from '../../utilities';
import api from '../api';
import storage from '../storage';
import button from './button';

const searchForm = async function () {
  const formElement = utilities.createElementExt('form', 'search-form', {
    id: 'search-form',
  });
  const inputSearchElement = await formElement.appendChild(
    utilities.createElementExt(
      'input',
      ['search-form__input', 'search-form__input--searchstring'],
      {
        id: 'input-searchstring',
        name: 'searchstring',
        placeholder: 'pavadinimas',
        type: 'search',
        required: '',
        list: 'datalist-searchstring', //this id will be dynamically bound to datalist
      }
    )
  );
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
      '-tipas-'
    )
  );
  const typeOptions = api.typeOptions;
  for (const key in typeOptions) {
    selectTypeElement.appendChild(
      utilities.createElementExt('option', [], { value: key }, typeOptions[key])
    );
  }
  formElement.appendChild(selectTypeElement);
  const submitButtonElement = formElement.appendChild(
    button('paieška', 'fa-magnifying-glass')
  );
  submitButtonElement.type = 'submit';
  submitButtonElement.classList.add('btn--accent');
  const extraOptionsButtonElement = formElement.appendChild(
    button(null, 'fa-gear')
  );
  extraOptionsButtonElement.classList.add('btn--extra-options');
  extraOptionsButtonElement.type = 'button';
  extraOptionsButtonElement.addEventListener('click', (e) => {
    const popupElement = extraOptionsButtonElement.appendChild(
      utilities.createElementExt(
        'button',
        'search-form__popup',
        {},
        'išvalyti paieškos istoriją'
      )
    );
    popupElement.focus();
    popupElement.addEventListener(
      'click',
      (e) => {
        e.stopPropagation();
        storage.clearSearchHistory();
        // extraOptionsButtonElement.removeChild(popupElement);
        setTimeout(() => {
          utilities.smoothRemove(extraOptionsButtonElement, popupElement);
        }, 50);
      },
      { once: true }
    );
    popupElement.addEventListener(
      'focusout',
      (e) => {
        // extraOptionsButtonElement.removeChild(popupElement);
        utilities.smoothRemove(extraOptionsButtonElement, popupElement);
      },
      { once: true }
    );

    inputSearchElement.addEventListener('input', (e) => {
      utilities.setDisabledAttribute(
        submitButtonElement,
        e.target.value !== ''
      ); //theoretically this can overrride another disable
    });
  });
  return formElement;
};

export default searchForm;
