{
    const [constraintsInput, myInput, nearbyInput] = document.body.firstChild.textContent.trim().split("\n\n")

    const constraints = constraintsInput.split("\n")
        .map(_ => _.match(/(.+): (.+)-(.+) or (.+)-(.+)/))
        .map(([, name, x1, x2, x3, x4]) => [name, Number(x1), Number(x2), Number(x3), Number(x4)])

    const check = (v, c) => c.filter(([name, from1, to1, from2, to2]) => (v >= from1 && v <= to1) || (v >= from2 && v <= to2))

    const my = myInput.split("\n").slice(1).map(_ => _.split(",").map(Number))[0]

    const nearby = nearbyInput.split("\n").slice(1).map(_ => _.split(",").map(Number))

    console.log("Part 1:", nearby.map(_ => _.filter(v => check(v, constraints).length == 0)).flatMap(_ => _).reduce((a, b) => a + b, 0))

    const nearbyValid = nearby.filter(_ => _.every(v => check(v, constraints).length > 0))

    const foundConstraints = []

    for (let i = 0; i < nearbyValid[0].length; i++) {
        foundConstraints.push(nearbyValid
            .map(n => check(n[i], constraints).map(([n]) => n))
            .reduce((acc, n) => acc ? acc.filter(x => n.includes(x)) : n)
        )
    }

    while (!foundConstraints.every(_ => _.length == 1)) {
        const satisfied = foundConstraints.filter(_ => _.length == 1).flatMap(_ => _)

        const next = foundConstraints.slice().sort((a, b) => a.length - b.length).find(_ => _.length > 1)

        satisfied.forEach(v => next.splice(next.indexOf(v), 1))
    }

    console.log("Part 2:", foundConstraints
        .flatMap(_ => _)
        .map((c, i) => c.startsWith("departure") ? my[i] : 1)
        .reduce((a, b) => a * b, 1))
}