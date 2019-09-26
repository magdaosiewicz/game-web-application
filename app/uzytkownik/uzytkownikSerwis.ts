import {Injectable} from "@angular/core";
import {Uzytkownik} from "./uzytkownik";
import {$WebSocket} from "../angular2-websocket/src/angular2-websocket";
/**
 * Created by Magda on 15.05.2017.
 */

@Injectable()
export class UzytkownikSerwis {

    public zalogowanyUzytkownik: Uzytkownik;

    public ws: $WebSocket = new $WebSocket("ws://178.62.5.210:8080/actions");


    public getZalogowanyUzytkownik = () => {
        return this.zalogowanyUzytkownik;
    };

    public setZalogowanyUzytkownik = (zalogowanyUzytkownik) => {
        this.zalogowanyUzytkownik = zalogowanyUzytkownik;
    };

}