"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var angular2_websocket_1 = require("../angular2-websocket/src/angular2-websocket");
/**
 * Created by Magda on 15.05.2017.
 */
var UzytkownikSerwis = (function () {
    function UzytkownikSerwis() {
        var _this = this;
        this.ws = new angular2_websocket_1.$WebSocket("ws://178.62.5.210:8080/actions");
        this.getZalogowanyUzytkownik = function () {
            return _this.zalogowanyUzytkownik;
        };
        this.setZalogowanyUzytkownik = function (zalogowanyUzytkownik) {
            _this.zalogowanyUzytkownik = zalogowanyUzytkownik;
        };
    }
    return UzytkownikSerwis;
}());
UzytkownikSerwis = __decorate([
    core_1.Injectable()
], UzytkownikSerwis);
exports.UzytkownikSerwis = UzytkownikSerwis;
