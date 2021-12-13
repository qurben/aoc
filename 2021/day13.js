{
    let [coords,folds] = document.body.firstChild.textContent.trim().split("\n\n")
    coords = coords.split("\n")
    folds = folds.split("\n").map(l => l.split("=")).map(([a,b]) => [a,Number(b)])
    
    let fold = (coords, axis, pos) => {
        let newCoords = []
        for (let xy of coords) {
            let [x,y] = xy.split(",").map(Number)
            if (axis == "fold along x") {
                if (x > pos) {
                    newCoords.push(`${pos+pos-x},${y}`)
                } else {
                    newCoords.push(`${x},${y}`)
                }
            } else {
                if (y > pos) {
                    newCoords.push(`${x},${pos+pos-y}`)
                } else {
                    newCoords.push(`${x},${y}`)
                }
            }
        }

        return [...new Set(newCoords)]
    }

    let vis = coords => {
        let nCoords = coords.map(l => l.split(",").map(Number))
        let map = []

        for (let [y, x] of nCoords) {
            if (map[x] == undefined) map[x] = []
            map[x][y] = "#";
        }

        let str = "";
        for (let x of map) {
            
            if (x) for (let y of x) {
                if (y) str += y;
                else str += " ";
            }

            str += "\n"
        }

        return str;
    }

    console.log("Day 13, part 1", fold(coords, ...folds[0]).length)

    let newCoords = coords
    for (let [axis, pos] of folds) {
        newCoords = fold(newCoords, axis, pos);
    }

    console.log("Day 13, part 2", vis(newCoords))
}
