(function () {

    function Button(label, x, y) {
        this.Container_constructor();
        this.label = label;
        this.x = x;
        this.y = y;

        this.show();
    }
    var p = createjs.extend(Button, createjs.Container);

    p.show = function () {
        var text = new createjs.Text(this.label, "32px Verdana", "#EEE");
        text.textBaseline = "top";
        text.textAlign = "center";

        var width = text.getMeasuredWidth() + 50;
        var height = text.getMeasuredHeight() + 20;
        var x = 0 - width / 2; // this is relevant to this.x/this.y
        var y = 0 - height / 2;

        text.x = x + width / 2;
        text.y = y + 6;

        var background = new createjs.Shape();
        background.graphics.beginFill("#8bc558").drawRoundRect(x, y, width, height, 10);

        this.cursor = "pointer";
        this.mouseChildren = false;
        this.on("rollover", this.handleRollOver);
        this.on("rollout", this.handleRollOver);

        this.addChild(background, text);
    }

    p.handleRollOver = function (event) {
        this.alpha = event.type == "rollover" ? 0.4 : 1;
    };

    window.Button = createjs.promote(Button, "Container");
}());