{
    const [player1, player2] = document.body.firstChild.textContent.trim().split("\n\n")
        .map(l => l.split("\n").slice(1).map(Number))

    while (player1.length > 0 && player2.length > 0) {
        const p1 = player1.shift()
        const p2 = player2.shift()
        if (p1 > p2) {
            player1.push(p1, p2)
        } else {
            player2.push(p2, p1)
        }
    }

    const winner = player1.length > player2.length ? player1 : player2


    console.log("Part 1:", winner.reverse().reduce((acc, n, i) => acc + (n * (i + 1)), 0))
}


{
    const [player1, player2] = document.body.firstChild.textContent.trim().split("\n\n")
        .map(l => l.split("\n").slice(1).map(Number))

    const playGame = (player1, player2) => {
        const combinations = new Map

        while (player1.length > 0 && player2.length > 0) {
            if (combinations.has(`${player1.join(",")}_${player2.join(",")}`)) {
                return true
            }

            combinations.set(`${player1.join(",")}_${player2.join(",")}`, true)

            const p1 = player1.shift()
            const p2 = player2.shift()

            const win = player1.length >= p1 && player2.length >= p2
                ? playGame(player1.slice(0, p1), player2.slice(0, p2))
                : p1 > p2

            if (win) {
                player1.push(p1, p2)
            } else {
                player2.push(p2, p1)
            }
        }

        return player1.length > player2.length
    }

    const winner = playGame(player1, player2) ? player1 : player2
    
    console.log("Part 2:", winner.reverse().reduce((acc, n, i) => acc + (n * (i + 1)), 0))
}