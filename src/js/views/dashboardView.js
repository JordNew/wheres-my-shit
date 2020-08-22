import { elements } from './base';

export const renderItem = item => {
    
    // Render items borrowed BY me
    if (item.borrower === 'me') {

        const markup = `
        <li class="borrowedByMe__item" data-itemid=${item.id}>
            <div class="borrowedByMe__count">
                <p>Item: ${item.desc}</p>
                <p>Owner: ${item.owner}</p>
                <p>Date: ${item.when}</p>
                <p>When to return: ${item.whenBack}</p>
            </div>
            <button class="item__delete btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </li>
    `;
    elements.borrowedByMe.insertAdjacentHTML('beforeend', markup);

    }
    // Render items borrowed FROM me
    else {
     
        const markup = `
        <li class="borrowedFromMe__item" data-itemid=${item.id}>
            <div class="borrowedByMe__count">
                <p>Item: ${item.desc}</p>
                <p>Borrowed by: ${item.borrower}</p>
                <p>Date: ${item.when}</p>
                <p>When to return: ${item.whenBack}</p>
            </div>
            <button class="item__delete btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </li>
    `;
    elements.borrowedFromMe.insertAdjacentHTML('beforeend', markup);

    }
};

export const deleteItem = id => {
    const item = document.querySelector(`[data-itemid="${id}"]`);
    if (item) item.parentElement.removeChild(item);
};

