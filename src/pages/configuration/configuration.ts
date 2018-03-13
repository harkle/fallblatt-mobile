import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NetworkInterface } from '@ionic-native/network-interface';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-configuration',
  templateUrl: 'configuration.html'
})
export class ConfigurationPage {
  ipAddress: string = "0.0.0.0";
  networkInterface: any;
  moduleList: any = [];
  statusText: string = "";

  constructor(public navCtrl: NavController, private networkInterface: NetworkInterface, public http: Http, private storage: Storage) {
    this.ipAddress = '192.168.0.1';
    this.networkInterface = this.networkInterface;
    this.storage  = storage;

    setTimeout(() => {
      this.getIP();
    }, 1000);

    this.storage.get('modules').then((val) => {
      this.moduleList = val;

      if (!this.moduleList) this.moduleList = [];
    });
  }

  getIP() {
		try {
			this.networkInterface.getWiFiIPAddress((ip) => {
				this._ngZone.run(() => {
					this.ipAddress = ip;
				});
			});
		} catch (e) {
			this.ipAddress = "error, check logs";
		}
	}

  seachModules() {
    let ipAddresses: Array<any> = [];
    let base: string = '192.168.0.';

    if (this.ipAddress != "0.0.0.0") {
      let part: any = this.ipAddress.split('.');
      base = part[0] + '.' + part[1] + '.' + part[2] + '.';
    }

    let port: string = ':3000';

    for (let i: number = 255; i > 0; i--) {
      ipAddresses.push(base + i + port);
    }

    let iterations = 0;
    this.statusText = 'Looking for modules... 0/255';

    let testInterval = setInterval(() => {
      var ipAddresse = ipAddresses.shift();

      this.http.get('http://' + ipAddresse + '/status').subscribe(data => {
        let config = JSON.parse((<any>data)._body);

        this.moduleList.push({ipAddress: ipAddresse, id: config.address});
        this.storage.set('modules', this.moduleList);
      });

      this.statusText = 'Looking for modules... ' + (++iterations) + '/255';

      if (ipAddresses.length == 0) {
        clearInterval(testInterval);
        this.statusText = '';
      }
    }, 100);
  }
}
