import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-leaflet-map',
  standalone: true,
  imports: [],
  templateUrl: './leaflet-map.component.html',
  styleUrl: './leaflet-map.component.scss',
})
export class LeafletMapComponent implements OnInit {
  map: any;

  ngOnInit(): void {
    this.configMap();
  }

  configMap() {
    this.map = L.map('map', {
      center: [51.169392, 71.449074],
      zoom: 12,
    });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
    const marker = L.marker([51.128258, 71.430524], {
      draggable: true,
      autoPan: true,
    }).addTo(this.map);
    marker.bindPopup('<b>Baiterek!</b>').openPopup();
    this.map.on('click', (e: L.LeafletMouseEvent) => {
      L.marker([e.latlng.lat, e.latlng.lng], {
        draggable: true,
        autoPan: true,
      })
        .bindPopup('New marker here!')
        .addTo(this.map);
    });
  }
}
