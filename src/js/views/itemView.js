import { elements } from './base';
import ItemList from '../models/ItemList';
import moment from 'moment';

export const displayForm = () => {
    
    // set minimum value for whenBackCal to today
    let today = moment().format('YYYY-MM-DD');
    elements.whenBackCal.min = today;    
    
    // Display form
    elements.form.style.display = 'block';
    
    // display Save and Erase buttons
    elements.buttonSaveItem.style.display = 'block';
    elements.buttonErase.style.display = 'block';
}

export const hideForm = () => {
    elements.buttonCreateItem.disabled = false;
    // elements.buttonCreateItem.style.display = 'none';
    elements.form.style.display = 'none';
    elements.buttonSaveItem.style.display = 'none';
    elements.buttonErase.style.display = 'none';
    elements.buttonCreateItem.style.background = '#44c767';
    elements.buttonCreateItem.style.border = 'block';
}

export const checkRequiredFields = () => {

    let check = false;

    if (elements.description.value === '') {
        alert('The "what" field is required');
        // return check;
    } else if (!elements.meBorrower.checked && !elements.notMeBorrower.checked || elements.notMeBorrower.checked && elements.notMeBorrowerInput.value === '') {
        elements.notMeBorrowerInput.style = 'border: 2px red solid';
        elements.notMeBorrowerInput.focus();
        alert('... but WHO is borrowing??');
        // return check;
    } else if (!elements.meOwner.checked && !elements.notMeOwner.checked && !elements.meBorrower.checked || elements.notMeOwner.checked && elements.notMeOwnerInput.value === '') {
        elements.notMeOwnerInput.style = 'border: 2px red solid';
        elements.notMeOwnerInput.focus();
        alert('... but who OWNS that shit??');
        // return check;
    } else if ((!elements.whenToday.checked && !elements.whenCalRadio.checked && !elements.whenNotSure.checked) ||  (elements.whenCal.value === '' && !elements.whenToday.checked && !elements.whenNotSure.checked)) {
        alert('When: Please select Date of Borrow or choose "Today" / "Not sure"');
        return;
    } else if ((!elements.whenBackCalRadio.checked && !elements.whenBackNotSure.checked) || (elements.whenBackCal.value === '' && !elements.whenBackNotSure.checked)) {
        alert('WhenBack: Please select Return Date or choose "Not sure"');
        // return check;
    } else {
        console.log('all entered values saved successfully');
        check = true;
        return check;   
    }
}

export const clearForm = () => {

    // Clear any current input values
    elements.description.value = '';
    elements.notMeBorrowerInput.value = '';
    elements.notMeOwnerInput.value = '';
    elements.whenCal.value = '';
    elements.whenBackCal.value = '';

    // Uncheck any radio buttons:
    // if they are checked
    if (elements.meBorrower.checked) elements.meBorrower.checked = false;
    if (elements.notMeBorrower.checked) elements.notMeBorrower.checked = false;
    if (elements.whenToday.checked) elements.whenToday.checked = false;
    if (elements.whenNotSure.checked) elements.whenNotSure.checked = false;
    if (elements.whenCalRadio.checked) elements.whenCalRadio.checked = false;
    if (elements.whenBackNotSure.checked) elements.whenBackNotSure.checked = false;
    if (elements.whenBackCalRadio.checked) elements.whenBackCalRadio.checked = false;

    // if they exist at all
    if (elements.meOwner) elements.meOwner.checked = false;
    if (elements.notMeOwner) elements.notMeOwner.checked = false;
    
}
