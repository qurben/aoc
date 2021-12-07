{
  let lines = document.body.firstChild.textContent.trim().split("\n").map(l => l.split(" -> ").map(c => c.split(",").map(Number)))

  let range = (a,b) => a < b 
  ? new Array(b-a+1).fill(0).map((v, i) => a+i)
  : new Array(a-b+1).fill(0).map((v, i) => a-i)

  let zip = (a, b) => a.map((a, i) => [a, b[i]])

  let inc = map => (x, y) => {
    if (map[`${x},${y}`]) {
      map[`${x},${y}`] += 1
    } else {
      map[`${x},${y}`] = 1
    }
  }

  let setLine1 = inc => ([x1, y1], [x2, y2]) => {
    let rangex = range(x1, x2)
    let rangey = range(y1, y2)

    if (rangex.length == 1) {
      for (let y of rangey) {
        inc(x1, y)
      }
    } else if (rangey.length == 1) {
      for (let x of rangex) {
        inc(x, y1)
      }
    }
  }

  let setLine2 = inc => ([x1, y1], [x2, y2]) => {
    let rangex = range(x1, x2)
    let rangey = range(y1, y2)

    if (rangex.length == 1) {
      for (let y of rangey) {
        inc(x1, y)
      }
    } else if (rangey.length == 1) {
      for (let x of rangex) {
        inc(x, y1)
      } 
    } else if (rangex.length == rangey.length) {
      for (let [x, y] of zip(rangex, rangey)) {
        inc(x, y)
      }
    }
  }

  let calc = setLine => {
    let map = {}
    for (let i = 0; i < lines.length; i++) {
      setLine(inc(map))(...lines[i])
    }
    return Object.values(map).filter(_ => _ > 1).length;
  }

  console.log("Day 5, part 1", calc(setLine1))
  console.log("Day 5, part 2", calc(setLine2))
}
