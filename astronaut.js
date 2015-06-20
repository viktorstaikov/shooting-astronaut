(function () {

    function Astronaut(x, y) {
        this.Shooter_constructor(x, y);
        this.show();
    }
    var p = createjs.extend(Astronaut, Shooter);

    p.show = function () {
        var spriteSheet = new createjs.SpriteSheet({
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

    window.Astronaut = createjs.promote(Astronaut, "Shooter");
}());