{
    console.log("Part 1:",
        document
            .querySelector("pre")
            .textContent
            .trim()
            .split("\n\n")
            .map(n => Object.fromEntries(n.split(/[ \n]/).map(f => f.split(":"))))
            .filter(({ byr, iyr, eyr, hgt, hcl, ecl, pid }) => byr && iyr && eyr && hgt && hcl && ecl && pid)
            .length
    )

    console.log("Part 2:",
        document
            .querySelector("pre")
            .textContent
            .trim()
            .split("\n\n")
            .map(n => Object.fromEntries(n.split(/[ \n]/).map(f => f.split(":"))))
            .filter(({ byr }) => byr >= 1920 && byr <= 2002)
            .filter(({ iyr }) => iyr >= 2010 && iyr <= 2020)
            .filter(({ eyr }) => eyr >= 2020 && eyr <= 2030)
            .filter(({ hgt }) => hgt)
            .filter(({ hgt }) => hgt.endsWith("in") || (hgt.slice(0, 3) >= 150 && hgt.slice(0, 3) <= 193))
            .filter(({ hgt }) => hgt.endsWith("cm") || (hgt.slice(0, 2) >= 59 && hgt.slice(0, 2) <= 76))
            .filter(({ hcl }) => /#[0-9a-f]{6}/.test(hcl))
            .filter(({ ecl }) => /(amb|blu|brn|gry|grn|hzl|oth)/.test(ecl))
            .filter(({ pid }) => Number(pid) && pid.length == 9)
            .length
    )
}