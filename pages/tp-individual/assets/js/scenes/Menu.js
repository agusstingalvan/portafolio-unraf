export default class Menu extends Phaser.Scene {
    constructor() {
        super("Menu");
    }
    preload() {
        this.load.image(
            "MenuBackground",
            "./assets/images/Backgrounds/MenuBackground.png"
        );
    }
    create() {

        this.add.image(0, 0, "MenuBackground").setOrigin(0);
        this.add
            .text(
                this.sys.game.config.width / 2,
                this.sys.game.config.height / 2,
                "Rabanito Game",
                {
                    fontFamily: "Arial",
                    fontSize: "32px",
                    color: "white",
                    fontStyle: "bold",
                }
            )
            .setOrigin(0.5, 0.5);

        const buttonPlay = this.add
            .text(
                this.sys.game.config.width / 2,
                this.sys.game.config.height / 2 + 100,
                "Jugar",
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
        buttonPlay.on('pointerdown', ()=> this.scene.start('Game'));

    }
}
