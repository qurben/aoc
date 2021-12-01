const day1p1 = lines => lines.reduce(([t, p], c) => ([c > p ? t + 1 : t, c]), [1, 1000])[0]
const day1p2 = lines => lines.reduce(([t, p0, p1, p2], c) => ([c > (p0 + p1 + p2) ? t + 1 : t, p1, p2, c]), [1, 1000, 0, 0, 1])[0]

const lines = document.body.innerText.trim().split("\n");

console.log("Day 1, part 1", day1p1(lines));
console.log("Day 1, part 2", day1p2(lines));
