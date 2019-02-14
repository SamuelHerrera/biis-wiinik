import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class ObservablesService {

  constructor() { }

  private mainMenuOpen = false;
  private mainMenuOpenSource = new BehaviorSubject<any>(this.mainMenuOpen);
  public mainMenuOpenObservable$ = this.mainMenuOpenSource.asObservable();

  public announceStoreUpdate(data) {
    this.mainMenuOpen = data;
    this.mainMenuOpenSource.next(data);
  }

}
