{
    const lines = document.body.firstChild.textContent.trim().split("\n")
        .map(l => l.match(/(.+) \(contains (.+)\)/))
        .map(([, contents, allergens]) => [contents.split(" "), allergens.split(", ")])

    const intersect = (a, b) => {
        if (b.length > a.length) [b, a] = [a, b]

        return a.filter(e => b.indexOf(e) > -1);
    }

    const unique = a => [...new Set(a)]

    const foundAllergens = Object.fromEntries(
        unique(lines.flatMap(([, allergen]) => allergen))
            .map(allergen => [allergen, lines.reduce((acc, [foods, allergens]) => allergens.includes(allergen) ? acc ? intersect(acc, foods) : foods : acc, null)]))

    const allAllergenFoods = Object.values(foundAllergens).flatMap(_ => _)

    console.log("Part 1:", lines
        .reduce((acc, [foods]) => acc + foods.filter(food => !allAllergenFoods.includes(food)).length, 0))

    while (Object.values(foundAllergens).find(l => l.length > 1)) {
        const toFilter = Object.values(foundAllergens).filter(l => l.length == 1).flatMap(_ => _)

        for (let [allergen, foods] of Object.entries(foundAllergens).filter(([, l]) => l.length > 1)) {
            foundAllergens[allergen] = foods.filter(v => !toFilter.includes(v))
        }
    }

    console.log("Part 2:", Object.entries(foundAllergens).sort(([a], [b]) => a.localeCompare(b)).map(([, [a]]) => a).join(","))
}