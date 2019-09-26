import {Injectable, Component} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import "rxjs/Rx";
import {Uzytkownik} from "./uzytkownik/uzytkownik";
import {Wiadomosc} from "./wiadomosc/Wiadomosc";
import {UzytkownikSerwis} from "./uzytkownik/uzytkownikSerwis";
import {PaczkaWrapper} from "./paczka/paczka";
import {Router} from "@angular/router";
import {RuchWrapper} from "./ruchWrapper/ruchWrapper";
import {UczestnicyWrapper} from "./uczestnicyWrapper/uczestnicyWrapper";
import {Gra} from "./gra/gra";


@Component({
    selector: 'repeater',
    templateUrl: 'app/repeater.html',
})

@Injectable()
export class Repeater {
    constructor(private http: Http, private uzytkownikSerwis: UzytkownikSerwis, private router: Router) {

        this.pobierzPaczke(uzytkownikSerwis.getZalogowanyUzytkownik());
        this.receiveMessage();
    }

    public uzytkownicy: Uzytkownik[];
    private _webApiUrl = 'http://178.62.5.210:8080/';

    public wybranyUzytkownik: Uzytkownik;

    public wyswietlaneWiadomosci: Wiadomosc[];
    public wiadom: Wiadomosc[];
    nadawca = new Uzytkownik("nazwaNadawcy");
    odbiorca = new Uzytkownik("nazwaOdbiorcy");
    wiad1 = new Wiadomosc(this.nadawca, this.odbiorca, null, 'witam na tym padole');
    wiad2 = new Wiadomosc(this.nadawca, this.odbiorca, null, 'czesc');
    //  wiadom :Wiadomosc[] = [this.wiad1, this.wiad2];
    public wyswietlanaGra: Gra;
    // public macierz = [
    //    ['PUSTO', 'PUSTO', 'PUSTO'],
    //    ['PUSTO', 'PUSTO', 'PUSTO'],
    //    ['PUSTO', 'PUSTO', 'PUSTO']
    //];

    public paczkaWrapper: PaczkaWrapper[];
    public currentPerson;

    public setPerson = (person) => {
        if (this.currentPerson === person) return;
        this.currentPerson = person;
    };

    public zmienWartoscMacierzy = (i, j) => {
        let uczestnicyWrapper = new UczestnicyWrapper(this.uzytkownikSerwis.zalogowanyUzytkownik, this.wybranyUzytkownik);
        let ruchWrapper = new RuchWrapper(uczestnicyWrapper, this.uzytkownikSerwis.zalogowanyUzytkownik, i, j);
        this.http.post(this._webApiUrl + 'gra/wykonajRuchBejb', ruchWrapper)
            .subscribe(data => {

            }, error => {
                console.log(error.json());
            });
    };

    public nowaGra = (i, j) => {
        let uczestnicyWrapper = new UczestnicyWrapper(this.uzytkownikSerwis.zalogowanyUzytkownik, this.wybranyUzytkownik);
        this.http.post(this._webApiUrl + 'gra/nowaGra', uczestnicyWrapper)
            .subscribe(data => {

            }, error => {
                console.log(error.json());
            });
    };

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    public getUzytkownicy = () => {
        this.http.get(this._webApiUrl + 'uzytkownicy')
            .subscribe(result => this.uzytkownicy = result.json());
    };

    public pobierzPaczke = (zalogowanyUzytkownik) => {
        this.http.post(this._webApiUrl + 'informacjeUzytkownicy/informacjeUzytkownicy', zalogowanyUzytkownik)
            .subscribe(data => {
                this.paczkaWrapper = data.json();
            }, error => {
                console.log(error.json());
            });

    };

    public wiadomoscDoWysylki = '';

    public wyslijWiadomosc = () => {
        let wiadomosc = new Wiadomosc(this.uzytkownikSerwis.zalogowanyUzytkownik, this.wybranyUzytkownik, null, this.wiadomoscDoWysylki);
        this.http.post(this._webApiUrl + 'wiadomosci/dodaj', wiadomosc)
            .subscribe(data => {

            }, error => {
                console.log(error.json());
            });
    };

    public ustawPartnera = (uzytkownik) => {
        this.wybranyUzytkownik = uzytkownik;
        for (let i = 0; i < this.paczkaWrapper.length; i++) {
            if (this.paczkaWrapper[i].uzytkownikZalogowany === this.wybranyUzytkownik) {
                this.wyswietlaneWiadomosci = this.paczkaWrapper[i].wiadomosci;

                this.wyswietlanaGra = this.paczkaWrapper[i].gra;
            }
        }
    };

    public receiveMessage = () => {
        this.uzytkownikSerwis.ws.onMessage(
            (msg: MessageEvent) => {
                let message = JSON.parse(msg.data);

                if (message.nadawca !== undefined) {
                    for (let i = 0; i < this.paczkaWrapper.length; i++) {
                        if (this.paczkaWrapper[i].uzytkownikZalogowany.nazwaUzytkownika === message.nadawca.nazwaUzytkownika || this.paczkaWrapper[i].uzytkownikZalogowany.nazwaUzytkownika === message.odbiorca.nazwaUzytkownika) {
                            this.paczkaWrapper[i].wiadomosci.push(message);
                            if (this.wybranyUzytkownik.nazwaUzytkownika === message.nadawca.nazwaUzytkownika || this.wybranyUzytkownik.nazwaUzytkownika === message.odbiorca.nazwaUzytkownika) {
                                this.wyswietlaneWiadomosci = this.paczkaWrapper[i].wiadomosci;
                            }
                        }
                    }
                }
                else if (message.wiadomosci !== undefined) {
                    this.paczkaWrapper.push(message);
                }
                else if (message.uczestnicyWrapper !== undefined) {
                    for (let i = 0; i < this.paczkaWrapper.length; i++) {
                        if (this.paczkaWrapper[i].uzytkownikZalogowany.nazwaUzytkownika === message.uczestnicyWrapper.uzytkownik1.nazwaUzytkownika || this.paczkaWrapper[i].uzytkownikZalogowany.nazwaUzytkownika === message.uczestnicyWrapper.uzytkownik2.nazwaUzytkownika) {
                            this.paczkaWrapper[i].gra = message;
                            if (this.wybranyUzytkownik.nazwaUzytkownika === message.uczestnicyWrapper.uzytkownik1.nazwaUzytkownika || this.wybranyUzytkownik.nazwaUzytkownika === message.uczestnicyWrapper.uzytkownik2.nazwaUzytkownika) {
                                this.wyswietlanaGra = this.paczkaWrapper[i].gra;
                            }
                        }
                    }
                }
                //else if(message.plansza!==undefined){
                //for (let i = 0; i < this.paczkaWrapper.length; i++)
                //{
                //if(this.paczkaWrapper[i].uzytkownikZalogowany.nazwaUzytkownika===message.gra.kolko.nazwaUzytkownika && this.paczkaWrapper[i].gra  )
                //{

                //  }
                //}

                // }
                console.log("onMessage ", msg.data);
            },
            {autoApply: false}
        );

    }


}