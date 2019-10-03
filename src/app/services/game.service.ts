import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService extends Phaser.Scene {

  anim;
  sprite;
  progress;
  frameView;

  constructor() { 
    super({ key: 'Scene' });
  }

  /**
   * Scene preload handler.
  */
  public preload(): void {
    console.log('GameService::Phaser preload() | method called');
    this.load.spritesheet('mummy', 'assets/mummy37x45.png', { frameWidth: 37, frameHeight: 45 });
  }

  /**
   * Scene create handler.
  */
  public create(): void {
    console.log('GameService::Phaser create() | method called');

    //  Frame debug view.
    this.frameView = this.add.graphics({ fillStyle: { color: 0xff00ff }, x: 32, y: 32 });

    //  Show the whole animation sheet.
    this.add.image(32, 32, 'mummy', '__BASE').setOrigin(0);

    const config = {
      key: 'walk',
      frames: this.anims.generateFrameNumbers('mummy', null),
      frameRate: 6,
      yoyo: true,
      repeat: -1
    };

    this.anim = this.anims.create(config);

    console.log(this.anim);

    this.sprite = this.add.sprite(200, 300, 'mummy').setScale(4);

    console.log(this.sprite);

    this.sprite.anims.load('walk');

    //  Debug text

    this.progress = this.add.text(100, 500, 'Progress: 0%', { color: '#00ff00' });

    this.input.keyboard.on('keydown_SPACE', (event) => {
        this.sprite.anims.play('walk');

    });

    this.input.keyboard.on('keydown_P', (event) => {

        if (this.sprite.anims.isPaused)
        {
            this.sprite.anims.resume();
        }
        else
        {
            this.sprite.anims.pause();
        }

    });

    this.input.keyboard.on('keydown_R', (event) => {

        this.sprite.anims.restart();

    });
  }

  updateFrameView() {
    this.frameView.clear();
    this.frameView.fillRect(this.sprite.frame.cutX, 0, 37, 45);
  }

  /**
   * Scene update handler.
  */
  public update(): void {
    console.log('GameService::Phaser update() | method called');

    this.updateFrameView();

    const debug = [
        'SPACE to start animation, P to pause/resume',
        'Progress: ' + this.sprite.anims.getProgress() + '%',
        'Accumulator: ' + this.sprite.anims.accumulator,
        'NextTick: ' + this.sprite.anims.nextTick
    ];

    this.progress.setText(debug);
  }
}