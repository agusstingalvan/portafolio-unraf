import { config } from "../config.js";
import Player from "../objects/Player.js";

export default class Game extends Phaser.Scene {
    constructor() {
        super("Game");
        this.score = 0;
        this.gamerOver = false;
    }
    init() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.KeySHIFT = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SHIFT
        );
        this.KeyR = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.R
        );
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
        this.add.image(0, 0, "BackgroundCielo").setOrigin(0);
        // this.add.tileSprite(0, 600, 0, 1200, 'terreno');

        //Player
        this.player = new Player(this, 0, 450, "player-run");
        this.player.setCollideWorldBounds(true);
        this.player.setBounce(0.5);

        //Plataformas
        this.plataforms = this.physics.add.staticGroup();
        this.plataforms
            .create(0, 537, "PlataformaFull")
            .setOrigin(0, 0)
            .refreshBody();

        this.plataforms
            .create(550, 450, "PlataformaMid")
            .setScale(0.5)
            .refreshBody();
        this.plataforms
            .create(350, 325, "PlataformaMid")
            .setScale(0.5)
            .refreshBody();
        this.plataforms
            .create(600, 275, "PlataformaMid")
            .setScale(0.5)
            .refreshBody();
        this.plataforms
            .create(100, 200, "PlataformaMid")
            .setScale(0.5)
            .refreshBody();
        this.zanahoria = this.physics.add.image(100, 140, "zanahoria");
        this.zanahoria.disableBody(true, true);
        //Plataforma Movible
        this.plataformaMovible = this.physics.add
            .image(350, 200, "PlataformaMid")
            .setScale(0.5)
            .refreshBody();

        this.plataformaMovible.body.moves = false;
        this.plataformaMovible.body.allowGravity = false;
        this.plataformaMovible.body.immovable = true;
        //Animacion de la plataforma movible
        this.tweens.add({
            targets: this.plataformaMovible,
            x: 250,
            duration: 1500,
            ease: "Sine.easeInOut",
            repeat: -1,
            yoyo: true,
        });

        //Animaciones de los diferentes estados del player
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

        this.stars = this.physics.add.group({
            key: "star",
            repeat: 5,
            setXY: { x: 200, y: 0, stepX: 70 },
        });

        this.stars.children.iterate((star) => {
            star.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            star.setCollideWorldBounds(true);
        });

        this.gotasDeAgua = this.physics.add.group({
            key: "gotaDeAgua",
            repeat: 4,
        });

        this.gotasDeAgua.children.iterate((aguita) => {
            aguita.setX(Phaser.Math.Between(100, 700));
            aguita.setY(Phaser.Math.Between(0, 500));
            aguita.setTint(0xff00ff);
            aguita.setBounce(Phaser.Math.FloatBetween(0.4, 0.8), 0.6);
            aguita.setCollideWorldBounds(true);
            // aguita.setVelocity(Phaser.Math.Between(-200, 200), 20);
            aguita.setScale(0.4);
        });

        this.bombs = this.physics.add.group();

        this.scoreText = this.add
            .text(780, 10, "Total: 0", {
                font: "18px Arial",
                backgroundColor: "#0f3f30",
                padding: 5,
            })
            .setOrigin(1, 0);
        this.player.play("idle", true);

        //Colisiones
        this.physics.add.collider(this.player, this.plataforms);
        this.physics.add.collider(this.player, this.plataformaMovible);
        this.physics.add.collider(this.zanahoria, this.plataforms);
        this.physics.add.collider(this.stars, this.plataforms);
        this.physics.add.collider(this.stars, this.plataformaMovible);
        this.physics.add.collider(this.gotasDeAgua, this.plataforms);
        this.physics.add.collider(this.gotasDeAgua, this.plataformaMovible);
        this.physics.add.collider(this.bombs, this.plataforms);
        this.physics.add.collider(this.bombs, this.plataformaMovible);

        //Overlaps
        this.physics.add.overlap(
            this.player,
            this.gotasDeAgua,
            this.collectGotaDeAgua,
            null,
            this
        );
        this.physics.add.overlap(
            this.player,
            this.stars,
            this.collectStar,
            null,
            this
        );
        this.physics.add.overlap(
            this.player,
            this.zanahoria,
            this.win,
            null,
            this
        );
        this.physics.add.overlap(
            this.player,
            this.bombs,
            this.hitBomb,
            null,
            this
        );
        this.sound.add("music", { loop: true, volume: 0.01 }).play();

        this.tiempo = 30;
        this.textTime = this.add.text(20, 20, `Tiempo: ${this.tiempo}`,{
            font: "18px Arial",
            padding: 5,
        } );
        this.timer = this.time.addEvent({
            delay: 1000,
            //El callback hell jajaj..
            callback: () => {
                if (!this.gamerOver) {
                    this.tiempo -= 1;
                    this.textTime.setText(`Tiempo: ${this.tiempo}`);
                    if (this.tiempo === 0) {
                        this.physics.pause();
                        this.musicGameOver();
                        this.player.setTint(0xff0000);
                        this.add
                            .text(
                                config.width / 2,
                                config.height / 2,
                                "Game Over!",
                                {
                                    font: "32px Arial",
                                }
                            )
                            .setOrigin(0.5, 0.5)
                            .setTint(0xff0000);
                        this.add
                            .text(
                                this.sys.game.config.width / 2,
                                this.sys.game.config.height / 2 + 100,
                                'Presiona "R" para reiniciar!',
                                {
                                    fontFamily: "Arial",
                                    fontSize: "18px",
                                    color: "white",
                                    backgroundColor: "#0f3f30",
                                    color: "white",
                                    padding: 10,
                                }
                            )
                            .setOrigin(0.5, 0.5);
                        // this.scene.restart()
                        this.gamerOver = true;
                    }
                }
            },
            callbackScope: this,
            loop: true,
        });
    }
    update() {
        if (this.gamerOver) {
            if (this.KeyR.isDown) {
                this.scene.restart();
                this.gamerOver = false;
            }
            return;
        } else {
            if (this.cursors.right.isDown) {
                this.player.anims.play("run", true);
                this.KeySHIFT.isDown
                    ? this.player.setVelocityX(260).setFlipX(false)
                    : this.player.setVelocityX(100).setFlipX(false);
            } else if (this.cursors.left.isDown) {
                this.player.anims.play("run", true);

                this.KeySHIFT.isDown
                    ? this.player.setVelocityX(-260).setFlipX(true)
                    : this.player.setVelocityX(-100).setFlipX(true);
            } else {
                this.player.setVelocityX(0);
                this.player.anims.play("idle", true);
            }

            if (this.cursors.up.isDown && this.player.body.touching.down) {
                this.player.setVelocityY(-260);
                this.sound.add("jumpSound", { volume: 0.1 }).play();
            }
        }
    }
    collectStar(player, star) {
        star.disableBody(true, true);
        this.score += 5;
        this.scoreText.setText(`Puntos: ${this.score}`);
        //Corregir la logica aka
        if (this.stars.countActive(true) === 0) {
            this.sound.add("passLevel", { volume: 0.15 }).play();
            this.zanahoria.enableBody(true, 100, 140, true, true);
        }
    }
    collectGotaDeAgua(player, gotaDeAgua) {
        gotaDeAgua.disableBody(true, true);
        this.score += 15;
        this.scoreText.setText(`Puntos: ${this.score}`);
        gotaDeAgua.setX(Phaser.Math.FloatBetween(100, 700));
        if (this.gotasDeAgua.countActive(true) === 0) {
            this.gotasDeAgua.children.iterate((agota) => {
                agota.enableBody(true, agota.x, 0, true, true);
            });
            this.bombs.createMultiple({ key: "bomb", repeat: 1 });
            this.bombs.children.iterate((bomb) => {
                bomb.setBounce(1);
                bomb.setCollideWorldBounds(true);
                bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
                bomb.setX(Phaser.Math.FloatBetween(100, 700));
                bomb.allowGravity = false;
            });
            player.setY(450);
            player.setX(Phaser.Math.FloatBetween(100, 700));
            this.tiempo = 30;
        }
    }
    win() {
        this.scene.start("Win");
    }
    hitBomb(player, bomb) {
        this.physics.pause();
        this.musicGameOver();
        player.setTint(0xff0000);
        bomb.setTint(0xff0000);
        this.add
            .text(config.width / 2, config.height / 2, "Game Over!", {
                font: "32px Arial",
            })
            .setOrigin(0.5, 0.5)
            .setTint(0xff0000);
        this.add
            .text(
                this.sys.game.config.width / 2,
                this.sys.game.config.height / 2 + 100,
                'Presiona "R" para reiniciar!',
                {
                    fontFamily: "Arial",
                    fontSize: "18px",
                    color: "white",
                    backgroundColor: "#0f3f30",
                    color: "white",
                    padding: 10,
                }
            )
            .setOrigin(0.5, 0.5);
        // this.scene.restart()
        this.gamerOver = true;
        // setTimeout(() => {
        //     this.scene.start("GameOver");
        // }, 3000);
    }
    musicGameOver() {
        this.sound.removeByKey("music");
        this.sound.add("death", { volume: 0.1 }).play();
    }
}
