import { elements } from './base';

export const renderItem = item => {
    
    // Render items borrowed BY me
    if (item.borrower === 'me') {

        const markup = `
        <li class="borrowedByMe__item" data-itemid=${item.id}>
            <button class="item__delete btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
            <button class="btn-tiny">
                <img src="img/pencil.svg" id="pencil">
            </button>
            <div class="borrowedByMe__item__text">
                <h1 class="item__title">${item.desc.length > 27 ? item.desc.slice(0, 23) + ' ... ' : item.desc}<span class="tooltiptext">${item.desc}</span></h1>
                
                <p><i>Borrowed from: ${item.owner}</i></p>
                <p><i>When: ${item.when}</i></p>
                <p><i>When to return: ${item.whenBack}</i></p>
            </div>
        </li>
    `;
    elements.borrowedByMe.insertAdjacentHTML('afterbegin', markup);

    }
    // Render items borrowed FROM me
    else {
     
        const markup = `
        <li class="borrowedFromMe__item" data-itemid=${item.id}>
            <button class="item__delete btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
            <button class="btn-tiny">
                <img src="img/pencil.svg" id="pencil">
            </button>
            <div class="borrowedByMe__item__text">
                <h1 class="item__title">${item.desc.length > 27 ? item.desc.slice(0, 23) + ' ... ' : item.desc}<span class="tooltiptext">${item.desc}</span></h1>
                <p><i>Borrowed by: ${item.borrower}</i></p>
                <p><i>When: ${item.when}</i></p>
                <p><i>When to return: ${item.whenBack}</i></p>
            </div>
        </li>
    `;
    elements.borrowedFromMe.insertAdjacentHTML('afterbegin', markup);
    }
};

export const deleteItem = id => {
    const item = document.querySelector(`[data-itemid="${id}"]`);
    if (item) item.parentElement.removeChild(item);
};

export const renderEditForm = item => {
    
    if (item.borrower === 'me') {

        let itemFormRendered = false;
        const markup = `
                <div class="form-popup" id="edit-form">
                    <form class="form-container">
                        <h2 id="edit_top">Edit item</h2>
    
                        <label for="what" class="edit_item_text_label">What got borrowed?</label>
                        <input type="text" class="edit_item_text" id="desc_edit" name="desc_edit" value="${item.desc}" required>
    
                        <label for="owner" class="edit_item_text_label">Who is borrowing?</label>
                        <select name="borrower" id="borrower_edit_dropdown">
                          <option value="me" id="borrower_edit_me">Me</option>
                          <option value="not_me_but" id="borrower_edit_not_me_but">Not me, but:</option>
                        </select>
                        <input type="text" class="edit_item_text" id="borrower_edit" name="owner_edit" disabled>
    
                        <label for="owner" class="edit_item_text_label">Who owns that shit?</label>
                        <select name="owner" id="owner_edit_dropdown">
                          <option value="me">Me</option>
                          <option value="not_me_but">Not me, but:</option>
                        </select>
                        <input type="text" class="edit_item_text" id="owner_edit" name="owner_edit" value="${item.owner === 'me' ? '' : item.owner}">

                        <label for="when" class="edit_item_text_label">When was it borrowed?</label>
                        <select name="when" id="when_edit_dropdown">
                          <option value="borrowed_on" id="edit_borrowed_on">Borrowed on:</option>
                          <option value="not_sure" id="edit_when_not_sure">Not sure</option>
                        </select>
                        <input type="text" class="edit_item_text" id="when_text_edit" name="when_edit" value="${item.when}">

                        <label for="whenBack" class="edit_item_text_label">When to return it?</label>
                        <select name="whenBack" id="whenBack_edit_dropdown">
                          <option value="return_by" id="edit_return_by">Return by:</option>
                          <option value="not_sure" id="edit_whenBack_not_sure">Not sure</option>
                        </select>
                        <input type="text" class="edit_item_text" id="whenBack_text_edit" name="whenBack_edit" value="${item.whenBack === 'not sure' ? 'Not sure' : item.whenBack}">

                        <button type="submit" class="btn" id="save_edit_btn">Save Changes</button>
                        <button type="button" class="btn cancel">Cancel</button>
                    </form>
                </div>
    `;
        elements.borrowedByMe.insertAdjacentHTML('afterbegin', markup);
        
        itemFormRendered = true;
        return itemFormRendered;

    } else {
        
        let itemFormRendered = false;
        const markup = `
                <div class="form-popup" id="edit-form">
                    <form class="form-container">
                        <h2 id="edit_top">Edit item</h2>
    
                        <label for="what" class="edit_item_text_label">What got borrowed?</label>
                        <input type="text" class="edit_item_text" id="desc_edit" name="desc_edit" value="${item.desc}" required>
    
                        <label for="owner" class="edit_item_text_label">Who is borrowing?</label>
                        <select name="borrower" id="borrower_edit_dropdown">
                          <option value="me">Me</option>
                          <option value="not_me_but">Not me, but:</option>
                        </select>
                        <input type="text" class="edit_item_text" id="borrower_edit" name="owner_edit" value="${item.borrower === 'me' ? '' : item.borrower}">

                        <label for="owner" class="edit_item_text_label">Who owns that shit?</label>
                        <select name="owner" id="owner_edit_dropdown">
                          <option value="me">Me</option>
                          <option value="not_me_but">Not me, but:</option>
                        </select>
                        <input type="text" class="edit_item_text" id="owner_edit" name="owner_edit" value="${item.owner === 'me' ? '' : item.owner}">

                        <label for="when" class="edit_item_text_label">When was it borrowed?</label>
                        <select name="when" id="when_edit">
                          <option value="today">Today</option>
                          <option value="borrowed_on">Borrowed on:</option>
                          <option value="not_sure">Not sure</option>
                        </select>
                        <input type="text" class="edit_item_text" id="when_edit" name="when_edit" value="${item.when}">

                        <label for="whenBack" class="edit_item_text_label">When to return it?</label>
                        <select name="whenBack" id="whenBack_edit">
                          <option value="today">Today</option>
                          <option value="return_by">Return by:</option>
                          <option value="not_sure">Not sure</option>
                        </select>
                        <input type="text" class="edit_item_text" id="whenBack_edit" name="whenBack_edit" value="${item.whenBack}">

                        <button type="submit" class="btn" id="save_edit_btn">Save Changes</button>
                        <button type="button" class="btn cancel">Cancel</button>
                    </form>
                </div>
    `;
        elements.borrowedFromMe.insertAdjacentHTML('afterbegin', markup);
        itemFormRendered = true;
        return itemFormRendered;

    }
};

export const renderAreYouSure = item => {

    if (item.borrower === 'me') {

        const markup = `
        <div class="form-popup" id="edit-form_are_you_sure">
            <p id="delete_item_desc">Delete "${item.desc.length > 27 ? item.desc.slice(0, 23) + ' ... ' : item.desc}"</p>
            <p id="edit_top_are_you_sure"><< Are you sure? >></p>
            <button type="submit" class="are_you_sure_button" id="save_edit_btn">YES<br>(archive item)</button>
            <button type="button" class="are_you_sure_button" id="cancel_edit_btn">NO<br>(keep item)</button>
        </div>
    `;
    elements.borrowedFromMe.insertAdjacentHTML('afterbegin', markup);
    deleteAreYouSure();
    }
    else {

        const markup = `
        <div class="form-popup" id="edit-form_are_you_sure">
            <p id="delete_item_desc">Delete "${item.desc.length > 27 ? item.desc.slice(0, 23) + ' ... ' : item.desc}"</p>
            <p id="edit_top_are_you_sure"><< Are you sure? >></p>
            <button type="submit" class="are_you_sure_button" id="save_edit_btn">YES<br>(archive item)</button>
            <button type="button" class="are_you_sure_button" id="cancel_edit_btn">NO<br>(keep item)</button>
        </div>
    `;
    elements.borrowedByMe.insertAdjacentHTML('afterbegin', markup);
    deleteAreYouSure();
    }    
};


const deleteAreYouSure = () => {
    // locate item
    const item = document.getElementById('edit-form_are_you_sure');
    
    // when 'YES (archive item)' button is clicked ...
    document.getElementById('save_edit_btn').addEventListener('click', e => {
        // remove the 'Are You Sure?' popup window
        item.parentElement.removeChild(item); 
        // ToDo: show "Item Archived" popup
    });
// ... or 'NO (keep item)' button is clicked
    document.getElementById('cancel_edit_btn').addEventListener('click', e => {
        // remove the 'Are You Sure?' popup window
        item.parentElement.removeChild(item);     
    });
    // NOTE: no need to check for presence; popup window is ALWAYS present as both the YES and NO buttons are part of it
};

