let lines = document.body.textContent.trim().split("\n").map(_ => _.split(" ")).map(([dir, X]) => [dir, Number(X)]);

const day2p1 = (lines) => lines.reduce(([pos, depth], [dir, X]) => ({
    "forward" : [pos + X, depth],
    "up": [pos, depth - X],
    "down": [pos, depth + X],
})[dir], [0, 0]).reduce((a, b) => a * b, 1)

const day2p2 = (lines) => lines.reduce(([pos, depth, aim], [dir, X]) => ({
    "forward": [pos + X, depth + (aim * X), aim],
    "up": [pos, depth, aim - Number(X)],
    "down": [pos, depth, aim + Number(X)],
})[dir], [0, 0, 0]).splice(0, 2).reduce((a, b) => a * b, 1)

console.log("Day 2, part 1", day2p1(lines))
console.log("Day 2, part 2", day2p2(lines))
