'use strict';

const { kthPairProduct } = require('./kth_pair_product.js');

function brute(a, k) {
  const prods = [];
  for (let i = 0; i < a.length; i += 1) {
    for (let j = i + 1; j < a.length; j += 1) {
      prods.push(BigInt(a[i]) * BigInt(a[j]));
    }
  }
  prods.sort((x, y) => (x < y ? -1 : x > y ? 1 : 0));
  return prods[k - 1];
}

function run(a, k, expected) {
  const got = kthPairProduct(a.map((v) => BigInt(v)), BigInt(k));
  const br = brute(a, k);
  const exp = expected === undefined ? br : BigInt(expected);
  if (got !== exp || got !== br) {
    throw new Error(`FAIL a=${JSON.stringify(a)} k=${k} got=${got} exp=${exp} brute=${br}`);
  }
}

run([-9, -6, 0, 2, 2, 8], 4, -18);
run([-9, -6, 0, 2, 2, 8], 9, 0);
run([3, 3, -4, -2], 3, -6);
run([5, 4, 3, 2, -1, 0, 0, 0, 0, 0], 40, 6);
run([1, 2, 3, 4], 1, 2);
run([1, 2, 3, 4], 6, 12);
run([-4, -3, -2, -1], 1, 2);
run([-4, -3, -2, -1], 6, 12);
run([0, 0, 0], 1, 0);
run([7, -3], 1, -21);
run([-(10 ** 9), 10 ** 9, 1], 1, -(10 ** 18));
run([-(10 ** 9), 10 ** 9, 1], 3, 10 ** 9);

const abc3 = [
  -170202098, -268409015, 537203564, 983211703, 21608710, -443999067,
  -937727165, -97596546, -372334013, 398994917, -972141167, 798607104,
  -949068442, -959948616, 37909651, 0, 886627544, -20098238, 0, -948955241,
  0, -214720580, 277222296, -18897162, 834475626, 0, -425610555, 110117526,
  663621752, 0,
];
run(abc3, 413, '448283280358331064');

for (let t = 0; t < 300; t += 1) {
  const n = 2 + Math.floor(Math.random() * 25);
  const a = Array.from({ length: n }, () => Math.floor(Math.random() * 41) - 20);
  const k = 1 + Math.floor(Math.random() * ((n * (n - 1)) / 2));
  run(a, k);
}

process.stdout.write('all tests passed\n');
