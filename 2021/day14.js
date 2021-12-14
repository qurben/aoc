{
  let [input, lines] = document.body.textContent.trim().split("\n\n")

  input = input.split("")
  lines = Object.fromEntries(lines.split("\n").map(l => l.split(" -> ")))

  let minmax = counts => [
    Math.min(...Object.values(counts)), 
    Math.max(...Object.values(counts))
  ]

  let memo = f => {
    let cache = {};
    return (...x) => {
      if (x in cache) return cache[x];
      return cache[x] = f(...x);
    }
  }

  let add = (a,b) => Object.entries(b).reduce((a, [k,v]) => ({...a, [k]: (a[k] ?? 0) + v}), a)
  let merge = (a, ...b) => b.reduce((c, v) => add(c, v), a)

  let insert = memo((l, r, i) => lines[l+r] && i > 0 ? merge(
    insert(l, lines[l+r], i-1),
    {[lines[l+r]]: -1}, // Duplicate m
    insert(lines[l+r], r, i-1),
  ) : merge({[l]:1}, {[r]:1}))

  let calc = (input, iterations) => 
  input.slice(0, -1)
  .reduce((c, v, i) => merge(c, {[input[i+1]]: -1}, insert(input[i], input[i+1], iterations)), {[input.slice(-1)]: 1})

  console.log("Day 14, part 1", minmax(calc(input,10)).reduce((a,b) => b-a, 0))
  console.log("Day 14, part 2", minmax(calc(input,40)).reduce((a,b) => b-a, 0))
}
