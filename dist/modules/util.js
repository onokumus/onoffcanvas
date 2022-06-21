export function getSelectorFromElement(element) {
    let selector = element.getAttribute("data-target");
    if (!selector || selector === "#") {
        selector = element.getAttribute("href") || "";
    }
    try {
        const $selector = document.querySelectorAll(selector);
        return $selector.length > 0 ? selector : null;
    }
    catch (error) {
        throw new Error("Target Not Found!");
    }
}
export function selectorArray(arrs) {
    const divArr = [];
    arrs.forEach((arr) => {
        const selector = getSelectorFromElement(arr);
        divArr.push(selector);
    });
    return divArr;
}
export function isElement(element) {
    return Boolean(element.classList);
}
