import { elements } from './base';

export const updateNumItemsByMe = () => {
    
    const markup = localStorage.borrowedByMe ? `Borrowed <br><i>by</i> me (${JSON.parse(localStorage.borrowedByMe).length}):` : 'Borrowed <br><i>by</i> me (0):';    
    elements.headingByMe.innerHTML = markup;
}

export const updateNumItemsFromMe = () => {
    const markup = localStorage.borrowedFromMe ? `Borrowed <br><i>from</i> me (${JSON.parse(localStorage.borrowedFromMe).length}):` : 'Borrowed <br><i>from</i> me (0):';
    elements.headingFromMe.innerHTML = markup;
}