import { Component, NgZone} from '@angular/core';
import { NavController } from 'ionic-angular';
import { NetworkInterface } from '@ionic-native/network-interface';
import { Http } from '@angular/http';
import { ModulesProvider } from '../../providers/modules/modules';

@Component({
  selector: 'page-configuration',
  templateUrl: 'configuration.html'
})
export class ConfigurationPage {
  ipAddress: string = "0.0.0.0";
  moduleList: any = [];
  statusText: string = "";
  netI: any;
  isScanning: boolean = false;

  constructor(public navCtrl: NavController, public networkInterface: NetworkInterface, private _ngZone: NgZone, public http: Http, private modulesProvider: ModulesProvider) {
    this.ipAddress = '192.168.0.1';
    this.netI = networkInterface;

    setTimeout(() => {
      this.getIP();
    }, 1000);
  }

  getIP() {
		try {
			this.netI.getWiFiIPAddress((ip) => {
				this._ngZone.run(() => {
					this.ipAddress = ip;
				});
			});
		} catch (e) {
			this.ipAddress = "error, check logs";
		}
	}

  seachModules() {
    this.isScanning = true;
    let ipAddresses: Array<any> = [];
    let base: string = '192.168.0.';

    if (this.ipAddress != "0.0.0.0") {
      let part: any = this.ipAddress.split('.');
      base = part[0] + '.' + part[1] + '.' + part[2] + '.';
    }

    let port: string = ':3000';

    for (let i: number = 0; i < 256; i++) {
      ipAddresses.push(base + i + port);
    }

    let iterations = 0;
    this.statusText = 'Looking for modules... 0/255';
    this.modulesProvider.clear();

    let testInterval = setInterval(() => {
      var ipAddresse = ipAddresses.shift();

      this.http.get('http://' + ipAddresse + '/status').subscribe(data => {
        let config = JSON.parse((<any>data)._body);

        this.modulesProvider.registerModule({ipAddress: ipAddresse, id: config.address});
      });

      this.statusText = 'Looking for modules... ' + (++iterations) + '/255';

      if (ipAddresses.length == 0) {
        clearInterval(testInterval);
        this.statusText = (this.modulesProvider.moduleList.length > 0) ? '' : 'No module found';
        this.isScanning = false;
      }
    }, 100);
  }
}
