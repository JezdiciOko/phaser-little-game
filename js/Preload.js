var TopDownGame = TopDownGame || {};

//loading the game assets
TopDownGame.Preload = function(){};

TopDownGame.Preload.prototype = {
  preload: function() {
    //show loading screen
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preloadBar);

    //load game assets
    this.load.image('space', 'assets/skies/background.png');
    this.load.image('bullet', 'assets/games/asteroids/bullets2.png');;
    this.load.image('ship', 'assets/games/asteroids/ship.png');
    this.load.spritesheet('veggies', 'assets/sprites/fruitnveg32wh37.png', 32, 32);
   
    var sprite;
    var cursors;
    var veggies;
    var bullet;
    var bullets;
    var bulletTime = 0;
  },
  create: function() {
    this.state.start('Game');
  }
};