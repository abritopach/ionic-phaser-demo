import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public readonly gameConfig = {
    title: 'Fit Running Game',
    version: '1.0',
    type: Phaser.AUTO,
    width:  800 /*window.innerWidth*/,
    height: 600 /*window.innerHeight*/,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    }
  };

  constructor(public mainScene: GameService) {
  }

  ngOnInit() {
    console.log('HomePage::ngOnInit() | method called');
  }

  onGameReady(game: Phaser.Game): void {
    game.scene.add('Scene', this.mainScene, true);
  }

}
