{  
  let lines = document.body.firstChild.textContent.trim().split("\n").map(l => l.split("").map(Number))

  let matrix = {}

  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      matrix[`${x},${y}`] = lines[y][x];
    }
  }

  let inc = (matrix, x, y) => {
    if (matrix[`${x},${y}`] != undefined) {
      if (matrix[`${x},${y}`] != 0) {
        matrix[`${x},${y}`]++
      }
    }
  }

  let iterate = matrix => {
    let newMatrix = {}

    for (let [xy, val] of Object.entries(matrix)) {
      newMatrix[xy] = val + 1;
    }

    let flashed = true;
    let flashes = 0
    while (flashed) {
      flashed = false;
      let newMatrix2 = {...newMatrix}


      for (let [xy, val] of Object.entries(newMatrix)) {
        let [x,y] = xy.split(",").map(Number)

        if (val > 9) {
          flashes++
          flashed = true

          inc(newMatrix2, x-1, y-1)
          inc(newMatrix2, x-1, y)
          inc(newMatrix2, x-1, y+1)
          inc(newMatrix2, x, y-1)
          newMatrix2[xy] = 0
          inc(newMatrix2, x, y+1)
          inc(newMatrix2, x+1, y-1)
          inc(newMatrix2, x+1, y)
          inc(newMatrix2, x+1, y+1)
        }
      }

      newMatrix = {...newMatrix2}
    }

    return [newMatrix, flashes]
  }

  let totalFlashes = 0
  let newLines = {...matrix}
  let newFlashes = 0
  let i = 0;
  while (true) {
    i++
    [newLines, newFlashes] = iterate(newLines)

    if (newFlashes == Object.values(newLines).length) {
      break;
    }

    if (i <= 100) {
      totalFlashes += newFlashes
    }
  }

  console.log("Day 11, part 2", i)
  console.log("Day 11, part 1", totalFlashes)
}
