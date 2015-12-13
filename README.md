# `combineLatestStartUndefined` for RxJS

`npm install rx-combine-latest-start-undefined`

## Usage

This function has the exact same usage as [Rx.Observable.combineLatest](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/combinelatest.md),
including the ability to use a `resultSelector` function

The example below is a variation the one on [staltz/combineLatestObj](https://github.com/staltz/combineLatestObj).

Given these observables:
```js
const a$ = Rx.Observable.interval(50).share();
const b$ = Rx.Observable.just('Boston').delay(125).share();
const c$ = Rx.Observable.just('Colorado').delay(200).share();
```

Makes an observable which does not wait until all input observables have had
an onNext event before emitting.  This version emits immediately with
`undefined` placeholder values until the next emission from the observable.
This can be useful for situations where you want to see data as soon as
it comes in from any of the observables, and are willing to manage the undefined
inputs in your app code.

```js
import combineLatestStartUndefined from 'rx-combine-latest-start-undefined';

const state$ = combineLatestStartUndefined(a$, b$, c$).take(6);
// or const state$ = combineLatestStartUndefined({[a$, b$, c$]).take(6);

state$.subscribe(x => console.dir(x));
// Time 0:   {"0": undefined, "1": undefined, "2": undefined}
// Time 50:  {"0": 0, "1": undefined, "2": undefined}
// Time 100: {"0": 1, "1": undefined, "2": undefined}
// Time 125: {"0": 1, "1": 'Boston', "2": undefined}
// Time 150: {"0": 2, "1": 'Boston', "2": undefined}
// Time 200: {"0": 2, "1": 'Boston', "2": 'Colorado'}

```
