import { Component } from '@angular/core';

import { ConfigurationPage } from '../configuration/configuration';
import { ModulePage } from '../module/module';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ConfigurationPage;
  tab3Root = ModulePage;

  constructor() {

  }
}
