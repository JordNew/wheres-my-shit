import { elements } from './base';

export const renderQuestions = () => {
    
    const questions = [
        " ... what got borrowed?",
        "Who is borrowing?",
        "Who owns that shit?",
        "When was this borrowed?",
        "When to return it?"
    ];

    // Render question top
    const markup = `
        <br><br><br>
        <button class="btn__goback" onclick="location.reload();"><<</button>
        <br><br><br><br>
        <label class="question">So ... </label><br>
        <br>
        `;
        elements.addItem.insertAdjacentHTML('beforeend', markup);
    
    // Render questions
    questions.forEach(el => {
        const markup = `
        <form class="form">
            <label class="question">${el}<span class="required"> *</span></label><br>
            <textarea rows="4" cols="50"></textarea><br><br>
        </form>
        `;
        elements.addItem.insertAdjacentHTML('beforeend', markup);
    }); 

    // Render Save button
    const save = `
        <label><span> </span><input type="submit" value="Save" class="btn btn__addItem" /></label>
    `;
    elements.addItem.insertAdjacentHTML('beforeend', save);
}