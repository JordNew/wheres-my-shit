import { elements } from './base';
import ItemList from '../models/ItemList';

export const displayForm = () => {
    
    elements.buttonCreateItem.disabled = true;
    elements.buttonCreateItem.style.display = 'none';
    elements.form.style.display = 'block';
    elements.buttonSaveItem.style.display = 'block';
    elements.goBack.style.display = 'block';

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
    } else if (elements.when.value === '') {
        alert('The "when" field is required');
        // return check;
    } else if (elements.whenBack.value === '') {
        alert('The "whenBack" field is required');
        // return check;
    } else {
        console.log('all fields were filled in successfully');
        // const item = new Item(
        //     elements.desc.value,
        //     elements.borrower.value,
        //     elements.owner.value,
        //     elements.when.value,
        //     elements.whenBack.value,
        // );
        // return item;
        // console.log(item);
        check = true;
        return check;   
    }
}

export const clearForm = () => {

    // Clear any text area inputs
    elements.desc.value = '';
    elements.notMeBorrowerInput.value = '';
    elements.notMeOwnerInput.value = '';
    elements.when.value = '';
    elements.whenBack.value = '';

    // Uncheck any radio buttons:
    // if they are checked
    if (elements.meBorrower.checked) elements.meBorrower.checked = false;
    if (elements.notMeBorrower.checked) elements.notMeBorrower.checked = false;
    // if they exist at all
    if (elements.meOwner) elements.meOwner.checked = false;
    if (elements.notMeOwner) elements.notMeOwner.checked = false;
    
}
