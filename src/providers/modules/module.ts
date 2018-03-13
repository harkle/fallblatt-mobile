import { Socket } from 'ng-socket-io';

export class ModuleSocket extends Socket {
  constructor(address: string) {
    console.log('ADDRESS', address);
    super({url: 'http://' + address, options: {} });
  }
}

export class Module {
  ipAddress: string;
  id: number;
  socket: ModuleSocket;
  status: object;

  constructor(data: any) {
    this.ipAddress = data.ipAddress;
    this.id = data.id;

    this.status = {
      address: 0,
      isReady: false,
      mode: 'static',
      network: false,
      position: 0,
      serial: false,
      type: ''
    };

    this.socket = new ModuleSocket(this.ipAddress);

      this.socket.emit('join', '');

      this.socket.on('status', (data) => {
        console.log(data);
        this.status = data;
      });

      this.socket.on('position', (data) => {
        console.log('a', data);
      });

      this.socket.on('mode', (data) => {
        console.log('a', data);
      });
  }
}
