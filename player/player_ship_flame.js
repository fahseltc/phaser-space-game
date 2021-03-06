const FLAME_FADE_TIME = 200;

class PlayerShipFlame {
  constructor(player) {
    this.player = player;

    this.sprite = game.add.group();
    this.sprite.createMultiple(100, "flame");
    this.sprite.setAll("anchor.x", 0.5);
    this.sprite.setAll("anchor.y", 0.1);
  }

  render() {
    var flame = this.sprite.getFirstExists(false);
    if (flame) {
      flame.rotation = this.player.sprite.rotation + Math.PI / 2;
      flame.reset(
        this.player.sprite.body.x + this.player.sprite.body.width / 2,
        this.player.sprite.body.y + this.player.sprite.body.height / 2
      );
      flame.alpha = 1;
      flame.lifespan = FLAME_FADE_TIME;
      game.add
        .tween(flame)
        .to(
          { alpha: 0 },
          FLAME_FADE_TIME,
          Phaser.Easing.Exponential.Out,
          true,
          0,
          0,
          false
        );
    }
  }
}