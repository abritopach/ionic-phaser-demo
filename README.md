# IonicPhaserDemo

Sample project that shows how to integrate Phaser 3 (current version) in Ionic app.

Technologies: Ionic, Phaser, Phaser Component Library, TypeScript.

## Running

Before you go through this example, you should have at least a basic understanding of Ionic concepts. You must also already have Ionic installed on your machine.

* Test in localhost:

To run it, cd into `ionic-phaser-demo` and run:

```bash
npm install
ionic serve
```

## Steps when integrating Phaser in Ionic or Angular

### Create project

Create an Angular 8 Project using angular cli

```bash
    ng new angular-phaser-demo
```

Create an Ionic 4 Project using ionic cli

```bash
    ionic start ionic-phaser-demo blank
```

### Modify package.json

Add this below lines within script object.

```bash
    ...
    "phaser-typings": "curl -o src/phaser.d.ts https://raw.githubusercontent.com/photonstorm/phaser/master/types/phaser.d.ts",
    "postinstall": "npm run phaser-typings"
    ...
```

### Install dependencies

Install the dependency modules and add Phaser and Phaser Component Library.

```bash
    npm install
    npm install phaser
    npm install phaser-component-library
```

### Modify angular.json

Add phaser.js file in the script section.

```bash
    ...
    "scripts": [
        "node_modules/phaser/dist/phaser.js"
    ],
    ...
```

### Ad PhaserModule in the module in which you are going to use Phaser.

Example home.module.ts (Ionic APP)

```bash
    import { NgModule } from '@angular/core';
    import { CommonModule } from '@angular/common';
    import { IonicModule } from '@ionic/angular';
    import { FormsModule } from '@angular/forms';
    import { RouterModule } from '@angular/router';

    import { HomePage } from './home.page';

    import { PhaserModule } from 'phaser-component-library';

    @NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([
        {
            path: '',
            component: HomePage
        }
        ]),
        PhaserModule
    ],
    declarations: [HomePage]
    })
    export class HomePageModule {}
```

### Modify tsconfig.json

In your tsconfig.json file add "scripthost" in lib array otherwise ActiveXObject error will encounter.

```bash
    ...
    "lib": [
        "es2018",
        "dom",
        "scripthost"
    ]
    ...
```

### Create Game Service

Now generate a service to add a game scene. But make sure to game service extends Phaser.Scene.

Angular service

```bash
    ng generate service services/game
```

Ionic service

```bash
    ionic generate service services/game
```

```bash
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
    // TODO: Code
  }

  /**
   * Scene create handler.
  */
  public create(): void {
    console.log('GameService::Phaser create() | method called');
    // TODO: Code
  }

  /**
   * Scene update handler.
  */
  /*
  public update(): void {
    console.log('GameService::Phaser update() | method called');
    // TODO: Code
  }
  */
}
```

### Add Phaser Component in html page / component.

```bash
    <phaser-component [gameConfig]="gameConfig" (gameReady)="onGameReady($event)"></phaser-component>
```

### Initiate the game from your page.ts / component.ts

Example home.page.ts

```bash
    import { Component, OnInit } from '@angular/core';
    import { GameService } from '../services/game.service';

    @Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    })
    export class HomePage implements OnInit {

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
```

## Requirements

* [Node.js](http://nodejs.org/)
* [Ionic](https://ionicframework.com/getting-started#cli)
* [Phaser](https://phaser.io/)
* [Phaser Component Library](https://github.com/kidthales/phaser-component-library)
