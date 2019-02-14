import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-main-modal',
  templateUrl: './main-modal.component.html',
  styleUrls: ['./main-modal.component.scss']
})
export class MainModalComponent implements OnInit {

  @Input() activeComponent: Component;
  @Input() data: string;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  public closeModal() {
    this.modalCtrl.dismiss();
  }
}
