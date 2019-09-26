import {Uzytkownik} from "../uzytkownik/uzytkownik";
import {Figura} from "../figura/figura";
/**
 * Created by Magda on 15.05.2017.
 */

export class Gra {
    constructor(public idRozgrywki: number, public obecnyRuch: Uzytkownik, public kolko: Uzytkownik, public krzyzyk: Uzytkownik, public zwyciezca: Uzytkownik, public plansza: Figura[][]) {
    };//brakuje planszy
}
;