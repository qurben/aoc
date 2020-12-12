{
    const instrs = document.querySelector("pre").textContent.trim().split("\n")
        .map(l => [l.substr(0, 1), Number(l.substr(1))])

    const dirs = ["N", "E", "S", "W"]

    const [, x, y] = instrs.reduce(([currentDir, x, y], [dir, distance]) => ({
        N: [currentDir, x, y + distance],
        S: [currentDir, x, y - distance],
        E: [currentDir, x + distance, y],
        W: [currentDir, x - distance, y],
        L: [dirs[(dirs.indexOf(currentDir) + (3 * distance / 90)) % 4], x, y],
        R: [dirs[(dirs.indexOf(currentDir) + (1 * distance / 90)) % 4], x, y],
    }[dir == "F" ? currentDir : dir]), ["E", 0, 0])

    console.log("Part 1:", Math.abs(x) + Math.abs(y))
}

{
    const instrs = document.querySelector("pre").textContent.trim().split("\n")
        .map(l => [l.substr(0, 1), Number(l.substr(1))])

    const rotate = (deg, wx, wy) => deg > 0 ? rotate(deg - 90, wy, -wx) : [wx, wy]

    const [x, y] = instrs.reduce(([x, y, wx, wy], [dir, distance]) => ({
        N: [x, y, wx, wy + distance],
        S: [x, y, wx, wy - distance],
        E: [x, y, wx + distance, wy],
        W: [x, y, wx - distance, wy],
        R: [x, y, ...rotate(distance, wx, wy)],
        L: [x, y, ...rotate(360 - distance, wx, wy)],
        F: [x + distance * wx, y + distance * wy, wx, wy],
    }[dir]), [0, 0, 10, 1])

    console.log("Part 2:", Math.abs(x) + Math.abs(y))
}