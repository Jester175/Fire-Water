import { Player } from "./player.js";

function handleCurrentPlayers(self, data, players) {
    data.players.forEach(player => {
        if (!self.playerFirst) {
            addPlayer(self, player, self.ws, players);
        } else {
            addOtherPlayers(self, player, self.ws, players);
        }
    })
}

const addPlayer = (self, playerData, ws, listPlayers) => {
    const { role, playerId, x, y } = playerData;
    self.playerFirst = new Player(self, x, y, role, role, playerId, ws);
    listPlayers.push(self.playerFirst);
}

const addOtherPlayers = (self, playerData, ws, listPlayers) => {
    const { role, playerId, x, y } = playerData;
    self.playerSecond = new Player(self, x, y, role, role, playerId, ws);
    listPlayers.push(self.playerSecond);
}

const handleRemovePlayer = (playerId, listPlayers) => {
    listPlayers.forEach((player) => {
        if (player.playerId === playerId) {
            player.destroy();
        }
    });
    listPlayers = listPlayers.filter((player) => player.playerId !== playerId);
}

const handleMovePlayer = (playerId, action, listPlayers, x, y) => {
    const playerToMove = listPlayers.find((player) => player.playerId === playerId);
    if (playerToMove) {
        if (action === 'moveRight') {
            playerToMove.moveRight();
            playerToMove.x = x;
            if (playerToMove.role === 'water') playerToMove.play('waterRight', true);
            if (playerToMove.role === 'fire') playerToMove.play('fireRight', true);
        } else if (action === 'moveLeft') {
            playerToMove.moveLeft()
            playerToMove.x = x;
            if (playerToMove.role === 'water') playerToMove.play('waterLeft', true);
            if (playerToMove.role === 'fire') playerToMove.play('fireLeft', true);
        } else if (action === 'jump') {
            playerToMove.jump();
            playerToMove.y = y;
            if (playerToMove.role === 'water') playerToMove.play('waterJump', true);
            if (playerToMove.role === 'fire') playerToMove.play('fireJump', true);
        } else if (action === 'dead') {
            const playerToMove = listPlayers.find((player) => player.playerId === playerId);
            playerToMove.destroy();
        } else if (action === 'byDoor') {
            const playerByDoor = listPlayers.find((player) => player.playerId === playerId);
            playerByDoor.byDoor = true;
        }
        else {
            if (playerToMove.role === 'water') playerToMove.play('waterIdle', true);
            if (playerToMove.role === 'fire') playerToMove.play('fireIdle', true);
        }
    }
};

const handleSendPlayerAction = (player = null, ws, action) => {
    const message = {
        type: 'playerAction',
        action,
        x: player.x,
        y: player.y,
        playerId: player.playerId,
        role: player.role,
    };
    ws.send(JSON.stringify(message));
}

export { handleCurrentPlayers, handleRemovePlayer, handleMovePlayer, addOtherPlayers, handleSendPlayerAction }