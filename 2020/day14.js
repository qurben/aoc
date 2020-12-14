{
    const lines = document.body.firstChild.textContent.trim().split("\n")

    let maskOr, maskAnd
    let memory = {}
    for (let line of lines) {
        if (line.startsWith('mask')) {
            const [, mask] = line.match(/mask = (.+)/)

            maskOr = BigInt(parseInt(mask.replace(/X/g, "0"), 2))
            maskAnd = BigInt(parseInt(mask.replace(/X/g, "1"), 2))
        } else {
            const [, address, value] = line.match(/mem\[(\d+)\] = (\d+)/)
            memory[address] = (BigInt(parseInt(value)) & maskAnd) | maskOr
        }


    }
    console.log("Part 1:", Object.values(memory).reduce((a, b) => a + b, 0n))

}

{
    const lines = document.body.firstChild.textContent.trim().split("\n")

    let masks
    let memory = {}
    for (let line of lines) {
        if (line.startsWith('mask')) {
            const [, mask] = line.match(/mask = (.+)/)

            masks = [[0n, 0n]]

            for (let i = 0; i < mask.length; i++) {
                const char = mask[mask.length - 1 - i]
                const c = BigInt(Math.pow(2, i))

                if (char == "0") {
                    masks = masks.map(([maskOr, maskAnd]) => [maskOr, maskAnd + c])
                }
                if (char == "1") {
                    masks = masks.map(([maskOr, maskAnd]) => [maskOr + c, maskAnd + c])
                }
                if (char == "X") {
                    masks = masks.slice().concat(masks.map(([maskOr, maskAnd]) => [maskOr + c, maskAnd + c]))
                }
            }
        } else {
            const [, address, value] = line.match(/mem\[(\d+)\] = (\d+)/)
            const addresses = masks.map(([maskOr, maskAnd]) => (BigInt(parseInt(address)) | maskOr) & maskAnd)
            addresses.forEach(address => memory[address] = BigInt(parseInt(value)))
        }
    }

    console.log("Part 2:", Object.values(memory).reduce((acc, n) => acc + n, 0n))
}