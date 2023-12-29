import { handleSendCoinAction, handleTakeCoin } from './coins.js';
import { handleButtonPress, handleMovePlatform, handleSendMechanismAction } from './mechanisms.js';
import { handleSendPlayerAction } from './playerActions.js';

const checkCollisions = (self, buttons, liquids, doors, listPlayers) => {
    if (liquids) liquids.forEach(liquid => checkCollisionLiquids(self, self.playerFirst, liquid));
    if (buttons) buttons.forEach(button => checkCollisionButton(self, self.playerFirst, button));
    if (doors) doors.forEach(door => checkCollisionDoors(self, self.playerFirst, door, listPlayers));

    handleMovePlatform(self, self.orgBtn, self.orgElev);
    handleMovePlatform(self, self.greenBtn, self.greenElev);
    handleMovePlatform(self, self.purpleBtn, self.purpleElev);
}

const checkCollisionButton = (self, player, button) => {
    if (player && button) {
        const rect1 = player.getBounds();
        const rect2 = button.getBounds();

        const isColliding = (
            rect1.top <= rect2.top &&
            rect1.right <= rect2.right &&
            rect1.bottom <= rect2.bottom &&
            Math.round(rect1.bottom / 100) == Math.round(rect2.top / 100) &&
            rect1.left >= rect2.left
        );

        const isPress = handleButtonPress(self, button, isColliding);
        if (isPress) {
            handleSendMechanismAction(self.ws, button.body.name);
        }
    }
};

const checkCollisionCoin = (self, event, player, coins) => {
    event.pairs.forEach(function (pair) {
        if (player && coins) {
            coins.forEach(coin => {
                if ((pair.bodyA === player.body && pair.bodyB === coin.body) || (pair.bodyA === coin.body && pair.bodyB === player.body)) {
                    handleTakeCoin(coin);
                    handleSendCoinAction(self.ws, coin.spriteName);
                }
            });
        }
    });
}

const checkPlayerOnGround = (event, players, platformsGroup) => {
    event.pairs.forEach(function (pair) {
        const bodyA = pair.bodyA;
        const bodyB = pair.bodyB;
        if (players && platformsGroup) {
            platformsGroup.getChildren().forEach(function (platform) {
                players.forEach(player => {
                    if ((bodyA === player.body && bodyB === platform.body) || (bodyA === platform.body && bodyB === player.body)) {
                        player.isJumping = true;
                    }
                })
            });
        }
    });
}

const checkCollisionLiquids = (self, player, liquid) => {
    if (player && liquid) {
        const rect1 = player.getBounds();
        const rect2 = liquid.getBounds();

        const isColliding = (
            rect1.top <= rect2.top &&
            rect1.right <= rect2.right &&
            rect1.bottom <= rect2.bottom &&
            rect1.bottom + 5 >= rect2.top &&
            rect1.left >= rect2.left
        );

        if (isColliding) {
            handleSendPlayerAction(player, self.ws, "dead");
            player.destroy();
            self.playerFirst = undefined;
        }
    }
}

const checkCollisionDoors = (self, player, door, listPlayers) => {
    if (player && door) {
        const rect1 = player.getBounds();
        const rect2 = door.getBounds();

        const isColliding = (
            rect1.top >= rect2.top &&
            rect1.right <= rect2.right &&
            rect1.bottom <= rect2.bottom &&
            rect1.left >= rect2.left
        );

        if (isColliding) {
            player.byDoor = true;
            handleSendPlayerAction(player, self.ws, "byDoor");
        }
    }
}


export { checkCollisions, checkCollisionCoin, checkPlayerOnGround }