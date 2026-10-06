const fs = require('fs');
const parts = fs.readFileSync(0, 'utf8').trim().split(/\s+/);

let idx = 0;
const n = Number(parts[idx++]);
const k = BigInt(parts[idx++]);
const a = [];
for (let i = 0; i < n; i++) a.push(BigInt(parts[idx++]));

const neg = [];
const pos = [];
let zeros = 0;
for (const v of a) {
  if (v < 0n) neg.push(v);
  else if (v > 0n) pos.push(v);
  else zeros++;
}

neg.sort((x, y) => (x < y ? -1 : x > y ? 1 : 0));
pos.sort((x, y) => (x < y ? -1 : x > y ? 1 : 0));

const negAbs = [];
for (let i = neg.length - 1; i >= 0; i--) negAbs.push(-neg[i]);
const negDesc = neg.slice().reverse();

function countPosPairs(arr, x) {
  if (x < 0n || arr.length < 2) return 0n;
  let cnt = 0n;
  let j = arr.length - 1;
  for (let i = 0; i < arr.length; i++) {
    while (j > i && arr[i] * arr[j] > x) j--;
    if (j <= i) break;
    cnt += BigInt(j - i);
  }
  return cnt;
}

function countLE(x) {
  let cnt = 0n;
  const zn = BigInt(zeros);
  const nn = BigInt(n);

  if (x >= 0n) {
    cnt += zn * (nn - zn) + (zn * (zn - 1n)) / 2n;
    cnt += BigInt(neg.length) * BigInt(pos.length);
  } else if (neg.length && pos.length) {
    let j = pos.length;
    for (const v of negDesc) {
      while (j > 0 && v * pos[j - 1] <= x) j--;
      cnt += BigInt(pos.length - j);
    }
  }

  cnt += countPosPairs(pos, x);
  cnt += countPosPairs(negAbs, x);
  return cnt;
}

let maxAbs = 0n;
for (const v of a) {
  const abs = v < 0n ? -v : v;
  if (abs > maxAbs) maxAbs = abs;
}

let lo = -maxAbs * maxAbs;
let hi = maxAbs * maxAbs;

while (lo < hi) {
  const mid = lo + (hi - lo) / 2n;
  if (countLE(mid) >= k) hi = mid;
  else lo = mid + 1n;
}

console.log(lo.toString());
