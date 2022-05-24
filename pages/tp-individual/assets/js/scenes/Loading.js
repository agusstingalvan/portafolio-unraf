export default class Loading extends Phaser.Scene {
    constructor() {
        super("Loading");
    }

    preload() {
        this.load.image(
            "BackgroundCielo",
            "./assets/images/Backgrounds/BackgroundCielo.png"
        );
        this.load.spritesheet(
            "player-run",
            "./assets/images/Player/RunSheet.png",
            { frameWidth: 64, frameHeight: 64 }
        );
        this.load.spritesheet(
            "player-idle",
            "./assets/images/Player/IdleSheet.png",
            { frameWidth: 64, frameHeight: 64 }
        );
        this.load.image("Plataforma", "./assets/images/Tiles.png");
        this.load.image(
            "PlataformaFull",
            "./assets/images/Tiles/Terreno-800x63.png"
        );
        this.load.image(
            "PlataformaMid",
            "./assets/images/Tiles/Plataforma-260x63.png"
        );
        this.load.image("star", "./assets/images/Items/star.png");
        this.load.image("bomb", "./assets/images/Items/bomb.png");
        this.load.image("gotaDeAgua", "./assets/images/Items/GotaDeAgua.png");
        this.load.image("zanahoria", "./assets/images/Items/Zanahoria.png");

        this.load.audio("music", "./assets/sounds/Music.mp3");
        this.load.audio("jumpSound", "./assets/sounds/Jump.mp3");
        this.load.audio("passLevel", "./assets/sounds/passLevel.mp3");
        this.load.audio("death", "./assets/sounds/death.mp3");
    }
    create() {
        this.add
            .text(
                this.sys.game.config.width / 2,
                this.sys.game.config.height / 2,
                "Cargando...",
                {
                    fontFamily: "Arial",
                    fontSize: "32px",
                    color: "white",
                    fontStyle: "bold",
                }
            )
            .setOrigin(0.5, 0.5);
            this.scene.start("Menu")
    }
}
