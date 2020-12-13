{
    const lines = document.querySelector("pre").textContent.trim().split("\n")
    const departures = lines.pop().split(',')

    const timestamp = Number(lines.pop())

    const [closest, closestTs] = departures.filter(d => d != 'x').map(Number)
        .map(d => [d, Math.ceil(timestamp / d) * d])
        .reduce((min, [d, ts]) => min[1] > ts ? [d, ts] : min, [0, Infinity])


    console.log("Part 1: ", closest * (closestTs - timestamp))
}

{
    const mul_inv = (a, b) => {
        let b0 = b
        let [x0, x1] = [0n, 1n]
        if (b == 1) return 1
        let q
        while (a > 1) {
            q = a / b;
            [a, b] = [b, a % b];
            [x0, x1] = [x1 - q * x0, x0];
        }
        if (x1 < 0) x1 += b0
        return x1
    }

    const lines = document.querySelector("pre").textContent.trim().split("\n")

    const departures = lines
        .pop()
        .split(',')
        .map((x, i) => [i, x])
        .filter(([i, x]) => x != 'x')
        .map(([i, x]) => [BigInt(i), BigInt(x)])

    const N = departures.reduce((acc, [a, n]) => acc * n, 1n)

    console.log("Part 2:", Number(departures
        .map(([a, n]) => [n - a, n])
        .map(([a, n]) =>  a * mul_inv(N / n, n) * (N / n))
        .reduce((acc, n) => acc + n, 0n) % N)
    )
}
