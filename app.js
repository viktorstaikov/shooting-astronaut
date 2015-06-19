var stage, w, h, loader;
var sky, explosion, rocket, astronaut;

function init() {
    stage = new createjs.Stage("demoCanvas");

    w = stage.canvas.width;
    h = stage.canvas.height;

    manifest = [{
        src: "explosion.png",
        id: "explosion"
    }, {
        src: "rocket.png",
        id: "rocket"
    }, {
        src: "astronaut.png",
        id: "astronaut"
    }];

    loader = new createjs.LoadQueue(false);
    loader.addEventListener("complete", handleComplete);
    loader.loadManifest(manifest, true, "./assets/");
}

function handleComplete() {

    astronaut = new Shooter();
    astronaut.init(h / 2, w / 2);
    stage.addChild(astronaut);


    document.body.addEventListener("oncontextmenu", function (e) {
        e.stopPropagation();
        return !1;
    });

    stage.on("stagemousedown", function (e) {
        if (e.nativeEvent.button == 2) {
            astronaut.move(e.rawX, e.rawY);
        } else if (e.nativeEvent.button == 0) {
            astronaut.shoot(e.rawX, e.rawY);
        }
    });

    stage.on("stagemousemove", function (e, astro) {
        var c = Math.atan2(e.rawY - astro.y, e.rawX - astro.x);
        c *= 180 / Math.PI;
        astro.rotation = 90 + c;
    }, null, !1, astronaut);

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", tick);

}

function tick(event) {
    // var deltaS = event.delta / 1000;
    // stage.update(event);
    stage.update();
}