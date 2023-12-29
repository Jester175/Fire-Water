const handleTakeCoin = (coin) => {
    coin.destroy();
}

const handleCoinAction = (self, action) => {
    switch (action) {
        case 'fireCoin1':
            handleTakeCoin(self.fireCoin1)
            break;
        case 'waterCoin1':
            handleTakeCoin(self.waterCoin1)
            break;
        case 'fireCoin2':
            handleTakeCoin(self.fireCoin2)
            break;
        case 'waterCoin2':
            handleTakeCoin(self.waterCoin2)
            break;
        case 'fireCoin3':
            handleTakeCoin(self.fireCoin3)
            break;
        case 'waterCoin3':
            handleTakeCoin(self.waterCoin3)
            break;
    }
}

const handleSendCoinAction = (ws, action) => {
    const message = {
        type: 'CoinAction',
        action,
    };
    ws.send(JSON.stringify(message));
}

export { handleTakeCoin, handleSendCoinAction, handleCoinAction };