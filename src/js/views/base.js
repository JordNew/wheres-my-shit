export const elements = {
    addItem: document.querySelector('.addItem'),
    goBack: document.querySelector('.btn__goback'),
    buttonAddItem: document.querySelector('.btn__addItem')
};

export const questions = [
        "What got borrowed?",
        "Who is borrowing?",
        "Who owns that shit?",
        "When was this borrowed?",
        "When to return it?"
    ];

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