{
    console.log("Part 1: ", document.querySelector("pre")
        .textContent
        .trim()
        .split("\n")
        .map(Number)
        .sort((a, b) => a - b)
        .reduce(([prev, numOne, numThree], n) => [n, numOne + (n - prev == 1 ? 1 : 0), numThree + (n - prev == 3 ? 1 : 0)], [0, 0, 1])
        .slice(1)
        // Product
        .reduce((a, b) => a * b, 1))

    console.log("Part 2: ", document.querySelector("pre")
        .textContent
        .trim()
        .split("\n")
        .map(Number)
        .sort((a, b) => a - b)
        // Chunk
        .reduce(([[lastItem, ...last], ...acc], n) => n - lastItem >= 3 ? [[n], [lastItem, ...last], ...acc] : [[n, lastItem, ...last], ...acc], [[0]])
        // Get sublists (all lists are reversed)
        .map((f => f(f))(f => ([first, second, third, ...rest]) => third == undefined ? 1 : f(f)([second, third, ...rest]) + (first - third < 4 ? f(f)([first, third, ...rest]) : 0)))
        // Product
        .reduce((a, b) => a * b, 1)
    )
}