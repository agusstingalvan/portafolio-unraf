import { config } from "../config.js";
import MovablePlataform from "../objects/MovablePlataform.js";
import Player from "../objects/Player.js";

export default class Game extends Phaser.Scene {
    constructor() {
        super("Game");
        this.score = 0;
        this.isGamerOver = false;
        this.canWin = false;
        this.tiempo = 30;
    }
    init() {
        
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
        this.plataformaMovible = new MovablePlataform(
            this,
            350,
            200,
            "PlataformaMid"
        )
            .setScale(0.5)
            .refreshBody();
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
        this.player.play("idle", true);

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
        this.textTime = this.add.text(20, 20, `Tiempo: ${this.tiempo}`, {
            font: "18px Arial",
            padding: 5,
        });
        this.timer = this.time.addEvent({
            delay: 1000,
            //El callback hell jajaj..
            callback: () => {
                if (!this.isGamerOver) {
                    this.tiempo -= 1;
                    this.textTime.setText(`Tiempo: ${this.tiempo}`);
                    if (this.tiempo === 0) {
                        this.gameOver(this.player);
                    }
                }
            },
            callbackScope: this,
            loop: true,
        });

        this.initSounds();

        this.cursors = this.input.keyboard.createCursorKeys();
        this.KeySHIFT = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SHIFT
        );
        this.KeyR = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.R
        );
    }
    update() {
        if (this.isGamerOver) {
            if (this.KeyR.isDown) {
                this.tiempo = 30;
                this.scene.restart();
                this.isGamerOver = false;
            }
            return;
        }
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
            this.jumpSoundSFX.play();
        }
        if (this.stars.countActive(true) === 0 && this.canWin) {
            this.passLevelSFX.play();
            this.zanahoria.enableBody(true, 100, 140, true, true);
        }
    }
    collectStar(player, star) {
        star.disableBody(true, true);
        this.score += 5;
        this.scoreText.setText(`Puntos: ${this.score}`);
        // if (this.stars.countActive(true) === 0) {
        //     this.passLevelSFX.play();
        //     this.zanahoria.enableBody(true, 100, 140, true, true);
        // }
    }
    collectGotaDeAgua(player, gotaDeAgua) {
        gotaDeAgua.disableBody(true, true);
        this.score += 15;
        this.scoreText.setText(`Puntos: ${this.score}`);
        gotaDeAgua.setX(Phaser.Math.FloatBetween(100, 700));
        //Cada vez que el jugador junta todas las gotas de agua, spawea 5 gotas más en el eje x=0.
        //Ademas, va creando siemrpe más bombas, y teletrasporta al jugador al suelo debajo de todo, reseteando el tiempo de la escena.
        if (this.gotasDeAgua.countActive(true) === 0) {
            this.gotasDeAgua.children.iterate((gota) => {
                gota.enableBody(true, gota.x, 0, true, true);
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
        if (this.bombs.countActive(true) >= 3) this.canWin = true;
    }
    win() {
        this.scene.start("Win");
        this.sound.removeByKey("music");
    }
    hitBomb(player, bomb) {
        bomb.setTint(0xff0000);
        this.gameOver(player);
    }
    gameOver(player) {
        this.physics.pause();
        player.setTint(0xff0000);
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
        this.sound.removeByKey("music");
        this.deathSFX.play();
        this.isGamerOver = true;
    }
    initSounds(volume = 0.3) {
        this.sound.volume = volume;
        this.sound.add("music", { loop: true, volume: 0.2 }).play();
        this.jumpSoundSFX = this.sound.add("jumpSound");
        this.passLevelSFX = this.sound.add("passLevel");
        this.deathSFX = this.sound.add("death");
    }
}
