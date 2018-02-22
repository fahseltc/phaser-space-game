var menu_state = {
    create: function() {
        var title_text = Utils.create_centered_text('Mega\nMecha\nMarxist\nII', 300, 100, "#FF0000");

        var space_to_begin_text = Utils.create_centered_text('Press Space to begin', 850, 35);

        var now_with_text = Utils.create_text('Now with a leaderboard!', 1100, 550, 20, "#FFD700");
        now_with_text.angle = -2;
        game.add.tween(now_with_text).to({ angle: 2 }, 5000, function(k) {
           return Math.sin(Math.PI * 2 * k);
         }, true, 0, -1);

        var start_button = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        start_button.onDown.addOnce(this.start, this);

        var leaderboard_button = game.input.keyboard.addKey(Phaser.Keyboard.L);
        leaderboard_button.onDown.addOnce(function(){ game.state.start('leaderboard') }, this);
    },

    start: function() {
        game.state.start('play');
    }
}