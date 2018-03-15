import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { Events } from 'ionic-angular';
import { ModulePage } from '../pages/module/module';
import {App} from "ionic-angular";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(public app: App, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public events: Events) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.events.subscribe('view:root', () => {
      this.app.getRootNav().setRoot(TabsPage);
    });

    this.events.subscribe('view:module', () => {
      this.app.getRootNav().setRoot(ModulePage);
    });
  }
}
