{
  let [x1, x2, y1, y2] = document.body.textContent.trim().match(/x=([-0-9]+)\.\.([-0-9]+), y=([-0-9]+)\.\.([-0-9]+)/).slice(1).map(Number)
    
  let isInBox = (x,y) => x >= x1 && x <= x2 && y >= y1 && y <= y2;
  
  let isBeyondBox = (x,y) => x > x2 || y < y1
  
  let calculate = (vx, vy) => {
    let maxY = 0;
    let x = 0;
    let y = 0;
    while (!isBeyondBox(x, y)) {
      x += vx
      y += vy
      
      if (y > maxY) {
        maxY = y
      }
      
      if (vx > 0) {
        vx--
      }
      if (vx < 0) {
        vx++
      }
      
      vy--
      
      if (isInBox(x,y)) {
        return [true, maxY];
      }
    }
    
    return [false, maxY];
  }
  
  let findMaxY = () => {
    let maxY = 0
    let numhit = 0;
    for (let i = 0; i < 200; i++) {
      for (let j = -100; j < 100; j++) {
        let [hit, y] = calculate(i,j)
        
        if (hit) {
          numhit++
        }
        
        if (hit && y > maxY) {
          maxY = y;
        }
      }
    }
    
    return [maxY,numhit]
  }
    
  let [maxY, numhit] = findMaxY()
  console.log("Day 17, part 1", maxY)
  console.log("Day 17, part 2", numhit)
}
