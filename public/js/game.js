import { addZoomMainCamera } from './cameraActions.js'
import { handleCurrentPlayers, handleRemovePlayer, handleMovePlayer, addOtherPlayers, handleSendPlayerAction } from './playerActions.js'
import { createLevel } from './level.js'
import { checkCollisionCoin, checkCollisions, checkPlayerOnGround } from './collisions.js'
import { handleMechanismAction } from './mechanisms.js';
import { handleCoinAction } from './coins.js';

const WIDTH = 2400;
const HEIGHT = 1200;
let players = [];

const config = {
  type: Phaser.AUTO,
  width: WIDTH,
  height: HEIGHT,
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
  physics: {
    default: 'matter',
    matter: {
      gravity: { y: 1 },
      debug: false,
      enableSleep: false,
    },
  },
  fps: {
    target: 40,
    forceSetTimeOut: true
  },
};

const game = new Phaser.Game(config);

function preload() {
  this.load.image('background', 'background.png');
  this.load.image('winWindow', 'winWindow.png');
  this.load.image('fire', 'fire.png');
  this.load.image('water', 'water.png');
  this.load.image('columnElev', 'columnElev.png');
  this.load.image('column', 'column.png');
  this.load.image('platform', 'platform.png');
  this.load.image('platformRightCorner', 'platformRightCorner.png');
  this.load.image('platformLeftCorner', 'platformLeftCorner.png');
  this.load.image('platformBlock', 'block.png');
  this.load.image('wall', 'wall.jpg');
  this.load.image('floor', 'floor.jpg');
  this.load.image('doorWater', 'DoorWater.png');
  this.load.image('doorFire', 'DoorFire.png');
  this.load.image('orgBtn', 'orgBtn.png');
  this.load.image('purpleBtn', 'purpleBtn.png');
  this.load.image('greenBtn', 'greenBtn.png');
  this.load.image('orgElev', 'orgElev.png');
  this.load.image('purpleElev', 'purpleElev.png');
  this.load.image('greenElev', 'greenElev.png');
  this.load.image('stoneBlock', 'stoneBlock.png');
  this.load.image('grass1', 'grass1.png');
  this.load.image('grass2', 'grass2.png');
  this.load.image('grass3', 'grass3.png');
  this.load.image('grass4', 'grass4.png');
  this.load.image('grass5', 'grass5.png');
  this.load.image('grass6', 'grass6.png');
  this.load.image('waterCoin', 'waterCoin.png');
  this.load.image('fireCoin', 'fireCoin.png');
  this.load.image('coins', 'coins.png');
  this.load.spritesheet('waterRight', 'waterRunRight.png', { frameWidth: 63, frameHeight: 63 });
  this.load.spritesheet('waterLeft', 'waterRunLeft.png', { frameWidth: 62, frameHeight: 63 });
  this.load.spritesheet('waterJump', 'waterJump.png', { frameWidth: 45, frameHeight: 63 });
  this.load.spritesheet('waterExit', 'waterExit.png', { frameWidth: 41, frameHeight: 61 });
  this.load.spritesheet('waterIdle', 'water.png', { frameWidth: 47, frameHeight: 63 });
  this.load.spritesheet('fireJump', 'fireJump.png', { frameWidth: 41, frameHeight: 83 });
  this.load.spritesheet('fireRight', 'fireRunRight.png', { frameWidth: 66, frameHeight: 83 });
  this.load.spritesheet('fireLeft', 'fireRunLeft.png', { frameWidth: 66, frameHeight: 83 });
  this.load.spritesheet('fireExit', 'fireExit.png', { frameWidth: 38, frameHeight: 83 });
  this.load.spritesheet('fireIdle', 'fire.png', { frameWidth: 43, frameHeight: 83 });
  this.load.spritesheet('lava', 'lava.png', { frameWidth: 196, frameHeight: 25 });
  this.load.spritesheet('lake', 'lake.png', { frameWidth: 196, frameHeight: 26 });
  this.load.spritesheet('poison', 'poison.png', { frameWidth: 196, frameHeight: 27 });
  this.load.spritesheet('doorFireAnim', 'animationDoors.png', { frameWidth: 111, frameHeight: 123 });
}

function create() {
  const self = this;
  const { input, add, anims } = self;
  self.ws = new WebSocket('ws://172.20.10.2:8080');
  self.keys = input.keyboard.addKeys('W,A,S,D,X');
  self.cursors = input.keyboard.createCursorKeys();
  self.objectsByJump = [];

  addZoomMainCamera(self);
  createLevel(self, WIDTH, HEIGHT);
  setupAnimations(self);

  self.buttons = [self.orgBtn, self.greenBtn, self.purpleBtn];
  self.doors = [self.doorFire, self.doorWater];
  self.liquids = [self.poison1, self.poison2, self.lava, self.lake];
  self.coins = [self.fireCoin1, self.fireCoin2, self.fireCoin3, self.waterCoin1, self.waterCoin2, self.waterCoin3];
  self.platformsGroup = self.add.group();
  self.platformsGroup.addMultiple(self.objectsByJump);

  self.ws.onmessage = function (event) {
    handleWebSocketMessage(self, event);
  };

  self.fpsText = add.text(10, 10, '', { font: '50px Arial', fill: '#fff' });

  self.matter.world.on('collisionstart', function (event) {
    checkCollisionCoin(self, event, self.playerFirst, self.coins);
    checkPlayerOnGround(event, players, self.platformsGroup);
  });
}

function update(time, delta) {
  this.fpsText.setText('FPS: ' + this.game.loop.actualFps);
  this.controls.update(delta);
  if (this.lava) this.lava.play('lava', true);
  if (this.lake) this.lake.play('lake', true);
  if (this.poison1) this.poison1.play('poison', true);
  if (this.poison2) this.poison2.play('poison', true);
  if (this.playerFirst) {
    if (this.keys.W.isDown) {
      this.playerFirst.jump();
      if (this.playerFirst.role === 'water') this.playerFirst.play('waterJump', true);
      if (this.playerFirst.role === 'fire') this.playerFirst.play('fireJump', true);
      handleSendPlayerAction(this.playerFirst, this.ws, "jump");
    } else if (this.keys.A.isDown) {
      this.playerFirst.moveLeft();
      if (this.playerFirst.role === 'water') this.playerFirst.play('waterLeft', true);
      if (this.playerFirst.role === 'fire') this.playerFirst.play('fireLeft', true);
      handleSendPlayerAction(this.playerFirst, this.ws, "moveLeft");
    } else if (this.keys.D.isDown) {
      this.playerFirst.moveRight();
      if (this.playerFirst.role === 'water') this.playerFirst.play('waterRight', true);
      if (this.playerFirst.role === 'fire') this.playerFirst.play('fireRight', true);
      handleSendPlayerAction(this.playerFirst, this.ws, "moveRight");
    } else {
      if (this.playerFirst.role === 'water') this.playerFirst.play('waterIdle', true);
      if (this.playerFirst.role === 'fire') this.playerFirst.play('fireIdle', true);
      handleSendPlayerAction(this.playerFirst, this.ws, "moveIdle");
    }

    checkCollisions(this, this.buttons, this.liquids, this.doors, players);

    if (this.playerFirst.byDoor && this.playerSecond.byDoor && this.playerSecond && this.playerFirst) {
      if (this.doorWater) this.doorWater.play('doorWater', true);
      if (this.doorFire) this.doorFire.play('doorFire', true);
      setTimeout(() => {
        this.scene.pause()
        const scoreWindow = this.add.sprite(WIDTH / 2, HEIGHT / 2, 'winWindow').setDepth(5);
        scoreWindow.displayWidth = 500;
        scoreWindow.displayHeight = 200;

        const scoreText = this.add.text(WIDTH / 2, HEIGHT / 2, 'You are win', {
          font: '72px Arial',
          fill: '#ffffff',
        }).setDepth(6);

        scoreText.setOrigin(0.5);

      }, 1000);
    }
  }
}

function handleWebSocketMessage(self, event) {
  const data = JSON.parse(event.data);

  switch (data.type) {
    case 'currentPlayers':
      handleCurrentPlayers(self, data, players);
      break;
    case 'newPlayer':
      addOtherPlayers(self, data.player, self.ws, players);
      break;
    case 'playerDisconnected':
      handleRemovePlayer(data.playerId, players);
      break;
    case 'playerAction':
      handleMovePlayer(data.playerId, data.action, players, data.x, data.y);
      break;
    case 'MechanismAction':
      handleMechanismAction(self, data.action);
      break;
    case 'CoinAction':
      handleCoinAction(self, data.action);
      break;
  }
}

function setupAnimations(self) {
  const animationList = [
    { key: 'waterLeft', frames: self.anims.generateFrameNumbers('waterLeft', { frames: [7, 6, 5, 4, 3, 2, 1, 0] }), frameRate: 13, repeat: 0 },
    { key: 'waterRight', frames: self.anims.generateFrameNumbers('waterRight', { frames: [0, 1, 2, 3, 4, 5, 6, 6] }), frameRate: 13, repeat: 0 },
    { key: 'waterIdle', frames: self.anims.generateFrameNumbers('waterIdle', { frames: [0, 0, 0] }), frameRate: 13, repeat: 0 },
    { key: 'waterJump', frames: self.anims.generateFrameNumbers('waterJump', { frames: [0, 0, 0, 0, 1, 1, 1, 1] }), frameRate: 8, repeat: 0 },
    { key: 'fireJump', frames: self.anims.generateFrameNumbers('fireJump', { frames: [0, 0, 0, 0, 1, 1, 1, 1] }), frameRate: 8, repeat: 0 },
    { key: 'fireRight', frames: self.anims.generateFrameNumbers('fireRight', { frames: [0, 1, 2, 3, 4, 5, 6, 6] }), frameRate: 8, repeat: 0 },
    { key: 'fireLeft', frames: self.anims.generateFrameNumbers('fireLeft', { frames: [7, 6, 5, 4, 3, 2, 1, 0] }), frameRate: 8, repeat: 0 },
    { key: 'fireIdle', frames: self.anims.generateFrameNumbers('fireIdle', { frames: [0, 0, 0] }), frameRate: 13, repeat: 0 },
    { key: 'lava', frames: self.anims.generateFrameNumbers('lava', { frames: [0, 1, 2, 3, 4] }), frameRate: 6, repeat: 0 },
    { key: 'lake', frames: self.anims.generateFrameNumbers('lake', { frames: [0, 1, 2, 3] }), frameRate: 5, repeat: 0 },
    { key: 'poison', frames: self.anims.generateFrameNumbers('poison', { frames: [0, 1, 2, 3] }), frameRate: 5, repeat: 0 },
    { key: 'doorWater', frames: self.anims.generateFrameNumbers('doorFireAnim', { frames: [6, 7, 8, 9, 10, 11, 11, 11, 11, 11, 11, 11] }), frameRate: 6, repeat: 0 },
    { key: 'doorFire', frames: self.anims.generateFrameNumbers('doorFireAnim', { frames: [0, 1, 2, 3, 4, 5, 5, 5, 5, 5, 5, 5] }), frameRate: 6, repeat: 0 },
  ];

  animationList.forEach((animation) => {
    self.anims.create(animation);
  });
}