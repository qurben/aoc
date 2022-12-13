{
  let cost = a => a.charCodeAt(0) > 90 ? a.charCodeAt(0) - 96 : a.charCodeAt(0) - 64 +26
  let split = a => [a.substr(0, a.length / 2), a.substr(a.length / 2)]
  let findDuplicate = ([a, b]) => {
    for (let v of a) {
      if (b.indexOf(v) != -1) {
        return v
      }
    }
  }

  let items = document.firstChild.textContent.trim().split("\n")
    .map(split)
  	.map(findDuplicate)
  .map(cost)
  .reduce((a,b) => a + b, 0)
  
  console.log(items)

  let items2 = document.firstChild.textContent.trim().split("\n")
  let vals = [];
  outer: for (let i = 0; i < items2.length; i+=3) {
    let one = items2[i];
    let two = items2[i+1];
    let thre = items2[i+2];
    
    for (let v of one) {
      if (two.indexOf(v) != -1 && thre.indexOf(v) != -1) {
        vals.push(v);
        continue outer;
      }
    }
  }
  
  console.log(vals.map(cost).reduce((a,b) => a + b, 0))
}
