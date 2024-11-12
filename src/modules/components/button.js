import utilities from '../../utilities';

const button = function (text, iconDef) {
  const buttonElement = utilities.createElementExt('button', 'btn');
  if (typeof iconDef === 'string' && iconDef.startsWith('fa-')) {
    iconDef = ['fa-solid', iconDef];
  }
  if (Array.isArray(iconDef)) {
    buttonElement.appendChild(
      utilities.createElementExt('i', ['btn__icon'].concat(iconDef))
    );
    buttonElement.classList.add('btn--icon');
  }
  if (text) {
    buttonElement.appendChild(
      utilities.createElementExt('span', 'btn__text', [], text)
    );
  } else {
    buttonElement.classList.add('btn--icon-only');
  }
  return buttonElement;
};

export default button;
