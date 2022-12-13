{
  let actions = document.firstChild.textContent.trim().split("\n")
    .map(l => l.split(" "))

  let headPositions = [
    [0, 0]
  ];
  let tailPositions = [
    [0, 0]
  ];

  for (let i = 0; i < 9; i++) {
    tailPositions.push([0,0])
  }
  
  let tailVisited = {
    "0,0": true
  };
  let tailVisited1 = {
    "0,0": true
  }

  let calculateTailPosition = ([tx, ty], [cx, cy]) => {
    let nx = tx;
    let ny = ty;
        
    if (Math.abs(tx - cx) <= 1 && Math.abs(ty - cy) <= 1) {
      return [nx, ny];
    } 

    if (tx - cx > 1 && ty == cy) {
      nx--
    } else 
    
    if (tx - cx < -1 && ty == cy) {
      nx++
    } else
    
    if (ty - cy > 1 && cx == tx) {
      ny--
    } else
    
    if (ty - cy < -1 && tx == cx) {
      ny++
    } else {
      if (cx > tx && cy > ty) {
        nx++
        ny++
      } else if (cx < tx && cy > ty) {
        nx--
        ny++
      } else if (cx < tx && cy < ty) {
        nx--
        ny--
      } else if (cx > tx && cy < ty) {
        nx++
        ny--
      }
    }

    return [nx, ny];
  }

  for (let [action, num] of actions) {
    for (let i = 0; i < Number(num); i++) {
      let [cx, cy] = tailPositions[0];
      switch (action) {
        case "U":
          tailPositions[0] = [cx, cy + 1]
          break;
        case "L":
          tailPositions[0] = [cx - 1, cy]
          break;
        case "R":
          tailPositions[0] = [cx + 1, cy]
          break;
        case "D":
          tailPositions[0] = [cx, cy - 1]
          break;
      }
      
      for (let i = 1; i < tailPositions.length; i++) {
        tailPositions[i] = calculateTailPosition(tailPositions[i], tailPositions[i-1])
      }
      
      tailVisited[tailPositions[tailPositions.length-1].join(",")] = true
      tailVisited1[tailPositions[1].join(",")] = true
    }
  }
  console.log("Day 9 part 1:", Object.keys(tailVisited1).length)
  console.log("Day 9 part 2:", Object.keys(tailVisited).length)
}
