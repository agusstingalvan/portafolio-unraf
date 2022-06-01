export default class Loading extends Phaser.Scene {
  constructor() {
    super("Loading");
    this.score = 0;
    this.timer = 60;
  }

  preload() {
    this.load.image(
      "BackgroundCielo",
      "./assets/images/Backgrounds/BackgroundCielo.png"
    );
    this.load.tilemapTiledJSON('map_nivel1', './assets/images/tilemaps/maps/nivel1.json');
    this.load.image('tiledBackgrounds', './assets/images/Atlas/backgorunds.png')
    this.load.image('tiledObjetos', './assets/images/Atlas/atlas.png')
    this.load.image('zanahoria', './assets/images/Items/ZanahoriaCoqueta.png')
    this.load.spritesheet("player-run", './assets/images/Player/RunSheet.png', {frameWidth: 64, frameHeight: 64})
    this.load.spritesheet("player-idle", './assets/images/Player/IdleSheet.png', {frameWidth: 64, frameHeight: 64})
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
    this.scene.start("Nivel1", { score: this.score, time: this.timer });
  }
}
