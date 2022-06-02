import { config } from "../config.js";

export default class GameOver extends Phaser.Scene {
    constructor() {
        super("GameOver");
    }

    create() {
        this.add
            .text(config.width / 2, config.height / 2, "Game Over!", {
                font: "32px Arial",
            })
            .setOrigin(0.5, 0.5);

        const buttonPlay = this.add
            .text(
                this.sys.game.config.width / 2,
                this.sys.game.config.height / 2 + 100,
                "Jugar de nuevo",
                {
                    fontFamily: "Arial",
                    fontSize: "32px",
                    color: "white",
                    fontStyle: "bold",
                    backgroundColor: "white",
                    color: "black",
                    padding: 10,
                }
            )
            .setOrigin(0.5, 0.5);

        buttonPlay.setInteractive();
        buttonPlay.on("pointerdown", () => this.scene.start("Game"));
    }
}
