{
    const instructions = document
        .querySelector("pre")
        .textContent
        .trim()
        .split("\n")
        .map(l => l.split(" "))

    let acc = 0
    let pc = 0

    const seen = []

    while (!seen.includes(pc)) {
        seen.push(pc)
        switch (instructions[pc][0]) {
            case "acc":
                acc += parseInt(instructions[pc][1])
                pc++
                break;
            case "nop":
                pc++
                break
            case "jmp":
                pc += parseInt(instructions[pc][1])
        }
    }

    console.log("Part 1: ", acc)
}

{
    const instructions = document
        .querySelector("pre")
        .textContent
        .trim()
        .split("\n")
        .map(l => l.split(" "))

    const runProgram = (instructions) => {
        let acc = 0
        let pc = 0

        const seen = []

        while (!seen.includes(pc) && pc < instructions.length && pc >= 0) {
            seen.push(pc)
            switch (instructions[pc][0]) {
                case "acc":
                    acc += parseInt(instructions[pc][1])
                    pc++
                    break;
                case "nop":
                    pc++
                    break
                case "jmp":
                    pc += parseInt(instructions[pc][1])
            }
        }

        return [acc, pc >= instructions.length]
    }

    for (let i = 0; i < instructions.length; i++) {
        const newInstructions = instructions.slice()

        if (newInstructions[i][0] == "jmp") {
            newInstructions[i] = ["nop", newInstructions[i][1]]
        } else
            if (newInstructions[i][0] == "nop") {
                newInstructions[i] = ["jmp", newInstructions[i][1]]
            } else {
                continue
            }


        const [acc, finished] = runProgram(newInstructions)

        if (finished) {
            console.log("Part 2: ", acc)
            break;
        }
    }
}