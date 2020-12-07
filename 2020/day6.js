{
    console.log("Part 1:",
        document
            .querySelector("pre")
            .textContent
            .trim()
            .split("\n\n")
            .map(n => new Set(n.replace(/\n/g, "").split("")))
            .reduce((acc, n) => n.size + acc, 0)
            .length
    )

    console.log("Part 2:",
        document
            .querySelector("pre")
            .textContent
            .trim()
            .split("\n\n")
            .map(n => n.split("\n").map(n => n.split("")))
            .map(n => n.slice(1).reduce((acc, n) => n.map(a => acc.includes(a) ? a : null), n[0]).filter(n => n))
            .length
    )
}

