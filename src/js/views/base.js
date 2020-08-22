export const elements = {
    createItem: document.querySelector('.create__item'),
    createForm: document.querySelector('.create__form'),
    form: document.querySelector('.form'),
    desc: document.getElementById('what'),
    meBorrower: document.getElementById('me__borrower'),
    notMeBorrower: document.getElementById('notMe__borrower'),
    notMeBorrowerInput: document.getElementById('borrower'),
    labelMeBorrower: document.getElementById('label__meBorrower'),
    labelNotMeBorrower: document.getElementById('label__notMeBorrower'),
    meOwner: document.getElementById('me__owner'),
    notMeOwner: document.getElementById('notMe__owner'),
    notMeOwnerInput: document.getElementById('owner'),
    labelMeOwner: document.getElementById('label__meOwner'),
    labelNotMeOwner: document.getElementById('label__notMeOwner'),
    when: document.getElementById('when'),
    whenBack: document.getElementById('whenBack'),
    goBack: document.querySelector('.btn__goback'),
    buttonCreateItem: document.querySelector('.btn__createItem'),
    buttonAddQ: document.querySelector('.btn__addQ'),
    buttonSaveItem: document.querySelector('.btn__saveItem'),
    borrowedByMe: document.querySelector('.borrowedByMe'),
    borrowedFromMe: document.querySelector('.borrowedFromMe')
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