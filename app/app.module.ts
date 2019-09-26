import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {HttpModule, JsonpModule} from "@angular/http";
import {routes} from "./app.routes";
import {Repeater} from "./repeater";
import {HomeComponent} from "./home.component";
import { AppComponent } from './app.component';
import {UzytkownikSerwis} from "./uzytkownik/uzytkownikSerwis";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        RouterModule.forRoot(routes)
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        Repeater
    ],
    providers: [UzytkownikSerwis],
    bootstrap: [AppComponent]
})
export class AppModule {
}