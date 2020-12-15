{
    const input = [1,17,0,10,18,11,6]
    const lastSpoken = {}
    
    let current = 1
    
    for (let i = 0; i < input.length; i++) {
      lastSpoken[input[i]] = [i]
      current = input[i]
    }
    
    for (let i = input.length; i < 30000000; i++) {
      const [a, b] = lastSpoken[current] ?? []
  
      if (a === undefined || b == undefined) {
        current = 0
      } else {
        current = a - b
      }
      
      const [c] = lastSpoken[current] ?? []
      lastSpoken[current] = [i, c]

      if (i == 2020) console.log("Part 1:", current)
    }
    
    console.log("Part 2:", current)
  }