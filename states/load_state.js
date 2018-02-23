var load_state = {

  preload: function() {

    //HACK TO PRELOAD A CUSTOM FONT
    var loadingLabel = game.add.text(80, 150, 'loading...', {font:"1px prstart", fill:"#FFFFFF"});
    console.log('load');

    game.time.advancedTiming = true;
    game.load.image('mecha', 'assets/mecha1.png');
    game.load.image('bullet', 'assets/bullets.png');
    game.load.image('flame', 'assets/flame.png');
    game.load.image('red', 'assets/red.png');
    game.load.image('blue', 'assets/blue.png');
    game.load.image('button', 'assets/button.png');
    game.load.image('circle', 'assets/circle.png');
    game.load.image('spinner', 'assets/spinner.png');
    game.load.image('x', 'assets/x.png');
    game.load.image('enemy_bullet', 'assets/enemy_bullet.png');

  },
  create: function() {
    game.state.start('menu');
    //game.state.start('leaderboard');
    //game.state.start('post');
    //game.state.start('play');
  }
};