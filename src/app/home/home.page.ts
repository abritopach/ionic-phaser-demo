import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  title = 'Angular 8 working with Phaser 3 JS';

  public readonly gameConfig = {
    title: 'Game Title',
    version: '1.0',
    type: Phaser.AUTO,
    width:  window.innerWidth,
    height: window.innerHeight
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
