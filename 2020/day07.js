{
    console.log("Part 1:", new Set(
        (f => f(f))(f => color => document
            .querySelector("pre")
            .textContent
            .trim()
            .split("\n")
            .map(l => l.match(/(\w+ \w+) bags contain (.+)./))
            .map(([, color, contains]) => ({
                color,
                contains: contains.split(', ')
                    .map(n => n.match(/(\d+) (\w+ \w+)/))
                    .filter(n => n)
                    .map(([, count, color]) => ({ count, color }))
            }))
            .filter(bag => bag.contains.find(bag => bag.color == color))
            .map(b => b.color)
            .flatMap(b => [b, ...f(f)(b)])
        )("shiny gold")).size)

    console.log("Part 2:",
        (f => f(f))(f => color => document
            .querySelector("pre")
            .textContent
            .trim()
            .split("\n")
            .map(l => l.match(/(\w+ \w+) bags contain (.+)./))
            .map(([, color, contains]) => ({
                color,
                contains: contains.split(', ')
                    .map(n => n.match(/(\d+) (\w+ \w+)/))
                    .filter(n => n)
                    .map(([, count, color]) => ({ count, color }))
            }))
            .find(c => c.color == color)
            .contains
            .reduce((acc, n) => Number(n.count) * f(f)(n.color) + acc, 1)
        )("shiny gold")
    )
}