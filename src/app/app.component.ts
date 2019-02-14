import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Observable, Subscription } from 'rxjs';
import { ObservablesService } from './services/observables.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  public observables: Subscription[];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menu: MenuController,
    private observableService: ObservablesService
  ) {
    this.initializeApp();
    this.subscribeToEvents();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  private subscribeToEvents() {
    this.observables = [];
    this.observables.push(this.observableService.mainMenuOpenObservable$.subscribe(mainMenuOpen => {
      if (mainMenuOpen) {
        this.openMainMenu();
      }
    }));
  }

  private openMainMenu() {
    this.menu.enable(true, 'main-menu');
    this.menu.open('main-menu');
  }

}
