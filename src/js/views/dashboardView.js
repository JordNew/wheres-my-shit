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
    // if (item) {
    //     console.log('item to delete')
    // } else {
    //     console.log('that did not work')
    // }
};

export const renderEditForm = item => {
    
    if (item.borrower === 'me') {

        let itemFormRendered = false;
        const markup = `
                <div class="form-popup" id="edit-form">
                    <form action="/action_page.php" class="form-container">
                        <h2><b>Edit item<b></h2>
    
                        <label for="what"><b>What got borrowed?</b></label>
                        <input type="text" id="desc_edit" name="desc_edit" value="${item.desc}" required>
    
                        <label for="who"><b>Who owns that shit?</b></label>
                        <input type="text" id="borrower_edit" name="borrower_edit" value="${item.owner}" required>
    
                        <button type="submit" class="btn">Save Changes</button>
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
                    <form action="/action_page.php" class="form-container">
                        <h2>Edit item</h2>
    
                        <label for="what">What got borrowed?</label>
                        <input type="text" id="desc_edit" name="desc_edit" value="${item.desc}" required>
    
                        <label for="who">Who is borrowing?</label>
                        <input type="text" id="borrower_edit" name="borrower_edit" value="${item.borrower}" required>

                        <label for="owner">Who owns that shit?</label>
                        <select name="owner" id="owner_edit">
                          <option value="me">Me</option>
                          <option value="not_me_but">Not me, but:</option>
                        </select>

                        <button type="submit" class="btn">Save Changes</button>
                        <button type="button" class="btn cancel">Cancel</button>
                    </form>
                </div>
    `;
        elements.borrowedFromMe.insertAdjacentHTML('afterbegin', markup);
        itemFormRendered = true;
        return itemFormRendered;

    }
};

