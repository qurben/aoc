{
    const [constraintsInput, myInput, nearbyInput] = document.body.firstChild.textContent.trim().split("\n\n")

    const constraints = constraintsInput.split("\n")
        .map(l => l.match(/(.+): (.+)-(.+) or (.+)-(.+)/))
        .map(([, name, x1, x2, x3, x4]) => [name, Number(x1), Number(x2), Number(x3), Number(x4)])

    const checkConstraints = (v, c) => c.filter(([name, from1, to1, from2, to2]) => {
        return (v >= from1 && v <= to1) || (v >= from2 && v <= to2)
    })

    const my = myInput.split("\n").slice(1).map(l => l.split(",").map(Number))[0]

    const nearby = nearbyInput.split("\n").slice(1).map(l => l.split(",").map(Number))

    console.log("Part 1:", nearby.map(n => n.filter(v => checkConstraints(v, constraints).length == 0)).flatMap(n => n).reduce((a, b) => a + b, 0))

    const nearbyValid = nearby.filter(n => n.every(v => checkConstraints(v, constraints).length > 0))

    let index = 0

    const foundConstraints = []

    let constraintsToCheck = constraints.slice()

    let intersection = (a, b) => new Set(
        [...a].filter(x => b.has(x)))

    for (let i = 0; i < nearbyValid[0].length; i++) {
        foundConstraints.push(
            nearbyValid.map(n => checkConstraints(n[i], constraintsToCheck).map(([n]) => n))
                .reduce((acc, n) => acc ? intersection(acc, new Set(n)) : new Set(n)))
    }

    while (foundConstraints.every(_ => _.size == 1) != true) {
        const satisfied = foundConstraints.filter(_ => _.size == 1).map(a => [...a]).flatMap(_ => _)

        const next = foundConstraints.slice().sort((a, b) => a.size - b.size).find(_ => _.size > 1)

        satisfied.forEach(v => next.delete(v))
    }

    console.log("Part 2:", foundConstraints
        .map(a => [...a])
        .flatMap(_ => _)
        .map((c, i) => c.startsWith("departure") ? my[i] : 1)
        .reduce((a, b) => a * b, 1))
}