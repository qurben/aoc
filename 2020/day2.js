{
    console.log("Part 1:",
        document
            .querySelector("pre")
            .textContent
            .trim()
            .split("\n")
            .map(line => /(\d+)-(\d+) (\w): (\w+)/.exec(line))
            .map(([_, from, to, char, pass]) => [from, to, pass, pass.split(char).length - 1])
            .map(([from, to, _, count]) => count <= to && count >= from)
            .filter(n => n)
            .length
    )

    console.log("Part 2:",
        document
            .querySelector("pre")
            .textContent
            .trim()
            .split("\n")
            .map(line => /(\d+)-(\d+) (\w): (\w+)/.exec(line))
            .map(([_, from, to, char, pass]) => (pass[from - 1] == char) + (pass[to - 1] == char) == 1)
            .filter(n => n)
            .length
    )
}