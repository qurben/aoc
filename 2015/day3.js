{
    console.log("Part 1:", document.querySelector("pre")
        .textContent.trim()
        .split("")
        .reduce(([x, y, visited], a) => ({
            '^': () => [x, y - 1, { ...visited, [`${x}_${y}`]: (visited[`${x}_${y}`] ?? 0) + 1 }],
            '<': () => [x - 1, y, { ...visited, [`${x}_${y}`]: (visited[`${x}_${y}`] ?? 0) + 1 }],
            '>': () => [x + 1, y, { ...visited, [`${x}_${y}`]: (visited[`${x}_${y}`] ?? 0) + 1 }],
            'v': () => [x, y + 1, { ...visited, [`${x}_${y}`]: (visited[`${x}_${y}`] ?? 0) + 1 }],
        }[a]()), [0, 0, {}])
        .slice(2)
        .map(o => Object.keys(o))
        .pop().length
    )
}

{
    console.log("Part 2:", document.querySelector("pre")
        .textContent.trim()
        .split("")
        .reduce(([x, y, x2, y2, visited], a, i) => i % 2 == 0 ? ({
            '^': () => [x, y - 1, x2, y2, { ...visited, [`${x}_${y - 1}`]: (visited[`${x}_${y - 1}`] ?? 0) + 1 }],
            '<': () => [x - 1, y, x2, y2, { ...visited, [`${x - 1}_${y}`]: (visited[`${x - 1}_${y}`] ?? 0) + 1 }],
            '>': () => [x + 1, y, x2, y2, { ...visited, [`${x + 1}_${y}`]: (visited[`${x + 1}_${y}`] ?? 0) + 1 }],
            'v': () => [x, y + 1, x2, y2, { ...visited, [`${x}_${y + 1}`]: (visited[`${x}_${y + 1}`] ?? 0) + 1 }],
        }[a]()) : ({
            '^': () => [x, y, x2, y2 - 1, { ...visited, [`${x2}_${y2 - 1}`]: (visited[`${x2}_${y2 - 1}`] ?? 0) + 1 }],
            '<': () => [x, y, x2 - 1, y2, { ...visited, [`${x2 - 1}_${y2}`]: (visited[`${x2 - 1}_${y2}`] ?? 0) + 1 }],
            '>': () => [x, y, x2 + 1, y2, { ...visited, [`${x2 + 1}_${y2}`]: (visited[`${x2 + 1}_${y2}`] ?? 0) + 1 }],
            'v': () => [x, y, x2, y2 + 1, { ...visited, [`${x2}_${y2 + 1}`]: (visited[`${x2}_${y2 + 1}`] ?? 0) + 1 }],
        }[a]()), [0, 0, 0, 0, { "0_0": 2 }])
        .slice(4)
        .map(o => Object.keys(o).length)
        .reduce((a, b) => a + b, 0)
    )
}