{
  let lines = document.body.firstChild.textContent.trim().split("\n").map(l => l.split(""))

  let parenMap = {
    "[": "]",
    "(": ")",
    "{": "}",
    "<": ">",
  }

  let scoreMap = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137,
  }

  let score2Map = {
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4,
  }

  let parse = line => {
    if (line.length == 0) {
      return [];
    }

    let [char, ...rest] = line;

    if (!(["[", "{", "<", "("].includes(char))) {
      throw char
    }

    let newline = rest
    try {
      while (newline.length > 0 && ["[", "{", "<", "("].includes(newline[0])) {
        newline = parse(newline)
      }
    } catch ([type, e]) {
      if (type == "incomplete") {
        throw [type, [...e, parenMap[char]]]
      }
      throw [type, e]
    }

    if (newline.length == 0) {
      throw ["incomplete", [parenMap[char]]]
    }

    let [otherChar, ...rest2] = newline;

    if (parenMap[char] != otherChar) {
      throw ["error", otherChar]
    }

    return rest2
  }

  let score2 = vals => vals.reduce((c, v) => c * 5 + score2Map[v], 0)

  let total = 0;
  let total2 = [];
  for (let line of lines) {
    try {
      while (line.length > 0) {
        line = parse(line);
      }
    } catch ([type, e]) {
      if (type == "error") {
        total += scoreMap[e]
      }

      if (type == "incomplete") {
        total2.push(score2(e))
      }
    }
  }

  console.log("Day 10, part 1", total)
  console.log("Day 10, part 2", total2.sort((a,b) => a -b)[Math.floor(total2.length / 2)])
}
