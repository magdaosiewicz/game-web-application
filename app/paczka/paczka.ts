import {Uzytkownik} from "../uzytkownik/uzytkownik";
import {Wiadomosc} from "../wiadomosc/wiadomosc";
import {Gra} from "../gra/gra";

/**
 * Created by Magda on 15.05.2017.
 */
export class PaczkaWrapper {
    constructor(public uzytkownikZalogowany: Uzytkownik, public wiadomosci: Wiadomosc[], public gra: Gra) {
    };
}
;