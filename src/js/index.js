import { elements, questions, renderItem, deleteItem } from './views/base';
import * as addItemView from './views/addItemView';

/** Global state of the app
 * - Add object 
 * - BorrowedByMe list object
 * - BorrowedFromMe list object
*/
const state = {};


/** 
 * ADD CONTROLLER 
 */

elements.buttonAddItem.addEventListener('click', e => {

    addItemView.renderQuestions();    
    elements.buttonAddItem.disabled = true;
    // elements.buttonAddItem.style.backgroundColor = '#849C81';
    // elements.buttonAddItem.style.border = '#849C81';
    // elements.buttonAddItem.style.color = '#A8B2A6';
    elements.buttonAddItem.style.display = 'none';
});


 /** 
 * BORROWEDBYME CONTROLLER 
 */



 /** 
 * BORROWEDFROMME CONTROLLER 
 */