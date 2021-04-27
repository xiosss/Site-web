import {Reference} from '../models/reference';

export class AddReference {
    static readonly type = "[id] Add";
    constructor (public payload : Reference) {};
}

export class DelReference {
    static readonly type = "[id] Del";
    constructor (public payload : Reference) {};
}