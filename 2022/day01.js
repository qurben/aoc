{
  let totals = n => document.body.firstChild.textContent.trim().split("\n")
    .reduce(([head, ...tail], v) => v ? [head + +v, ...tail] : [0, head, ...tail], [])
    .sort((a, b) => b - a)
    .splice(0, n)
    .reduce((a, b) => a + b)

  console.log("Day 1 Part 1: ", totals(1))
  console.log("Day 1 Part 2: ", totals(3))
}
