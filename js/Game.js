var TopDownGame = TopDownGame || {};

TopDownGame.Game = function(){};
          var sprite;
    var cursors;
    var veggies;
    var bullet;
    var bullets;
    var bulletTime = 0;
TopDownGame.Game.prototype = {
  create: function() {

   //  This will run in Canvas mode, so let's gain a little speed and display
    this.game.renderer.clearBeforeRender = false;
    this.game.renderer.roundPixels = true;

    //  We need arcade physics
    this.physics.startSystem(this.game.Physics.ARCADE);

    //  A spacey background
    this.add.tileSprite(0, 0, this.width, this.height, 'space');

    //  Our ships bullets
    bullets = this.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = this.game.Physics.ARCADE;

    //  All 40 of them
    bullets.createMultiple(40, 'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 0.5);

    //  Our player ship
    sprite = this.add.sprite(300, 300, 'ship');
    sprite.anchor.set(0.5);

    //  and its physics settings
    this.physics.enable(sprite, this.game.Physics.ARCADE);

    sprite.body.drag.set(100);
    sprite.body.maxVelocity.set(200);

    //  Game input
    cursors = this.input.keyboard.createCursorKeys();
    this.input.keyboard.addKeyCapture([ this.game.Keyboard.SPACEBAR ]);
    
        veggies = this.add.group();
    veggies.enableBody = true;
    veggies.physicsBodyType = this.game.Physics.ARCADE;

    for (var i = 0; i < 10; i++)
    {
        var c = veggies.create(this.world.randomX, Math.random() * 500, 'veggies', this.rnd.integerInRange(0, 36));
        c.name = 'veg' + i;
        c.body.immovable = true;
    }


  },
  
  update: function() {

  this.physics.arcade.overlap(bullets, veggies, collisionHandler, null, this);

    if (cursors.up.isDown)
    {
        this.physics.arcade.accelerationFromRotation(sprite.rotation, 200, sprite.body.acceleration);
    }
    else
    {
        sprite.body.acceleration.set(0);
    }

    if (cursors.left.isDown)
    {
        sprite.body.angularVelocity = -300;
    }
    else if (cursors.right.isDown)
    {
        sprite.body.angularVelocity = 300;
    }
    else
    {
        sprite.body.angularVelocity = 0;
    }

    if (this.input.keyboard.isDown(this.game.Keyboard.SPACEBAR))
    {
        fireBullet();
    }

    screenWrap(sprite);
  
  },
  fireBullet: function() {
     if (this.time.now > bulletTime)
    {
        bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            bullet.reset(sprite.body.x + 16, sprite.body.y + 16);
            bullet.lifespan = 2000;
            bullet.rotation = sprite.rotation;
            this.physics.arcade.velocityFromRotation(sprite.rotation, 400, bullet.body.velocity);
            bulletTime = this.time.now + 50;
        }
    }
  },
  screenWrap: function(sprite) {
	    if (sprite.x < 0)
				{
			sprite.x = this.width;
					}
				else if (sprite.x > this.width)
					{
				sprite.x = 0;
						}

		if (sprite.y < 0)
				{
			sprite.y = this.height;
					}
				else if (sprite.y > this.height)
					{
				sprite.y = 0;
						}
	},  
	
  collisionHandler: function(sprbullet, vegite) {
	
			bullet.kill();
			veg.kill();
	},
render: function() {
    
},
	
 };