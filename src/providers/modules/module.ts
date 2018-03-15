import { Socket } from 'ng-socket-io';
import { Http } from '@angular/http';
import {StatusModel} from '../../models/status-model';

export class ModuleSocket extends Socket {
  constructor(address: string) {
    super({url: 'http://' + address, options: {}});
  }
}

export class Module {
  ipAddress: string;
  id: number;
  socket: ModuleSocket;
  status: StatusModel;
  http: Http;
  messages: Array<object> = [];

  constructor(data: any, http: Http) {
    this.http = http;
    this.ipAddress = data.ipAddress;
    this.id = data.id;

    this.status = new StatusModel({
      address: 0,
      isReady: false,
      mode: 'static',
      network: false,
      position: 0,
      serial: false,
      type: ''
    });

    this.http.get('http://' + this.ipAddress + '/list').subscribe(data => {
      let messages = JSON.parse((<any>data)._body);

      messages.forEach((message, index) => {
        if (message) {
          this.messages.push({index: index, message: message});
        }
      });
    });

    this.socket = new ModuleSocket(this.ipAddress);

    this.socket.emit('join', '');

    this.socket.on('status', (data) => {
      this.status = new StatusModel(data);
    });

    this.socket.on('position', (data) => {
      this.status.position = data.position;
    });

    this.socket.on('mode', (data) => {
      this.status.mode = data.mode;
    });
  }
}
