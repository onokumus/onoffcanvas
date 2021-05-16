export function getSelectorFromElement(element: Element): string | null {
  let selector = element.getAttribute("data-target");
  if (!selector || selector === "#") {
    selector = element.getAttribute("href") || "";
  }
  try {
    const $selector = document.querySelectorAll(selector);
    return $selector.length > 0 ? selector : null;
  } catch (error) {
    throw new Error("Target Not Found!");
  }
}

export function uniqueArr(arr: any[]): any[] {
  const uniqueArray = arr.filter((elem, index, self) => index === self.indexOf(elem));
  return uniqueArray;
}

export function selectorArray(arrs: any[]): any[] {
  const divArr = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const element of arrs) {
    const selector = getSelectorFromElement(element);
    divArr.push(selector);
  }
  return divArr;
}

export function isElement(element: unknown): element is Element {
  return Boolean((element as Element).classList);
}
