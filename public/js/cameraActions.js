export const addZoomMainCamera = (self) => {
    const controlConfig = {
        camera: self.cameras.main,
        zoomIn: self.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
        zoomOut: self.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E),
    };

    self.controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);
}