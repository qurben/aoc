{
  let lines = document.body.firstChild.textContent.trim().split("\n")
    .map(l => l.split(" -> ").map(v => v.split(",").map(Number)))

  let map = {};

  let drawPoint = (map, [x, y], val = '#') => {
    map[`${x},${y}`] = val;
  }

  let drawLine = (map, [x, y], [x2, y2], val = '#') => {
    for (let i = Math.min(x, x2); i <= Math.max(x, x2); i++) {
      for (let j = Math.min(y, y2); j <= Math.max(y, y2); j++) {
        drawPoint(map, [i, j], val);
      }
    }
  }

  let getPoint = (map, [x, y]) => map[`${x},${y}`]

  for (let line of lines) {
    drawPoint(map, line[0])
    for (let i = 1; i < line.length; i++) {
      drawLine(map, line[i - 1], line[i]);
    }
  }

  let simulate = (map, [sx, sy]) => {
    let [posx, posy] = [sx, sy];
    while (true) {
      if (posy > 500) {
        return [posx, posy];
      } else if (getPoint(map, [posx, posy + 1]) == undefined) {
        posy++;
      } else if (getPoint(map, [posx - 1, posy + 1]) == undefined) {
        posx--;
        posy++;
      } else if (getPoint(map, [posx + 1, posy + 1]) == undefined) {
        posx++;
        posy++;
      } else {
        drawPoint(map, [posx, posy], 'o')
        return [posx, posy];
      }
    }
  }

  let source = [500, 0]
  
  let target = source;
  
  while (target[1] < 500) {
    target = simulate(map, source)
  }
  
  console.log("Day 14 part 1:", Object.values(map).filter(x => x == "o").length)
}

{
  let lines = document.body.firstChild.textContent.trim().split("\n")
    .map(l => l.split(" -> ").map(v => v.split(",").map(Number)))

  let map = {};

  let drawPoint = (map, [x, y], val = '#') => {
    map[`${x},${y}`] = val;
  }

  let drawLine = (map, [x, y], [x2, y2], val = '#') => {
    for (let i = Math.min(x, x2); i <= Math.max(x, x2); i++) {
      for (let j = Math.min(y, y2); j <= Math.max(y, y2); j++) {
        drawPoint(map, [i, j], val);
      }
    }
  }

  let getPoint = (map, [x, y]) => map[`${x},${y}`]
  
  let maxy = 0;

  for (let line of lines) {
    drawPoint(map, line[0])
    if (line[0][1] > maxy) {
        maxy = line[0][1]
      }
    for (let i = 1; i < line.length; i++) {
      drawLine(map, line[i - 1], line[i]);
      if (line[i][1] > maxy) {
        maxy = line[i][1]
      }
    }
  }
  
  maxy = maxy + 2

  let simulate = (map, [sx, sy]) => {
    let [posx, posy] = [sx, sy];
    while (true) {
      if (posy >= maxy - 1) {
        drawPoint(map, [posx, posy], 'o')
        return [posx, posy];
      } else if (getPoint(map, [posx, posy + 1]) == undefined) {
        posy++;
      } else if (getPoint(map, [posx - 1, posy + 1]) == undefined) {
        posx--;
        posy++;
      } else if (getPoint(map, [posx + 1, posy + 1]) == undefined) {
        posx++;
        posy++;
      } else {
        drawPoint(map, [posx, posy], 'o')
        return [posx, posy];
      }
    }
  }

  let source = [500, 0]
  
  let target = [0,0];
  
  while (source[0] != target[0] || source[1] != target[1]) {
    target = simulate(map, source)
  }
  
  console.log("Day 14 part 2:", Object.values(map).filter(x => x == "o").length)
}
