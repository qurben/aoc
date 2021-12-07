{
  let vals = document.body.firstChild.textContent.trim().split(",").map(Number)

  let id = _=>_
  let getSum = (num) => (num * (num + 1)) / 2
  
  let range = (a,b) => a < b 
  	? new Array(b-a+1).fill(0).map((v, i) => a+i)
  	: new Array(a-b+1).fill(0).map((v, i) => a-i)
  
  let cost = (vals, costFun) => x => vals.reduce((c, val) => c + costFun(Math.abs(x - val)), 0)
 
  let calc = (vals, costFun) => 
     Math.min(...range(Math.min(...vals), Math.max(...vals)).map(cost(vals, costFun)));
  
  console.log("Day 7, part 1", calc(vals, id))
  console.log("Day 7, part 2", calc(vals, getSum))
}
