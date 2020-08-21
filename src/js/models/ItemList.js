import { elements } from '../views/base';
import uniqid from 'uniqid';

export default class ItemList {
    constructor() {
        this.items = [];
    }

    createItem(desc, borrower, owner, when, whenBack) {

        const item = {
            id: uniqid(),
            desc,
            borrower,
            owner,
            when,
            whenBack
        }
        this.items.push(item);
        return item;
    }

    deleteItem (id) {
        const index = this.items.findIndex(el => el.id === id);
        // [2,4,8] splice(1,2) -> returns [4,8], original array is [2]
        // [2,4,8] slice(1,2) -> returns 4, original array is [2,4,8]
        this.items.splice(index, 1);
    }

}