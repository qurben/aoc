{
  let totals = document.body.firstChild.textContent.trim().split("\n")
    .reduce(([head, ...tail], v) => v == "" ? [0, head, ...tail] : [head + +v, ...tail], [])
    .sort((a, b) => b - a)

  console.log("Day 1 Part 1: ", totals[0])
  console.log("Day 1 Part 2: ", totals.splice(0, 3).reduce((a, b) => a + b))
}
