import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public readonly gameConfig = {
    title: 'Animation Data Example',
    version: '1.0',
    type: Phaser.AUTO,
    width:  window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '#7d7d7d'
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
