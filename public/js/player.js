export class Player extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y, texture, role, playerId, ws) {
        super(scene.matter.world, x, y, texture);

        scene.add.existing(this);
        this.setOrigin(0.5, 0.5);
        this.setFrictionAir(0.02);
        this.setFixedRotation()


        this.jumpForce = 12;
        this.moveSpeed = 4;
        this.isJumping = true;
        this.byDoor = false;
        this.jumpCooldown = this.jumpForce * 110;

        this.role = role;
        this.playerId = playerId;
        this.ws = ws;
    }

    jump() {
        if (this.isJumping) {
            this.setVelocityY(-this.jumpForce);
            this.isJumping = false;
        }
    }

    moveLeft() {
        this.setVelocityX(-this.moveSpeed);
    }

    moveRight() {
        this.setVelocityX(this.moveSpeed);
    }

}
