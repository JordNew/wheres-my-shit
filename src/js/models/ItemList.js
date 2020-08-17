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

    // saveItem = () => {
    
    //     CreateItem.createItem(
    //         elements.desc.value,
    //         elements.borrower.value,
    //         elements.owner.value,
    //         elements.when.value,
    //         elements.whenBack.value
    //     );
    
        // console.log('that worked!');
        
        // if (check === true) {
        //     console.log('Come on baby!')
        // } else {
        //     console.log('mehhh');
        // }
    
}