import { Component, OnInit, Input, ViewChild, ViewContainerRef, ComponentFactoryResolver, Type } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProcessComponent } from '../../../utilities/process';

@Component({
  selector: 'app-main-modal',
  templateUrl: './main-modal.component.html',
  styleUrls: ['./main-modal.component.scss']
})
export class MainModalComponent implements OnInit {

  @Input() activeComponent: Type<any>;
  @Input() data: string;
  @ViewChild('processContainer', { read: ViewContainerRef }) container;

  constructor(private modalCtrl: ModalController, private resolver: ComponentFactoryResolver) { }

  ngOnInit() {
    const factory = this.resolver.resolveComponentFactory(this.activeComponent);
    const componentRef = this.container.createComponent(factory);
    (<ProcessComponent>componentRef.instance).data = this.data;
  }

  public closeModal() {
    this.modalCtrl.dismiss();
  }
}
