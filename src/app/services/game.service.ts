import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService extends Phaser.Scene {

  constructor() { 
    super({ key: 'Scene' });
  }

  /**
   * Scene preload handler.
  */
  public preload(): void {
    console.log('GameService::Phaser preload() | method called');
    this.load.spritesheet('mummy', 'assets/metalslug_mummy37x45.png', { frameWidth: 37, frameHeight: 45 });
  }

  /**
   * Scene create handler.
  */
  public create(): void {
    console.log('GameService::Phaser create() | method called');
    // this.cameras.main.startFollow(this.add.text(0, 0, 'Hello there! I am Phaser working with Angular 8').setOrigin(0.5), false);

    const mummyAnimation = this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('mummy', null),
      frameRate: 16,
      repeat: 0
    });

    const sprite = this.add.sprite(50, 300, 'mummy').setScale(4);

    sprite.play('walk');

    sprite.anims.setRepeat(7);

    this.tweens.add({
      targets: sprite,
      x: 750,
      duration: 8800,
      ease: 'Linear'
    });
  }

  /**
   * Scene update handler.
  */
  /*
  public update(): void {
    console.log('GameService::Phaser update() | method called');
  }
  */
}