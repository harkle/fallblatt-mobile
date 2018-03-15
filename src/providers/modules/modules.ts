import { Injectable } from '@angular/core';
import { Module } from './module';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import { Http } from '@angular/http';

@Injectable()
export class ModulesProvider {
  moduleList: Array<Module> = [];
  currentModule: Module;

  constructor(private storage: Storage, public events: Events, public http: Http) {
    this.storage.get('modules').then((modules: Array<object>) => {
      modules.forEach((data: any, index: number) => {
        this.registerModule({ipAddress: data.ipAddress, id: data.id});
      });
    });
  }

  clear() {
    this.moduleList = [];
  }

  save() {
    let data: Array<object> = [];

    this.moduleList.forEach((element) => {
      data.push({ipAddress: element.ipAddress, id: element.id});
    });

    this.storage.set('modules', data);
  }

  select(module: Module) {
    this.currentModule = module;

    this.events.publish('view:module');
  }

  registerModule(data: object) {
    let module = new Module(data, this.http);

    this.moduleList.push(module);
    this.save();
  }
}
