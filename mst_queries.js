const fs = require('fs');
const parts = fs.readFileSync(0, 'utf8').trim().split(/\s+/);

let idx = 0;
const n = Number(parts[idx++]);
const q = Number(parts[idx++]);

const parent = Array.from({ length: 10 }, () => {
  const p = new Int32Array(n + 1);
  for (let i = 1; i <= n; i++) p[i] = i;
  return p;
});
const rank = Array.from({ length: 10 }, () => new Int32Array(n + 1));
const comps = new Int32Array(10);
for (let k = 1; k <= 9; k++) comps[k] = n;

function find(k, x) {
  const p = parent[k];
  while (p[x] !== x) {
    p[x] = p[p[x]];
    x = p[x];
  }
  return x;
}

function unite(k, a, b) {
  a = find(k, a);
  b = find(k, b);
  if (a === b) return;
  const r = rank[k];
  if (r[a] < r[b]) {
    const t = a;
    a = b;
    b = t;
  }
  parent[k][b] = a;
  if (r[a] === r[b]) r[a]++;
  comps[k]--;
}

function mstSum() {
  let s = n - 10;
  for (let k = 1; k <= 9; k++) s += comps[k];
  return s;
}

for (let e = 0; e < n - 1; e++) {
  const a = Number(parts[idx++]);
  const b = Number(parts[idx++]);
  const c = Number(parts[idx++]);
  for (let k = c; k <= 9; k++) unite(k, a, b);
}

const out = new Array(q);
for (let t = 0; t < q; t++) {
  const u = Number(parts[idx++]);
  const v = Number(parts[idx++]);
  const w = Number(parts[idx++]);
  for (let k = w; k <= 9; k++) unite(k, u, v);
  out[t] = mstSum();
}

console.log(out.join('\n'));
