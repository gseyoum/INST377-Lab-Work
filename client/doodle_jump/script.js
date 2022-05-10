/* eslint-disable no-use-before-define */
/* eslint-disable no-const-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable arrow-parens */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-const */
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const doodler = document.createElement('div');
    let DoodlerLeftSpace = 50;
    let startPoint = 150;
    let DoodlerBottomSpace = startPoint;
    let isGameOver = false;
    const platformCount = 5;
    platforms = [];
    let upTimerId;
    let downTimerId;
    let isJumping = true;
    let isGoingLeft = false;
    let isGoingRight = false;
    let leftTimerId;
    let rightTimerId;
    let score = 0;
  
    /* creates doodler object */
    function createDoodler() {
      grid.appendChild(doodler);
      doodler.classList.add('doodler');
      DoodlerLeftSpace = platforms[0].left;
      doodler.style.left = `${DoodlerLeftSpace}px`;
      doodler.style.bottom = `${DoodlerBottomSpace}px`;
    }
  
    /* creates a platform */
    class Platform {
      constructor(platBottom) {
        this.bottom = platBottom;
        this.left = Math.random() * 315;
        this.visual = document.createElement('div');
  
        const visual = this.visual;
        visual.classList.add('platform');
        visual.style.left = `${this.left}px`;
        visual.style.bottom = `${this.bottom}px`;
        grid.appendChild(visual);
      }
    }
  
    /* creates 5 platforms in the grid */
    function createPlatforms() {
      for (let i = 0; i < platformCount; i++) {
        let platGap = 600 / platformCount;
        let platBottom = 100 + i * platGap;
        let newPlatform = new Platform(platBottom);
        platforms.push(newPlatform);
        console.log(platforms);
      }
    }
  
    /* make the platforms move */
    function movePlatforms() {
      if (DoodlerBottomSpace > 200) {
        platforms.forEach(platform => {
          platform.bottom -= 4;
          let visual = platform.visual;
          visual.style.bottom = `${platform.bottom}px`;
  
          if (platform.bottom < 10) {
            let firstPlatform = platforms[0].visual;
            firstPlatform.classList.remove('platform');
            platforms.shift();
            console.log(platforms);
            score++;
            let newPlatform = new Platform(600);
            platforms.push(newPlatform);
          }
        });
      }
    }
  
    /* makes the doddle jump and fall if it reaches 350px */
    function jump() {
      clearInterval(downTimerId);
      isJumping = true;
      upTimerId = setInterval(() => {
        DoodlerBottomSpace += 20;
        doodler.style.bottom = `${DoodlerBottomSpace}px`;
        // Go over this
        if (DoodlerBottomSpace > startPoint + 200) {
          fall();
        }
      }, 30);
    }
  
    /* function that makes the doodle fall and stop at 0px */
    function fall() {
      clearInterval(upTimerId);
      isJumping = false;
      downTimerId = setInterval(() => {
        DoodlerBottomSpace -= 5;
        doodler.style.bottom = `${DoodlerBottomSpace}px`;
        if (DoodlerBottomSpace <= 0) {
          gameOver();
        }
  
        // Makes the doodler jump when landing onto a platform (Go over this again)
        platforms.forEach(item => {
          if (
            (DoodlerBottomSpace >= item.bottom)
            && (DoodlerBottomSpace <= item.bottom + 15)
            && ((DoodlerLeftSpace + 60) >= item.left)
            && (DoodlerLeftSpace <= (item.left + 85))
            && !isJumping
          ) {
            console.log('landed');
            startPoint = DoodlerBottomSpace;
            jump();
          }
        });
      }, 30);
    }
  
    /* ends the game */
    function gameOver() {
      console.log('game over');
      isGameOver = true;
      while (grid.firstChild) {
        console.log('remove');
        grid.removeChild(grid.firstChild);
      }
      grid.innerHTML = score;
      clearInterval(upTimerId);
      clearInterval(downTimerId);
      clearInterval(leftTimerId);
      clearInterval(rightTimerId);
    }
  
    // Allows us to move the doodle left,right, or straight
    function control(e) {
      if (e.key === 'ArrowLeft') {
        moveLeft();
      } else if (e.key === 'ArrowRight') {
        moveRight();
      } else if (e.key === 'ArrowUp') {
        moveStraight();
      }
    }
  
    // function to make the doodler move left
    function moveLeft() {
      if (isGoingRight) {
        clearInterval(rightTimerId);
        isGoingRight = false;
      }
      isGoingLeft = true;
      leftTimerId = setInterval(() => {
        // doodler moves right if it hits the border
        if (DoodlerLeftSpace >= 0) {
          console.log('going left');
          DoodlerLeftSpace -= 5;
          doodler.style.left = `${DoodlerLeftSpace}px`;
        } else moveRight();
      }, 30);
    }
  
    // function to make the doodler moove right
    function moveRight() {
      if (isGoingLeft) {
        clearInterval(leftTimerId);
        isGoingLeft = false;
      }
      isGoingRight = true;
      rightTimerId = setInterval(() => {
        // doodler moves left if it hits the border
        if (DoodlerLeftSpace <= 340) {
          console.log('going right');
          DoodlerLeftSpace += 5;
          doodler.style.left = `${DoodlerLeftSpace}px`;
        } else moveLeft();
      }, 30);
    }
  
    // function to make the doodler move straight
    function moveStraight() {
      isGoingRight = false;
      isGoingLeft = false;
      clearInterval(leftTimerId);
      clearInterval(rightTimerId);
    }
  
    function start() {
      if (!isGameOver) {
        createPlatforms();
        createDoodler();
        setInterval(movePlatforms, 30);
        jump();
        // to make the doodler respond if we hit left,right or up key
        document.addEventListener('keyup', control);
      }
    }
  
    start();
  });