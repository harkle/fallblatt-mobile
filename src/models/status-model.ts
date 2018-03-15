export class StatusModel {
  address: number;
  isReady: boolean;
  mode: string;
  network: boolean;
  position: number;
  serial: boolean;
  type: string;

  constructor(data: object) {
    this.address = 0;
    this.isReady = (<any>data).isReady;
    this.mode = (<any>data).mode;
    this.network = (<any>data).network;
    this.position = (<any>data).position;
    this.serial = (<any>data).serial;
    this.type = (<any>data).type;
  }
}
