import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ConfigurationPage } from '../pages/configuration/configuration';
import { HomePage } from '../pages/home/home';
import { ModulePage } from '../pages/module/module';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpModule } from '@angular/http';
import { NetworkInterface } from '@ionic-native/network-interface';
import { IonicStorageModule } from '@ionic/storage';
import { ModulesProvider } from '../providers/modules/modules';
import { ModuleLineComponent } from '../components/module-line/module-line';

@NgModule({
  declarations: [
    MyApp,
    ConfigurationPage,
    HomePage,
    ModulePage,
    TabsPage,
    ModuleLineComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ConfigurationPage,
    HomePage,
    ModulePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NetworkInterface,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ModulesProvider
  ]
})
export class AppModule {}
