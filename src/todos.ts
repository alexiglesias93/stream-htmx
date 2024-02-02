export class UpdateIDHandler implements HTMLRewriterElementContentHandlers {
  constructor(public id: string) {}

  element(element: Element) {
    const originalId = element.getAttribute('id');

    element.setAttribute('id', `${originalId}_${this.id}`);
  }
}

export class UpdateTextHandler implements HTMLRewriterElementContentHandlers {
  constructor(public value: string) {}

  element(element: Element) {
    element.setInnerContent(this.value);
  }
}

export class RemoveItemHandler implements HTMLRewriterElementContentHandlers {
  constructor() {}

  element(element: Element) {
    element.remove();
  }
}

export class UpdateInputValueHandler
  implements HTMLRewriterElementContentHandlers
{
  constructor(public title: string) {}

  element(element: Element) {
    element.setAttribute('value', this.title);
  }
}
