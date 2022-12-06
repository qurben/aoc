{
  let solution = bufferSize => {
    let line = document.firstChild.textContent.trim().split("");

    let containsDuplicates = l => l.length !== new Set(l).size;

    let buffer = [];
    for (let i = 0; i < bufferSize; i++) {
      buffer.push(line.shift())
    }

    let count = 0;
    while (containsDuplicates(buffer)) {
      count++;
      buffer.shift();
      buffer.push(line.shift())
    }

    return count + buffer.length;
  }

  console.log("Day 6 part 1:", solution(4))
  console.log("Day 6 part 2:", solution(14))
}
