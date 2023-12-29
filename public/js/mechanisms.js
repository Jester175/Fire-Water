const handleButtonPress = (self, button, isColliding) => {
    if (isColliding && !button.isPressed) {
        button.isPressed = true;

        self.tweens.add({
            targets: button,
            y: button.y + 25,
            duration: 700,
            ease: 'Linear',
        });

        return true;
    }
    return false;
};

const handleMovePlatform = (self, button, platform) => {
    if (button.isPressed && !platform.isMoving) {
        self.tweens.add({
            targets: platform,
            x: platform.body.name == 'purpleElev' ? platform.x - 70 : platform.x + 70,
            duration: 700,
            ease: 'Linear',
            onComplete: () => {
                platform.isMoving = true;
            },
        });
    }
};

const handleMechanismAction = (self, action) => {
    if (action === 'orgBtn') {
        if (self.orgBtn.isPressed !== true) handleButtonPress(self, self.orgBtn, true);
    }
    if (action === 'greenBtn') {
        if (self.greenBtn.isPressed !== true) handleButtonPress(self, self.greenBtn, true);
    }
    if (action === 'purpleBtn') {
        if (self.purpleBtn.isPressed !== true) handleButtonPress(self, self.purpleBtn, true);
    }
}

const handleSendMechanismAction = (ws, action) => {
    const message = {
        type: 'MechanismAction',
        action,
    };
    ws.send(JSON.stringify(message));
}

export { handleButtonPress, handleMovePlatform, handleSendMechanismAction, handleMechanismAction }