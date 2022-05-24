export default class MovablePlataform extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture ){
        super(scene, x, y, texture);
        console.log('Se crea la plataforma movible');
        console.log({scene, x, y, texture})
        this.scene = scene;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        
        this.body.moves = false;
        this.body.allowGravity = false;
        this.body.immovable = true;
    }
}