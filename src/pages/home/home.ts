import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModulesProvider } from '../../providers/modules/modules';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  constructor(public navCtrl: NavController, private modulesProvider: ModulesProvider) {
  }
}
