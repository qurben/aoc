{
  let lines = document.firstChild.textContent.trim().split("\n")

  let totalSize = 70000000;
  let freeSpace = 30000000;
  let currentDir = [];
  let directorySizes = {};

  for (let line of lines) {
    if (line.startsWith("$")) {
      let [, cmd, dir] = line.split(" ");

      if (cmd === "cd") {
        if (dir === "..") {
          currentDir.pop();
        } else {
          currentDir.push(dir)
        }
      }
    } else {
      let [val, name] = line.split(" ")

      if (val !== "dir") {
        for (let i = 1; i <= currentDir.length; i++) {
          let parentDir = currentDir.slice(0, i).join("/")
          if (!(parentDir in directorySizes)) {
            directorySizes[parentDir] = Number(val);
          } else {
            directorySizes[parentDir] += Number(val);
          }
        }
      }
    }
  }

  let sum = 0;
  let usedSize = directorySizes["/"]
  let requiredSize = totalSize - freeSpace;
  let removeSizes = [];

  for (let key in directorySizes) {
    let size = directorySizes[key];

    if (size <= 100000) {
      sum += size;
    }

    if (usedSize - size < requiredSize) {
      removeSizes.push(size);
    }
  }

  console.log("Day 7 part 1:", sum)
  console.log("Day 7 part 2:", removeSizes.sort((a, b) => a - b)[0])
}
