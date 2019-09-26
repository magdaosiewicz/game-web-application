"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/toPromise");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
require("rxjs/Rx");
var uzytkownik_1 = require("./uzytkownik/uzytkownik");
var Wiadomosc_1 = require("./wiadomosc/Wiadomosc");
var ruchWrapper_1 = require("./ruchWrapper/ruchWrapper");
var uczestnicyWrapper_1 = require("./uczestnicyWrapper/uczestnicyWrapper");
var Repeater = (function () {
    function Repeater(http, uzytkownikSerwis, router) {
        var _this = this;
        this.http = http;
        this.uzytkownikSerwis = uzytkownikSerwis;
        this.router = router;
        this._webApiUrl = 'http://178.62.5.210:8080/';
        this.nadawca = new uzytkownik_1.Uzytkownik("nazwaNadawcy");
        this.odbiorca = new uzytkownik_1.Uzytkownik("nazwaOdbiorcy");
        this.wiad1 = new Wiadomosc_1.Wiadomosc(this.nadawca, this.odbiorca, null, 'witam na tym padole');
        this.wiad2 = new Wiadomosc_1.Wiadomosc(this.nadawca, this.odbiorca, null, 'czesc');
        this.setPerson = function (person) {
            if (_this.currentPerson === person)
                return;
            _this.currentPerson = person;
        };
        this.zmienWartoscMacierzy = function (i, j) {
            var uczestnicyWrapper = new uczestnicyWrapper_1.UczestnicyWrapper(_this.uzytkownikSerwis.zalogowanyUzytkownik, _this.wybranyUzytkownik);
            var ruchWrapper = new ruchWrapper_1.RuchWrapper(uczestnicyWrapper, _this.uzytkownikSerwis.zalogowanyUzytkownik, i, j);
            _this.http.post(_this._webApiUrl + 'gra/wykonajRuchBejb', ruchWrapper)
                .subscribe(function (data) {
            }, function (error) {
                console.log(error.json());
            });
        };
        this.nowaGra = function (i, j) {
            var uczestnicyWrapper = new uczestnicyWrapper_1.UczestnicyWrapper(_this.uzytkownikSerwis.zalogowanyUzytkownik, _this.wybranyUzytkownik);
            _this.http.post(_this._webApiUrl + 'gra/nowaGra', uczestnicyWrapper)
                .subscribe(function (data) {
            }, function (error) {
                console.log(error.json());
            });
        };
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        this.getUzytkownicy = function () {
            _this.http.get(_this._webApiUrl + 'uzytkownicy')
                .subscribe(function (result) { return _this.uzytkownicy = result.json(); });
        };
        this.pobierzPaczke = function (zalogowanyUzytkownik) {
            _this.http.post(_this._webApiUrl + 'informacjeUzytkownicy/informacjeUzytkownicy', zalogowanyUzytkownik)
                .subscribe(function (data) {
                _this.paczkaWrapper = data.json();
            }, function (error) {
                console.log(error.json());
            });
        };
        this.wiadomoscDoWysylki = '';
        this.wyslijWiadomosc = function () {
            var wiadomosc = new Wiadomosc_1.Wiadomosc(_this.uzytkownikSerwis.zalogowanyUzytkownik, _this.wybranyUzytkownik, null, _this.wiadomoscDoWysylki);
            _this.http.post(_this._webApiUrl + 'wiadomosci/dodaj', wiadomosc)
                .subscribe(function (data) {
            }, function (error) {
                console.log(error.json());
            });
        };
        this.ustawPartnera = function (uzytkownik) {
            _this.wybranyUzytkownik = uzytkownik;
            for (var i = 0; i < _this.paczkaWrapper.length; i++) {
                if (_this.paczkaWrapper[i].uzytkownikZalogowany === _this.wybranyUzytkownik) {
                    _this.wyswietlaneWiadomosci = _this.paczkaWrapper[i].wiadomosci;
                    _this.wyswietlanaGra = _this.paczkaWrapper[i].gra;
                }
            }
        };
        this.receiveMessage = function () {
            _this.uzytkownikSerwis.ws.onMessage(function (msg) {
                var message = JSON.parse(msg.data);
                if (message.nadawca !== undefined) {
                    for (var i = 0; i < _this.paczkaWrapper.length; i++) {
                        if (_this.paczkaWrapper[i].uzytkownikZalogowany.nazwaUzytkownika === message.nadawca.nazwaUzytkownika || _this.paczkaWrapper[i].uzytkownikZalogowany.nazwaUzytkownika === message.odbiorca.nazwaUzytkownika) {
                            _this.paczkaWrapper[i].wiadomosci.push(message);
                            if (_this.wybranyUzytkownik.nazwaUzytkownika === message.nadawca.nazwaUzytkownika || _this.wybranyUzytkownik.nazwaUzytkownika === message.odbiorca.nazwaUzytkownika) {
                                _this.wyswietlaneWiadomosci = _this.paczkaWrapper[i].wiadomosci;
                            }
                        }
                    }
                }
                else if (message.wiadomosci !== undefined) {
                    _this.paczkaWrapper.push(message);
                }
                else if (message.uczestnicyWrapper !== undefined) {
                    for (var i = 0; i < _this.paczkaWrapper.length; i++) {
                        if (_this.paczkaWrapper[i].uzytkownikZalogowany.nazwaUzytkownika === message.uczestnicyWrapper.uzytkownik1.nazwaUzytkownika || _this.paczkaWrapper[i].uzytkownikZalogowany.nazwaUzytkownika === message.uczestnicyWrapper.uzytkownik2.nazwaUzytkownika) {
                            _this.paczkaWrapper[i].gra = message;
                            if (_this.wybranyUzytkownik.nazwaUzytkownika === message.uczestnicyWrapper.uzytkownik1.nazwaUzytkownika || _this.wybranyUzytkownik.nazwaUzytkownika === message.uczestnicyWrapper.uzytkownik2.nazwaUzytkownika) {
                                _this.wyswietlanaGra = _this.paczkaWrapper[i].gra;
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
            }, { autoApply: false });
        };
        this.pobierzPaczke(uzytkownikSerwis.getZalogowanyUzytkownik());
        this.receiveMessage();
    }
    return Repeater;
}());
Repeater = __decorate([
    core_1.Component({
        selector: 'repeater',
        templateUrl: 'app/repeater.html',
    }),
    core_1.Injectable()
], Repeater);
exports.Repeater = Repeater;
