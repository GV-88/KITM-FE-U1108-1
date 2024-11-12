import utilities from '../../utilities';

const searchDataList = function (pastSearches) {
  const dataListElement = utilities.createElementExt('datalist');
  for (const val of pastSearches) {
    dataListElement.appendChild(
      utilities.createElementExt('option', [], { value: val })
    );
  }
  return dataListElement;
};

export default searchDataList;
