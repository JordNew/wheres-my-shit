import { elements, questions, renderItem, deleteItem } from './views/base';
import ItemList from './models/ItemList';
import Overview from './models/Overview';
import * as itemView from './views/itemView';

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

    itemView.displayForm();

});

elements.buttonSaveItem.addEventListener('click', e => {

    if (itemView.checkRequiredFields()) {

        // Create a new ItemList IF there is none yet
        if (!state.items) state.items = new ItemList();
        
        // create new item
        state.items.createItem(
            elements.desc.value,
            elements.borrower.value,
            elements.owner.value,
            elements.when.value,
            elements.whenBack.value,
        );
        itemView.clearForm();
        console.log(state.items);
    }

    // if (!state.overview) state.overview = new Overview();
    // controlOverview();
    // state.overview.addItem(itemView.checkRequiredFields());
    // console.log(itemView.checkRequiredFields());
    // itemView.clearForm();

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
 * OVERVIEW CONTROLLER 
 */

const controlOverview = () => {
    
    // Create a new Overview IF there is none yet
    if (!state.overview) state.overview = new Overview();
    
    console.log(state);

    // state.overview.addItem(item);

    


    /*
    // Add each ingredient to the list and UI
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
        // console.log(`state = ${state}`);
    });
    */
}