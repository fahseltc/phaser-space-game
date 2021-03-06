const REMAINING_ENEMIES_BASE_POSITION_X = 355;
const REMAINING_ENEMIES_BASE_POSITION_Y = 800;

class RemainingEnemiesBar {
  constructor(level_data) {

    if (level_data == undefined) {
      this.enemies_to_spawn = 1;
    } else {
      this.level_data = level_data.ENEMY_DATA;
      if (this.level_data != undefined) {
        this.enemies_to_spawn = level_data.ENEMY_DATA.ENEMIES_IN_WAVE;
      }
    }
    this.enemies_alive = this.enemies_to_spawn;

    this.bar = game.add.sprite(
      REMAINING_ENEMIES_BASE_POSITION_X,
      REMAINING_ENEMIES_BASE_POSITION_Y,
      "remaining_enemies_bar_green"
    );

    this.black_bar = game.add.sprite(
      REMAINING_ENEMIES_BASE_POSITION_X + this.bar.width,
      REMAINING_ENEMIES_BASE_POSITION_Y,
      "remaining_enemies_black_bar"
    );
    this.black_bar.anchor.set(1, 0);
    this.black_bar_original_width = this.black_bar.width;
    this.black_bar.width = 0;

    this.foreground = game.add.sprite(
      REMAINING_ENEMIES_BASE_POSITION_X - 8,
      REMAINING_ENEMIES_BASE_POSITION_Y - 10,
      "remaining_enemies_bg"
    );
    this.defenses_text = game.add.text(
      REMAINING_ENEMIES_BASE_POSITION_X + 170,
      REMAINING_ENEMIES_BASE_POSITION_Y + 15,
      "DEFENSES\nREMAINING",
      {
        font: "14px prstart",
        fill: WHITE_HEX_COLOR,
        align: "center",
        fontWeight: "bold"
      }
    );
    this.defenses_text.anchor.setTo(0.5, 0.5);
    this.defenses_text.align = "center";
  }

  enemy_died() {
    this.enemies_alive--;
    var percentage = this.enemies_alive / this.enemies_to_spawn;
    var new_width = this.black_bar_original_width * (1 - percentage);
    game.add
      .tween(this.black_bar)
      .to({ width: new_width }, 100, Phaser.Easing.Linear.None, true);
  }

  destroy() {
    this.bar.destroy();
    this.defenses_text.destroy();
    this.black_bar.destroy();
  }
}