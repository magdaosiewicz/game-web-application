import {Uzytkownik} from "../uzytkownik/uzytkownik";
/**
 * Created by Magda on 15.05.2017.
 */
export class Wiadomosc {
    constructor(public nadawca: Uzytkownik, public  odbiorca: Uzytkownik, public dataWysylki: Date ,public  trescWiadomosci: string)
    {};
}
;