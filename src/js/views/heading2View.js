import { elements } from './base';

export const updateNumItemsByMe = () => {
    
    const markup = `Borrowed <br><i>by</i> me (${JSON.parse(localStorage.borrowedByMe).length}):`;    
    elements.headingByMe.innerHTML = markup;
}

export const updateNumItemsFromMe = () => {
    const markup = `Borrowed <br><i>from</i> me (${JSON.parse(localStorage.borrowedFromMe).length}):`;
    elements.headingFromMe.innerHTML = markup;
}