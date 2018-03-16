class BossLevel {
  constructor(level_data, level_manager) {
    this.level_data = level_data;
    console.log(this.level_data);
    this.level_manager = level_manager;
    this.controls = new Controls(game);
    this.player = new PlayerShip(game.width / 2, game.height / 2, this.controls);
    this.UI = new RootUI(this.player, this.level_data, this.level_data.LEVEL_NUMBER);

    console.log('Starting BOSS level!')

    game.world.bringToTop(this.player.sprite);
    console.log('level duration: ' + this.level_data.DURATION * Phaser.Timer.SECOND)

    //this.powerup = new Powerup(this.player);
    //this.powerup_manager = new PowerupManager(this.player);
    this.destroyed = false;
    this.boss = new BossEnemy(this.player, this.level_data.TURRETS, this);
  }

  update() {
    // Check if players weapons overlap the boss
    // if(this.player.circle_weapon.active) {
    //   game.physics.arcade.overlap(this.player.circle_weapon.sprite,  this.boss.sprite, this.handle_collision_blue, null, this);
    // }

    // var outermost_shield = this.boss.shield_stack.pop();
    // game.physics.arcade.overlap(this.player.bullet_weapon.bullets, outermost_shield.sprite, this.handle_collision_red, null, this);
    // this.boss.shield_stack.push(outermost_shield);



    // var visible_bullets = this.enemy_manager.all_bullets.getAll('alive', true);
    // game.physics.arcade.overlap(this.player.sprite, visible_bullets, this.handle_player_hit, null, this);
    if(!this.destroyed) {
      this.controls.update();
      this.player.update();
      this.boss.update();
      this.UI.update();
    }
    //this.powerup_manager.update();

    // if(this.enemy_manager.are_all_enemies_dead()) {
    //   console.log('all enemies defeated');
    //   this.level_manager.change_level(this.level_data.INDEX + 1);
    // }
  }

  render() {
    if(!this.destroyed) {
      this.player.render();
      this.boss.render();
      this.UI.render();
      game.debug.text(game.time.fps, 1, 12, '#FFFFFF');
    }
  }

  end_game() {
    last_score = this.UI.score.score + this.UI.score.score_buffer;
    game.state.start('post');
  }

  boss_died() {
    last_score = this.UI.score.score + this.UI.score.score_buffer;
    console.log('u beat it!');
    this.destroyed = true;
    this.destroy();
    game.state.start('boss_dead')
  }

  destroy() {
    this.destroyed = true;
    this.player.destroy();
    this.boss.destroy();
    //this.enemy_manager.destroy();
    this.UI.destroy();
  }
}