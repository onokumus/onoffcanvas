class OnoffCanvas {

  private triggerElements: NodeList;

  constructor(public element) {
    this.triggerElements = document.querySelectorAll(
      `[data-toggle="onoffcanvas"][href="#${element.id}"],
      [data-toggle="onoffcanvas"][data-target="#${element.id}"]`,
    );
    this.addAriaExpanded(this.triggerElements);
    this.toggle();
  }
  private toggle(): void {
    if (this.element.classList.contains('is-open')) {
      this.hide();
    } else {
      this.show();
    }
  }
  private show(): void {
    if (this.element.classList.contains('is-open')) {
      return;
    }
    this.element.classList.add('is-open');
    this.addAriaExpanded(this.triggerElements);
  }
  private hide(): void {
    if (!this.element.classList.contains('is-open')) {
      return;
    }
    this.element.classList.remove('is-open');
    this.addAriaExpanded(this.triggerElements);
  }
  private addAriaExpanded(triggerElements): void {
    const isOpen = this.element.classList.contains("is-open");

    Array.prototype.forEach.call(triggerElements, (el, i) => {
      el.setAttribute('aria-expanded', isOpen);
    });
  }

}

function getSelectorFromElement(element) {
  let selector = element.getAttribute('data-target');
  if (!selector || !(/^#/g.test(selector))) {
    selector = element.getAttribute('href') || '';
  }
  try {
    const $selector = document.querySelectorAll(selector);
    return $selector.length > 0 ? selector : null;
  } catch (error) {
    throw new Error('Target Not Found!');
  }
}

function getTargetFromTrigger(element) {
  const selector = getSelectorFromElement(element);
  return selector ? document.querySelector(selector) : null;
}

let onoffcanvas = document.querySelectorAll('[data-toggle="onoffcanvas"]');

Array.prototype.forEach.call(onoffcanvas, (oc) => {
  oc.addEventListener('click', (event) => {
    event.preventDefault();
    const href = getTargetFromTrigger(oc);
    const ocnvs = new OnoffCanvas(href);
  });
});
