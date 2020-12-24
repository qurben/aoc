{
    class RingNode {
        next = null

        constructor(val) {
            this.val = val
        }
    }

    const input = "598162734".split("").map(Number)

    const min = Math.min(...input)
    let max = Math.max(...input)

    let node = new RingNode(input[0])
    let prev = node
    let first = node

    let oneNode = null

    const index = new Map
    index.set(input[0], node)

    for (let val of input.slice(1)) {
        node = new RingNode(val)

        index.set(val, node)

        if (val == 1) oneNode = node

        prev.next = node
        prev = node
    }

    node.next = first

    let currentNode = first

    const move = () => {
        const cup1 = currentNode.next
        const cup2 = cup1.next
        const cup3 = cup2.next

        currentNode.next = cup3.next

        let next = currentNode.val - 1
        if (next < min) next = max

        while (cup1.val == next || cup2.val == next || cup3.val == next) {
            next--
            if (next < min) next = max
        }

        let stepNode = index.get(next)

        nextNode = stepNode.next
        stepNode.next = cup1
        cup3.next = nextNode

        currentNode = currentNode.next
    }

    for (let i = 0; i < 100; i++) move()

    let walkNode = index.get(1).next
    let answer = ""
    while (walkNode != index.get(1)) {
        answer += String(walkNode.val)
        walkNode = walkNode.next
    }

    console.log("Part 1:", answer)
}

{
    class RingNode {
        next = null

        constructor(val) {
            this.val = val
        }
    }

    const input = "598162734".split("").map(Number)

    const min = Math.min(...input)
    const maxInput = Math.max(...input)

    const index = new Map

    let node = new RingNode(input[0])
    const first = node
    let prev = node

    index.set(input[0], node)

    for (let val of input.slice(1)) {
        node = new RingNode(val)

        index.set(val, node)

        prev.next = node
        prev = node
    }

    const todo = input.length

    let i = 0;
    for (; i < 1000000 - todo; i++) {
        const val = maxInput + 1 + i
        node = new RingNode(val)

        index.set(val, node)

        prev.next = node
        prev = node
    }

    const max = maxInput + i

    node.next = first

    let currentNode = first

    const move = () => {
        const cup1 = currentNode.next
        const cup2 = cup1.next
        const cup3 = cup2.next

        currentNode.next = cup3.next

        let next = currentNode.val - 1

        while (next < min || cup1.val == next || cup2.val == next || cup3.val == next) {
            next--
            if (next < min) next = max
        }

        let insertAtNode = index.get(next)

        nextNode = insertAtNode.next
        insertAtNode.next = cup1
        cup3.next = nextNode

        currentNode = currentNode.next
    }

    for (let i = 0; i < 10000000; i++) move()

    console.log("Part 1:", index.get(1).next.val * index.get(1).next.next.val)
}
