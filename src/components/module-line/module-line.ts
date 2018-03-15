import { Component, Input } from '@angular/core';
import { Module } from '../../providers/modules/module';

@Component({
  selector: 'module-line',
  templateUrl: 'module-line.html'
})
export class ModuleLineComponent {

  @Input() module: Module;

  constructor() {
  }
}
