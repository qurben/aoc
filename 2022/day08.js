{
  
  let rotate = grid => {
    let copy = grid.map(l => l.map(v => 0))
    for (let x = 0; x < grid.length; x++) {
      for (let y = grid.length-1; y >= 0; y--) {
        copy[x][y] = grid[y][x]
      }
    }
    
    for (let x = 0; x < grid.length; x++) {
      for (let y = 0 ; y < grid.length/2; y++) {
        let temp = copy[x][y];
        copy[x][y] = copy[x][grid.length - y - 1]
        copy[x][grid.length - y -1] = temp
      }
    }
    
    return copy;
  }

  let lookAtSide = (grid, visible) => {
    let heights = grid.map(_ => -1)
    let depth = 0;

    for (let depth = 0; depth < grid[0].length; depth++) {
      for (let i = 0; i < grid.length; i++) {
        if (grid[i][depth] > heights[i]) {
          visible[i][depth] = true;
          heights[i] = grid[i][depth];
        }
      }
    }
    
    return visible;
  }

  let grid = document.firstChild.textContent.trim().split("\n")
    .map(l => l.split("").map(Number))

  let visible = grid.map(l => l.map(v => false))
  
  for (let i = 0; i < 4; i++) {
    visible = lookAtSide(grid, visible)
    grid = rotate(grid)
    visible = rotate(visible)
  }

  console.log("Day 8 part 1:" , visible.flatMap(v => v).filter(v => v).length)
}

{
  let grid = document.firstChild.textContent.trim().split("\n")
    .map(l => l.split("").map(Number))
  
  let scenicScore = (grid, [x,y]) => {
    let height = grid[x][y];
    let currentHeight = 0;
    let newX = x;
    let newY = y+1;
    let count1 = 0;
    while (grid[newX][newY] != undefined && grid[newX][newY] < height) {
      currentHeight = grid[newX][newY];
      newY++;
      count1++;
      
      if (grid[newX][newY] >= height) {
        count1++;
      }
    }
    currentHeight = 0;
    newX = x;
    newY = y-1;
    let count2 = 0;
    while (grid[newX][newY] != undefined && grid[newX][newY] < height) {
      currentHeight = grid[newX][newY];
      newY--;
      count2++;
      if (grid[newX][newY] >= height) {
        count2++;
      }
    }
    
    currentHeight = 0;
    newX = x+1;
    newY = y;
    let count3 = 0;
    while (grid[newX] && grid[newX][newY] != undefined && grid[newX][newY] < height) {
      currentHeight = grid[newX][newY];
      newX++;
      count3++;
      if (grid[newX] && grid[newX][newY] >= height) {
        count3++;
      }
    }
    
    currentHeight = 0;
    newX = x-1;
    newY = y;
    let count4 = 0;
    while (grid[newX] &&grid[newX][newY] != undefined &&  grid[newX][newY] < height) {
      currentHeight = grid[newX][newY];
      newX--;
      count4++;
      if (grid[newX] &&grid[newX][newY] >=height) {
        count4++;
      }
    }
    return count1 * count2 * count3 * count4;
  }
  
  let maxScenicScore = 0;
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid.length; y++) {
      let scenic = scenicScore(grid, [x,y]);
      maxScenicScore = Math.max(maxScenicScore, scenic);
    }
  }
  
  console.log("Day 8 part 2:", maxScenicScore)
}
