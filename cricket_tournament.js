const fs = require('fs');
const parts = fs.readFileSync(0, 'utf8').trim().split(/\s+/);

let idx = 0;
const n = Number(parts[idx++]);
const N = 1 << n;

const c = Array.from({ length: N }, () => {
  const row = new Array(n + 1);
  row[0] = 0;
  for (let j = 1; j <= n; j++) row[j] = Number(parts[idx++]);
  return row;
});

let dp = new Array(N).fill(0);

for (let t = 1; t <= n; t++) {
  const half = 1 << (t - 1);
  const size = half << 1;
  const next = new Array(N).fill(0);
  const losePrize = t - 1;

  for (let start = 0; start < N; start += size) {
    const mid = start + half;
    const end = start + size;

    let bestLeft = -Infinity;
    for (let i = start; i < mid; i++) {
      const val = dp[i] + (losePrize === 0 ? 0 : c[i][losePrize]);
      if (val > bestLeft) bestLeft = val;
    }

    let bestRight = -Infinity;
    for (let i = mid; i < end; i++) {
      const val = dp[i] + (losePrize === 0 ? 0 : c[i][losePrize]);
      if (val > bestRight) bestRight = val;
    }

    for (let i = start; i < mid; i++) {
      next[i] = dp[i] + bestRight;
    }
    for (let i = mid; i < end; i++) {
      next[i] = dp[i] + bestLeft;
    }
  }

  dp = next;
}

let ans = 0;
for (let i = 0; i < N; i++) {
  const total = dp[i] + c[i][n];
  if (total > ans) ans = total;
}

console.log(ans);
