import { elements, questions, renderItem, deleteItem } from './views/base';
import ItemList from './models/ItemList';
import Dashboard from './models/Dashboard';
import * as itemView from './views/itemView';
import * as dashboardView from './views/dashboardView';

/** Global state of the app
 * - Add object 
 * - BorrowedByMe list object
 * - BorrowedFromMe list object
*/
const state = {};


/** 
 * ADD CONTROLLER 
 */

// Display new empty form
elements.buttonCreateItem.addEventListener('click', e => {
    itemView.displayForm();
});

// When radio button BORROWER 'not me' is clicked:
elements.notMeBorrower.addEventListener('click', e => {
    // display borrower text input
    elements.notMeBorrowerInput.style.display = 'block';
    // show owner radio buttons + text labels 
    elements.meOwner.style.display = 'block';
    elements.notMeOwner.style.display = 'block';
    elements.labelMeOwner.style.display = 'block';
    elements.labelNotMeOwner.style.display = 'block';
})

// When radio button BORROWER 'me' is clicked:
elements.meBorrower.addEventListener('click', e => {
    // hide borrower text input
    elements.notMeBorrowerInput.style.display = 'none';
    // hide owner radio buttons
    elements.meOwner.style.display = 'none';
    elements.notMeOwner.style.display = 'none';
    // display owner text input
    elements.notMeOwnerInput.style.display = 'block';
    // hide owner text labels
    elements.labelMeOwner.style.display = 'none';
    elements.labelNotMeOwner.style.display = 'none';
})

// When radio button OWNER 'not me' is clicked: 
elements.notMeOwner.addEventListener('click', e => {
    // display owner text input
    elements.notMeOwnerInput.style.display = 'block';
    // show borrower radio buttons + text labels 
    elements.meBorrower.style.display = 'block';
    elements.notMeBorrower.style.display = 'block';
    elements.labelMeBorrower.style.display = 'block';
    elements.labelNotMeBorrower.style.display = 'block';
})

// When radio button OWNER 'me' is clicked: 
elements.meOwner.addEventListener('click', e => {
    // hide owner text input
    elements.notMeOwnerInput.style.display = 'none';
    // hide borrower 'me' radio button (leaving 'not me' as the only option left)
    elements.meBorrower.style.display = 'none';
    // show borrower 'not me' text input
    elements.labelMeBorrower.style.display = 'block';
})


/*
if (elements.meBorrower.checked) {
    elements.borrower.style.display = 'none';
} else if (elements.notMeBorrower.checked) {
    elements.borrower.style.display = 'block';
} 

if (elements.meOwner.checked) elements.owner.style.display = 'none';
if (elements.notMeOwner.checked) elements.owner.style.display = 'block';
*/


elements.buttonSaveItem.addEventListener('click', e => {

    // Make sure all required fields are filled in
    if (itemView.checkRequiredFields()) {

        // Create a new ItemList IF there is none yet
        if (!state.allItems) state.allItems = new ItemList();
        
        // Read borrower value
        const borrowerValue = () => {
            if (elements.meBorrower.checked) {
                // console.log('me borrower');
                return 'me';
            } else {
                // console.log(elements.notMeBorrowerInput.value);
                return elements.notMeBorrowerInput.value;
            }
        }

        // Read owner value
        const ownerValue = () => {
            if (elements.meOwner.checked) {
                console.log('me owner');
                return 'me';
            } else {
                console.log(elements.notMeOwnerInput.value);
                return elements.notMeOwnerInput.value;
            }
        }


        // Create new item
        const newItem = state.allItems.createItem(
            elements.desc.value,
            borrowerValue(),
            ownerValue(),
            elements.when.value,
            elements.whenBack.value
        );

        console.log(state);
        
        // Clear form after submitting item
        // itemView.clearForm();

        // state.dashboard.addItem(newItem);
        
        // Add all items to dashboard
        controlDashboard();
    }
});

window.l = new ItemList();

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
 * DASHBOARD CONTROLLER 
 */

const controlDashboard = () => {
    
    // Create a new dashboard IF there is none yet
    if (!state.dashboard) state.dashboard = new Dashboard();
    // console.log(state);


    // Add each item to the dashboard and UI (dashboard = 2 parts: borrowedByMe and borrowedFromMe)
    state.allItems.items.forEach(el => {
        
        // Check if it already exists (to prevent from rendering the same thing twice)
        if (state.dashboard.borrowedByMe.includes(el) || state.dashboard.borrowedFromMe.includes(el)) {
            return
        // If it did not yet exist: render to dashboard    
        } else {            
            const item = state.dashboard.addItem(el);
            dashboardView.renderItem(item);
        }

    });

    /*
    // Add each ingredient to the list and UI
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
        // console.log(`state = ${state}`);
    });
    */
}