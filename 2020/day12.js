{
    const dirs = ["N", "E", "S", "W"]

    console.log("Part 1:", document
        .querySelector("pre")
        .textContent
        .trim()
        .split("\n")
        .map(l => [l.substr(0, 1), Number(l.substr(1))])
        .reduce(([cd, x, y], [c, d]) => ({
            N: [cd, x, y + d],
            S: [cd, x, y - d],
            E: [cd, x + d, y],
            W: [cd, x - d, y],
            L: [dirs[(dirs.indexOf(cd) + 3 * d / 90) % 4], x, y],
            R: [dirs[(dirs.indexOf(cd) + 1 * d / 90) % 4], x, y],
        }[c == "F" ? cd : c]), ["E", 0, 0])
        .slice(1)
        .reduce((sum, n) => sum + Math.abs(n), 0))
}

{
    console.log("Part 2:", document
        .querySelector("pre")
        .textContent
        .trim()
        .split("\n")
        .map(l => [l.substr(0, 1), Number(l.substr(1))])
        .reduce(([x, y, dx, dy], [c, d]) => ({
            N: () => [x, y, dx, dy + d],
            S: () => [x, y, dx, dy - d],
            E: () => [x, y, dx + d, dy],
            W: () => [x, y, dx - d, dy],
            R: () => [x, y, ...{ 90: [dy, -dx], 180: [-dx, -dy], 270: [-dy, dx] }[d]],
            L: () => [x, y, ...{ 90: [-dy, dx], 180: [-dx, -dy], 270: [dy, -dx] }[d]],
            F: () => [x + d * dx, y + d * dy, dx, dy],
        }[c]()), [0, 0, 10, 1])
        .reduce((sum, n) => sum + Math.abs(n), 0))
}