import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { MainModalComponent } from './components/main-modal/main-modal.component';
import { OnTheRoadComponent } from './components/on-the-road/on-the-road.component';
import { IdleComponent } from './components/idle/idle.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage, MainModalComponent, OnTheRoadComponent, IdleComponent],
  entryComponents: [MainModalComponent, OnTheRoadComponent]
})
export class HomePageModule { }
