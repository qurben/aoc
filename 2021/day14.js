{
  let [input, lines] = document.body.textContent.trim().split("\n\n")
  
  input = input.split("")
  lines = Object.fromEntries(lines.split("\n").map(l => l.split(" -> ")))
  
	let insert = (input, lines) => {
    for (let i = 0; i < input.length - 1; i++) {
      let l = input[i];
      let r = input[i+1];
      
      if (lines[l+r]) {
        input.splice(i+1, 0, lines[l+r])
        i+=1;
      }
    }
    
    return input
  }
  
  let countChars = (input) => {
    return input.reduce((c, v) => c[v] ? {...c, [v]: c[v]+1} : {...c, [v]: 1}, {})
  }
  
  let state = input
  for (let i = 0; i < 10; i++) {
    insert(state, lines)
  }
  
  let counts = countChars(state)
  
  let min = state.length;
  let minChar;
  let max = 0;
  let maxChar;
  
  for (let [char, count] of Object.entries(counts)) {
    if (count < min) {
      min = count;
      minChar = char
    }
    
    if (count > max) {
      max = count
      maxChar = char
    }
  }
  
  console.log("Day 14, part 1", max - min)
}
