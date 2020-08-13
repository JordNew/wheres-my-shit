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
    
    elements.buttonCreateItem.disabled = true;
    elements.buttonCreateItem.style.display = 'none';

    createItemView.renderForm();
});

elements.buttonSaveItem.addEventListener('click', e => {

    console.log('holy smokes batman!');

    if (elements.what.innerHTML === '') {
        console.log('cowabunga!!');
    }

});



 /** 
 * BORROWEDBYME CONTROLLER 
 */



 /** 
 * BORROWEDFROMME CONTROLLER 
 */