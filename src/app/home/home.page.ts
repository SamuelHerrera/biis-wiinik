import { Component, OnInit } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { NavController, MenuController, ModalController } from '@ionic/angular';
import { ObservablesService } from '../services/observables.service';
import { MainModalComponent } from './components/main-modal/main-modal.component';
import { OnTheRoadComponent } from './components/on-the-road/on-the-road.component';

declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  map: any;
  directionsService: any = null;
  directionsDisplay: any = null;
  bounds: any = null;
  myLatLng: any;
  waypoints: any[];

  constructor(public navCtrl: NavController,
    public geolocation: Geolocation,
    public modalController: ModalController,
    private observableService: ObservablesService) {

    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer();
    this.bounds = new google.maps.LatLngBounds();

    this.waypoints = [
      {
        location: { lat: 20.9920862, lng: -89.7200625 },
        stopover: true,
      },
      {
        location: { lat: 20.9920462, lng: -89.7200325 },
        stopover: true,
      }
    ];
  }

  ngOnInit(): void {
    // this.getPosition();
  }

  async openModal() {
    const data = {};
    const activeComponent: any = OnTheRoadComponent; // I need to determine wich component needs to be displayed;

    const modal = await this.modalController.create({
      component: MainModalComponent,
      mode: 'ios',
      keyboardClose: true,
      showBackdrop: true,
      animated: true,
      componentProps: { activeComponent: activeComponent, data: data }
    });
    return await modal.present();
  }



  getPosition(): any {
    this.geolocation.getCurrentPosition()
      .then(response => {
        this.loadMap(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  loadMap(position: Geoposition) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    // create a new map by passing HTMLElement
    const mapEle: HTMLElement = document.getElementById('map');

    // create LatLng object
    this.myLatLng = { lat: latitude, lng: longitude };

    // create map
    this.map = new google.maps.Map(mapEle, {
      center: this.myLatLng,
      zoom: 14,
      disableDefaultUI: true
    });

    this.directionsDisplay.setMap(this.map);

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      const marker = new google.maps.Marker({
        position: this.myLatLng,
        map: this.map,
        title: 'Mi posicion',
        animation: 'BOUNCE'
      });
      mapEle.classList.add('show-map');
      // this.calculateRoute();
    });
  }

  private calculateRoute() {

    this.bounds.extend(this.myLatLng);

    this.waypoints.forEach(waypoint => {
      const point = new google.maps.LatLng(waypoint.location.lat, waypoint.location.lng);
      this.bounds.extend(point);
    });

    this.map.fitBounds(this.bounds);

    this.directionsService.route({
      origin: new google.maps.LatLng(this.myLatLng.lat, this.myLatLng.lng),
      destination: new google.maps.LatLng(this.myLatLng.lat, this.myLatLng.lng),
      waypoints: this.waypoints,
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING,
      avoidTolls: true
    }, (response, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        console.log(response);
        this.directionsDisplay.setDirections(response);
      } else {
        alert('Could not display directions due to: ' + status);
      }
    });

  }
}
