document.addEventListener("DOMContentLoaded", () => {
 const grid = document.querySelector(".grid");
let squares = Array.from(document.querySelectorAll(".grid div"));
const ScoreDisplay = document.querySelector("#score");
const StartBtn = document.querySelector("#start-button");
  const width = 10;

  //The Tetrominoes
  const lTetromino = [
      [1,width+1, width*2+1, 2],
      [width, width+1, width+2, width*2+2],
      [1,width+1, width*2+1, width*2],
      [width, width*2, width*2+1, width*2+2]
  
  ]

  const zTetromino = [
      [0,width,width+1,width*2+1],
      [width+1, width+2,width*2,width*2+1],
      [0,width,width+1,width*2+1],
      [width+1, width+2,width*2,width*2+1]
  ]

  const tTetromino = [
      [1,width,width+1,width+2],
      [1,width+1,width+2,width*2+1],
      [width,width+1,width+2,width*2+1],
      [1,width,width+1,width*2+1]
  ]

  const oTetromino = [
      [0,1,width,width+1],
      [0,1,width,width+1],
      [0,1,width,width+1],
      [0,1,width,width+1]
  ]

  const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino]

  let currentPos = 4 
  let currentRot = 0
  //select random tetro and rotate
  let random = Math.floor(Math.random()*theTetrominoes.length)
  let current = theTetrominoes[random][currentRot]

  //draw
  function Draw(){
    current.forEach(index => {
        squares[currentPos + index].classList.add('tetromino')
    })        
    ;
  }

  //undraw
  function undraw(){
    current.forEach(index => {
        squares[currentPos + index].classList.remove('tetromino')
    })        
    ;
  }

  //make the tetromino move down every second
  timerId = setInterval(moveDown, 1000);

  //assign keycodes
  function control(e){
    if(e.keyCode === 37){
      moveLeft()
    } else if(e.keyCode === 38){
      rotate()
    } else if (e.keyCode === 39){
      moveright()
    } else if (e.keyCode === 40){
      moveDown()
    }

  }
  document.addEventListener('keyup', control)

  function moveDown(){
    undraw();
    currentPos += width;
    Draw();
    freeze();
  } 

  //freeze function
  function freeze(){
    if(current.some(index => squares[currentPos + index + width].classList.contains('taken'))){
        current.forEach(index => squares[currentPos + index].classList.add('taken'))
        //start a new tetromino falling
        random = Math.floor(Math.random() * theTetrominoes.length)
        current = theTetrominoes[random][currentRot]
        currentPos = 4
        Draw()
  }

  }

  //move the tetromino bru
  function moveLeft(){
    undraw();
    const isleftEdge = current.some(index => (currentPos + index) % width === 0)

    if(!isleftEdge) currentPos -=1

    if(current.some(index => squares[currentPos + index].classList.contains('taken')))
    {
        currentPos += 1

    }
    Draw()
  }

  function moveright(){
    undraw();
    const isrightEdge = current.some(index => (currentPos + index) % width === width - 1)

    if(!isrightEdge) currentPos +=1

    if(current.some(index => squares[currentPos + index].classList.contains('taken')))
    {
        currentPos -= 1
    }
    Draw();
  }


  //rotate lol
  function rotate(){
    undraw()
    currentRot++
    if(currentRot === current.length){
      currentRot = 0
    }
    current = theTetrominoes[random][currentRot]
    Draw()
  }

})