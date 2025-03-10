(function() {
  'use strict';

  const Util = {
    execObjectRoutine(obj) {
      for (const key of Object.keys(obj)) {
        if (typeof obj[key] === 'function') {
          const retval = obj[key]();
          if (retval != null) return retval;
        }
      }
    },
    empty(arg) {
      let isEmpty = arg == null || arg === false || arg === '';
      if (!isEmpty) {
        if (Array.isArray(arg) && arg.length === 0) isEmpty = true;
        if (Object.getPrototypeOf(arg).constructor.name === 'Object' && Object.keys(arg).length === 0) isEmpty = true;
      }
      return isEmpty;
    },
    addEvent(elems, type, listener, options) {
      if (Util.empty(elems)) return null;
      if (!elems.forEach) elems = [elems];
      if (options == null) options = false;
      elems.forEach((elem, idx) => elem.addEventListener(type, evt => { listener.call(elem, evt, idx); }, options));
    },
    triggerEvent(elems, type, options) {
      if (Util.empty(elems)) return null;
      if (!elems.forEach) elems = [elems];
      const event = new Event(type, options);
      elems.forEach(elem => elem.dispatchEvent(event));
    },
    createElement(name, attrs, parent) {
      if (attrs == null) attrs = {};
      const elem = document.createElement(name);
      const { textContent, ...restAttrs } = attrs;
      if (textContent != null) elem.textContent = textContent;
      for (const [key, value] of Object.entries(restAttrs)) {
        elem.setAttribute(key, value);
      }
      if (parent != null) parent.append(elem);
      return elem;
    },
  };

  const NS = {
  };
  window.NS = NS;
  NS.Util = Util;

  const PreMain = {
    analytics() {
      const head = document.head;
      const script = Util.createElement('script', { src: 'https://www.googletagmanager.com/gtag/js?id=G-5X2NV8K931', async: true }, head);
      window.dataLayer = window.dataLayer || [];
      function gtag() { window.dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', 'G-5X2NV8K931');
    },
  };

  const Main = {
  };

  Util.execObjectRoutine(PreMain);
  Util.addEvent(document, 'DOMContentLoaded', () => Util.execObjectRoutine(Main));
  Util.addEvent(window, 'unload', () => {});
}());
