var stage, w, h, loader;
var astronaut;

function init() {
    stage = new createjs.Stage("demoCanvas");

    w = stage.canvas.width;
    h = stage.canvas.height;

    var manifest = [{
        src: "./assets/explosion.png",
        id: "explosion"
    }, {
        src: "./assets/rocket.png",
        id: "rocket"
    }, {
        src: "./assets/astronaut.png",
        id: "astronaut"
    }, "shooter.js", "astronaut.js", "rocket.js", "beep.js", "button.js"];

    loader = new createjs.LoadQueue(false);
    loader.addEventListener("complete", handleComplete);
    loader.loadManifest(manifest, true, "./");

    document.getElementById("demoCanvas").addEventListener("contextmenu", function (e) {
        e.preventDefault();
        return false;
    });
}

function handleComplete() {
    var button = new Button("START GAME", w / 2, 200);

    button.on("click", function (e) {
        stage.removeChild(button);

        astronaut = new Astronaut(e.rawX, e.rawY);

        stage.addChild(astronaut);

        addStageEventHandlers();
    });

    stage.addChild(button);

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", tick);
}

function tick(event) {
    stage.update();
}

function addStageEventHandlers() {
    stage.on("stagemousedown", function (e) {
        if (e.nativeEvent.button == 2) {

            stage.addChild(new Beep(e.rawX, e.rawY));
            astronaut.move(e.rawX, e.rawY);
        } else if (e.nativeEvent.button == 0) {
            stage.addChild(astronaut.shoot(e.rawX, e.rawY));
        }
    });

    stage.on("stagemousemove", function (e, astro) {
        var c = Math.atan2(e.rawY - astro.y, e.rawX - astro.x);
        c *= 180 / Math.PI;
        astro.rotation = 90 + c;
    }, null, false, astronaut);
}