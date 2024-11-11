import utilities from '../../utilities';

const contentPlaceholder = function (type, injectContent) {
  const contentElement = utilities.createElementExt(
    'div',
    'content-placeholder'
  );
  // https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent#differences_from_innertext
  switch (type) {
    case 'initial':
      contentElement.innerText = 'welcome...';
      break;
    case 'searchResultEmpty':
      contentElement.innerText = 'no results...';
      break;
    default:
      contentElement.innerText = '...';
      break;
  }
  if (typeof injectContent === 'string') {
    contentElement.innerText = injectContent;
  }
  return contentElement;
};

export default contentPlaceholder;
