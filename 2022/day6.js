{
  let solution = b => b + document.firstChild.textContent.trim().split("")
      .map((_, i, l) => l.slice(i, i + b).length === new Set(l.slice(i, i + b)).size).indexOf(true);

  console.log("Day 6 part 1:", solution(4))
  console.log("Day 6 part 2:", solution(14))
}
