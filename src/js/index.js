import { elements, questions, renderItem, deleteItem } from './views/base';
import * as createItemView from './views/createItemView';
import * as Item from './models/Item';

/** Global state of the app
 * - Add object 
 * - BorrowedByMe list object
 * - BorrowedFromMe list object
*/
const state = {};


/** 
 * ADD CONTROLLER 
 */

elements.buttonCreateItem.addEventListener('click', e => {

    createItemView.displayForm();

});

elements.buttonSaveItem.addEventListener('click', e => {

    if (createItemView.checkRequiredFields()) {
        
        state.items = new Item();

        state.items.createItem(elements.desc.value, elements.borrower.value, elements.owner.value, elements.when.value, elements.whenBack.value);
        console.log('kom op!');
    }

    // try {
    //     if (createItemView.checkRequiredFields()) {
    //         console.log('what: ' + elements.desc.value);
    //         CreateItem.createItem(elements.desc.value, elements.borrower.value, elements.owner.value, elements.when.value, elements.whenBack.value);
    //     }
    // } catch {
    //     alert('Something went wrong with creating the new item');
    // } finally {
    //     console.log('done creating new item');
    // }

    
});

// TEST FUNCTION
// const checkSaveBtn = () => {
//     if (elements.buttonSaveItem) {
//         elements.buttonSaveItem.addEventListener('click', e => {
//             if (elements.what.value === '') {
//                 console.log('This field is read and it is empty');
//             } else {
//                 console.log(elements.what.value);
//             }
//         });
//     } else {
//         console.log('No Save Button detected');
//     }
// };
// checkSaveBtn();



 /** 
 * BORROWEDBYME CONTROLLER 
 */



 /** 
 * BORROWEDFROMME CONTROLLER 
 */