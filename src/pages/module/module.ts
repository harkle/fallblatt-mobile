import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ModulesProvider } from '../../providers/modules/modules';
import { Events } from 'ionic-angular';
import { Http, Headers, RequestOptions  } from '@angular/http';

@Component({
  selector: 'page-module',
  templateUrl: 'module.html'
})

export class ModulePage {
  constructor(public navCtrl: NavController, private modulesProvider: ModulesProvider, public events: Events, public http: Http) {
  }

  back() {
    this.events.publish('view:root');
  }

  setPosition() {
    this.modulesProvider.currentModule.socket.emit('move', {destination: this.modulesProvider.currentModule.status.position});
  }

  setMode() {
    if (this.modulesProvider.currentModule.status.mode == 'static') {
      this.modulesProvider.currentModule.socket.emit('random', {action: 'stop'});
    } else {
      this.modulesProvider.currentModule.socket.emit('random', {action: 'start'});
    }
  }
}
