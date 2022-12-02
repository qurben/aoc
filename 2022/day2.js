{
  let part1 = document.firstChild.textContent.trim().split("\n")
    .map(l => l.split(" "))
    .reduce((v, [a, b]) =>
      v + {
        A: {
          X: 4,
          Y: 8,
          Z: 3
        },
        B: {
          X: 1,
          Y: 5,
          Z: 9
        },
        C: {
          X: 7,
          Y: 2,
          Z: 6
        }
      } [a][b], 0)

  let part2 = document.firstChild.textContent.trim().split("\n")
    .map(l => l.split(" "))
    .reduce((v, [a, b]) =>
      v + {
        X: {
          A: 3,
          B: 1,
          C: 2
        },
        Y: {
          A: 4,
          B: 5,
          C: 6
        },
        Z: {
          A: 8,
          B: 9,
          C: 7
        }
      } [b][a], 0)

  console.log("Day 2 part 1:", part1)
  console.log("Day 2 part 2:", part2)
}
