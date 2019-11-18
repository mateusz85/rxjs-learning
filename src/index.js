import { add, sampleData } from './helpers';
import { from, interval, fromEvent, of, range, merge, concat, combineLatest } from 'rxjs';
import { pluck, switchMap, first, last, startWith, subscribeOn, skip, take, takeWhile, skipWhile, tap, skipUntil, delay, concatMap, takeLast, takeUntil, throttle, debounce, debounceTime, scan, reduce, map, concatAll, mergeAll  } from 'rxjs/operators';

const button = document.getElementById('submit');
const clicks = fromEvent(button, 'click');

const source = clicks
    .pipe(
        tap(event => console.log('clicked')),
        map(event => interval(1000).pipe(take(3))),
        mergeAll()
    )
    .subscribe(data => console.log(data))