import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToolbarModule } from 'primeng/toolbar';
import { AuthComponent } from './auth/auth.component';
import { LeafletMapComponent } from './leaflet-map/leaflet-map.component';
import { TableComponent } from './table/table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    ButtonModule,
    ToolbarModule,
    SplitButtonModule,
    DialogModule,
    AuthComponent,
    LeafletMapComponent,
    TableComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'trash-collection-monitoring';
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      { label: 'Admin' },
      { label: 'Manager' },
      { label: 'Director' },
    ];
  }
}
