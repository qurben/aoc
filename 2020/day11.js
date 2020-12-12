{
    const grid = document.querySelector("pre").textContent.trim().split("\n").map(l => l.split(""))

    const countAround = (grid, x, y, type) => {
        let count = 0
        let countPart1 = 0
        for (let i = -1; i <= 1; i++) {
            for (let j = - 1; j <= 1; j++) {
                if (!grid[y + j] || !grid[y + j][x + i]) continue
                if (j == 0 && i == 0) continue

                if (grid[y + j][x + i] == "#") countPart1++

                let delta = 1

                while (grid[y + (j * delta)] && grid[y + (j * delta)][x + (i * delta)] && grid[y + (j * delta)][x + (i * delta)] == '.') {
                    delta++
                }
                if (grid[y + (j * delta)] && grid[y + (j * delta)][x + (i * delta)] == "#") count++
            }
        }

        return [countPart1, count]
    }

    const step = (grid) => {
        const newGrid = []
        let gridHasChanged = false
        let countOccupied = 0

        for (const [i, line] of grid.entries()) {
            let currentNewLine = []
            for (const [j, pos] of line.entries()) {
                const [, count] = countAround(grid, j, i, "#")

                if (pos == "L" && count == 0) {
                    gridHasChanged = true
                    currentNewLine.push("#")
                } else if (pos == "#" && count >= 5) {
                    gridHasChanged = true
                    currentNewLine.push("L")
                } else currentNewLine.push(pos)

                if (currentNewLine[currentNewLine.length - 1] == "#") {
                    countOccupied++
                }
            }
            newGrid.push(currentNewLine)
        }

        return [newGrid, gridHasChanged, countOccupied]
    }

    let gridHasChanged = true

    let currentGrid = grid
    let countOccupied = 0

    while (gridHasChanged) {
        [currentGrid, gridHasChanged, countOccupied] = step(currentGrid)
    }

    countOccupied
}