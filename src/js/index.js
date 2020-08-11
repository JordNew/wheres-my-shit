import { elements, renderItem, deleteItem } from './views/base';
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
    addItemView.renderTextQuestion();
});


 /** 
 * BORROWEDBYME CONTROLLER 
 */



 /** 
 * BORROWEDFROMME CONTROLLER 
 */