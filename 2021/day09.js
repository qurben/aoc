{
  let matrix = document.body.firstChild.textContent.trim().split("\n").map(l => l.split("").map(Number));

  let getValue = matrix => (x, y) => matrix[y] == undefined ? 9 : matrix[y][x] ?? 9;

  let isLowpoint = matrix => (x,y) => {
    let above = getValue(matrix)(x, y-1)
    let under = getValue(matrix)(x, y+1)
    let left = getValue(matrix)(x-1, y)
    let right = getValue(matrix)(x+1, y)

    let val = getValue(matrix)(x, y)

    return val < above && val < under && val < left && val < right
  }

  console.log("Day 9, part 1", matrix.reduce((c, l, y) => c + l.reduce((c, v, x) => isLowpoint(matrix)(x, y) ? c + v + 1 : c, 0), 0))

  let findBasinSize = matrix => (x0, y0) => {
    let inBasin = [`${x0},${y0}`]
    let toFind = [[x0,y0]]
    
    while (toFind.length != 0) {
      let [x, y] = toFind.pop();
      
      let aboveKey = `${x},${y-1}`
      if (getValue(matrix)(x, y-1) != 9 && !inBasin.includes(aboveKey)) {
        toFind.push([x, y-1])
        inBasin.push(aboveKey)
      }
      
      let belowKey = `${x},${y+1}`
      if (getValue(matrix)(x, y+1) != 9 && !inBasin.includes(belowKey)) {
        toFind.push([x, y+1])
        inBasin.push(belowKey)
      }
      
      let rightKey = `${x-1},${y}`
      if (getValue(matrix)(x-1, y) != 9 && !inBasin.includes(rightKey)) {
        toFind.push([x-1, y])
        inBasin.push(rightKey)
      }
      
			let leftKey = `${x+1},${y}`
      if (getValue(matrix)(x+1, y) != 9 && !inBasin.includes(leftKey)) {
        toFind.push([x+1, y])
        inBasin.push(leftKey)
      }
    }
    
    return inBasin.length;
  }
  
  console.log("Day 9, part 2", matrix.reduce((c, l, y) => l.reduce((c, v, x) => isLowpoint(matrix)(x, y) ? [...c, findBasinSize(matrix)(x,y)] : c, c), [])
  	.sort((a,b) => a - b).reverse().slice(0,3).reduce((a,b) => a * b, 1))
}
