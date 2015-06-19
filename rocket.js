(function () {

    function Rocket(fromX, fromY, toX, toY) {
        this.Container_constructor();
        this.movement = null;

        this.start(fromX, fromY);
        this.travel(toX, toY);
    }
    var p = createjs.extend(Rocket, createjs.Container);

    p.start = function (x, y) {
        this.x = x;
        this.y = y;

        var spriteSheet = new createjs.SpriteSheet({
            framerate: 30,
            images: [loader.getResult("rocket")],
            frames: {
                width: 26,
                height: 49,
                count: 4,
                regX: 0,
                regY: 0
            },
            animations: {
                fly: {
                    frames: [0, 1, 2, 3]
                }
            }
        });
        this.projectile = new createjs.Sprite(spriteSheet, "fly");
        this.projectile.set({
            x: -13
        });

        this.addChild(this.projectile);
    }

    p.travel = function (x, y) {
        var p = this;
        var move = this.movement || createjs.Tween.get(p);

        var c = Math.atan2(y - p.y, x - p.x);
        c *= 180 / Math.PI;
        p.rotation = 90 + c;

        var time = Math.sqrt((x - p.x) * (x - p.x) + (y - p.y) * (y - p.y));

        move.to({
            x: x,
            y: y
        }, time).call(function () {
            p.arrive();
        })
    }

    p.arrive = function () {
        var r = this;
        this.removeChild(this.projectile);
        var spriteSheet = new createjs.SpriteSheet({
            images: [loader.getResult("explosion")],
            frames: {
                width: 128,
                height: 128,
                count: 40,
                regX: 0,
                regX: 0
            },
            animations: {
                explode: {
                    frames: [0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40]
                }
            }
        });
        var explosion = new createjs.Sprite(spriteSheet, "explode");
        explosion.set({
            x: -64,
            y: -64
        });
        explosion.on("animationend", function () {
            r.removeChild(explosion);
        });
        this.addChild(explosion)
    }

    window.Rocket = createjs.promote(Rocket, "Container");
}());