{
    const input = document.body.firstChild.textContent.trim().split("\n")
        .map(l => Array.from(l.matchAll(/e|ne|nw|w|sw|se/g)).flatMap(_ => _))

    const grid = input
        .map(line => line.reduce(([x, y], direction) => ({
            "e": [x + 2, y],
            "ne": [x + 1, y + 1],
            "nw": [x - 1, y + 1],
            "w": [x - 2, y],
            "sw": [x - 1, y - 1],
            "se": [x + 1, y - 1],
        }[direction]), [0, 0]))
        .reduce((grid, [x, y]) => grid.delete(`${x},${y}`) ? grid : grid.set(`${x},${y}`), new Map)

    console.log("Part 1:", grid.size)

    const getNeigbourKeys = (x, y) => [
        `${x + 2},${y}`, // e
        `${x + 1},${y + 1}`, // ne
        `${x - 1},${y + 1}`, //nw
        `${x - 2},${y}`, // w
        `${x - 1},${y - 1}`, // sw
        `${x + 1},${y - 1}`, // se
    ]

    const findNeighbours = (grid, x, y) => getNeigbourKeys(x, y).map(pos => grid.has(pos)).filter(_ => _).length

    const step = grid => {
        const newGrid = new Map
        for (let [pos] of grid) {
            let [x, y] = pos.split(",").map(Number)
            let numNeighbour = 0

            for (let neighbour of getNeigbourKeys(x, y)) {
                if (grid.has(neighbour)) {
                    numNeighbour++
                    continue // Checked on it's own
                }

                let [nx, ny] = neighbour.split(",").map(Number)

                const neighbourNeighbours = findNeighbours(grid, nx, ny)

                if (neighbourNeighbours == 2) {
                    newGrid.set(`${nx},${ny}`, true)
                }
            }

            if (numNeighbour == 1 || numNeighbour == 2) {
                newGrid.set(pos, true)
            }
        }

        return newGrid
    }

    let currentGrid = grid

    for (let i = 0; i < 100; i++) {
        currentGrid = step(currentGrid)
    }

    console.log("Part 2:", currentGrid.size)
}