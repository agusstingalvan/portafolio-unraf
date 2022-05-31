import Menu from "./scenes/Menu.js";
// import Game from "./scenes/Nivel1.js";
import Win from "./scenes/Win.js";
import Loading from "./scenes/Loading.js";
import Nivel1 from "./scenes/Nivel1.js";
// import GameOver from "./scenes/GameOver.js";

export const config = {
    type: Phaser.AUTO,
    width: 832,
    height: 640,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 250 },
            debug: false,
        },
    },
    scene: [ Menu, Loading, Nivel1, Win],
};
