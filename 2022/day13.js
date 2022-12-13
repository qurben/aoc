{
  let pairs = document.body.firstChild.textContent.trim().split("\n\n")
    .map(l => l.split("\n").map(eval))

  let compareValues = (left, right) => {
    if (Number.isInteger(left) && Number.isInteger(right)) {
      if (left < right) {
        return -1
      }
      if (right < left) {
        return 1
      }
      if (right == left) {
        return 0
      }
    }

    if (Number.isInteger(left)) left = [left]
    if (Number.isInteger(right)) right = [right]

    for (let i = 0; i < Math.min(left.length, right.length); i++) {
      let comparison = compareValues(left[i], right[i])

      if (comparison == 0) continue;

      return comparison
    }
    if (left.length == right.length) {
      return 0
    } else if (left.length < right.length) {
      return -1
    } else {
      return 1
    }
  }

  let sum = 0;
  let count = 0;
  for (let [left, right] of pairs) {
    count++
    if (compareValues(left, right) == -1) {
      sum += count;
    }
  }

  console.log("Day 13 part 1:", sum)

  let sep1 = [
    [2]
  ]
  let sep2 = [
    [6]
  ]

  let items = [
    sep1,
    sep2,
    ...document.body.firstChild.textContent.trim().split("\n").filter(_ => _).map(eval)
  ]

  let sorted = items.sort(compareValues)

  console.log("Day 13 part 2:", (sorted.indexOf(sep1) + 1) * (sorted.indexOf(sep2) + 1))
}
