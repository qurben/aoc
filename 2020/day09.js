{
    const originalNumbers = document.querySelector("pre").textContent.trim().split("\n").map(Number)
      const numbers = originalNumbers.slice()
    
    const preamble = []
      
    for (let i= 0; i < 25; i++) {
      preamble.push(numbers.shift())
    }
    let output = 0
    
    while (numbers.length) {
      const item = numbers.shift()
      
      if (!preamble.find(a => preamble.find(b => a + b == item))) {
        output = item;
        break;
      }
      
      preamble.push(item)
      preamble.shift()
    }
    
    console.log("Part 1:", output)
    
    const sum = (a, b) => a + b
    
    const outputIndex = originalNumbers.indexOf(output)
    const searchNumbers = originalNumbers.slice(0, outputIndex).reverse()
    const foundRange = []
    
    while (foundRange.reduce(sum, 0) != output) {
      if (foundRange.reduce(sum, 0) > output) {
        foundRange.shift()
      } else {
        foundRange.push(searchNumbers.pop())
      }
    }
      
    console.log("Part 2:", Math.min(...foundRange) + Math.max(...foundRange))
  }