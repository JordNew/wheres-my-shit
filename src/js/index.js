import { elements, questions, renderItem, deleteItem } from './views/base';
import ItemList from './models/ItemList';
import Dashboard from './models/Dashboard';
import Heading2 from './models/Heading2';
import * as itemView from './views/itemView';
import * as dashboardView from './views/dashboardView';
import * as heading2View from './views/heading2View';
import moment from 'moment';
import x from 'uniqid';

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

    // Focus on description field
    elements.desc.focus();
});


const meOwnerNotBorrower = () => {
    // set BORROWER 'not me' textarea background-color to white
    elements.notMeBorrowerInput.style.backgroundColor = '#fff';
    // activate textarea
    elements.notMeBorrowerInput.disabled = false;
    // automatically place cursor at the beginning
    elements.notMeBorrowerInput.focus();
    // automatically check OWNER 'me' radio button
    elements.meOwner.checked = true;

    // set OWNER 'not me' textarea background-color to grey
    elements.notMeOwnerInput.style.backgroundColor = 'rgb(221, 213, 213)';
     // clear textarea
     elements.notMeOwnerInput.value = '';
     // disable textarea
     elements.notMeOwnerInput.disabled = true;
    
    // automatically check BORROWER 'not me' radio button
    elements.notMeBorrower.checked = true;

    // remove any possible red borders from textareas OWNER 'not me', restore original disabled color
    elements.notMeOwnerInput.style.backgroundColor = '1px rgb(221, 213, 213) solid';
    elements.notMeOwnerInput.style.border = '1px rgb(170, 170, 170) solid';
}


const meBorrowerNotOwner = () => {
    // set OWNER 'not me' textarea background-color to white
    elements.notMeOwnerInput.style.backgroundColor = '#fff';
    // activate textarea
    elements.notMeOwnerInput.disabled = false;
    // automatically place cursor at the beginning
    elements.notMeOwnerInput.focus();
    // automatically check BORROWER 'me' radio button
    elements.meBorrower.checked = true;

    // set BORROWER 'not me' textarea background-color to grey
    elements.notMeBorrowerInput.style.backgroundColor = 'rgb(221, 213, 213)';
    // clear textarea
    elements.notMeBorrowerInput.value = '';
    // disable textarea
    elements.notMeBorrowerInput.disabled = true;
    
    // automatically check OWNER 'not me' radio button
    elements.notMeOwner.checked = true;

    // remove any possible red borders from textareas BORROWER 'not me', restore original disabled color
    elements.notMeBorrowerInput.style.backgroundColor = '1px rgb(221, 213, 213) solid';
    elements.notMeBorrowerInput.style.border = '1px rgb(170, 170, 170) solid';
}


// When radio button BORROWER 'not me' is clicked:
elements.notMeBorrower.addEventListener('click', e => {
    meOwnerNotBorrower();
});


// When radio button BORROWER 'me' is clicked:
elements.meBorrower.addEventListener('click', e => {
    meBorrowerNotOwner();    
});


// When radio button OWNER 'not me' is clicked: 
elements.notMeOwner.addEventListener('click', e => {
    meBorrowerNotOwner();  
});

// When radio button OWNER 'me' is clicked: 
elements.meOwner.addEventListener('click', e => {
    meOwnerNotBorrower();
});


// When WHEN calendar is clicked
elements.whenCal.addEventListener('click', e => {
    // check calendar radio button
    elements.whenCalRadio.checked = true;
});


// When WHENBACK calendar is clicked
elements.whenBackCal.addEventListener('click', e => {
    // check calendar radio button
    elements.whenBackCalRadio.checked = true;
});


// When ERASE button is clicked
elements.buttonErase.addEventListener('click', e => {
    // Restore start page: clear & hide form, reactivate Add Item Button etc.
    init();
});



// When SAVE button is clicked
elements.buttonSaveItem.addEventListener('click', e => {

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
            try {
                if (!elements.whenToday.checked && !elements.whenNotSure.checked && !elements.whenCalRadio.checked || elements.whenCal.value === undefined) {
                    alert('Please select when the item was borrowed');
                    return
                } else if (elements.whenToday.checked) {
                        const now = moment().format('YYYY/MM/DD');
                        // console.log(now);
                        return dateReformat(now);
                } else if (elements.whenNotSure.checked) {
                    console.log('whennotsure');
                    return 'not sure';
                } else if (!elements.whenCalRadio.checked && elements.whenCal.value === undefined) {
                    alert('Please select date');
                } else if (elements.whenCalRadio.checked) {
                    return dateReformat(elements.whenCal.value);
                }    
            } catch {
                alert('Something went wrong saving the Date of Borrow');
            } finally {
                console.log('done executing the whenValue function');
            }
        }
        
        // Read WHENBACK value
        const whenBackValue = () => {
            try {
                if (elements.whenBackNotSure.checked) {
                    return 'not sure';
                } else if (elements.whenBackCalRadio.checked && elements.whenBackCal.value === undefined) {
                    alert('Please select date or choose "not sure"');
                    return;
                } else if (!elements.whenBackCalRadio.checked && elements.whenBackCal.value !== undefined) {
                    return elements.whenBackCal.value;
                } else if (elements.whenBackCalRadio.checked) {
                    return dateReformat(elements.whenBackCal.value);
                }
            } catch {
                alert('Something went wrong saving the Return date');
            } finally {
                console.log('done executing the whenBackValue function');
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
        // console.log('number of list items: ' + elements.borrowedFromMe.childElementCount);

        // Update number of items in UI
        heading2View.updateNumItemsByMe();
        heading2View.updateNumItemsFromMe();

        // UI feedback popup: 'Item saved!'
        const showPopup = () => {
            elements.popuptext.classList.toggle('show');
        }  
        showPopup();

        // Restore start page: feedback, clear & hide form
        init();
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


// Function to reformat datestrings (format must be 'YYYY/MM/DD')
const dateReformat = calDate => {

    const dateArray = calDate.split('');

    const dd = dateArray[8] + dateArray[9];
    const mm = dateArray[5] + dateArray[6];
    const yyyy = dateArray[0] + dateArray[1] + dateArray[2] + dateArray[3];

    // Retrieve weekday from given date
    const getDay = date => {
        const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const day = weekDays[new Date(date).getDay()];
        return day;
      }

    const monthsArr = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const month = monthNumber => monthsArr[(parseInt(monthNumber) - 1)];
    
    const newFormat = getDay(calDate) + ', ' + month(mm) + ' ' + parseInt(dd) + ', ' + yyyy;
    return newFormat;
}


// Function to delete any existing EDIT form
const removeExistingEditForm = () => {

    // check if edit form is currently present
    const editFormPresent = (parent, child) => {
        if (parent.contains(child)) {
            return true;
        } else {
            return false;
        }
    }

    // if already present, remove existing edit form
    const formParent1 = document.querySelector('.borrowedByMe');
    const formParent2 = document.querySelector('.borrowedFromMe');
    const form = document.getElementById('edit-form');
    
    if (editFormPresent(formParent1, form) || editFormPresent(formParent2, form)) {
        const deleteForm = () => { 
            form.parentNode.removeChild(form);
        }
        deleteForm();
    } else {
        console.log('no prior edit form was detected');
    }
}


// Function to delete any existing ARE YOU SURE? popup
const removeExistingAreYouSure = () => {

    // check if edit form is currently present
    const areYouSurePresent = (parent, child) => {
        if (parent.contains(child)) {
            return true;
        } else {
            return false;
        }
    }

    // if already present, remove existing edit form
    const formParent1 = document.querySelector('.borrowedByMe');
    const formParent2 = document.querySelector('.borrowedFromMe');
    const popup = document.getElementById('edit-form_are_you_sure');
    
    if (areYouSurePresent(formParent1, popup) || areYouSurePresent(formParent2, popup)) {
        const deletePopup = () => { 
            popup.parentNode.removeChild(popup);
        }
        deletePopup();
    } else {
        console.log('no prior ARE YOU SURE popup was detected');
    }
}


// Function to identify item (when delete button is clicked)
const identifyItem = id => {
    state.dashboard.borrowedByMe.forEach(el => {
        if (el.id === id) {
            const index = state.dashboard.borrowedByMe.findIndex(el => el.id === id);
            this.borrowedByMe.splice(index, 1);
        }
    });
}

// Handle, delete and update borrowedByMe item events
elements.borrowedByMe.addEventListener('click', e => {
    
    // Handle the delete button
    if (e.target.matches('.item__delete, .item__delete *')) {
        
        let itemToDelete;
        const id = e.target.closest('.borrowedByMe__item').dataset.itemid;
        const checkItem = itemId => {
            state.dashboard.borrowedByMe.forEach(el => {
                if (el.id === itemId) {
                    itemToDelete = el;
                }
            });
            return itemToDelete;
        };
        // remove any existing ARE YOU SURE popup
        removeExistingAreYouSure();
        // render 'Are you sure?' popup
        dashboardView.renderAreYouSure(checkItem(id));
        console.log('itemToDelete: ' + itemToDelete);

        // if button 'Yes (Archive item)' is clicked
        document.getElementById('save_edit_btn').addEventListener('click', e => {
            
            console.log('item (fictionally?) archived');

            // Delete from state
            state.dashboard.deleteItem(id);

            // Delete from UI
            dashboardView.deleteItem(id);

            // Update number of items in UI
            heading2View.updateNumItemsFromMe();
        });

        // if button 'No (Keep item)' is clicked
        document.getElementById('cancel_edit_btn').addEventListener('click', e => {
            console.log('Item NOT deleted');
        });

    // handle the pencil button
    } else if (e.target.matches('#pencil')) {

        // remove any existing EDIT form
        removeExistingEditForm();

        // determine ID of original item
        const itemId = e.target.parentNode.parentNode.dataset.itemid;
       
        // find relevant item in dashboard items
        let itemToEdit;
        state.dashboard.borrowedByMe.forEach(el => {
            if (el.id === itemId) {
                itemToEdit = el;
                return itemToEdit;
            }
        });
        
        // display edit form
        dashboardView.renderEditForm(itemToEdit);

    } 
    // handle Cancel button
    else if (e.target.matches('.cancel')) {
        removeExistingEditForm();
        console.log('clicked Cancel button, removed edit form');
    }
    // handle Save button
    else if (e.target.matches('#save_edit_btn')) {
        console.log('Save Edit button clicked');
    }
    else {
        console.log('clicked somewhere else')
    }
});


// Handle, delete and update borrowedFromMe item events
elements.borrowedFromMe.addEventListener('click', e => {
    
    
    // Handle the delete button
    if (e.target.matches('.item__delete, .item__delete *')) {
        
        let itemToDelete;
        const id = e.target.closest('.borrowedFromMe__item').dataset.itemid;
        const checkItem = itemId => {
            state.dashboard.borrowedFromMe.forEach(el => {
                if (el.id === itemId) {
                    itemToDelete = el;
                }
            });
            return itemToDelete;
        };
        // remove any existing ARE YOU SURE popup
        removeExistingAreYouSure();
        // render 'Are you sure?' popup
        dashboardView.renderAreYouSure(checkItem(id));

        // if button 'Yes (Archive item)' is clicked
        document.getElementById('save_edit_btn').addEventListener('click', e => {
            
            console.log('item (fictionally?) archived');

            // Delete from state
            state.dashboard.deleteItem(id);

            // Delete from UI
            dashboardView.deleteItem(id);

            // Update number of items in UI
            heading2View.updateNumItemsFromMe();
        });

        // if button 'No (Keep item)' is clicked
        document.getElementById('cancel_edit_btn').addEventListener('click', e => {
            console.log('Item NOT deleted');
        });

        
    }
    // handle the pencil button
    else if (e.target.matches('#pencil')) {

        // remove any existing EDIT form
        removeExistingEditForm();

        // determine ID of original item
        const itemId = e.target.parentNode.parentNode.dataset.itemid;
       
        // find relevant item in dashboard items
        let itemToEdit;
        state.dashboard.borrowedFromMe.forEach(el => {
            if (el.id === itemId) {
                itemToEdit = el;
                return itemToEdit;
            }
        });
        
        // display edit form
        dashboardView.renderEditForm(itemToEdit);

        /*
        // prefill existing form values (previously saved)
        const whenValue = item => {
            if (item.when === 'not sure') {
                console.log('editWhenNotSure');
                document.getElementById('edit_when_not_sure').selected = true;
            } else {
                console.log('editBorrowedOn');
                document.getElementById('edit_borrowed_on').selected = true;
            }
        };
        console.log('itemToEdit is: ' + itemToEdit.desc);
        whenValue(itemToEdit);
        */

    } 
    // handle Cancel button
    else if (e.target.matches('.cancel')) {
        removeExistingEditForm();
        console.log('clicked Cancel button, removed edit form');
    }
    // handle Save button
    else if (e.target.matches('#save_edit_btn')) {
        console.log('Save Edit button clicked');
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
