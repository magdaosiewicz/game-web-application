/**
 * Created by Magda on 12.05.2017.
 */
import {Component, Injectable} from "@angular/core";
import {Uzytkownik} from "./uzytkownik/uzytkownik";
import {Http} from "@angular/http";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import "rxjs/Rx";
import {UzytkownikSerwis} from "./uzytkownik/uzytkownikSerwis";
import {Router} from '@angular/router';
import {WebSocketSendMode} from "./angular2-websocket/src/angular2-websocket";

@Component({
    selector: 'homeComponent',
    templateUrl: 'app/mojplik.html',
})
@Injectable()
export class HomeComponent {
    constructor(private http: Http, private uzytkownikSerwis: UzytkownikSerwis, private router: Router) {
    };


    private _webApiUrl = 'http://178.62.5.210:8080/';
    public login = '';

    public dodajUzytkownika = () => {
        let uzytkownik = new Uzytkownik(this.login); //
        this.http.post(this._webApiUrl + 'uzytkownicy/dodajUzytkownika', uzytkownik)
            .subscribe(data => {
                this.uzytkownikSerwis.setZalogowanyUzytkownik(uzytkownik);
                this.uzytkownikSerwis.ws.setSend4Mode(WebSocketSendMode.Direct);
                this.uzytkownikSerwis.ws.send(uzytkownik);
                this.router.navigate(['game']);

            }, error => {
                console.log(error.json());
            });
    };


}