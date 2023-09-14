import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  //
  highlightedDates = (isoString: string) => {
    const date = new Date(isoString);
    const utcDay = date.getUTCDate();


    // esto hace que cada quinto dia tenga un color azulado
    // esto por el hecho de tener un color primario
    /*if (utcDay % 5 === 0) {
      return {
        textColor: '#800080',
        backgroundColor: '#ffc0cb',
      };
    }*/

    if (utcDay % 18 === 0 ){
      return{
        textColor: '#DC001A'
      };
    }

    if (utcDay % 19 === 0 ){
      return{
        textColor: '#DC001A'
      };
    }
    // esto hace que cada tercer dia tenga un color rojizo
    // que este es un color secundario
    /*if (utcDay % 3 === 0) {
      return {
        textColor: 'var(--ion-color-secondary-contrast)',
        backgroundColor: 'var(--ion-color-secondary)',
      };
    }*/

    return undefined;
  };

}
