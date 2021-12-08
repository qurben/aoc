{
  let lines = document.body.firstChild.textContent.trim().split("\n")
  	.map(l => l.split(" | ").map(v => v.split(" ")))
  
  const intersection = (a, b) => a.split("").filter((v) => b.split("").includes(v));
  const diff = (a, b) => a.filter((v) => !b.includes(v));
  const union = (a, b) => diff(a.split(""), b.split("")).concat(b.split(""));
  
  let total = 0;
  let total2 = 0;
  for (let [test, output] of lines) {
    let a,b,c,d,e,f,g;
    
    let one = test.find(v => v.length == 2).split("").sort().join("");
    let four = test.find(v => v.length == 4).split("").sort().join("")
    let seven = test.find(v => v.length == 3).split("").sort().join("")
    let eight = test.find(v => v.length == 7).split("").sort().join("")
    
    let six = test.find(v => v.length == 6 && union(v, one).length == 7).split("").sort().join("")
    
    c = diff(one.split(""), six.split(""))[0]
    a = diff(seven.split(""), one.split(""))[0]
    f = intersection(one, six)[0]
    
    let five = test.find(v => !v.includes(c) && v.length == 5).split("").sort().join("");
    
    e = diff(six.split(""), five.split(""))[0]
    
    let nine = test.find(v => v.length == 6 && !v.includes(e)).split("").sort().join("")
    
    let zero = test.find(v => v.length == 6 && union(v, nine).length == 7 && union(v, six).length == 7).split("").sort().join("");
    
    d = diff(eight.split(""), zero.split(""))[0]
    
    let two = test.find(v => v.length == 5 && v.split("").sort().join("") != five && diff(one.split(""), v.split("")).length == 1).split("").sort().join("")
    
    b = diff(diff(four.split(""), two.split("")), [f])[0]
    
    g = diff(two.split(""), [a,c,d,e])[0]
    
    let three = [a,c,d,f,g].sort().join("")
        
    let value = "";
    
    for (let digit of output) {
      if (digit.length == 2 || digit.length == 4 || digit.length == 3 || digit.length == 7) {
        total++;
      }
      
      let d = digit.split("").sort().join("");
      
      switch (d) {
        case one: value += "1"; break;
        case two: value += "2"; break;
        case three: value += "3"; break;
        case four: value += "4"; break;
        case five: value += "5"; break;
        case six: value += "6"; break;
        case seven: value += "7"; break;
        case eight: value += "8"; break;
        case nine: value += "9"; break;
        case zero: value += "0"; break;
      }
    }
    
    total2 += Number(value);
  }
  
  console.log("Day 8, part 1", total)
  console.log("Day 8, part 2", total2)
}
