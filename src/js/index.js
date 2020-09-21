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
    elements.description.focus();
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


//      # # # # # # #
// When #  S A V E  # button is clicked
//      # # # # # # #
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
            elements.description.value,
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
            document.querySelector('.popuptext').classList.toggle('show');
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
        
        // Check if an item with the same ID already exists (identical or edited),
        // to prevent from rendering the same thing twice

        const identicalID1 = state.dashboard.borrowedByMe.filter(elem => elem.id === el.id);
        const identicalID2 = state.dashboard.borrowedFromMe.filter(elem => elem.id === el.id);

        if (identicalID1 || identicalID2) {
            state.dashboard.deleteItem(el.id);
        } else {            
            console.log('that itemID did not exist before');
        }
        // freshly add item to dashboard
        state.dashboard.addItem(el);

    });

    // Clear current dashboard UI (previously rendered)
    clearDashboard();

    // Render updated dashboard including the newly added item
    renderDashboard();
}

const clearDashboard = () => {
    // Remove current borrowedByMe items from dashboard UI
    while (elements.borrowedByMe.firstChild) {
        elements.borrowedByMe.removeChild(elements.borrowedByMe.lastChild);
    }
    // Remove current borrowedFromMe items from dashboard UI
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


// Function to reformat calendar datestrings (input format must be 'YYYY/MM/DD' (backslashes may be replaced, e.g. by '-'))
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

// Function UI feedback when user confirms to delete item
const feedbackArchiveItem = item => {
    // UI feedback popup: 'Item archived!':
    // 1. render popup
    dashboardView.renderItemArchivedPopup(item);
    // 2. apply animation to popup    
    const showPopup = () => {
        document.querySelector('.item_archived').classList.toggle('show');
    }  
    showPopup();
};



//                           ################                            
// Handle, delete and update # borrowedByMe # item events
//                           ################
elements.borrowedByMe.addEventListener('click', e => {
    
    // Handle DELETE button
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

        // when button 'YES (archive item)' is clicked
        document.getElementById('save_delete_btn').addEventListener('click', e => {

            // UI feedback
            feedbackArchiveItem(JSON.parse(JSON.stringify(itemToDelete)));
            console.log('archived item, stringified: ' + JSON.stringify(itemToDelete));

            // Delete from state
            state.dashboard.deleteItem(id);
            state.items.deleteItem(id);

            // Delete from UI
            dashboardView.deleteItem(id);

            // Update number of items in UI
            heading2View.updateNumItemsByMe();
        });

        // when button 'NO (keep item)' is clicked
        document.getElementById('cancel_delete_btn').addEventListener('click', e => {
            console.log('Item NOT deleted');
        });

    // handle PENCIL (edit) button
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
        
        // display EDIT form
        dashboardView.renderEditForm(itemToEdit);
        // focus on description field
        document.getElementById('desc_edit_byMe').focus();    
        // set cursor at end of existing input content
        const endPos = document.getElementById('desc_edit_byMe').value.length;
        document.getElementById('desc_edit_byMe').setSelectionRange(endPos, endPos); // startPos = endPos
        

    // functions to set dropdown / field values for BORROWER/OWNER (depending on itemToEdit values and clicks) 
    const meBorrowerNotOwnerEdit = () => {    
            document.getElementById('borrower_edit_me_byMe').selected = true;
            document.getElementById('borrower_edit_byMe').value = '';
            document.getElementById('owner_edit_not_me_but_byMe').selected = true;
            document.getElementById('borrower_edit_byMe').disabled = true;
            document.getElementById('owner_edit_byMe').disabled = false;
            document.getElementById('owner_edit_byMe').value = `${itemToEdit.owner === 'me' ? '' : itemToEdit.owner}`;
        } 

    const meOwnerNotBorrowerEdit = () => {
            document.getElementById('borrower_edit_not_me_but_byMe').selected = true;
            document.getElementById('owner_edit_byMe').value = '';
            document.getElementById('owner_edit_me_byMe').selected = true;
            document.getElementById('owner_edit_byMe').disabled = true;
            document.getElementById('borrower_edit_byMe').disabled = false;
            document.getElementById('borrower_edit_byMe').value = `${itemToEdit.borrower === 'me' ? '' : itemToEdit.borrower}`;
        }

    // function to read WHEN/WHENBACK value, en set the edit calendar to that value
    const dateOldFormat = calDate => {
        
        console.log('dateOldFormat: ' + calDate);

        const dateParts = calDate.split(' ');
        let monthNumber;

        const yearNumber = arr => {
            return arr[3];
        }

        const monthCalc = arr => {
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const monthDigits = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
            const itemMonth = arr[1];
            monthNames.forEach(el => {
                if (el === itemMonth) {
                   const index = monthNames.indexOf(el);
                   monthNumber = monthDigits[index];
                }   
            });
            return monthNumber;
        }

        const dayNumber = arr => {
            return arr[2].substr(0, 2);
        }

        // OUTPUT format: YYYY-MM-DD (= readable by HTML calendar, to set existing default date)
        // note: do not confuse OUTPUT format with DISPLAY format YYYY/MM/DD
        const oldFormat = `${yearNumber(dateParts)}-${monthCalc(dateParts)}-${dayNumber(dateParts)}`;
        return oldFormat;
    }

    /** 
     * EDIT FORM CONTROLLER 
     */

        // select default dropdown option for BORROWER / OWNER (depending on itemToEdit.borrower value)
        if (itemToEdit.borrower === 'me') {
            meBorrowerNotOwnerEdit();
        } else {
            meOwnerNotBorrowerEdit();
        }

        // select default date and dropdown option for WHEN (depending on itemToEdit.when value)
        if (itemToEdit.when === 'not sure') {
            document.getElementById('edit_when_not_sure_byMe').selected = true;
        } else {
            document.getElementById('edit_borrowed_on_byMe').selected = true;
            document.getElementById('when_cal_edit_byMe').disabled = false;
            document.getElementById('when_cal_edit_byMe').defaultValue = `${itemToEdit.when === 'not sure' ? '' : dateOldFormat(itemToEdit.when)}`;
        }

        // select default dropdown option for WHENBACK (depending on itemToEdit.whenBack value)
        if (itemToEdit.whenBack === 'not sure') {
            document.getElementById('edit_whenBack_not_sure_byMe').selected = true;
        } else {
            document.getElementById('edit_return_by_byMe').selected = true;
            document.getElementById('whenBack_cal_edit_byMe').disabled = false;
            document.getElementById('whenBack_cal_edit_byMe').defaultValue = `${itemToEdit.whenBack === 'not sure' ? '' : dateOldFormat(itemToEdit.whenBack)}`;
        }

        // Handle BORROWER dropdown / input field
        document.getElementById('borrower_edit_dropdown_byMe').addEventListener('change', e => {
            
            if (document.getElementById('borrower_edit_me_byMe').selected) {
               
                meBorrowerNotOwnerEdit();
                document.getElementById('owner_edit_byMe').focus();

            } else if (document.getElementById('borrower_edit_not_me_but_byMe').selected) {

                meOwnerNotBorrowerEdit();
                document.getElementById('borrower_edit_byMe').focus();

            }
        });

        // Handle OWNER dropdown / input field
        document.getElementById('owner_edit_dropdown_byMe').addEventListener('change', e => {
            if (document.getElementById('owner_edit_me_byMe').selected) {
               
                meOwnerNotBorrowerEdit();
                document.getElementById('borrower_edit_byMe').focus();

            } else if (document.getElementById('owner_edit_not_me_but_byMe').selected) {

                meBorrowerNotOwnerEdit();
                document.getElementById('owner_edit_byMe').focus();
            }
        });

        // Handle WHEN dropdown / input field
        document.getElementById('when_edit_dropdown_byMe').addEventListener('change', e => {
            if (document.getElementById('edit_when_not_sure_byMe').selected) {
                document.getElementById('when_cal_edit_byMe').value = '';
                document.getElementById('when_cal_edit_byMe').disabled = true;
            } else if (document.getElementById('edit_borrowed_on_byMe').selected) {
                document.getElementById('when_cal_edit_byMe').value = dateOldFormat(itemToEdit.when);
                document.getElementById('when_cal_edit_byMe').disabled = false;
            }
        });
        
        // Handle WHENBACK dropdown / input field
        document.getElementById('whenBack_edit_dropdown_byMe').addEventListener('change', e => {
            if (document.getElementById('edit_whenBack_not_sure_byMe').selected) {
                document.getElementById('whenBack_cal_edit_byMe').value = '';
                document.getElementById('whenBack_cal_edit_byMe').disabled = true;
            } else if (document.getElementById('edit_return_by_byMe').selected) {
                document.getElementById('whenBack_cal_edit_byMe').value = `${itemToEdit.whenBack === 'not sure' ? '' : dateOldFormat(itemToEdit.whenBack)}`;
                document.getElementById('whenBack_cal_edit_byMe').disabled = false;
            }
        });

    } 
    

    // handle CANCEL button
    else if (e.target.matches('.cancel')) {
        removeExistingEditForm();
        console.log('clicked Cancel button, removed edit form');
    }
    // handle SAVE button
    else if (e.target.matches('#save_edit_btn')) {
        
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

        console.log(state);        


    /**
    *  EDIT ITEM CONTROLLER
    */

        // Read BORROWER value
        const editBorrowerValue = () => {
            if (document.getElementById('borrower_edit_me_byMe').selected) {
                return 'me';
            } else {
                return document.getElementById('borrower_edit_byMe').value;
            }
        }

        // Read OWNER value
        const editOwnerValue = () => {
            if (document.getElementById('owner_edit_me_byMe').selected) {
                return 'me';
            } else {
                return document.getElementById('owner_edit_byMe').value;
            }
        }

        // Read WHEN value
        const editWhenValue = () => {
            if (document.getElementById('edit_when_not_sure_byMe').selected) {
                return 'not sure';
            } else {
                // convert date back to UI format
                return dateReformat(document.getElementById('when_cal_edit_byMe').value);
            }
        }
        
        // Read WHENBACK value
        const editWhenBackValue = () => {
            if (document.getElementById('edit_whenBack_not_sure_byMe').selected) {
                return 'not sure';
            } else {
                // convert date back to UI format 
                return dateReformat(document.getElementById('whenBack_cal_edit_byMe').value);
            }
        }

        // ########
        //   SAVE   edited item
        // ########
        state.items.editItem(
            itemToEdit.id,
            document.getElementById('desc_edit_byMe').value,
            editBorrowerValue(),
            editOwnerValue(),
            editWhenValue(),
            editWhenBackValue()
        )
        
        // Clear current dashboard (previously rendered)
        clearDashboard();

        // refresh dashboard including edited item
        controlDashboard();  
    }
    else {
        console.log('clicked somewhere else')
    }
});


//                           ##################
// Handle, delete and update # borrowedFromMe # item events
//                           ##################
elements.borrowedFromMe.addEventListener('click', e => {
    
    // Handle DELETE button
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

        // when button 'YES (archive item)' is clicked
        document.getElementById('save_delete_btn').addEventListener('click', e => {

            // UI feedback
            feedbackArchiveItem(JSON.parse(JSON.stringify(itemToDelete)));
            console.log('archived item, stringified: ' + JSON.stringify(itemToDelete));

            // Delete from state
            state.dashboard.deleteItem(id);
            state.items.deleteItem(id);

            // Delete from UI
            dashboardView.deleteItem(id);

            // Update number of items in UI
            heading2View.updateNumItemsFromMe();
        });

        // when button 'NO (keep item)' is clicked
        document.getElementById('cancel_delete_btn').addEventListener('click', e => {
            console.log('Item NOT deleted');
        });  
    }
    // handle PENCIL (edit) button
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
        
        // display EDIT form
        dashboardView.renderEditForm(itemToEdit);


     /** 
     * EDIT FORM CONTROLLER 
     */


        // select appropriate dropdown option by default (depending on itemToEdit.borrower value)
        if (itemToEdit.borrower === 'me') {
            document.getElementById('borrower_edit_me_fromMe').selected = true;
        } else {
            document.getElementById('borrower_edit_not_me_but_fromMe').selected = true;
        }

        // Handle BORROWER dropdown / input field
        document.getElementById('borrower_edit_dropdown_fromMe').addEventListener('change', e => {
            
            if (document.getElementById('borrower_edit_me_fromMe').selected) {
               
                document.getElementById('borrower_edit_fromMe').value = 'Me';
                document.getElementById('borrower_edit_fromMe').disabled = true;

            } else if (document.getElementById('borrower_edit_not_me_but_fromMe').selected) {

                document.getElementById('borrower_edit_fromMe').disabled = false;
                document.getElementById('borrower_edit_fromMe').value = `${itemToEdit.borrower}`;
                document.getElementById('borrower_edit_fromMe').focus();
            }
        });

        // Handle OWNER dropdown / input field
        document.getElementById('owner_edit_dropdown_fromMe').addEventListener('change', e => {
            if (document.getElementById('owner_edit_me_fromMe').selected) {
               
                document.getElementById('owner_edit_fromMe').value = 'Me';
                document.getElementById('owner_edit_fromMe').disabled = true;

            } else if (document.getElementById('owner_edit_not_me_but_fromMe').selected) {

                document.getElementById('owner_edit_fromMe').disabled = false;
                document.getElementById('owner_edit_fromMe').value = '';
                document.getElementById('owner_edit_fromMe').focus();
            }
        });


    } 
    // handle CANCEL button
    else if (e.target.matches('.cancel')) {
        removeExistingEditForm();
        console.log('clicked Cancel button, removed edit form');
    }
    // handle SAVE button
    else if (e.target.matches('#save_edit_btn')) {
        
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

        console.log(state);        


    /**
    *  EDIT ITEM CONTROLLER
    */

        // Read BORROWER value
        const editBorrowerValue = () => {
            if (document.getElementById('borrower_edit_me').selected) {
                return 'me';
            } else {
                return document.getElementById('borrower_edit').value;
            }
        }

        // Read OWNER value
        const editOwnerValue = () => {
            if (elements.meOwner.checked) {
                return 'me';
            } else {
                return elements.notMeOwnerInput.value;
            }
        }

        // Read WHEN value
        const editWhenValue = () => {
            try {
                if (!elements.whenToday.checked && !elements.whenNotSure.checked && !elements.whenCalRadio.checked || elements.whenCal.value === undefined) {
                    alert('Please select when the item was borrowed');
                    return
                } else if (elements.whenToday.checked) {
                        const now = moment().format('YYYY/MM/DD');
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
        const editWhenBackValue = () => {
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

        // ########
        //   SAVE   edited item
        // ########
        state.items.editItem(
            itemToEdit.id,
            document.getElementById('desc_edit').value,
            editBorrowerValue(),
            'the',
            'edited',
            'item!!'
        )
        
        // Clear current dashboard (previously rendered)
        clearDashboard();

        // refresh dashboard including edited item
        controlDashboard();  
    }
    else {
        console.log('clicked somewhere else')
    }

});


// Restore saved items from localStorage on page load
window.addEventListener('load', () => {
    state.dashboard = new Dashboard();
    state.items = new ItemList();

    // Restore items + numbers
    state.items.readStorage();
    state.dashboard.readStorage();
    heading2View.updateNumItemsByMe();
    heading2View.updateNumItemsFromMe();

    // Render all borrowed items to dashboard
    renderDashboard();
});


