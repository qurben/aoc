{
  let move = (stacks, count, from, to) => {
    let items = [];
    for (let i = 0; i < count; i++) {
      items.push(stacks[from].shift())
    }
    for (let i = count - 1; i >= 0; i--) {
      stacks[to].unshift(items[i])
    }
  }

  let getStacks = def => def.split("\n")
    .map(l => l.match(/.{1,4}/g))
    .reduce((stacks, l) => {
      for (let i = 0; i < l.length; i++) {
        if (/[A-Z]/.test(l[i])) {
          stacks[i] = [...(stacks[i] ?? []), l[i].substr(1, 1)]
        }
      }

      return stacks;
    }, [])

  {
    let [def, actions] = document.firstChild.textContent.split("\n\n")

    let stacks = getStacks(def)

    actions.trim().split("\n")
      .map(l => l.split(" "))
      .map(([, num, , from, , to]) => {
        for (let i = 0; i < Number(num); i++) {
          move(stacks, 1, Number(from) - 1, Number(to) - 1)
        }
      })

    console.log("Day 5 part 1:", stacks.map(e => e.shift()).reduce((a, b) => a + b, ""))
  }

  {
    let [def, actions] = document.firstChild.textContent.split("\n\n")

    let stacks = getStacks(def)

    actions.trim().split("\n")
      .map(l => l.split(" "))
      .map(([, num, , from, , to]) => move(stacks, Number(num), Number(from) - 1, Number(to) - 1))

    console.log("Day 5 part 2:", stacks.map(e => e.shift()).reduce((a, b) => a + b, ""))
  }
}
