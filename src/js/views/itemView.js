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
    } else if (elements.borrower.value === '') {
        alert('The "who" field is required');
        // return check;
    } else if (elements.owner.value === '') {
        alert('The "owner" field is required');
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
    elements.desc.value = '';
    elements.borrower.value = '';
    elements.owner.value = '';
    elements.when.value = '';
    elements.whenBack.value = '';
}


//     const markup = `
//         <br><br>
//         <label class="question__top">So ... </label><br>
//         <br><br>
//         <form class="create__form">
//             <label class="question">... what got borrowed?<span class="required"> *</span></label><br>
//             <textarea id="what" rows="4" cols="50"></textarea><br><br>
//             <label class="question">Who is borrowing?<span class="required"> *</span></label><br>
//             <textarea id="borrower" rows="4" cols="50"></textarea><br><br>
//             <label class="question">Who owns that shit?<span class="required"> *</span></label><br>
//             <textarea id="owner" rows="4" cols="50"></textarea><br><br>
//             <label class="question">When was it borrowed?<span class="required"> *</span></label><br>
//             <textarea id="when" rows="4" cols="50"></textarea><br><br>
//             <label class="question">When to return it?<span class="required"> *</span></label><br>
//             <textarea id="whenBack" rows="4" cols="50"></textarea><br><br>
//         </form>
        
//         `;
//     elements.createItem.insertAdjacentHTML('afterbegin', markup);
// };

// export const renderForm = () => {
    
//     const markup = `
//         <br><br><br>
//         <label class="question__top">So ... </label><br>
//         <br><br>
//         <form><div class="create__form"></div></form>
//         `;
//     elements.createItem.insertAdjacentHTML('beforeend', markup);
// };

// export const renderQuestions = () => {
    
//     const questions = [
//         " ... what got borrowed?",
//         "Who is borrowing?",
//         "Who owns that shit?",
//         "When was it borrowed?",
//         "When to return it?"
//     ];
    
//     const formElements = [];

//     // Render questions onto form
//     questions.forEach(el => {
//         const markup = `
//         <label class="question">${el}<span class="required"> *</span></label><br>
//         <textarea rows="4" cols="50"></textarea><br><br>
//         `;
    
//     // elements.createForm.insertAdjacentHTML('beforeend', markup);
    
//     formElements.push(markup);
//     }); 

//     // Inject questions into form
//     formElements.forEach(el => {
//         elements.createItem.insertAdjacentHTML('beforeend', el);
//     });

//     // Render Back button and Save button
//     const save = `
//         <button class="btn__goback" onclick="location.reload();"><<</button>
//         <button type="submit" class="btn btn__saveItem" />Save</button>
//     `;
//     elements.createForm.insertAdjacentHTML('beforeend', save);