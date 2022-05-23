export default class Star extends Phaser.Physics.Arcade.Image{
    constructor(scene, x, y, texture, bounce){

        super(scene, x, y, texture);

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);
        this.setBounce(bounce);
        this.setX(x);
        this.setY(y)
    }
}