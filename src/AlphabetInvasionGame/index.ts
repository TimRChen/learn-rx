import { interval, BehaviorSubject, fromEvent, combineLatest } from 'rxjs'
import { switchMap, scan, startWith, map, takeWhile } from 'rxjs/operators'
import { State, Letters } from './interfaces'

const randomLetter = () => {
  const zCharCode = 'z'.charCodeAt(0)
  const aCharCode = 'a'.charCodeAt(0)
  return String.fromCharCode(
    Math.random() * (zCharCode - aCharCode) + aCharCode
  )
}

const levelChangeThreshold = 20;
const speedAdjust = 50;
const endThreshold = 15; // 流最大输出行
const gameWidth = 30; // 游戏界面宽限制

const intervalSubject = new BehaviorSubject(600);

const letters$ = intervalSubject.pipe(
  switchMap(i => {
    return interval(i).pipe(
      scan<number, Letters>(
        letters => {
          return {
            intrvl: i,
            ltrs: [
              {
                letter: randomLetter(),
                yPos: Math.floor(Math.random() * gameWidth)
              },
              ...letters.ltrs
            ]
          }
        },
        { ltrs: [], intrvl: 0 }
      ),
    )
  })
)

const keys$ = fromEvent(document, 'keydown').pipe(
  startWith({ key: '' }),
  map((e: KeyboardEvent) => e.key)
)

const renderGame = (state: State) => (
  (document.body.innerHTML = `Score: ${state.score}, Level: ${state.level} <br/>`),
  state.letters.forEach(l => {
    (document.body.innerHTML += '&nbsp'.repeat(l.yPos) + l.letter + '<br/>')
  }),
  (document.body.innerHTML += '<br/>'.repeat(endThreshold - state.letters.length - 1) + '-'.repeat(gameWidth))
)

const renderGameOver = () => (document.body.innerHTML += '<br/>GAME OVER!');
const noop = () => { }

const game$ = combineLatest(keys$, letters$).pipe(
  scan<[string, Letters], State>(
    (state, [key, letters]) => (
      letters.ltrs[letters.ltrs.length - 1] && letters.ltrs[letters.ltrs.length - 1].letter === key ?
        ((state.score += 1), letters.ltrs.pop()) :
        noop,
      state.score > 0 && state.score % levelChangeThreshold === 0 ?
        (
          (letters.ltrs == []),
          (state.level += 1),
          (state.score += 1),
          intervalSubject.next(letters.intrvl - speedAdjust) // 升级加速
        ) :
        noop,
      {
        score: state.score,
        letters: letters.ltrs,
        level: state.level
      }
    ),
    {
      score: 0,
      letters: [],
      level: 1
    }
  ),
  takeWhile(state => state.letters.length < endThreshold) // 限制流最大输出行
);

game$.subscribe(renderGame, noop, renderGameOver);