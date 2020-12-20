{
    const SIZE = 10

    const tiles = Object.fromEntries(document.body.firstChild.textContent.trim().split("\n\n")
        .map(tile => tile.split("\n"))
        .map(([id, ...rest]) => [id.substr(5, 4), rest]))

    const getCol = (tile, i) => tile.map(r => r[i]).join("")
    const getColR = (tile, i) => tile.map(r => r[i]).reverse().join("")

    const rev = str => str.split("").reverse().join("")

    const findNeighbours = (ownId, tile) => {
        const neighbours = new Set()
        for (let [id, otherTile] of Object.entries(tiles)) {
            if (id == ownId) continue

            const sides = [
                tile[0],
                rev(tile[0]),
                tile[SIZE - 1],
                rev(tile[SIZE - 1]),
                getCol(tile, 0),
                getColR(tile, 0),
                getColR(tile, SIZE - 1),
                getCol(tile, SIZE - 1)
            ]

            const otherSides = [
                otherTile[0],
                rev(otherTile[0]),
                otherTile[otherTile.length - 1],
                rev(otherTile[otherTile.length - 1]),
                getCol(otherTile, 0),
                getColR(otherTile, 0),
                getCol(otherTile, otherTile[0].length - 1),
                getColR(otherTile, otherTile[0].length - 1),
            ]

            for (let side of sides) {
                if (otherSides.includes(side)) {
                    neighbours.add(id)
                }
            }
        }

        return neighbours
    }

    console.log("Part 1:", Object.entries(tiles).map(([id, tile]) => [id, findNeighbours(id, tile)])
        .filter(([id, neigbours]) => neigbours.size == 2).map(([id]) => Number(id))
        .reduce((a, b) => a * b, 1))

    const rotateTile = tile => tile[0].split("").map((val, index) => tile.map(row => row[index].split("").reverse().join("")).reverse().join(""))

    const flipTile = tile => tile.slice().reverse()

    const corner = Object.entries(tiles).map(([id, tile]) => [id, findNeighbours(id, tile)])
        .filter(([id, neigbours]) => neigbours.size == 2).map(([id]) => Number(id))[3]

    const findNeighbour = (ownId, edge) => {
        for (let [id, otherTile] of Object.entries(tiles)) {
            if (id == ownId) continue

            if (edge == getCol(otherTile, 0)) return [id, otherTile]

            otherTile = rotateTile(otherTile)
            if (edge == getCol(otherTile, 0)) return [id, otherTile]

            otherTile = rotateTile(otherTile)
            if (edge == getCol(otherTile, 0)) return [id, otherTile]

            otherTile = rotateTile(otherTile)
            if (edge == getCol(otherTile, 0)) return [id, otherTile]

            otherTile = rotateTile(otherTile)
            if (edge == getCol(otherTile, 0)) return [id, otherTile]

            otherTile = flipTile(otherTile)
            if (edge == getCol(otherTile, 0)) return [id, otherTile]

            otherTile = rotateTile(otherTile)
            if (edge == getCol(otherTile, 0)) return [id, otherTile]

            otherTile = rotateTile(otherTile)
            if (edge == getCol(otherTile, 0)) return [id, otherTile]

            otherTile = rotateTile(otherTile)
            if (edge == getCol(otherTile, 0)) return [id, otherTile]
        }

        return []
    }

    const createRow = (startId, startTile) => {
        const row = []
        let currentId = startId
        let currentTile = startTile

        while (currentId) {
            row.push(currentTile)
            const [nextId, nextTile] = findNeighbour(currentId, getCol(currentTile, SIZE - 1))

            currentTile = nextTile
            currentId = nextId
        }

        return row
    }

    const createGrid = startId => {
        const col = []
        let currentId = startId
        let currentTile = rotateTile(tiles[startId])

        while (currentId) {
            col.push(createRow(currentId, currentTile))

            const [nextId, nextTile] = findNeighbour(currentId, currentTile[SIZE - 1])

            currentTile = nextTile ? rotateTile(flipTile(nextTile)) : null // Rotate because findNeighbour checks left border
            currentId = nextId
        }

        return col
    }

    const stitch = grid => {
        let rows = []
        for (let row of grid) {
            for (let i = 1; i < row[0].length - 1; i++) {
                let rowString = ""
                for (let item of row) {
                    rowString += item[i].substr(1, 8)
                }
                rows.push(rowString)
            }
        }

        return rows
    }

    const replaceAt = (str, index, replacement) => {
        return str.substr(0, index) + replacement + str.substr(index + replacement.length);
    }

    const seaMonster = [
        "                  # ",
        "#    ##    ##    ###",
        " #  #  #  #  #  #   "
    ]

    const map = rotateTile(rotateTile(flipTile(stitch(createGrid(corner)))))

    const seaMonsterAtPos = (x, y) => {
        if (x + seaMonster[0].length >= map[0].length) return false

        if (y + seaMonster.length >= map.length) return false

        let foundSeamonster = true
        for (let y1 = 0; y1 < seaMonster.length; y1++) {
            for (let x1 = 0; x1 < seaMonster[0].length; x1++) {
                if (seaMonster[y1][x1] == "#") {
                    if (map[y + y1][x + x1] != "#" && map[y + y1][x + x1] != '*')
                        foundSeamonster = false
                }
            }
        }

        if (foundSeamonster) {

            for (let y1 = 0; y1 < seaMonster.length; y1++) {
                for (let x1 = 0; x1 < seaMonster[0].length; x1++) {
                    if (seaMonster[y1][x1] == "#") {
                        map[y + y1] = replaceAt(map[y + y1], x + x1, "*")
                    }
                }
            }
        }

        return foundSeamonster
    }


    let seaMonsterCount = 0
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[0].length; x++) {
            if (seaMonsterAtPos(x, y)) {
                seaMonsterCount++
            }
        }
    }

    console.log(map.join("").split("").filter(x => x == '#'))
}