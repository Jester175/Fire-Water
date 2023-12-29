const createLevel = (self, WIDTH, HEIGHT) => {
    const background = self.add.image(0, 0, 'background');
    background.setOrigin(0, 0);
    background.displayWidth = WIDTH;
    background.displayHeight = HEIGHT;
    createBorderScene(self, WIDTH, HEIGHT);
    createStages(self, WIDTH, HEIGHT);
}

const createBorderScene = (self, WIDTH, HEIGHT) => {
    createSprite({ self: self, x: WIDTH / 2, y: 25, texture: 'floor', spriteName: 'ceiling', isStatic: true, setFriction: 0, trigger: false });
    createSprite({ self: self, x: WIDTH - 25, y: HEIGHT / 2, texture: 'wall', spriteName: 'wallRight', isStatic: true, setFriction: 0, trigger: false });
    createSprite({ self: self, x: WIDTH / 2, y: HEIGHT - 25, texture: 'floor', spriteName: 'floor', isStatic: true, setDepth: 2 });
    createSprite({ self: self, x: 25, y: HEIGHT / 2, texture: 'wall', spriteName: 'wallLeft', isStatic: true, setFriction: 0, trigger: false });
}

const createStages = (self, WIDTH, HEIGHT) => {
    spawnPlatforms(self, WIDTH, HEIGHT);
    spawnPlants(self, WIDTH, HEIGHT)
    spawnMechanisms(self, WIDTH, HEIGHT);
    spawnLiquids(self, WIDTH, HEIGHT);
    spawnDoors(self, WIDTH, HEIGHT);
    spawnCoins(self, WIDTH, HEIGHT);
}

const spawnLiquids = (self, WIDTH, HEIGHT) => {
    //Lava
    createSprite({ self: self, x: WIDTH - 245, y: HEIGHT - 40, texture: 'lava', spriteName: 'lava', isStatic: true, setDepth: 3, setScaleX: 2, setScaleY: 1 });

    //Lake
    createSprite({ self: self, x: 245, y: HEIGHT - 40, texture: 'lake', spriteName: 'lake', isStatic: true, setDepth: 3, setScaleX: 2, setScaleY: 1 });

    //Poison
    createSprite({ self: self, x: WIDTH / 2 - 120, y: HEIGHT - 40, texture: 'poison', spriteName: 'poison1', isStatic: true, setDepth: 3 });
    createSprite({ self: self, x: WIDTH / 2 + 120, y: HEIGHT - 40, texture: 'poison', spriteName: 'poison2', isStatic: true, setDepth: 3 });
}

const spawnPlants = (self, WIDTH, HEIGHT) => {
    //TENTACLES
    createImage({ self: self, x: WIDTH / 2 + 250, y: HEIGHT - 60, texture: 'grass1', setDepth: 4 })
    createImage({ self: self, x: WIDTH / 2 - 230, y: HEIGHT - 60, texture: 'grass1', setDepth: 4 })
    createImage({ self: self, x: 570, y: HEIGHT - 298 * 2 - 350, texture: 'grass1', setDepth: 4 })
    createImage({ self: self, x: WIDTH - 590, y: HEIGHT - 298 * 2 - 350, texture: 'grass1', setDepth: 4 })


    //CLOVER
    createImage({ self: self, x: 770, y: HEIGHT - 50, texture: 'grass2', setDepth: 4 })
    createImage({ self: self, x: 1500, y: HEIGHT - 50, texture: 'grass2', setDepth: 4, setAngle: 205 })
    createImage({ self: self, x: 500, y: HEIGHT / 2 - 68, texture: 'grass2', setDepth: 4 })
    createImage({ self: self, x: 575, y: HEIGHT / 2 - 68, texture: 'grass2', setDepth: 4 })


    //GRASS
    createImage({ self: self, x: 730, y: HEIGHT - 298 * 2 - 341, texture: 'grass3', setDepth: 4 })
    createImage({ self: self, x: WIDTH - 790, y: HEIGHT - 50 - 310 * 2, texture: 'grass3', setDepth: 4, flipX: true })
    createImage({ self: self, x: WIDTH - 775, y: HEIGHT - 50 - 310 * 2 - 267.5, texture: 'grass3', setDepth: 4, flipX: true })
    createImage({ self: self, x: WIDTH - 480, y: HEIGHT - 50 - 310 * 2, texture: 'grass3', setDepth: 4, flipX: true })
    createImage({ self: self, x: 820, y: HEIGHT - 373, texture: 'grass3', setDepth: 4, flipX: true })
    createImage({ self: self, x: WIDTH / 2 + 15, y: HEIGHT - 190, texture: 'grass3', setDepth: 4, flipX: true })

    //LEAFS
    createImage({ self: self, x: WIDTH / 2 + 435, y: HEIGHT - 100, texture: 'grass4', setDepth: 4 })
    createImage({ self: self, x: WIDTH / 2 + 470, y: HEIGHT - 348, texture: 'grass4', setDepth: 4, setAngle: 135 });
    createImage({ self: self, x: WIDTH / 2 + 470, y: HEIGHT - 348 * 2 - 100, texture: 'grass4', setDepth: 4, setAngle: 180 });
    createImage({ self: self, x: WIDTH / 2 - 20, y: HEIGHT - 448 * 2, texture: 'grass4', setDepth: 4, setAngle: 45 });
    createImage({ self: self, x: WIDTH / 2 - 20, y: HEIGHT - 550, texture: 'grass4', setDepth: 4 });

    //MOXS
    createImage({ self: self, x: 954, y: HEIGHT - 50 - 298 * 2, texture: 'grass5', setDepth: 4, setScaleX: 1.6, setScaleY: 1.6, flipX: true });
    createImage({ self: self, x: WIDTH - 954, y: HEIGHT - 50 - 298, texture: 'grass5', setDepth: 4, setScaleX: 1.6, setScaleY: 1.6 });
    createImage({ self: self, x: WIDTH - 954, y: HEIGHT - 50 - 298 * 2, texture: 'grass5', setDepth: 4, setScaleX: 1.6, setScaleY: 1.6 });
    createImage({ self: self, x: WIDTH - 954, y: HEIGHT - 50 - 298 * 2 - 267.5, texture: 'grass5', setDepth: 4, setScaleX: 1.6, setScaleY: 1.6 });

    //TREES
    createImage({ self: self, x: 750, y: HEIGHT / 2 + 100, texture: 'grass6', setDepth: 4, setScaleX: 1.3, setScaleY: 1.3 });
}

const spawnMechanisms = (self, WIDTH, HEIGHT) => {
    //BUTTONS
    const orgBtnVerts = [
        { x: 28, y: 22 },
        { x: 70, y: 22 },
        { x: 90, y: 48 },
        { x: 8, y: 48 }
    ]
    createCustomSprite({ self: self, x: 850, y: HEIGHT - 88 - 298, texture: 'orgBtn', spriteName: 'orgBtn', type: 'btn', verts: orgBtnVerts })

    const purpleBtnVerts = [
        { x: 28, y: 22 },
        { x: 70, y: 22 },
        { x: 90, y: 48 },
        { x: 8, y: 48 }
    ]
    createCustomSprite({ self: self, x: WIDTH - 850, y: HEIGHT - 88 - 298 * 2, texture: 'purpleBtn', spriteName: 'purpleBtn', type: 'btn', verts: purpleBtnVerts })

    const greenBtnVerts = [
        { x: 28, y: 22 },
        { x: 70, y: 22 },
        { x: 90, y: 48 },
        { x: 8, y: 48 }
    ]
    createCustomSprite({ self: self, x: 800, y: HEIGHT - 88 - 298 * 2 - 267.5, texture: 'greenBtn', spriteName: 'greenBtn', type: 'btn', verts: greenBtnVerts })

    //ELEVATORS
    createSprite({ self: self, x: WIDTH / 2 - 70, y: 992, texture: 'orgElev', spriteName: 'orgElev', isStatic: true, setFriction: 0.01 });
    createSprite({ self: self, x: WIDTH / 2 + 70, y: 714, texture: 'purpleElev', spriteName: 'purpleElev', isStatic: true, setFriction: 0.01 });
    createSprite({ self: self, x: WIDTH / 2 - 70, y: 434, texture: 'greenElev', spriteName: 'greenElev', isStatic: true, setFriction: 0.01 });

    //BOX
    createSprite({ self: self, x: WIDTH / 2 - 300, y: HEIGHT - 100, texture: 'stoneBlock', spriteName: 'stoneBlock1', isStatic: false });
    createSprite({ self: self, x: WIDTH / 2 + 300, y: HEIGHT - 100, texture: 'stoneBlock', spriteName: 'stoneBlock2', isStatic: false });
}

const spawnDoors = (self, WIDTH, HEIGHT) => {
    createSprite({ self: self, x: 590, y: HEIGHT - 130 - 298 * 2, texture: 'doorFire', spriteName: 'doorFire', isSensor: true, isStatic: true, trigger: false })
    createSprite({ self: self, x: WIDTH - 590, y: HEIGHT - 130 - 298 * 2, texture: 'doorWater', spriteName: 'doorWater', isSensor: true, isStatic: true, trigger: false })
}

const spawnPlatforms = (self, WIDTH, HEIGHT) => {
    createSprite({ self: self, x: 750, y: HEIGHT - 490, texture: 'column', spriteName: 'columnLeft', isStatic: true, setFriction: 0, setDepth: 4, trigger: false });
    createSprite({ self: self, x: WIDTH - 750, y: HEIGHT - 490, texture: 'column', spriteName: 'columnRight', isStatic: true, setFriction: 0, trigger: false });
    createSprite({ self: self, x: WIDTH / 2, y: HEIGHT / 2, texture: 'columnElev', spriteName: 'columnMiddle', isStatic: true, setFriction: 0, trigger: false });


    const semiPlatformLeft1Verts = [
        { x: 60, y: 0 },
        { x: 75, y: 0 },
        { x: 120, y: 48 },
        { x: 60, y: 48 }
    ]
    createCustomSprite({ self: self, x: 875, y: HEIGHT - 50 - 298, texture: 'platformRightCorner', type: 'platform', spriteName: 'semiPlatformLeft1', setDepth: 3, verts: semiPlatformLeft1Verts })

    const semiPlatformLeft2Verts = [
        { x: 60, y: 0 },
        { x: 75, y: 0 },
        { x: 120, y: 48 },
        { x: 60, y: 48 }
    ];
    createCustomSprite({ self: self, x: 875, y: HEIGHT - 50 - 298 * 2, texture: 'platformRightCorner', type: 'platform', spriteName: 'semiPlatformLeft2', setDepth: 3, verts: semiPlatformLeft2Verts })

    const semiPlatformLeft3Verts = [
        { x: 60, y: 0 },
        { x: 75, y: 0 },
        { x: 120, y: 48 },
        { x: 60, y: 48 }
    ];
    createCustomSprite({ self: self, x: 875, y: HEIGHT - 50 - 298 * 2 - 267.5, texture: 'platformRightCorner', type: 'platform', spriteName: 'semiPlatformLeft3', setDepth: 3, verts: semiPlatformLeft3Verts })

    const semiPlatformLeft4Verts = [
        { x: 20, y: 0 },
        { x: 120, y: 0 },
        { x: 120, y: 48 },
        { x: 60, y: 48 }
    ];
    createCustomSprite({ self: self, x: 625, y: HEIGHT - 50 - 298 * 2 - 267.5, texture: 'platformLeftCorner', type: 'platform', spriteName: 'semiPlatformLeft3', setDepth: 3, verts: semiPlatformLeft4Verts })

    const semiPlatformRight1Verts = [
        { x: 20, y: 0 },
        { x: 120, y: 0 },
        { x: 120, y: 48 },
        { x: 60, y: 48 }
    ];
    createCustomSprite({ self: self, x: WIDTH - 875, y: HEIGHT - 50 - 298, texture: 'platformLeftCorner', type: 'platform', spriteName: 'semiPlatformRight1', setDepth: 3, verts: semiPlatformRight1Verts })

    const semiPlatformRight2Verts = [
        { x: 20, y: 0 },
        { x: 120, y: 0 },
        { x: 120, y: 48 },
        { x: 60, y: 48 }
    ];
    createCustomSprite({ self: self, x: WIDTH - 875, y: HEIGHT - 50 - 298 * 2, texture: 'platformLeftCorner', type: 'platform', spriteName: 'semiPlatformRight2', setDepth: 3, verts: semiPlatformRight2Verts })

    const semiPlatformRight3Verts = [
        { x: 20, y: 0 },
        { x: 120, y: 0 },
        { x: 120, y: 48 },
        { x: 60, y: 48 }
    ];
    createCustomSprite({ self: self, x: WIDTH - 875, y: HEIGHT - 50 - 298 * 2 - 267.5, texture: 'platformLeftCorner', type: 'platform', spriteName: 'semiPlatformRight3', setDepth: 3, verts: semiPlatformRight3Verts })

    const semiPlatformRight4Verts = [
        { x: 60, y: 0 },
        { x: 75, y: 0 },
        { x: 120, y: 48 },
        { x: 60, y: 48 }
    ];
    createCustomSprite({ self: self, x: WIDTH - 625, y: HEIGHT - 50 - 298 * 2 - 267.5, texture: 'platformRightCorner', type: 'platform', spriteName: 'semiPlatformRight3', setDepth: 3, verts: semiPlatformRight4Verts })

    createSprite({ self: self, x: WIDTH - 590, y: HEIGHT - 50 - 298 * 2, texture: 'platform', spriteName: 'platformRight', isStatic: true, setDepth: 3 });
    createSprite({ self: self, x: 590, y: HEIGHT - 50 - 298 * 2, texture: 'platform', spriteName: 'platformLeft', isStatic: true, setDepth: 3 });
}

const spawnCoins = (self, WIDTH, HEIGHT) => {
    createSprite({ self: self, x: WIDTH / 2 - 100, y: HEIGHT - 88 - 298, texture: 'fireCoin', spriteName: 'fireCoin1', isSensor: true, isStatic: true, trigger: false });
    createSprite({ self: self, x: WIDTH / 2 - 320, y: HEIGHT / 2 - 200, texture: 'fireCoin', spriteName: 'fireCoin2', isSensor: true, isStatic: true, trigger: false });
    createSprite({ self: self, x: WIDTH / 2 - 500, y: 150, texture: 'fireCoin', spriteName: 'fireCoin3', isSensor: true, isStatic: true, trigger: false });

    createSprite({ self: self, x: WIDTH / 2 + 100, y: HEIGHT - 88 - 298, texture: 'waterCoin', spriteName: 'waterCoin1', isSensor: true, isStatic: true, trigger: false });
    createSprite({ self: self, x: WIDTH / 2 + 320, y: HEIGHT / 2 - 200, texture: 'waterCoin', spriteName: 'waterCoin2', isSensor: true, isStatic: true, trigger: false });
    createSprite({ self: self, x: WIDTH / 2 + 500, y: 150, texture: 'waterCoin', spriteName: 'waterCoin3', isSensor: true, isStatic: true, trigger: false });
}

const createSprite = ({ self, x, y, texture, spriteName, isStatic, isSensor, setFriction, setDepth, setScaleX, setScaleY, trigger = true }) => {
    const sprite = self.matter.add.sprite(x, y, texture, null, { isStatic: isStatic });
    sprite.body.name = spriteName;

    if (isSensor) {
        sprite.body.isSensor = true;
        sprite.spriteName = spriteName;
    }

    if (setFriction !== undefined) {
        sprite.setFriction(setFriction);
    }

    if (setScaleX !== undefined && setScaleY !== undefined) {
        sprite.setScale(setScaleX, setScaleY);
    }

    if (setDepth !== undefined) {
        sprite.setDepth(setDepth);
    }

    if (trigger) {
        self.objectsByJump.push(sprite);
    }

    self[spriteName] = sprite;
}

const createCustomSprite = ({ self, x, y, texture, spriteName, verts, type, setDepth }) => {
    const sprite = self.matter.add.sprite(x, y, texture, null, { isStatic: true });
    sprite.body.name = spriteName;

    if (setDepth !== undefined) {
        sprite.setDepth(setDepth);
    }

    switch (type) {
        case 'btn':
            sprite.setBody({
                type: 'fromVerts',
                verts: [
                    { x: sprite.x + verts[0].x, y: sprite.y + verts[0].y },
                    { x: sprite.x + verts[1].x, y: sprite.y + verts[1].y },
                    { x: sprite.x + verts[2].x, y: sprite.y + verts[2].y },
                    { x: sprite.x + verts[3].x, y: sprite.y + verts[3].y }
                ],
            });
            self[spriteName] = sprite;
            break;
        case 'platform':
            sprite.setBody({
                type: 'fromVerts',
                verts: [
                    { x: sprite.x - verts[0].x, y: sprite.y },
                    { x: sprite.x + verts[1].x, y: sprite.y },
                    { x: sprite.x + verts[2].x, y: sprite.y + verts[2].y },
                    { x: sprite.x - verts[3].x, y: sprite.y + verts[3].y }
                ],
            });
            break;
    }

    self.objectsByJump.push(sprite);
}

const createImage = ({ self, x, y, texture, setFriction, setDepth, setScaleX, setScaleY, flipX, setAngle }) => {
    const image = self.add.image(x, y, texture, null, { isStatic: true });

    if (setDepth !== undefined) {
        image.setDepth(setDepth);
    }

    if (setFriction !== undefined) {
        image.setFriction(setFriction);
    }

    if (setAngle !== undefined) {
        image.setAngle(setAngle);
    }

    if (setScaleX !== undefined && setScaleY !== undefined) {
        image.setScale(setScaleX, setScaleY);
    }

    if (flipX) {
        image.flipX = flipX;
    }
}

export { createLevel }