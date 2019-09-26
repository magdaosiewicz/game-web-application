"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Magda on 12.05.2017.
 */
var core_1 = require("@angular/core");
var uzytkownik_1 = require("./uzytkownik/uzytkownik");
require("rxjs/add/operator/toPromise");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
require("rxjs/Rx");
var angular2_websocket_1 = require("./angular2-websocket/src/angular2-websocket");
var HomeComponent = (function () {
    function HomeComponent(http, uzytkownikSerwis, router) {
        var _this = this;
        this.http = http;
        this.uzytkownikSerwis = uzytkownikSerwis;
        this.router = router;
        this._webApiUrl = 'http://178.62.5.210:8080/';
        this.login = '';
        this.dodajUzytkownika = function () {
            var uzytkownik = new uzytkownik_1.Uzytkownik(_this.login); //
            _this.http.post(_this._webApiUrl + 'uzytkownicy/dodajUzytkownika', uzytkownik)
                .subscribe(function (data) {
                _this.uzytkownikSerwis.setZalogowanyUzytkownik(uzytkownik);
                _this.uzytkownikSerwis.ws.setSend4Mode(angular2_websocket_1.WebSocketSendMode.Direct);
                _this.uzytkownikSerwis.ws.send(uzytkownik);
                _this.router.navigate(['game']);
            }, function (error) {
                console.log(error.json());
            });
        };
    }
    ;
    return HomeComponent;
}());
HomeComponent = __decorate([
    core_1.Component({
        selector: 'homeComponent',
        templateUrl: 'app/mojplik.html',
    }),
    core_1.Injectable()
], HomeComponent);
exports.HomeComponent = HomeComponent;
