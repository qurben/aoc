{
  let items = document.firstChild.textContent.trim().split("\n")
  	.map(l => l.split(",").map(v => v.split("-").map(Number)))
  
  let contains = ([[a,b], [c,d]]) => {
    if (a >= c && b <= d) {
      return true;
    }
    
    if (c >= a && d <= b) {
      return true;
    }
    
    return false;
  }
    
  console.log(items.map(contains).reduce((a,b) => a + b, 0))
  
  let overlap = ([[a,b], [c,d]]) => {
    if (b >= c && b <= d) {
      return true;
    }
    
    if (a >= c && a <= d) {
      return true;
    }
    
    if (c >= a && c <= b) {
      return true;
    }
    
    if (d >= a && d <= b) {
      return true;
    }
    
    return false;
  }
  
    console.log(items.map(overlap).reduce((a,b) => a + b, 0))
}
