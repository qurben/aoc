{
    console.log("Part 3:",
        document
            .querySelector("pre")
            .textContent
            .trim()
            .split("\n")
            .map((n, i) => n[i * 3 % n.length] == "#")
            .filter(n => n)
            .length
    )

    console.log("Part 2:",
        document
            .querySelector("pre")
            .textContent
            .trim()
            .split("\n")
            .map((n, i) => [
                n[i % n.length] == '#',
                n[i * 3 % n.length] == "#",
                n[i * 5 % n.length] == '#',
                n[i * 7 % n.length] == '#',
                i % 2 == 0 && n[i % n.length] == '#',
            ])
            .reduce((acc, n) => n.map((v, i) => v + acc[i]))
            .reduce((acc, n) => acc * n)
    )
}