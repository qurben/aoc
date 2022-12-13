{
  let items = document.firstChild.textContent.trim().split("\n")
    .map(l => l.split(",").map(v => v.split("-").map(Number)))

  let add = (a, b) => a + b

  let contains = ([[a, b], [c, d]]) => (a >= c && b <= d) || (c >= a && d <= b)
  let overlap = ([[a, b], [c, d]]) => !((b < c && b < d) || (a > c && a > d))

  console.log("Day 4 part 1:", items.map(contains).reduce(add))
  console.log("Day 4 part 2:", items.map(overlap).reduce(add))
}
