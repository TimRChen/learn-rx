export function getTranslate(element) {
  const style = getComputedStyle(element);
  const regExp = /matrix\((\d+,\s){4}(\d+),\s(\d+)/i;
  const result = style.transform.match(regExp)
  if (result) {
    const [,,x,y] = result
    return {
      x: parseInt(x, 10),
      y: parseInt(y, 10)
    };
  } else {
    return {
      x: 0,
      y: 0
    };
  }
}

export function setTranslate(element, pos) {
  const { x, y } = pos;
  element.style.transform = `translate(${x}px, ${y}px)`;
}
