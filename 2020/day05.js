{
    console.log("Part 1:",
        document
            .querySelector("pre")
            .textContent
            .trim()
            .split("\n")
            .map(item => item.replace(/F|L/g, "0").replace(/B|R/g, "1"))
            .map(item => [item.substr(0, 7), item.substr(7)])
            .map(([row, col]) => [parseInt(row, 2), parseInt(col, 2)])
            .map(([row, col]) => row * 8 + col)
            .reduce((max, id) => max > id ? max : id, 0)
    )

    console.log("Part 2:",
        document
            .querySelector("pre")
            .textContent
            .trim()
            .split("\n")
            .map(item => item.replace(/F|L/g, "0").replace(/B|R/g, "1"))
            .map(item => [item.substr(0, 7), item.substr(7)])
            .map(([row, col]) => [parseInt(row, 2), parseInt(col, 2)])
            .map(([row, col]) => row * 8 + col)
            .slice()
            .sort()
            .reduce((carry, id, i, arr) => arr[i + 1] - id == 2 ? id + 1 : carry, 0)
    )
}