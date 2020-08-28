import { elements } from './base';
import ItemList from '../models/ItemList';

export const displayForm = () => {
    
    // display form
    elements.form.style.display = 'block';
    
    // set calender default dates to today
    elements.whenCal.valueAsDate = new Date();
    elements.whenBackCal.valueAsDate = new Date();
    
    // set minimum value for whenBackCal to today
    let today = new Date();
    elements.whenCal.setAttribute('min', today);
    elements.whenBackCal.setAttribute('min', today);    

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

    if (elements.desc.value === '') {
        alert('The "what" field is required');
        // return check;
    } else if (!elements.meBorrower.checked && !elements.notMeBorrower.checked) {
        alert('... but WHO is borrowing??');
        // return check;
    } else if (!elements.meOwner.checked && !elements.notMeOwner.checked && !elements.meBorrower.checked) {
        alert('... but who OWNS that shit??');
        // return check;
    } else if (!elements.whenCal.value && !elements.whenNotSure.checked) {
        alert('When: Please select date or "not sure"');
        // return check;
    } else if (!elements.whenBackNotSure.value & !elements.whenBackNotSure.checked) {
        alert('WhenBack: Please select date or "not sure" "whenBack" field is required');
        // return check;
    } else {
        console.log('all entered values saved successfully');
        check = true;
        return check;   
    }
}

export const clearForm = () => {

    // Clear any current input values
    elements.desc.value = '';
    elements.notMeBorrowerInput.value = '';
    elements.notMeOwnerInput.value = '';
    elements.whenCal.value = '';
    elements.whenBackCal.value = '';

    // Uncheck any radio buttons:
    // if they are checked
    if (elements.meBorrower.checked) elements.meBorrower.checked = false;
    if (elements.notMeBorrower.checked) elements.notMeBorrower.checked = false;
    if (elements.whenNotSure.checked) elements.meBorrower.checked = false;
    if (elements.whenCalRadio.checked) elements.notMeBorrower.checked = false;
    if (elements.whenBackNotSure.checked) elements.meBorrower.checked = false;
    if (elements.whenBackCalRadio.checked) elements.notMeBorrower.checked = false;

    // if they exist at all
    if (elements.meOwner) elements.meOwner.checked = false;
    if (elements.notMeOwner) elements.notMeOwner.checked = false;
    
}
