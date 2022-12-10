{
  let actions = document.body.firstChild.textContent.trim().split("\n")
    .map(l => l.split(" "))

  let cycles = [20, 60, 100, 140, 180, 220]

  let registerVal = 1;
  let cycle = 0;

  let sum = 0;

  let pixels = [];

  let drawPixel = () => {
    if (Math.abs((cycle % 40) - registerVal) <= 1) {
      pixels.push("#")
    } else {
      pixels.push("*")
    }
  }

  for (let [command, num] of actions) {
    switch (command) {
      case "noop":
        drawPixel();

        cycle++;
        if (cycles.includes(cycle)) {
          sum += cycle * registerVal
        }
        break;
      case "addx":
        drawPixel();

        cycle++;
        if (cycles.includes(cycle)) {
          sum += cycle * registerVal
        }

        drawPixel();


        cycle++
        if (cycles.includes(cycle)) {
          sum += cycle * registerVal
        }

        registerVal += Number(num)
        break;
    }
  }

  console.log("Day 10 part 1", sum)

  let pixelStr = "";
  for (let i = 0; i < pixels.length; i++) {
    if (i % 40 === 0) {
      pixelStr += "\n"
    }
    pixelStr += pixels[i];
  }

  console.log("Day 10 part 2:", pixelStr)
}
