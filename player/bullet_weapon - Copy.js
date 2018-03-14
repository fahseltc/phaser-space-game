const BULLET_ADDITIONAL_SPEED = 1000;
const BULLET_LIFESPAN = 1000;
const BULLET_DELAY = 100;

const HEAT_GENERATED_PER_SHOT = 2;
const HEAT_LOST_PER_TICK = 0.1;
const MAX_HEAT = 10;
const OVERHEAT_DURATION = Phaser.Timer.SECOND * 0.8;


class BulletWeapon {

  constructor(player) {
    this.player = player;
     // bullets
    this.bullets = game.add.group();
    this.bullets.enableBodyDebug = true;
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.bullets.createMultiple(100, 'player_bullet');
    this.bullets.setAll('anchor.x', 0.5);
    this.bullets.setAll('anchor.y', 0.5);
    this.bullet_time = 0;

    this.heat = 0;
    this.overheated = false;
  }

  update(controls) {
    if(controls.left_click)  { this.fire_bullet(); }
    if (this.heat > 0) { this.heat -= HEAT_LOST_PER_TICK; }
  }

  render() {
    //game.debug.text(this.heat, 200, 14, "#00ff00");
  }

  fire_bullet() {
    if (game.time.now > this.bullet_time) {
      var bullet = this.bullets.getFirstExists(false);

      if (bullet && this.overheated == false) {
        this.heat += HEAT_GENERATED_PER_SHOT;
        bullet.reset(this.player.sprite.body.x + this.player.sprite.width/2, this.player.sprite.body.y + this.player.sprite.height/2);
        bullet.lifespan = BULLET_LIFESPAN;
        game.physics.arcade.velocityFromRotation(this.player.sprite.rotation, this.player.sprite.body.speed + BULLET_ADDITIONAL_SPEED, bullet.body.velocity);
        this.bullet_time = game.time.now + BULLET_DELAY;
      }

      if (this.heat > MAX_HEAT) { this.heat = 0; this.overheated = true; game.time.events.add(OVERHEAT_DURATION, function() { this.overheated = false }, this); }

    }
  }
}