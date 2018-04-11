var data={
  xRot:0,
  yRot:0,
  balls:[],
  velX:[],
  velY:[],
  posX:[],
  posY:[],
}
function handleRotation(e){
  data.xRot += (e.movementX)*0.3
  data.yRot += (e.movementY)*-0.3
  document.getElementById('cube').style = `transform: rotateX(${data.yRot}deg) rotateY(${data.xRot}deg)`
}
function init(){
  document.getElementById('cube').addEventListener('mousedown', function(e){
    document.addEventListener('mouseup', function holder(e){
      document.removeEventListener('mousemove',handleRotation)
      document.removeEventListener('mouseup',holder)
    })
    document.addEventListener('mousemove',handleRotation)
  })
  makeBalls(10)
  var inter = window.setInterval(moveBalls, 10)
}
document.addEventListener('DOMContentLoaded', init)

function makeBalls(numBalls){
  let arena = document.getElementById('ball-sim-cont')
  for (let i=0; i<numBalls; i++){
    data.velX[i] = Math.random() * (5) + 1;
    data.velY[i] = Math.random() * (5) + 1;
    data.posX[i] = 2;
    data.posY[i] = 107;
    let ball = document.createElement('div')
    ball.className='sim-ball'
    ball.id = `ball${i}`
    ball.style = 'top:107px; left:2px'
    arena.appendChild(ball)
    data.balls[i] = ball
  }
}
//Y Limits top: 107, bottom: 358
//X Limits left: 2, right: 358
function moveBalls(){
  for(let i=0; i<data.balls.length; i++){
    if (data.posX[i]>=358 && Math.sign(data.velX[i]) == 1){data.velX[i] = -data.velX[i]}
    if (data.posX[i]<=2 && Math.sign(data.velX[i]) == -1){data.velX[i] = -data.velX[i]}
    if (data.posY[i]>=358 && Math.sign(data.velY[i]) == 1){data.velY[i] = -data.velY[i]}
    if (data.posY[i]<=107 && Math.sign(data.velY[i]) == -1){
      data.velY[i] = -data.velY[i]
    }
    data.posX[i] += (data.velX[i])
    data.posY[i] += (data.velY[i])
    data.balls[i].style=`top:${data.posY[i]}px; left:${data.posX[i]}px;`
  }
}
