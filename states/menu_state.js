var menu_state = {
  create: function() {
    //var title_text = Utils.create_centered_text('Mega\nMecha\nMarxist\nII', 300, 100, "#FF0000");
    var title_text = Utils.create_centered_text('Mega', 100, 100, "#FF0000");
    var title_text_old_x = title_text.x;
    title_text.x = 0;
    game.add.tween(title_text).to({ x: title_text_old_x}, 300, "Linear", true);

    var title_text1 = Utils.create_centered_text('Mecha', 210, 100, "#FF0000");
    var title_text1_old_x = title_text1.x;
    title_text1.x = game.world.width;
    game.add.tween(title_text1).to({ x: title_text1_old_x}, 300, "Linear", true);

    var title_text2 = Utils.create_centered_text('Marxist', 320, 100, "#FF0000");
    var title_text2_old = title_text2.x;
    title_text2.x = 0;
    game.add.tween(title_text2).to({ x: title_text2_old}, 300, "Linear", true);

    var title_text3 = Utils.create_centered_text('II', 430, 100, "#FF0000");
    var title_text3_old = title_text3.y;
    title_text3.y = 0;
    game.add.tween(title_text3).to({ y: title_text3_old}, 300, Phaser.Easing.Exponential.In, true);


    var space_to_begin_text = Utils.create_centered_text('Press Space to begin', 850, 35);

    var now_with_text = Utils.create_text('Now with\nTimed Levels!!', 1100, 550, 20, "#FFD700");
    var now_with_text2 = Utils.create_text('and if ur good enough it crashes!', 1100, 600, 10, "#FFD700");
    now_with_text.angle = -2;
    game.add.tween(now_with_text).to({ angle: 2 }, 5000, function(k) {
       return Math.sin(Math.PI * 2 * k);
     }, true, 0, -1);

    game.add.tween(now_with_text2).to({ angle: 2 }, 5000, function(k) {
       return Math.sin(Math.PI * 2 * k);
     }, true, 0, -1);

    var start_button = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    start_button.onDown.addOnce(this.start, this);
    //game.input.activePointer.leftButton.onDown.addOnce(this.start, this);

    var leaderboard_button = game.input.keyboard.addKey(Phaser.Keyboard.L);
    leaderboard_button.onDown.addOnce(function(){ game.state.start('leaderboard') }, this);

    // sounds
    this.music1 = sound_manager.add('music1');
    this.music2 = sound_manager.add('music2');
    this.music2.loop = true;
    this.music3 = sound_manager.add('music3');
    this.music4 = sound_manager.add('music4');

    this.music1.onStop.addOnce(function() { this.music2.play(); }, this);
    //this.music3.onStop.addOnce(function() { this.music4.play(); game.state.start('play'); }, this);
    this.music1.play();

    var no_icon = game.add.sprite(100, 700, 'no');
    no_icon.scale.x = 0.3;
    no_icon.scale.y = 0.3;
    no_icon.anchor.set(0.5, 0.5);
    no_icon.visible = false;

    var sound_icon = game.add.sprite(100, 700, 'sound_white');
    sound_icon.scale.x = 0.2;
    sound_icon.scale.y = 0.2;
    sound_icon.anchor.set(0.5, 0.5);
    sound_icon.inputEnabled = true;
    if(conf.env == 'dev') { game.sound.mute = true; }
    sound_icon.events.onInputDown.add(function() {
      if(game.sound.mute == true) {
        console.log('unmuting');
        game.sound.mute = false;
        sound_manager.stopAll();
        no_icon.visible = false;
        this.music2.play();
      } else {
        console.log('muting');
        game.sound.mute = true;
        no_icon.visible = true;
        sound_manager.stopAll();
      }
    }, this);
  },

  start: function() {
    // todo fix music for ready state
    this.music1.stop();
    this.music2.stop();
    this.music4.play();
    game.state.start('ready');
  }
}