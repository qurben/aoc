{
    const [rulesLines, messagesLines] = document.body.textContent.trim().split("\n\n").map(_ => _.split("\n"))

    const rules = Object.fromEntries(rulesLines
        .map(l => l.split(": "))
        .map(([id, rule]) => [Number(id), rule])
        .sort((a, b) => a[0] - b[0]))

    //   8: 42 | 42 8
    //   11: 42 31 | 42 11 31

    rules[8] = "42 | 42 8"
    rules[11] = "42 31 | 42 11 31"

    let seen8 = 0
    let seen11 = 0
    const makeRegex = rule => {
        if (rule.startsWith("\"")) {
            return rule.substr(1, 1)
        }

        if (rule == "8") {
          seen8++
          if (seen8 > 40) return makeRegex("42")
            return `(?:${makeRegex("42")}|(?:${makeRegex("42")}${makeRegex("8")}))`
        }

        if (rule == "11") {
          seen11++
          
          if (seen11 > 40) return `(?:${makeRegex("42")}${makeRegex("31")})`
          
            return `(?:(?:${makeRegex("42")}${makeRegex("31")})|(?:${makeRegex("42")}${makeRegex("11")}${makeRegex("31")}))`
        }

        if (rule.indexOf("|") != -1) {
            const [l, r] = rule.split(" | ")

            return `(?:(?:${makeRegex(l)})|(?:${makeRegex(r)}))`
        }

        if (rule.indexOf(" ") != -1) {
            const parts = rule.split(" ")

            return `(?:${parts.map(makeRegex).join("")})`
        }

        if (Number(rule) == rule) {
            return makeRegex(rules[Number(rule)])
        }
    }

    const regex = new RegExp('^' + makeRegex('0') + '$')
    const regex8 = new RegExp('^' + makeRegex('8') + '$')
    const regex11 = new RegExp('^' + makeRegex('11') + '$')
        
    messagesLines.map(l => {
        const matches = l.match(regex)
        if (!matches) return false
        return true
    }).filter(_ => _).length

}