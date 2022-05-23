import Menu from "./scenes/Menu.js";
import Game from "./scenes/Game.js";
import Win from "./scenes/Win.js";
import GameOver from "./scenes/GameOver.js";

export const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 250 },
            debug: false
        }
    },
    scene: [Menu, Game, Win, GameOver]
}