{
    console.log("Part 1:",
        document.querySelector("pre").textContent.trim().split("\n")
            .map(l => l.match(/(toggle|turn on|turn off) (\d+),(\d+) through (\d+),(\d+)/))
            .map(([, a, x1, y1, x2, y2]) => [a, Number(x1), Number(y1), Number(x2), Number(y2)])
            .reduce((grid, [a, x1, y1, x2, y2]) =>
                grid.map((l, y) => y >= y1 && y <= y2
                    ? l.map((i, x) => x >= x1 && x <= x2
                        ? {
                            'toggle': !i,
                            'turn off': false,
                            'turn on': true,
                        }[a]
                        : i)
                    : l)
                , Array(1000).fill(Array(1000).fill(false)))
            .reduce((acc, l) => acc + l.reduce((acc, i) => acc + i, 0), 0)
    )
}

{
    console.log("Part 2:",
        document.querySelector("pre").textContent.trim().split("\n")
            .map(l => l.match(/(toggle|turn on|turn off) (\d+),(\d+) through (\d+),(\d+)/))
            .map(([, a, x1, y1, x2, y2]) => [a, Number(x1), Number(y1), Number(x2), Number(y2)])
            .reduce((grid, [a, x1, y1, x2, y2]) =>
                grid.map((l, y) => y >= y1 && y <= y2
                    ? l.map((i, x) => x >= x1 && x <= x2
                        ? {
                            'toggle': i + 2,
                            'turn off': Math.max(0, i - 1),
                            'turn on': i + 1,
                        }[a]
                        : i)
                    : l)
                , Array(1000).fill(Array(1000).fill(0)))
            .reduce((acc, l) => acc + l.reduce((acc, i) => acc + i, 0), 0)
    )
}