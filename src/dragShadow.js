import { fromEvent, from, interval, zip } from "rxjs";
import { map, switchMap, takeUntil, mergeMap, tap } from "rxjs/operators";

function getTranslate(element) {
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

function setTranslate(element, pos) {
  const { x, y } = pos;
  element.style.transform = `translate(${x}px, ${y}px)`;
}


const headBox = document.querySelector(".head-box");
const boxes = document.querySelectorAll(".box");

const mouseDown$ = fromEvent(headBox, "mousedown");
const mouseMove$ = fromEvent(document, "mousemove");
const mouseUp$ = fromEvent(document, "mouseup");

const boxes$ = from([...boxes]);
// 使用zip拉链配对推出数据，以boxes$数据size为推出结束标志
const delayBoxes$ = zip(boxes$, interval(100)).pipe(map(list => list.shift()));

mouseDown$
  .pipe(
    map(event => ({
      pos: getTranslate(headBox),
      event
    })),
    switchMap(initialState => {
      const {
        pos: { x, y },
        event
      } = initialState;
      const { clientX, clientY } = event;

      return mouseMove$.pipe(
        map(mouseEvent => ({
          x: mouseEvent.clientX - clientX + x,
          y: mouseEvent.clientY - clientY + y
        })),
        takeUntil(mouseUp$)
      );
    }),
    mergeMap(pos => {
      return delayBoxes$.pipe(
        tap(box => {
          setTranslate(box, pos);
        })
      );
    })
  )
  .subscribe();
