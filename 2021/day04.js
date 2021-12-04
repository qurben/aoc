{
  let [inputStr, ...boardsStr] = document.body.firstChild.innerText.split("\n\n")
  
  let input = inputStr.split(",")
  
  let boards = boardsStr.map(b => b.split("\n").map(l => l.trim().split(/\s+/).map(Number)))
  boards
  
  let isWin = board => {
    for (let i = 0; i < 5; i++) {
      if (board[i].filter(v => v == "x").length == board[i].length) {
        return true;
      }
      
      let win = true
      for (let j = 0; j < 5; j++) {
        if (board[j][i] != "x") {
          win = false
        }
      }
      
      if (win) {
        return true;
      }
    }
    
    return false;
  }
  
  let markBoard = (board, val) => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] == val) {
          board[i][j] = "x";
        }
      }
    }
  }
  
  let sumBoard = board => board.reduce((c, l) => l.reduce((c, v) => v == "x" ? c : c + v, 0) + c, 0);
  
  let run = () => {
    for (let i = 0; i < input.length; i++) {
      let val = input[i];
      for (let j = 0; j < boards.length; j++) {
        let board = boards[j];

        markBoard(board, val);

        if (isWin(board)) {
          return [board, val];
        }
      }
    }
  }
  
  let run2 = () => {
    let totalWin = 0;
    let won = [];
    for (let i = 0; i < input.length; i++) {
      let val = input[i];
      for (let j = 0; j < boards.length; j++) {
        let board = boards[j];

        markBoard(board, val);

        if (isWin(board) && !won[j]) {
          totalWin++;
          won[j] = true;
          
          if (totalWin == boards.length) {
          	return [board, val];
          }
        }
      }
    }
  }
  
  let [winBoard, winVal] = run();
  
  console.log("Day 4, part 1", sumBoard(winBoard) * winVal)
  
  let [lastBoard, lastVal] = run2();
  
  console.log("Day 4, part 2", sumBoard(lastBoard) * lastVal)
}
