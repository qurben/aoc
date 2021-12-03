{
  let lines = document.body.firstChild.textContent.trim().split("\n").map(_ => _.split(""))

  let num = lines.reduce(([...vals], c) => ([...c.map((v, i) => v == 1 ? vals[i] + 1 : vals[i])]), [0,0,0,0,0,0,0,0,0,0,0,0,0])
	.reduce((v, c) => c > 500 ? v + "1" : v + "0", "")
	
	let gamma = parseInt(num, 2);
	let epsylon = parseInt(num.split("").map(x => x == "1" ? "0" : "1").join(""), 2)
	
  console.log("Day 3, 1", gamma * epsylon)
	
	let linesO = lines
	let linesC = lines
	let i = 0
	while (linesO.length > 1) {
		let numAtPos = linesO.reduce((c, v) => v[i] == "1" ? c+1 : c, 0)
		
		if (numAtPos >= linesO.length/2) {
				linesO = linesO.filter(v => v[i] == "1")
		} else {
				linesO = linesO.filter(v => v[i] == "0")
		}
		
		i++
	}
	
	i = 0
	while (linesC.length > 1) {
		let numAtPos = linesC.reduce((c, v) => v[i] == "1" ? c+1 : c, 0)

		if (numAtPos >= linesC.length/2) {
		  linesC = linesC.filter(v => v[i] == "0")
		} else {
			linesC = linesC.filter(v => v[i] == "1")
		}
		i++
	}
	
	let oxygen = parseInt(linesO[0].join(""), 2)
	let co2 = parseInt(linesC[0].join(""), 2)
		
	console.log("Day 3, 2", oxygen * co2)
}
