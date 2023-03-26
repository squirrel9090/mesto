export default class Section {
  constructor({renderer}, container){
    this._renderer = renderer;
    this._container = document.querySelector('.elements');
  }
  renderItems(items) {
    items.forEach((item) => {
    const card = this._renderer(item);
    this.addItem(card);
    });
  }
  addItem(item) {
    this._container.prepend(item);
  }
}