{
   let lines = document.body.textContent.trim().split("\n").map(l => l.split(" -> ").map(c => c.split(",")))

    lines 

    let map = {};

    let setLine = (x1, y1, x2, y2) => {
        let xmin = Math.min(x1, x2)
        let xmax = Math.max(x1, x2)
        let ymin = Math.min(y1, y2)
        let ymax = Math.max(y1, y2)
        let dx = xmax - xmin
        let dy = ymax - ymin

        if (dx == 0) {
            for (let i = ymin ; i <= ymax ; i++) {
                if (map[`${x1},${i}`]) {
                    map[`${x1},${i}`] += 1
                } else {
                    map[`${x1},${i}`] = 1
                }
            }
        } else if (dy == 0) {
            for (let i = xmin ; i <= xmax ; i++) {
                if (map[`${i},${y1}`]) {
                    map[`${i},${y1}`] += 1
                } else {
                    map[`${i},${y1}`] = 1
                }
            } 
        } else if (dx == dy) {
            let changeX = x1 < x2 ? -1 : 1
            let changeY = y1 < y2 ? -1 : 1
            for (let x = x1, y = y1 ; i < dx ; i++) {
                if (map[`${xmin+i},${ymin+i}`]) {
                    map[`${xmin+i},${ymin+i}`] += 1
                } else {
                    map[`${xmin+i},${ymin+i}`] = 1
                }
            }
        }
    }

    for (let i = 0; i < lines.length; i++) {
        let [[x1, y1], [x2, y2]] = lines[i] 
        setLine(x1, y1, x2, y2)
    }

console.log(Object.values(map))

    console.log(Object.values(map).filter(v => v > 1).length)
}
