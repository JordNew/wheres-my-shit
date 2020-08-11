export const elements = {
    addItem: document.querySelector('.addItem'),
    buttonAddItem: document.querySelector('.btn__addItem')
};

export const renderItem = item => {
    const markup = `
        <li class="question" data-itemid=${item.id}>
            <p class="item__description">${item.desc}</p>
            <button class="item__delete btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </li>
    `;
    elements.shopping.insertAdjacentHTML('beforeend', markup);
};

export const deleteItem = id => {
    const item = document.querySelector(`[data-itemid="${id}"]`);
    if (item) item.parentElement.removeChild(item);
};