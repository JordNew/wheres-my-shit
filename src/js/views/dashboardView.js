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

