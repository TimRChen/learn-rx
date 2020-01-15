import {
  Observable,
  of,
  interval,
  Subject,
  from,
  BehaviorSubject,
  ReplaySubject,
  AsyncSubject,
  merge,
  fromEvent
} from "rxjs";
import {
  multicast,
  refCount,
  map,
  concatAll,
  swtichAll,
  mergeAll,
  takeUntil,
  scan,
  mapTo,
  take
} from "rxjs/operators";

// const button = document.querySelector(".btn");

// Rx.Observable.fromEvent(button, "click")
//   .throttle(1000)
//   .map(event => event.clientX)
//   .scan((count, clientX) => count + clientX, 0)
//   .subscribe(count => {
//       button.innerText = count
//   })

// var observable = Observable.create(function (observer) {
//     observer.next(1);
//     observer.next(2);
//     observer.next(3);
//     setTimeout(() => {
//       observer.next(4);
//       observer.complete();
//     }, 1000);
//   });

//   console.log('just before subscribe');
//   observable.subscribe({
//     next: x => console.log('got value ' + x),
//     error: err => console.error('something wrong occurred: ' + err),
//     complete: () => console.log('done'),
//   });
//   console.log('just after subscribe');

// var observable = Observable.create(function subscribe(observer) {
//   var id = setInterval(() => {
//     observer.next("hi");
//   }, 1000);
// });

// const subscription = observable.subscribe({
//   next: val => {
//     console.log(val);
//   },
//   complete: () => {
//     console.log("done");
//   }
// });

// subscription.unsubscribe();

// function subscribe(observer) {
//     var intervalID = setInterval(() => {
//       observer.next('hi');
//     }, 1000);

//     return function unsubscribe() {
//       clearInterval(intervalID);
//     };
//   }

//   var unsubscribe = subscribe({next: (x) => console.log(x)});

//   // 稍后：
//   unsubscribe(); // 清理资源

// var observable1 = interval(400);
// var observable2 = interval(300);

// var subscription = observable1.subscribe({
//   next: x => console.log("first: " + x)
// });
// var childSubscription = observable2.subscribe(x => console.log("second: " + x));

// subscription.add(childSubscription);

// setTimeout(() => {
//   subscription.unsubscribe();
// }, 1000);

// const subject = new Subject();

// subject.subscribe({
//   next: v => console.log("observerA: " + v)
// });

// subject.subscribe({
//   next: v => console.log("observerB: " + v)
// });

// subject.next(1)

// subject.next(2)

// const source = from([1, 2, 3]);
// const subject = new Subject();
// const multicasted = source.pipe(multicast(subject));

// multicasted.subscribe({
//   next: v => console.log('a: ' + v)
// })

// multicasted.subscribe({
//   next: v => console.log('b: ' + v + '12312qsdasd')
// })

// multicasted.connect();

// const source = interval(500);
// const subject = new Subject();
// const multicasted = source.pipe(multicast(subject));

// const subscription1 = multicasted.subscribe({
//   next: v => console.log('a: ' + v)
// })

// const subscriptionConnect = multicasted.connect();

// let subscription2;

// setTimeout(() => {
//   subscription2 = multicasted.subscribe({
//     next: v => console.log('b: ' + v)
//   })
// }, 600)

// setTimeout(() => {
//   subscription1.unsubscribe();
// }, 1200)

// setTimeout(() => {
//   subscription2.unsubscribe();
//   subscriptionConnect.unsubscribe();
// }, 2000)

// const source = interval(500);
// const subject = new Subject();
// const refCounted = source.pipe(multicast(subject), refCount());

// console.log('a subscribed');
// const subscription1 = refCounted.subscribe({
//   next: v => console.log('a: ' + v)
// })

// let subscription2;

// setTimeout(() => {
//   console.log('b subscribed');
//   subscription2 = refCounted.subscribe({
//     next: v => console.log('b: ' + v)
//   })
// }, 600)

// setTimeout(() => {
//   console.log('a unsubscribed');
//   subscription1.unsubscribe();
// }, 1200)

// setTimeout(() => {
//   console.log('b unsubscribed');
//   subscription2.unsubscribe();
// }, 2000)

// const subject = new BehaviorSubject(0); // 0 is the initial value

// subject.subscribe({
//   next: (v) => {
//     if (v === 2) {
//       console.log('observerA: try out take over the world.')
//     } else {
//       console.log(`observerA: ${v}`)

//     }
//   }
// });

// subject.next(1);
// subject.next(2);

// subject.subscribe({
//   next: (v) => console.log(`observerB: ${v}`)
// });

// subject.next(3);

// const subject = new ReplaySubject(3);

// subject.subscribe({
//   next: v => console.log(`a: ${v}`)
// })

// subject.next(1);
// subject.next(2);
// subject.next(3);
// subject.next(4);

// subject.subscribe({
//   next: v => console.log(`b: ${v}`)
// })

// subject.next(5)

// const subject = new ReplaySubject(100, 500);

// subject.subscribe({
//   next: v => console.log(`a: ${v}`)
// });

// let i = 1;

// setInterval(() => subject.next(i++), 200);

// setTimeout(() => {
//   subject.subscribe({
//     next: v => console.log(`b: ${v}`)
//   });
// }, 1000);

// const subject = new AsyncSubject();

// subject.subscribe({
//   next: v => console.log(`a: ${v}`)
// })

// subject.next(1)
// subject.next(2)
// subject.next(3)
// subject.next(4)

// subject.subscribe({
//   next: v => console.log(`b: ${v}`)
// })

// subject.next(5);
// subject.complete();

// const observable = interval(1000);

// observable.subscribe({
//   next: v => console.log(v)
// })

// let i = 0
// setInterval(() => {
//   console.log(i++)
// }, 1000)

// const ob1 = interval(1000);
// const ob2 = interval(400);

// const merged = merge(ob1, ob2)

// const mergeSubscription = merged.subscribe({
//   next: v => console.log(v),
//   complete: () => console.log('complete')
// })

// console.log(mergeSubscription)
// mergeSubscription.unsubscribe()

// map(x => x * x)(of(1,2,3)).subscribe(v => console.log(v))

// map(x => x * 2)(interval(1000)).subscribe(v => console.log(v))

// interval(1000).pipe(map(x => x * 2)).subscribe(v => console.log(v))

// interval(1000).pipe(map(x => x * 2), map(x => x + 10086)).subscribe(v => console.log(v))

// interval(500)
//   .pipe(
//     map(x => Promise.resolve(2))
//     // concatAll()
//   )
//   .subscribe(v => {
//     v.then(res => {
//       console.log(res);
//     });
//   });

// interval(500)
//   .pipe(
//     map(x => Promise.resolve(2)),
//     concatAll()
//   )
//   .subscribe(v => console.log(v));

// interval(500)
//   .pipe(
//     map(x => Promise.resolve(2)),
//     mergeAll()
//   )
//   .subscribe(v => console.log(v));

// const source = interval(1000);
// const clicks = fromEvent(document, 'click');
// const result = source.pipe(takeUntil(clicks));
// result.subscribe(x => console.log(x))

// const s = of(1,1,2,3,4)

// s.pipe(map(x => x * 3)).subscribe(v => console.log(v))

// const button = document.querySelector(".btn");
// const textBox = document.querySelector(".text");

// const clicks = fromEvent(button, "click");

// const ones = clicks.pipe(mapTo(1));

// const seed = 0;

// const count = ones.pipe(scan((acc, one) => {
//   return acc + one
// }, seed));

// count.subscribe(v => { textBox.innerText = v })

// function * generateDoubles(seed) {
//   let i = seed;
//   while (true) {
//     yield i;
//     i = 2 * i;
//   }
// }

// const iterator = generateDoubles(3);

// const result = from(iterator).pipe(take(10));

// result.subscribe(v => console.log(v))



