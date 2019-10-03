import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService extends Phaser.Scene {

  platforms;
  player;
  anims;
  cursors;
  scoreText;
  score = 0;

  constructor() {
    super({ key: 'Scene' });
  }

  /***
   * Scene preload handler.
  */
  public preload(): void {
    console.log('GameService::Phaser preload() | method called');
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
  }

  /***
   * Scene create handler.
  */
  public create(): void {
    console.log('GameService::Phaser create() | method called');

    // Add sky background.
    this.add.image(400, 300, 'sky');

    // Add platforms.
    this.platforms = this.physics.add.staticGroup();

    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    this.platforms.create(600, 400, 'ground');
    this.platforms.create(50, 250, 'ground');
    this.platforms.create(750, 220, 'ground');

    // Add player.
    this.player = this.physics.add.sprite(100, 450, 'dude');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    this.cursors = this.input.keyboard.createCursorKeys();

    const stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    stars.children.iterate((child) => {
        (child as any).setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(stars, this.platforms);

    this.physics.add.overlap(this.player, stars, (player, star) => this.collectStar(player, star), null, this);

  }

  /***
   * Scene update handler.
  */
  public update(): void {
    console.log('GameService::Phaser update() | method called');
    const cursors = this.cursors;
    const player = this.player;

    if (cursors.left.isDown) {
      player.setVelocityX(-160);
      player.anims.play('left', true);
    } else if (cursors.right.isDown) {
      player.setVelocityX(160);
      player.anims.play('right', true);
    } else {
        player.setVelocityX(0);
        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
    }
  }

  collectStar(player, star) {
      star.disableBody(true, true);
      this.score += 10;
      this.scoreText.setText('Score: ' + this.score);
  }
}
