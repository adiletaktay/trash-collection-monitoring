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
import { ROLES } from './roles';
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
  selectedItem: { label: string; value: string } = {
    label: 'User name',
    value: '',
  };

  ngOnInit() {
    this.items = [
      {
        label: 'Admin',
        command: () => this.changeRole({ label: 'Admin', value: ROLES.admin }),
      },
      {
        label: 'Manager',
        command: () =>
          this.changeRole({ label: 'Manager', value: ROLES.manager }),
      },
      {
        label: 'Director',
        command: () =>
          this.changeRole({ label: 'Director', value: ROLES.director }),
      },
    ];
  }

  changeRole(item: { label: string; value: string }) {
    this.selectedItem = item;
  }
}
