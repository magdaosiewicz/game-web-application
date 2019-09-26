/**
 * Created by Magda on 12.05.2017.
 */
import {Component} from "@angular/core";

@Component({
    selector: 'repeater',
    template: `
    <div class="outer-outlet">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
}