(function () {

    function Beep(x, y) {
        this.Container_constructor();

        this.x = x;
        this.y = y;

        this.show();
    }
    var p = createjs.extend(Beep, createjs.Container);

    p.show = function () {
        var target = new createjs.Shape();

        target.scaleX = .2;
        target.scaleY = .2;
        target.graphics.setStrokeStyle(5).beginStroke("red").drawCircle(0, 0, 25);

        createjs.Tween.get(target).to({
            scaleX: 1,
            scaleY: 1,
            alpha: 0
        }, 1000);

        this.addChild(target);
    }

    window.Beep = createjs.promote(Beep, "Container");
}());