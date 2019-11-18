import { add, sampleData } from './helpers';
import { from, interval, fromEvent, of, range, merge, concat } from 'rxjs';
import { pluck, switchMap, first, last, startWith, subscribeOn, skip, take, takeWhile, skipWhile, tap, skipUntil, delay, concatMap, takeLast, takeUntil, throttle, debounce, debounceTime, scan, reduce, map,   } from 'rxjs/operators';

const submitButton = document.getElementById('submit');
const streamOne = interval(1000).pipe(take(10));
const streamTwo = fromEvent(submitButton, 'click').pipe(
    map(event => 'clicked')
);

concat(streamOne, streamTwo).subscribe(add.li);