{
    const lines = document.body.firstChild.textContent.trim().split("\n").map(l => l.replace(/ /g, ""))

    const findClosingParen = line => {
        let count = 1
        let currentLine = line
        let inParens = ""
        while (count > 0) {
            if (currentLine.substr(0, 1) == ")") count++
            else if (currentLine.substr(0, 1) == "(") count--
            inParens += currentLine.substr(0, 1)
            currentLine = currentLine.substr(1)
        }

        return [inParens.substr(0, inParens.length - 1), currentLine]
    }

    const parseLine = line => {
        if (!line) {
            return null
        }
        if (line.substr(0, 1) == ")") {
            const [l, rest] = findClosingParen(line.substr(1))
            const op = rest.substr(0, 1)
            const r = parseLine(rest.substr(1))
            if (!rest) {
                return parseLine(l)
            }

            return {
                op: rest.substr(0, 1),
                l: parseLine(l),
                r: parseLine(rest.substr(1)),
            }
        } else if (/^\d$/.test(line)) {
            return Number(line)
        } else {
            return {
                op: line.substr(1, 1),
                l: Number(line.substr(0, 1)),
                r: parseLine(line.substr(2)),
            }
        }
    }

    const eval = expr => {
        if (expr.op) {
            if (expr.op == "+") return eval(expr.l) + eval(expr.r)
            if (expr.op == "*") return eval(expr.l) * eval(expr.r)
        } else {
            return expr
        }
    }

    lines.map(l => l.split("").reverse().join("")).map(parseLine).map(eval).reduce((a, b) => a + b, 0)
}

{
    const lines = document.body.firstChild.textContent.trim().split("\n").map(l => l.replace(/ /g, ""))

    const openParenPos = line => {
        let count = 1
        let chars = line.split("")
        for (let i = chars.length - 1; i > 0; i--) {
            let char = chars[i]

            if (char == ")") count++
            if (char == "(") count--

            if (count == 0) return i
        }
        return 0
    }
    const closeParenPos = line => {
        let count = 1
        let chars = line.split("")
        for (let i = 0; i < chars.length; i++) {
            let char = chars[i]

            if (char == "(") count++
            if (char == ")") count--

            if (count == 0) return i
        }
        return chars.length
    }

    const addParens = line => {
        let position = 0;
        while (line.indexOf("+", position) != -1) {
            let plusPos = line.indexOf("+", position)

            if (/\d/.test(line.charAt(plusPos - 1))) {
                line = line.substr(0, plusPos - 1) + "(" + line.substr(plusPos - 1)
            }
            else if (line.charAt(plusPos - 1) == ")") {
                const pos = openParenPos(line.substr(0, plusPos - 1))

                line = line.substr(0, pos) + "(" + line.substr(pos)
            }

            plusPos = line.indexOf("+", position)


            if (/\d/.test(line.charAt(plusPos + 1))) {
                line = line.substr(0, plusPos + 2) + ")" + line.substr(plusPos + 2)
            }
            else if (line.charAt(plusPos + 1) == "(") {
                const pos = closeParenPos(line.substr(plusPos + 2))

                line = line.substr(0, plusPos + 2 + pos) + ")" + line.substr(plusPos + 2 + pos)
            }

            position = plusPos + 2
        }

        return line
    }

    lines.map(addParens).map(eval).reduce((a, b) => a + b)
}