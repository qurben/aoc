{
  let lines = document.body.firstChild.textContent.trim().split("\n")
    .map(l => l.match(/Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/))
    .map(([, x1, y1, x2, y2]) => [Number(x1), Number(y1), Number(x2), Number(y2)])

  let row = 2000000;

  let containsInRow = (row, x, y, dist) => {
    let distFromRow = Math.abs(y - row)

    let distanceLeft = Math.abs(dist - distFromRow)

    let left = x - distanceLeft;
    let right = x + distanceLeft;

    return left > right ? [right, left] : [left, right]
  }

  let vals = []

  for (let [x1, y1, x2, y2] of lines) {
    let dist = Math.abs(x1 - x2) + Math.abs(y1 - y2);
    // manhattan distance from 1 to 2

    if (Math.abs(y1 - row) > dist) {
      continue;
    }

    let [lower, upper] = containsInRow(row, x1, y1, dist);

    vals.push([lower, upper])
  }

  let isBeacon = (x, y) => {
    for (let [a, b, c, d] of lines) {
      if (x == a && b == y) return true;
      if (x == c && y == d) return true;
    }

    return false;
  }

  let findGaps = vals => {
    let min = Infinity;
    let max = -Infinity;

    for (let [a, b] of vals) {
      if (a < min) min = a
      if (b < min) min = b
      if (a > max) max = a
      if (b > max) max = b
    }

    min--
    min--
    max++

    let count = 0;
    for (let i = min; i < max; i++) {
      let found = false;

      if (isBeacon(i, row)) {
        continue;
      }

      for (let [a, b] of vals) {
        if (a <= i && b >= i) {
          found = true;
          break;
        }
      }

      if (found) count++
    }

    return count;
  }

  console.log("Day 15 part 1:", findGaps(vals))

  lines
}

{
  let getDist = (x1, y1, x2, y2) => Math.abs(x1 - x2) + Math.abs(y1 - y2);

  let lines = document.body.firstChild.textContent.trim().split("\n")
    .map(l => l.match(/Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/))
    .map(([, x1, y1, x2, y2]) => [Number(x1), Number(y1), Number(x2), Number(y2), getDist(Number(x1), Number(y1), Number(x2), Number(y2))])
    .map(([x1, y1, x2, y2]) => [x1, y1, getDist(x1, y1, x2, y2)])

  let max = 4000000;

  let checkPos = (x, y) => {
    if (x < 0 || x > max) return false;
    if (y < 0 || y > max) return false;

    for (let [px, py, dist] of lines) {
      if (dist >= getDist(x, y, px, py)) {
        return false;
      }
    }
    return true;
  }

  let calculateTuningFrequency = (x, y) => x * 4000000 + y

  let go = () => {
    for (let [x, y, dist] of lines) {
      for (let i = 0; i < dist + 1; i++) {
        let fromLeft = x - dist + i - 1
        let fromRight = x + dist - i + 1
        let toTop = y - i
        let toBottom = y + i

        if (checkPos(fromLeft, toTop)) {
          return calculateTuningFrequency(fromLeft, toTop)
        }
        if (checkPos(fromLeft, toBottom)) {
          return calculateTuningFrequency(fromLeft, toBottom)
        }
        if (checkPos(fromRight, toBottom)) {
          return calculateTuningFrequency(fromRight, toBottom)
        }
        if (checkPos(fromRight, toTop)) {
          return calculateTuningFrequency(fromRight, toTop)
        }
      }
    }
  }
  console.log("Day 15, part 2:", go())
}
