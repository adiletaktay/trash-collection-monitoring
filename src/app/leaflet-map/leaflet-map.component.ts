import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import * as L from 'leaflet';
import data from '../../assets/data/db.json';

@Component({
  selector: 'app-leaflet-map',
  standalone: true,
  imports: [],
  templateUrl: './leaflet-map.component.html',
  styleUrl: './leaflet-map.component.scss',
})
export class LeafletMapComponent implements OnInit, OnChanges {
  map: any;
  popupOpened: boolean | undefined;
  data: any = data;
  selectedRole: string = '';
  public myIcon = L.icon({
    iconUrl:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=',
    iconSize: [24, 36],
    popupAnchor: [-1, -12],
  });

  @Input()
  set role(value: string) {
    this.selectedRole = value;
  }

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngOnInit(): void {
    this.configMap();
    this.markerFromData();
    this.addMarkerOnMap();
    this.popupOpenHandler();
  }

  addMarkerOnMap(): void {
    this.map.on('click', (e: L.LeafletMouseEvent) => {
      if (this.popupOpened) {
        return;
      }

      if (this.selectedRole !== 'admin') {
        return;
      }

      const id = new Date().getTime();
      const marker: L.Marker = new L.Marker([e.latlng.lat, e.latlng.lng], {
        icon: this.myIcon,
        draggable: true,
        autoPan: true,
      });

      marker.bindPopup(this.popupHtml(id), {
        closeButton: false,
        closeOnClick: false,
        autoClose: false,
      });

      (marker as any).customId = id;
      marker.addTo(this.map);
    });
  }

  private popupHtml(
    id: number,
    isCleaned: boolean = false,
    comment: string = ''
  ): string {
    return `
      <div class="form-container">
        <h2>Marker Form</h2>
        <form>
          <input type="checkbox" id="checkbox-${id}" ${
      isCleaned ? 'checked' : ''
    } value="yes" />
          <label for="checkbox-${id}">There is no trash</label><br />
          <div class="form-group" style="margin-bottom: 10px">
            <textarea id="${id}">${comment}</textarea>
          </div>
          <div class="form-buttons" style="display: flex; flex-direction: row; justify-content: space-between; border-radius: 4px;">
            <button type="button" id="submitButton-${id}">Submit</button>
            <button type="button" id="cancelButton-${id}">Cancel</button>
          </div>
        </form>
      </div>`;
  }

  private markerFromData(): void {
    data.forEach((data: any) => {
      const jsonMarker: any = L.marker([data.lat, data.lng], {
        icon: this.myIcon,
        draggable: true,
        autoPan: true,
      }).addTo(this.map);

      jsonMarker.bindPopup(
        this.popupHtml(data.id, data.isCleaned, data.comment),
        {
          closeButton: false,
          closeOnClick: false,
          autoClose: false,
        }
      );
      (jsonMarker as any).customId = data.id;
    });
  }

  private popupOpenHandler(): void {
    this.map.on('popupopen', (e: L.LeafletMouseEvent) => {
      if (!this.selectedRole) {
        return e.popup.removeFrom(this.map);
      }

      this.popupOpened = true;
      const id = (e.popup._source as any).customId;
      const submitButton = document.getElementById(
        `submitButton-${id}`
      ) as HTMLButtonElement;
      const cancelButton = document.getElementById(
        `cancelButton-${id}`
      ) as HTMLButtonElement;
      const closePopup = (
        submit?: HTMLButtonElement,
        cancel?: HTMLButtonElement
      ) => {
        e.popup.removeFrom(this.map);
        submit?.removeEventListener('click', () => closePopup(), false);
        cancel?.removeEventListener('click', () => closePopup(), false);
        this.popupOpened = false;
      };

      submitButton?.addEventListener(
        'click',
        () => closePopup(submitButton, cancelButton),
        false
      );

      cancelButton?.addEventListener(
        'click',
        () => closePopup(submitButton, cancelButton),
        false
      );
    });
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
