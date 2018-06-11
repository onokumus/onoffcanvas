export function getSelectorFromElement(element: HTMLElement): string {
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
  let unique_array = arr.filter(function(elem, index, self) {
    return index == self.indexOf(elem);
  });
  return unique_array;
}

export function selectorArray(arr: any[]): any[] {
  let divArr = [];
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    const selector = getSelectorFromElement(element);
    divArr.push(selector);
  }
  return divArr;
}

