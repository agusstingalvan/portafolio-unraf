import Player from "../objects/Player.js";

export default class Nivel1 extends Phaser.Scene {
    constructor() {
        super("Nivel1");
        this.isGamerOver = false;
        console.log('Scene 1');
    }
    init(data) {
        console.log(data);
    }
    create() {
        const map = this.make.tilemap({key: 'map_nivel1'});
        const tiledBackgrounds = map.addTilesetImage("backgorunds", "tiledBackgrounds");
        const tiledPlataformas = map.addTilesetImage('objetos', 'tiledObjetos')
        const objectsLayer = map.getObjectLayer("Objetos");

        const cielo = map.createLayer('Cielo', tiledBackgrounds, 0, 0);
        const tierra = map.createLayer('Plataformas', tiledPlataformas, 0, 0);

        // worldLayer.setCollisionByProperty({ collides: true });
        tierra.setCollisionByProperty({collides: true});
        // console.log(tierra);

        // tiles marked as colliding
        /*
        const debugGraphics = this.add.graphics().setAlpha(0.75);
        worldLayer.renderDebug(debugGraphics, {
          tileColor: null, // Color of non-colliding tiles
          collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
          faceColor: new Phaser.Display.Color(40, 39, 37, 255), // Color of colliding face edges
        });
        */
    
        // Find in the Object Layer, the name "dude" and get position
        // const spawnPoint = map.findObject("Objetos", (obj) => obj.name === "dude");
        // // The player and its settings
        // player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "dude");
    
        // //  Player physics properties. Give the little guy a slight bounce.
        // player.setBounce(0.2);
        // player.setCollideWorldBounds(true);
        const spawnPoint = map.findObject("Objetos", (obj) => obj.name === "player")
        this.player = new Player(this, spawnPoint.x, spawnPoint.y, "player-run");
        this.anims.create({
            key: "run",
            frames: this.anims.generateFrameNumbers("player-run", {
                start: 0,
                end: 3,
            }),
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNumbers("player-idle", {
                start: 0,
                end: 3,
            }),
            frameRate: 4,
            repeat: -1,
        });
    
        //  Input Events
        if ((this.cursors = !undefined)) {
          this.cursors = this.input.keyboard.createCursorKeys();
        }
    
        // Create empty group of starts
        this.zanahorias = this.physics.add.group();
    
        // find object layer
        // if type is "stars", add to stars group
        objectsLayer.objects.forEach((objData) => {
          //console.log(objData.name, objData.type, objData.x, objData.y);
    
          const { x = 0, y = 0, name, type } = objData;
          switch (type) {
            case "zanahorias": {
              // add star to scene
              // console.log("estrella agregada: ", x, y);
              var zanahoria = this.zanahorias.create(x, y, "zanahoria");
              zanahoria.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
              break;
            }
          }
        });
        this.physics.add.collider(this.zanahorias, tierra);
        this.physics.add.collider(this.player, tierra);
        
    }
    update() {
        if (this.cursors.right.isDown) {
            this.player.anims.play("run", true);
            this.player.setVelocityX(100).setFlipX(false)
        } else if (this.cursors.left.isDown) {
            this.player.anims.play("run", true);
            this.player.setVelocityX(-100).setFlipX(true)
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play("idle", true);
        }

        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-260);
        }
    }
}
