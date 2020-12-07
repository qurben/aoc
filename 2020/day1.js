{
    console.log("Part 1:",
        document
            .querySelector("pre")
            .textContent
            .trim()
            .split("\n")
            .map(Number)
            .reduce((acc, n, i, arr) => [...acc, arr.find(n2 => n + n2 == 2020) ? n : null], [])
            .filter(n => n)
            .reduce((acc, n) => acc * n, 1)
    )

    console.log("Part 2:",
        document
            .querySelector("pre")
            .textContent
            .trim()
            .split("\n")
            .map(Number)
            .reduce((acc, n, i, arr) => [...acc, arr.find(o => arr.find(p => n + o + p == 2020)) ? n : null], [])
            .filter(n => n)
            .reduce((acc, n) => acc * n, 1)
    )
}