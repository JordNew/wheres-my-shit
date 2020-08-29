import { elements, questions, renderItem, deleteItem } from './views/base';
import ItemList from './models/ItemList';
import Dashboard from './models/Dashboard';
import Heading2 from './models/Heading2';
import * as itemView from './views/itemView';
import * as dashboardView from './views/dashboardView';
import * as heading2View from './views/heading2View';
import moment from 'moment';

/** Global state of the app
 * - Add object 
 * - BorrowedByMe list object
 * - BorrowedFromMe list object
*/
const state = {};

window.state = state;


/** 
 * HEADER CONTROLLER 
 */

 // When logo is clicked
 elements.logo.addEventListener('click', e => {
    // Reload page
    init();
 });


/** 
 * ADD CONTROLLER 
 */


// When ADD NEW ITEM button is clicked
elements.buttonCreateItem.addEventListener('click', e => {
    
    // Grey out and deactivate ADD NEW ITEM BUTTON
    elements.buttonCreateItem.style.background = '#ccc';
    elements.buttonCreateItem.style.border = 'none';
    elements.buttonCreateItem.disabled = true;
    
    // Display new empty form
    itemView.displayForm();
});

// When radio button BORROWER 'not me' is clicked:
elements.notMeBorrower.addEventListener('click', e => {
    // set textarea background-color to white
    elements.notMeBorrowerInput.style.backgroundColor = '#fff';
    // activate textarea
    elements.notMeBorrowerInput.disabled = false;
    // automatically place cursor at the beginning
    elements.notMeBorrowerInput.focus();

    // if (!elements.meBorrower.checked) { // otherwise the text label jumps down
    //     // show owner radio buttons + text labels 
    //     elements.meOwner.style.display = 'block';
    //     elements.notMeOwner.style.display = 'block';
    //     elements.labelMeOwner.style.display = 'block';
    //     elements.labelNotMeOwner.style.display = 'block';
    // }
});


// When radio button BORROWER 'me' is clicked:
elements.meBorrower.addEventListener('click', e => {
    
    // set textarea background-color to grey
    elements.notMeBorrowerInput.style.backgroundColor = 'rgb(221, 213, 213)';
    // clear textarea
    elements.notMeBorrowerInput.value = '';
    // disable textarea
    elements.notMeBorrowerInput.disabled = true;

    /*
    // hide owner radio buttons
    elements.meOwner.style.display = 'none';
    elements.notMeOwner.style.display = 'none';

    // hide owner text labels
    elements.labelMeOwner.style.display = 'none';
    elements.labelNotMeOwner.style.display = 'none';
    */

    // display owner text input
    // elements.notMeOwnerInput.style.display = 'block';
});


// When radio button OWNER 'not me' is clicked: 
elements.notMeOwner.addEventListener('click', e => {
    // set textarea background-color to white
    elements.notMeOwnerInput.style.backgroundColor = '#fff';
    // activate textarea
    elements.notMeOwnerInput.disabled = false;
    // automatically place cursor at the beginning
    elements.notMeOwnerInput.focus();
    
    // if (!elements.meOwner.checked) { // otherwise the text label jumps down
    //     // show borrower radio buttons + text labels
    //     elements.meBorrower.style.display = 'block';
    //     elements.notMeBorrower.style.display = 'block';
    //     elements.labelMeBorrower.style.display = 'block';
    //     elements.labelNotMeBorrower.style.display = 'block';
    // }
});

// When radio button OWNER 'me' is clicked: 
elements.meOwner.addEventListener('click', e => {
    
    // set textarea background-color to grey
    elements.notMeOwnerInput.style.backgroundColor = 'rgb(221, 213, 213)';
     // clear textarea
     elements.notMeOwnerInput.value = '';
     // disable textarea
     elements.notMeOwnerInput.disabled = true;
    
    // hide borrower 'me' radio button + label (leaving 'not me' as the only option left)
    // elements.meBorrower.style.display = 'none';
    // elements.labelMeBorrower.style.display = 'none';
    
    // show borrower 'not me' text input
    // elements.notMeBorrowerInput.style.display = 'block';
});

/*
// When radio button WHEN 'borrowed on' is clicked:
elements.whenCalRadio.addEventListener('click', e => {
    // Display calendar
    elements.whenCal.style.display = 'block';
});

// When radio button WHEN 'not sure' is clicked:
elements.whenNotSure.addEventListener('click', e => {
    // Hide calendar
    elements.whenCal.style.display = 'none';
});

// When radio button WHENBACK 'return item by' is clicked:
elements.whenBackCalRadio.addEventListener('click', e => {
    // Display calendar
    elements.whenBackCal.style.display = 'block';
});

// When radio button WHENBACK 'not sure' is clicked:
elements.whenBackNotSure.addEventListener('click', e => {
    // Hide calendar
    elements.whenBackCal.style.display = 'none';
});
*/


// When ERASE button is clicked
elements.buttonErase.addEventListener('click', e => {
    // Restore start page: clear & hide form, reactivate Add Item Button etc.
    init();
});


// When SAVE button is clicked
elements.buttonSaveItem.addEventListener('click', e => {

    if (elements.meBorrower.checked && elements.meOwner.checked) {
        alert('You can\'t borrow from yourself, silly ... ');
    } else {

        // Make sure all required fields are filled in
        if (itemView.checkRequiredFields()) {

            // Create a new ItemList IF there is none yet
            if (!state.items) state.items = new ItemList();
            
            // Read BORROWER value
            const borrowerValue = () => {
                if (elements.meBorrower.checked) {
                    return 'me';
                } else {
                    return elements.notMeBorrowerInput.value;
                }
            }

            // Read OWNER value
            const ownerValue = () => {
                if (elements.meOwner.checked) {
                    return 'me';
                } else {
                    return elements.notMeOwnerInput.value;
                }
            }

            // Read WHEN value
            const whenValue = () => {
                if (elements.whenNotSure.checked) {
                    console.log('whennotsure');
                    return 'not sure';
                } else if (elements.whenCalRadio.checked && elements.whenCal.value === '') {
                    alert('Please select date or choose "not sure"');
                } else if (elements.whenCalRadio.checked) {
                    return elements.whenCal.value;
                }
            }
            
            // Read WHENBACK value
            const whenBackValue = () => {
                if (elements.whenBackNotSure.checked) {
                    return 'not sure';
                } else if (elements.whenBackCalRadio.checked && !elements.whenBackCal.value) {
                    alert('Please select date or choose "not sure"');
                } else if (elements.whenBackCalRadio.checked) {
                    return elements.whenBackCal.value;
                }
            }

            // Create new item (and store in ItemList aka state.items)
            const newItem = state.items.createItem(
                elements.desc.value,
                borrowerValue(),
                ownerValue(),
                whenValue(),
                whenBackValue()
            );

            // TESTING
            console.log(state);
            
            // Add all items to dashboard
            controlDashboard();

            // Restore start page: feedback, clear & hide form
            // ToDo: function for feedback at Save Item
            init();
        }

    }

    
});

window.l = new ItemList();


 /** 
 * DASHBOARD CONTROLLER 
 */

const controlDashboard = () => {
    
    // Create a new dashboard IF there is none yet
    if (!state.dashboard) state.dashboard = new Dashboard();

    // Add each item to the dashboard and UI
    state.items.items.forEach(el => {
        
        // Check if it already exists (to prevent from rendering the same thing twice)
        if (state.dashboard.borrowedByMe.includes(el) || state.dashboard.borrowedFromMe.includes(el) ) {
            return
        // If it did not yet exist: add to dashboard    
        } else {            
            state.dashboard.addItem(el);
        }

        // Clear current dashboard (previously rendered)
        clearDashboard();

        // Render updated dashboard including the newly added item
        renderDashboard();
    });
}

const clearDashboard = () => {
    // Remove current borrowedByMe items from dashboard
    while (elements.borrowedByMe.firstChild) {
        elements.borrowedByMe.removeChild(elements.borrowedByMe.lastChild);
    }
    // Remove current borrowedFromMe items from dashboard
    while (elements.borrowedFromMe.firstChild) {
        elements.borrowedFromMe.removeChild(elements.borrowedFromMe.lastChild);
    }
}

const renderDashboard = () => {
    
    // Render borrowedByMe items to dashboard
    state.dashboard.borrowedByMe.forEach(el => {
    dashboardView.renderItem(el);
    });
    
    // Render borrowedFromMe items to dashboard
    state.dashboard.borrowedFromMe.forEach(el => {
    dashboardView.renderItem(el);
    });
}

// Init function to reset start page
const init = () => {
    itemView.clearForm();
    itemView.hideForm();
}


// Handle, delete and update borrowedByMe item events
elements.borrowedByMe.addEventListener('click', e => {
    const id = e.target.closest('.borrowedByMe__item').dataset.itemid;

    //Handle the delete button
    if (e.target.matches('.item__delete, .item__delete *')) {
        // Delete from state
        state.dashboard.deleteItem(id);

        //Delete from UI
        dashboardView.deleteItem(id);

        // Update number of items in UI
        heading2View.updateNumItemsByMe();
    }

    // TESTING
    else if (e.target.matches('#pencil')) {
        console.log('pencil button clicked');
    } 

    else {
        console.log('clicked somewhere else')
    }
})

// Handle, delete and update borrowedFromMe item events
elements.borrowedFromMe.addEventListener('click', e => {
    const id = e.target.closest('.borrowedFromMe__item').dataset.itemid;

    //Handle the delete button
    if (e.target.matches('.item__delete, .item__delete *')) {
        // Delete from state
        state.dashboard.deleteItem(id);

        // Delete from UI
        dashboardView.deleteItem(id);

        // Update number of items in UI
        heading2View.updateNumItemsFromMe();
    }
    // TESTING
    else if (e.target.matches('#pencil')) {
        console.log('pencil button clicked');
    } 
    else {
        console.log('clicked somewhere else')
    }
});



// Restore saved items from localStorage on page load
window.addEventListener('load', () => {
    state.dashboard = new Dashboard();

    // Restore items + numbers
    state.dashboard.readStorage();
    heading2View.updateNumItemsByMe();
    heading2View.updateNumItemsFromMe();

    // Render all borrowed items to dashboard
    renderDashboard();
});
