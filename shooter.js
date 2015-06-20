(function () {

    function Shooter(x, y) {
        this.Container_constructor();

        this.movement = null;
        this.x = x;
        this.y = y;
    }
    var p = createjs.extend(Shooter, createjs.Container);

    p.move = function (x, y) {
        var s = this;
        s.character.gotoAndPlay("run");

        var time = 5 * Math.sqrt((x - s.x) * (x - s.x) + (y - s.y) * (y - s.y));

        var move = this.movement || createjs.Tween.get(s, {
            override: true
        });
        move.to({
            x: x,
            y: y
        }, time).call(function () {
            s.character.gotoAndPlay("stop");
        });
    }

    p.shoot = function (x, y) {
        var r = new Rocket(this.x, this.y, x, y);
        return r;
    }

    window.Shooter = createjs.promote(Shooter, "Container");
}());