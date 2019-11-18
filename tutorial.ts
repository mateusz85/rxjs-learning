import { map, pluck, startWith, skip, skipWhile, take, skipUntil, switchMap, concatMap, delay, takeLast, takeWhile, takeUntil, debounce, debounceTime, reduce, scan } from "rxjs/operators";
import { pipe, from, interval, fromEvent, of, range, merge, concat } from "rxjs";
import { fromFetch } from 'rxjs/fetch'



// ------------------------
// CREATORS
// ------------------------



// of()
of(1,2,3,4);

// of() Array

const table = [1,2,3,4];
of(...table);

// from()
from(['apples', 'oranges', 'grapes']);

// fromEvent()
const submit = document.getElementById('submit');
const clicks = fromEvent(submit, 'click').subscribe(
    ev => console.log(ev)
);

// fromFetch()
const users = fromFetch('http://jsonplaceholder.com').subscribe(
    result => console.log(result)
);

// fromFetch() JSON
const usersJSON = fromFetch('http://jsonplaceholder.com')
.pipe(
    switchMap(response => response.json())
)
.subscribe(
    result => result.forEach(user => console.log(user.name))
);

// interval()
interval(1000);

// range()
range(50, 51);

// range with delay()
range(50, 51).pipe(
    concatMap(
        value => of(value).pipe(delay(500))
    )
)
.subscribe(data => console.log(data))




// ------------------------
// OPERATORS
// ------------------------



// map(), filter()
// Działają tak samo jak w JS

// pluck()
// pozwala wyciągnąć dowolną właściwość zobiektu np.

pipe(
    pluck('company', 'adress')
);

// tap()
// taki console.log() dla rxjs

// first(), last()
// pierwszy i ostatni element z streamu

// startWith()
// coś na styl initial value

const me = {
    name: 'Clementine Bauch'
};

pipe(
    startWith(me)
)

// skip(), skilLast()
// przeskakuje x wynikow; skipLast() dziala w przeciwna strone

from(['apples', 'oranges', 'grapes', 'pears'])
    .pipe(
        skip(2)
    )

// skipWhile()
// przeskakuje eventy dopoki funkcja zwraca true (dziala w 1 strone)

interval(1000)
    .pipe(
        take(10),
        skipWhile(num => num < 4)
    )

// skipUntil()

const button = document.getElementById('submit');
const buttonEvents = fromEvent(button, 'click');

interval(1000)
    .pipe(
        skipUntil(buttonEvents)
    )
    
// take(), takeWhile(), takeUntil()
// bierze tylko okreslona ilosc wynikow

interval(500)
    .pipe(
        take(10)
    )
    .subscribe(data => console.log(data))

interval(500)
    .pipe(
        takeWhile(num => num < 5)
    )
    .subscribe(data => console.log(data))

range(10, 10)
    .pipe(
        takeLast(5)
    )
    .subscribe(data => console.log(data))

const button2 = document.getElementById('submit');
const buttonEvents2 = fromEvent(button, 'click');

interval(2000)
    .pipe(
        takeUntil(buttonEvents)
    )
    .subscribe(data => console.log(data))

// debounce() debounceTime()
// opoznia przesylanie danych np. z formularzy

const inputBox = document.getElementById('input');
const renderBox = document.getElementById('render-box');
const submitButton = document.getElementById('submit');

const content = fromEvent(inputBox, 'keyup');
const submit = fromEvent(submitButton, 'click');

content
    .pipe(debounce(() => interval(1000)))
    .subscribe(() => renderBox.innerHTML = inputBox.value);

content
    .pipe(debounce(() => submit))
    .subscribe(() => renderBox.innerHTML = inputBox.value);

content
    .pipe(debounceTime(2000))
    .subscribe(() => renderBox.innerHTML = inputBox.value);

// scan() 
// cos jak reduce() w JS, z ta roznica ze reduce zlaczy wszystkie wartosci i wyemituje jedna koncowa, tutaj emituje wartosci pojedynczo

const FS = interval(1000).pipe(
    take(10),
    scan((acc, value) => {
            const n = value + 1;
            const last = acc[n];
            const beforeLast = acc[n-1];
            return [...acc, last + beforeLast];
        }, [0,1]
    )
).subscribe(data => console.log(data));

// reduce()
// podobne do scan() wyzej, ale laczy wszystkie wartosci w 1 observable

const FS2 = interval(100).pipe(
    take(10),
    reduce((acc, value) => {
            const n = value + 1;
            const last = acc[n];
            const beforeLast = acc[n-1];
            return [...acc, last + beforeLast];
        }, [0,1]
    ),
    concatMap(sequence => from(sequence)) // w ten sposob mozeny ponownie zmienic 1 wartosc na kilka observabli
).subscribe(data => console.log(data));

// merge()
// laczy 2 streamy w 1 - moze mieszac kolejnosc

const submitButton = document.getElementById('submit');
const streamOne = interval(1000).pipe(take(10));
const streamTwo = fromEvent(submitButton, 'click').pipe(
    map(event => 'clicked')
);

merge(streamOne, streamTwo).subscribe(data => console.log(data));

// concat()
// laczy 2 streamy w 1, ale wpierw pierwszy steram musi sie skonczyc - nie mieszka kolejnosci

const submitButton = document.getElementById('submit');
const streamOne = interval(1000).pipe(take(10));
const streamTwo = fromEvent(submitButton, 'click').pipe(
    map(event => 'clicked')
);

concat(streamOne, streamTwo).subscribe(data => console.log(data));