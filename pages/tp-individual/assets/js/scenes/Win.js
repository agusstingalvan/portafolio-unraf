export default class Win extends Phaser.Scene{
    constructor(){
        super("Win");
    }
    preload(){
        this.load.image(
            "BackgroundCielo",
            "./assets/images/Backgrounds/BackgroundCielo.png"
        )
    }
    create(){
        this.add.image(0, 0, "BackgroundCielo").setOrigin(0);
        this.add.text(400, 300, 'Ganaste!', {font: '32px Arial', color: 'white'}).setOrigin(0.5);

        setTimeout(()=>{
            this.scene.start("Menu");
        }, 4000)
    }
}