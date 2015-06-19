(function () {

    function Shooter() {
        this.Container_constructor();
        this.movement = null;
    }
    var p = createjs.extend(Shooter, createjs.Container);

    p.init = function (x, y) {
        this.x = x;
        this.y = y;

        var spriteSheet = new createjs.SpriteSheet({
            framerate: 30,
            images: [loader.getResult("astronaut")],
            frames: {
                width: 53,
                height: 63,
                count: 7,
                regX: 0,
                regY: 0
            },
            animations: {
                run: {
                    frames: [0, 1, 2, 3, 4, 5, 6],
                    speed: .7
                },
                stop: [0]
            }
        });
        this.character = new createjs.Sprite(spriteSheet, "stop");
        this.character.set({
            x: -13
        });

        this.aim = new createjs.Shape;
        this.aim.graphics.beginLinearGradientFill(["#252729", "red"], [0, 1], 0, -550, 1, 500).drawRect(0, -500, 1, 500);
        this.addChild(this.character, this.aim);
    }

    p.move = function (x, y) {
        var s = this;
        var time = 5 * Math.sqrt((x - s.x) * (x - s.x) + (y - s.y) * (y - s.y));

        var move = this.movement || createjs.Tween.get(s, {
            override: true
        });

        s.character.gotoAndPlay("run");

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