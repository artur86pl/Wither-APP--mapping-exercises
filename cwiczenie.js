const a = 10;
const b = 5;
const c = true;
const d = false;
const e = 'kot';

if (a-b > 0) {
    console.log('dodatnie');
}
else if (a-b == 0) {
    console.log('zero');
}
else {
    console.log('ujemne');
}

console.log('drugi sposób:')
a-b > 0 ? console.log('dodatnie') : a-b == 0 ? console.log('zero') : console.log('ujemne');

// console.log('trzeci sposób:')
// a-b > 0 ? console.log('dodatnie') : a-b == 0 ? console.log('zero') : console.log('ujemne');

console.log(c && e);
console.log(d && e);
console.log(d || e);
console.log(c || e);

console.log(c || d);
console.log(d || c);

console.log(false || false || false || false);
console.log(false || false || false || false || e);

console.log(false || a || false || false || e);

console.log(true && true && true && true && false);
console.log(true && true && false && true && a);
console.log(true && true && false && true && a || b);

console.log(true && false || false && a || true && b);
console.log(e && true || false);
