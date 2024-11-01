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
  }
}
