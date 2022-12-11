{
  let items = document.body.firstChild.textContent.trim().split("\n\n")
    
  let monkeys = []
  
  for (let item of items) {
    
    let [idStr, starting, operationStr, testStr, test_trueStr, test_falseStr] = item.split("\n").map(i => i.trim())
    
    let id = Number(idStr.match("[0-9]+")[0])
    
    let items = starting.split(": ")[1].split(", ").map(Number)
    let operation = operationStr.split("= ")[1]
    let test = Number(testStr.split("by ")[1])
    let test_true = Number(test_trueStr.split("monkey ")[1])
    let test_false = Number(test_falseStr.split("monkey ")[1])
    
    let monkey = {
      id, items, operation, test, test_true, test_false,
      inspected: 0
    }
    
    monkeys.push(monkey)
  }
    
  let round = () => {
    for (let i = 0; i < monkeys.length; i++) {
      let monkey = monkeys[i];
      
      for (let j = 0; j < monkey.items.length; j++) {
        let old = monkey.items[j];
        let newVal = eval(monkey.operation)
        monkey.inspected++
        
        newVal = Math.floor(newVal / 3)
        
        if (newVal % monkey.test == 0) {
          monkeys[monkey.test_true].items.push(newVal)
        }  else {
          monkeys[monkey.test_false].items.push(newVal)
        }
      }
      
      monkey.items = [];
    }
  }
  
  for (let i = 0; i < 20; i++)
  round();
  
  console.log("Day 11 part 1:", monkeys.map(m => m.inspected).sort((a,b) => b-a).slice(0,2).reduce((a,b) => a * b, 1))
}

{
  let items = document.body.firstChild.textContent.trim().split("\n\n")
    
  let monkeys = []
  
  for (let item of items) {
    
    let [idStr, starting, operationStr, testStr, test_trueStr, test_falseStr] = item.split("\n").map(i => i.trim())
    
    let id = Number(idStr.match("[0-9]+")[0])
    
    let items = starting.split(": ")[1].split(", ").map(Number)
    let operation = operationStr.split("= ")[1]
    let test = Number(testStr.split("by ")[1])
    let test_true = Number(test_trueStr.split("monkey ")[1])
    let test_false = Number(test_falseStr.split("monkey ")[1])
    
    let monkey = {
      id, items, operation, test, test_true, test_false,
      inspected: 0
    }
    
    monkeys.push(monkey)
  }
    
  let mod = monkeys.reduce((c, m) => c * m.test, 1)
  
  let round = () => {
    for (let i = 0; i < monkeys.length; i++) {
      let monkey = monkeys[i];
      
      for (let j = 0; j < monkey.items.length; j++) {
        let old = monkey.items[j];
        let newVal = eval(monkey.operation)
        monkey.inspected++
        
//         newVal = Math.floor(newVal / 3)
        
        if (newVal % monkey.test == 0) {
          monkeys[monkey.test_true].items.push(newVal % mod)
        }  else {
          monkeys[monkey.test_false].items.push(newVal % mod)
        }
      }
      
      monkey.items = [];
    }
  }
  
  for (let i = 0; i < 10000; i++) round();
  
  console.log("Day 11 part 2:", monkeys.map(m => m.inspected).sort((a,b) => b-a).slice(0,2).reduce((a,b) => a * b, 1))
}
