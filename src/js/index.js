import { elements, questions, renderItem, deleteItem } from './views/base';
import * as createItemView from './views/createItemView';

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
   
    createItemView.checkRequiredFields();

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