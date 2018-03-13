import { Injectable } from '@angular/core';
import { Module } from './module';
import { Storage } from '@ionic/storage';

@Injectable()
export class ModulesProvider {
  moduleList: Array<Module> = [];

  constructor(private storage: Storage) {
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

  registerModule(data: object) {
    let module = new Module(data);

    this.moduleList.push(module);
    this.save();
  }
}
