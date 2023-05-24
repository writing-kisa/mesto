export default class Section {
  // у класса Section нет своей разметки, он получает разметку через функцию-колбэк и вставляет её в контейнер
  constructor({ items, renderer }, containerSelector) {
    this._items = items; // массив данных, которые нужно добавить на страницу при инициализации класса
    this._renderer = renderer; // где renderer это функция, которая отвечает за создание и отрисовку данных на странице
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    // публичный метод, который отвечает за отрисовку всех элементов, отрисовку элементов по отдельности делает ф-ия renderer
    this._items.forEach((item) => {
      this._renderer(item);
      // this.addItem();
    });
  }

  addItem(element) {
    // принимает DOM-элемент и добавляет его в контейнер
    this._container.append(element);
  }
}
