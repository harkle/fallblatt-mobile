import { Component } from '@angular/core';

import { ConfigurationPage } from '../configuration/configuration';
import { HomePage } from '../home/home';
import { ModulePage } from '../module/module';

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
