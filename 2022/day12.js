{
  let grid = document.body.firstChild.textContent.trim().split("\n")
    .map(l => l.split(""))

  let findPosition = (grid, letter) => {
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        if (grid[y][x] == letter) {
          return [y, x]
        }
      }
    }
  }

  let start = findPosition(grid, "S")
  let end = findPosition(grid, "E")

  let getLetter = (grid, [y, x]) => grid[y][x]

  let canMoveToPosition = (grid, [y, x], [y2, x2]) => {
    if (grid[y] ==undefined) {
      return false
    }
    let letter = grid[y][x];
    if (letter == undefined) {
      return false;
    }
    if (letter == "S") letter = "z";
    if (letter == "E") letter = "a";


    if (grid[y2] == undefined) {
      return false;
    }

    let otherLetter = grid[y2][x2];
    if (otherLetter == "S") otherLetter = "z";
    if (otherLetter == "E") otherLetter = "a";

    if (otherLetter == undefined) {
      return false;
    }

    return otherLetter == letter || otherLetter.charCodeAt(0) - letter.charCodeAt(0) <= 1
  }
  
  let canMoveToPosition2 = (grid, [y, x], [y2, x2]) => {
    let letter = grid[y][x];
    if (letter == "S") letter = "z";
    if (letter == "E") letter = "a";


    if (grid[y2] == undefined) {
      return false;
    }

    let otherLetter = grid[y2][x2];
    if (otherLetter == "S") otherLetter = "z";
    if (otherLetter == "E") otherLetter = "a";

    if (otherLetter == undefined) {
      return false;
    }

    return otherLetter == letter || letter.charCodeAt(0) - otherLetter.charCodeAt(0) <= 1
  }

  let findPossiblePositions = (grid, [y, x]) => {
    let positions = [];

    let letter = grid[y][x];

    let options = [
      [y - 1, x],
      [y + 1, x],
      [y, x - 1],
      [y, x + 1],
    ]

    for (let option of options) {
      if (canMoveToPosition(grid, [y, x], option)) {
        positions.push(option)
      }
    }

    return positions;
  }
  
  let findPossiblePositions2 = (grid, [y, x]) => {
    let positions = [];

    let letter = grid[y][x];

    let options = [
      [y - 1, x],
      [y + 1, x],
      [y, x - 1],
      [y, x + 1],
    ]

    for (let option of options) {
      if (canMoveToPosition(grid, option, [y, x])) {
        positions.push(option)
      }
    }

    return positions;
  }



  let findShortestPath = (grid, start) => {
    let visitedPositions = {
      [start.join(",")]: 0
    };

    let positionsToTest = [start];

    while (positionsToTest.length > 0) {
      let position = positionsToTest.shift();

      let distance = visitedPositions[position.join(",")]

      let nextPositions = findPossiblePositions(grid, position)

      for (let nextPosition of nextPositions) {
        if (visitedPositions[nextPosition.join(",")] == undefined || visitedPositions[nextPosition.join(",")] > distance + 1) {
          visitedPositions[nextPosition.join(",")] = distance + 1
          positionsToTest.unshift(nextPosition)
        }
      }
    }
    return visitedPositions;
  }

  console.log("Day 12 part 1:", findShortestPath(grid, start)[end.join(",")])

  let distances = {}
  
  let findShortestPath2 = (grid, start, to) => {
    let visitedPositions = {
      [start.join(",") + "," + getLetter(grid, start)]: 0
    };

    let positionsToTest = [start];

    while (positionsToTest.length > 0) {
      let position = positionsToTest.shift();
      
      if (position == to) continue;

      let distance = visitedPositions[position.join(",") + "," + getLetter(grid, position)]

      let nextPositions = findPossiblePositions2(grid, position)

      for (let nextPosition of nextPositions) {
        let key = nextPosition.join(",") + "," + getLetter(grid, nextPosition)
        if (visitedPositions[key] == undefined || visitedPositions[key] > distance + 1) {
          visitedPositions[key] = distance + 1
          positionsToTest.unshift(nextPosition)
        }
      }
    }
    return visitedPositions;
  }
  
  let path = findShortestPath2(grid, end, "a")
  
  let min = 1000;
  
  for (let key of Object.keys(path)) {
    if (key.includes("a")) {      
      if (path[key] < min) {
        min = path[key]
      }
    }
  }
  
  console.log("Day 12 part 2:", min)
}
