export default class Section {
  // у класса Section нет своей разметки, он получает разметку через функцию-колбэк и вставляет её в контейнер
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer; // где renderer это функция, которая отвечает за создание и отрисовку данных на странице
    this._container = document.querySelector(containerSelector);
  }

  renderItems(array) {
    // публичный метод, который отвечает за отрисовку всех элементов, отрисовку элементов по отдельности делает ф-ия renderer
    array.forEach((item) => {
      this._renderer(item);
      // this.addItem();
    });
  }

  addItem(element) {
    // принимает DOM-элемент и добавляет его в контейнер
    this._container.prepend(element);
  }
}
