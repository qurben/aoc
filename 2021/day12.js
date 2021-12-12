{
  let edges = document.body.firstChild.textContent.trim().split("\n").map(l => l.split("-"))

  let findEdges = edges => node => [
    ...edges.filter(([a, _]) => a == node).map(([_, a]) => a),
    ...edges.filter(([_,b]) => b == node).map(([a, _]) => a)
  ]

  let isLower = node => node.toLowerCase() == node

  let hasDupLower = nodes => {
    let lowers = nodes.filter(isLower)

    return [...new Set(lowers)].length + 1 >= lowers.length
  }

  let findPath = edges => nodes => {
    let outgoingEdges = findEdges(edges)(nodes[0]);
    let paths = [];
    for (let node of outgoingEdges) {
      if (node == "end") {
        paths = [...paths, [node, ...nodes]]
      } else if (node == "start") {
        // continue
      } else if (isLower(node) && nodes.includes(node)) {
        // continue
      } else {
        paths = [...paths, ...findPath(edges)([node, ...nodes])]
      }
    }

    return paths;
  }

  let findPath2 = edges => nodes => {
    let outgoingEdges = findEdges(edges)(nodes[0]);
    let paths = [];
    for (let node of outgoingEdges) {
      if (node == "end") {
        paths = [...paths, [node, ...nodes]]
      } else if (node == "start") {
        // continue
      } else if (isLower(node) && !hasDupLower([node, ...nodes])) {
        // continue
      } else {
        paths = [...paths, ...findPath2(edges)([node, ...nodes])]
      }
    }

    return paths;
  }


  console.log("Day 12, part 1", findPath(edges)(["start"]).length)
  console.log("Day 12, part 2", findPath2(edges)(["start"]).length)

}
