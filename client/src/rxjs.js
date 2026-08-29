import { Observable, merge, combineLatest, from, of, EMPTY, timer, fromEvent,
  filter, map, mapTo, withLatestFrom, catchError, startWith, mergeMap,
  scan, share, throttleTime, switchMap, distinctUntilChanged, first, skip,
  concat, pluck, delay, shareReplay } from 'rxjs'

// Static creation methods on Observable (RxJS 5/6 style)
Observable.merge = (...args) => merge(...args)
Observable.combineLatest = (...args) => {
  const last = args[args.length-1]
  if (typeof last=='function'){
    const selector = args.pop()
    return combineLatest(args).pipe(map(arr => selector(...arr)))
  }
  return combineLatest(args)
}
Observable.from = src => {
  if (!src)
    return from(src)
  if (typeof src.addListener=='function') // xstream
    return new Observable(observer => {
      const listener = { next: v=>observer.next(v), error: e=>observer.error(e), complete: ()=>observer.complete() }
      src.addListener(listener)
      return ()=>src.removeListener(listener)
    })
  if (typeof src.subscribe=='function') // RxJS 5 / ObservableBase
    return new Observable(observer => {
      const sub = src.subscribe(v=>observer.next(v), e=>observer.error(e), ()=>observer.complete())
      return ()=>sub.unsubscribe()
    })
  return from(src)
}
Observable.of = (...args) => of(...args)
Observable.empty = () => EMPTY
Observable.timer = (due, period) => period!=null ? timer(due, period) : timer(due)
Observable.fromEvent = (el, event, opts) => fromEvent(el, event, opts)

// Prototype operators (RxJS 5/6 chainable style)
const proto = Observable.prototype

proto.filter = function(fn){ return this.pipe(filter(fn)) }
proto.map = function(fn){ return this.pipe(map(fn)) }
proto.mapTo = function(v){ return this.pipe(mapTo(v)) }
proto.withLatestFrom = function(...args){
  const last = args[args.length-1]
  if (typeof last=='function'){
    const selector = args.pop()
    return this.pipe(withLatestFrom(...args), map(arr => selector(...arr)))
  }
  return this.pipe(withLatestFrom(...args))
}
proto.catch = function(fn){ return this.pipe(catchError(fn)) }
proto.startWith = function(...args){ return this.pipe(startWith(...args)) }
proto.mergeMap = function(fn){ return this.pipe(mergeMap(fn)) }
proto.flatMap = function(fn){ return this.pipe(mergeMap(fn)) }
proto.scan = function(fn, ...args){ return this.pipe(scan(fn, ...args)) }
proto.share = function(){ return this.pipe(share()) }
proto.throttleTime = function(ms){ return this.pipe(throttleTime(ms)) }
proto.switchMap = function(fn){ return this.pipe(switchMap(fn)) }
proto.distinctUntilChanged = function(fn){
  return fn ? this.pipe(distinctUntilChanged(fn)) : this.pipe(distinctUntilChanged())
}
proto.first = function(){ return this.pipe(first()) }
proto.skip = function(n){ return this.pipe(skip(n)) }
proto.concat = function(...args){ return concat(this, ...args) }
proto.pluck = function(...paths){ return this.pipe(pluck(...paths)) }
proto.delay = function(ms){ return this.pipe(delay(ms)) }
proto.shareReplay = function(n){ return this.pipe(shareReplay(n)) }
proto.merge = function(...args){ return merge(this, ...args) }
proto.combineLatest = function(...args){
  const last = args[args.length-1]
  if (typeof last=='function'){
    const selector = args.pop()
    return combineLatest([this, ...args]).pipe(map(arr => selector(...arr)))
  }
  return combineLatest([this, ...args])
}

export { Observable }
