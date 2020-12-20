{

    const getGridPosition = (grid, x, y, z) => grid.get(`${x}_${y}_${z}`)
    const setGridPosition = (grid, x, y, z) => grid.set(`${x}_${y}_${z}`, true)
    const hasGridPosition = (grid, x, y, z) => grid.has(`${x}_${y}_${z}`)


    const values = document.body.firstChild.textContent.trim().split("\n").map(v => v.split("").map(v => v == '#'))

    //   const values = ".#.  ..#  ###".split("  ").map(v => v.split("").map(v => v == '#'))

    const grid = new Map

    values.forEach((v, y) => v.forEach((w, x) => {
        if (w) setGridPosition(grid, x, y, 0, w)
    }))

    let minX = 0
    let minY = 0
    let minZ = 0
    let maxX = values[0].length
    let maxY = values.length
    let maxZ = 1

    const findNeighbours = (grid, x, y, z) => {
        let sum = 0 // include own
        for (let z1 = z - 1; z1 <= z + 1; z1++) {
            for (let y1 = y - 1; y1 <= y + 1; y1++) {
                for (let x1 = x - 1; x1 <= x + 1; x1++) {
                    if (x1 == x && y1 == y && z1 == z) continue
                    if (hasGridPosition(grid, x1, y1, z1)) {
                        sum++
                    }
                }
            }
        }
        return sum
    }

    const step = grid => {
        const newGrid = new Map
        for (let z = minZ - 1; z < maxZ + 1; z++) {
            for (let y = minY - 1; y < maxY + 1; y++) {
                for (let x = minX - 1; x < maxX + 1; x++) {
                    const neighbours = findNeighbours(grid, x, y, z)
                    if (hasGridPosition(grid, x, y, z)) {
                        if (neighbours == 2 || neighbours == 3) {
                            setGridPosition(newGrid, x, y, z)
                        }
                    } else {
                        if (neighbours == 3) {
                            setGridPosition(newGrid, x, y, z)
                        }
                    }
                }
            }
        }

        minX--
        minY--
        minZ--
        maxX++
        maxY++
        maxZ++

        return newGrid
    }

    //   console.log(grid)

    console.log("Part 1:", step(step(step(step(step(step(grid)))))).size)
}

{

    const getGridPosition = (grid, x, y, z, w) => grid.get(`${x}_${y}_${z}_${w}`)
    const setGridPosition = (grid, x, y, z, w) => grid.set(`${x}_${y}_${z}_${w}`, true)
    const hasGridPosition = (grid, x, y, z, w) => grid.has(`${x}_${y}_${z}_${w}`)


    const values = document.body.firstChild.textContent.trim().split("\n").map(v => v.split("").map(v => v == '#'))

    //   const values = ".#.  ..#  ###".split("  ").map(v => v.split("").map(v => v == '#'))

    const grid = new Map

    values.forEach((v, y) => v.forEach((w, x) => {
        if (w) setGridPosition(grid, x, y, 0, 0)
    }))

    let minX = 0
    let minY = 0
    let minZ = 0
    let minW = 0
    let maxX = values[0].length
    let maxY = values.length
    let maxZ = 1
    let maxW = 1

    const findNeighbours = (grid, x, y, z, w) => {
        let sum = 0 // include own
        for (let w1 = w - 1; w1 <= w + 1; w1++) {
            for (let z1 = z - 1; z1 <= z + 1; z1++) {
                for (let y1 = y - 1; y1 <= y + 1; y1++) {
                    for (let x1 = x - 1; x1 <= x + 1; x1++) {
                        if (x1 == x && y1 == y && z1 == z && w1 == w) continue

                        if (hasGridPosition(grid, x1, y1, z1, w1)) {
                            sum++
                        }
                    }
                }
            }
        }
        return sum
    }

    const step = grid => {
        const newGrid = new Map
        for (let w = minW - 1; w < maxW + 1; w++) {
            for (let z = minZ - 1; z < maxZ + 1; z++) {
                for (let y = minY - 1; y < maxY + 1; y++) {
                    for (let x = minX - 1; x < maxX + 1; x++) {
                        const neighbours = findNeighbours(grid, x, y, z, w)
                        if (hasGridPosition(grid, x, y, z, w)) {
                            if (neighbours == 2 || neighbours == 3) {
                                setGridPosition(newGrid, x, y, z, w)
                            }
                        } else {
                            if (neighbours == 3) {
                                setGridPosition(newGrid, x, y, z, w)
                            }
                        }
                    }
                }
            }
        }

        minX--
        minY--
        minZ--
        minW--
        maxX++
        maxY++
        maxZ++
        maxW++

        return newGrid
    }

    console.log("Part 2:", step(step(step(step(step(step(grid)))))).size)
}