{
  let input = document.body.textContent.trim().split("")
  	.map(l => ("0000" + parseInt(l, 16).toString(2)).slice(-4)).join("").split("")
    
  let readBits = (input, length) => {
    let output = "";
    for (let i = 0; i < length; i++) {
      output += input.shift();
    }
    
    return output;
  }
  
  let parseLiteral = input => {
    let length = 6;
    let output = "";
    let bit0
    do {
      length += 5
      bit0 = input.shift()
      output += input.shift() + input.shift() + input.shift() + input.shift()
    } while (bit0 == 1);
    
    return parseInt(output, 2);
  }
  
  let parseOperator = input => {
    let id = input.shift();
    
    let packets = [];
    
    if (id == "0") {
      let length = parseInt(readBits(input, 15), 2);
      
      let subInput = readBits(input, length).split("")
      
      while (subInput.length > 4) {
        packets.push(parsePacket(subInput))
      }
    }
    if (id == "1") {
      let num = parseInt(readBits(input, 11), 2)
      
      for (let i = 0; i < num; i++) {
        packets.push(parsePacket(input));
      }
    }
    
    return packets
  }
  
  let parsePacket = input => {
    let version = parseInt(input.shift() + input.shift() + input.shift(), 2)
    let type = parseInt(input.shift() + input.shift() + input.shift(), 2)
    
    let content;
    switch (type) {
      case 4: // literal
        content = parseLiteral(input);
        break;
      default: // operator
        content = parseOperator(input);
        break;
    }
    
    return {version, type, content}
  }
  
  let versionSum = ({version, type, content}) => version + (type == 4 ? 0 : content.reduce((c,p) => c + versionSum(p), 0))
  
  let parseContents = ({content, type}) => {
    if (type == 4) {
      return content;
    }
    
    let parsed = content.map(parseContents)
    
    switch (type) {
      case 0: // sum
        return parsed.reduce((c, p) => c + p, 0)
      case 1: // product
        return parsed.reduce((c, p) => c * p, 1)
      case 2: // minimum
        return Math.min(...parsed)
      case 3: // maximum
        return Math.max(...parsed)
      case 5: // greater than
        return parsed[0] > parsed[1] ? 1 : 0
      case 6: // less than
        return parsed[0] < parsed[1] ? 1 : 0
      case 7: // equal to
        return parsed[0] == parsed[1] ? 1 : 0
    }
  }
  
  let packet = parsePacket(input)
  
  console.log("Day 16, part 1", versionSum(packet))

  console.log("Day 16, part 2", parseContents(packet))
}
