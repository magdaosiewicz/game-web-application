import {Uzytkownik} from "../uzytkownik/uzytkownik";
import {UczestnicyWrapper} from "../uczestnicyWrapper/uczestnicyWrapper";
/**
 * Created by Magda on 17.05.2017.
 */
export class RuchWrapper {
    constructor(public uczestnicyWrapper: UczestnicyWrapper ,public wykonujacyRuch: Uzytkownik, public i: number, public j:number) {
    };
}
;