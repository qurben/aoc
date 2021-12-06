{
  let fish = document.body.firstChild.innerText.trim().split(",").map(Number)

  let generation = f => ({
    [0]: f[1],
    [1]: f[2],
    [2]: f[3],
    [3]: f[4],
    [4]: f[5],
    [5]: f[6],
    [6]: (f[7] ?? 0) + (f[0] ?? 0),
    [7]: f[8],
    [8]: f[0]
  });
  
  let sum = (a,b) => a + b

  let getTotal = (start, gens) => 
    Object.values(new Array(gens).fill(1).reduce(generation, {[start]: 1})).reduce(sum)

  let calc = gens => fish.reduce((c, f) => sum(c, getTotal(f, gens)), 0)

  console.log("Day 6, part 1", calc(80))
  console.log("Day 6, part 2", calc(256))
}
