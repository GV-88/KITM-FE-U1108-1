const utilities = {
  createElementExt: function (tag, classList, attributes, text) {
    let element = document.createElement(tag);
    if (Array.isArray(classList) && classList.length > 0) {
      element.classList.add(...classList);
    } else if (typeof classList === 'string' && classList.length > 0) {
      element.classList.add(classList);
    }
    if (attributes) {
      for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
      }
    }
    if (text) {
      element.appendChild(document.createTextNode(text));
    }
    return element;
  },

  /**
   * Toggles disabled attribute based on specified condition
   * @param {HTMLElement} element
   * @param {boolean} condition true to enable, false to disable
   */
  setDisabledAttribute: function (element, condition) {
    if (!condition) {
      element.setAttribute('disabled', '');
    } else {
      element.removeAttribute('disabled');
    }
  },

  toggleClassByCondition: function (element, cssClass, condition) {
    if (condition) {
      element.classList.remove(cssClass);
    } else {
      element.classList.add(cssClass);
    }
  },

  clearChildren: function (element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  },

  smoothRemove: function (parent, child) {
    if (parent && parent.contains(child)) {
      parent.removeChild(child);
    }
  },
};

export default utilities;