export const elements = {
    headingByMe: document.getElementById('heading__byMe'),
    headingFromMe: document.getElementById('heading__fromMe'),
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
    whenNotSure: document.getElementById('when_not_sure'),
    labelWhenNotSure: document.getElementById('label__when_not_sure'),
    whenCalRadio: document.getElementById('when_cal_radio'),
    labelBorrowedOn: document.getElementById('label__borrowed_on'),
    whenCal: document.getElementById('when_cal'),
    whenBackNotSure: document.getElementById('whenBack_not_sure'),
    labelWhenBackNotSure: document.getElementById('label__whenBack_not_sure'),
    whenBackCalRadio: document.getElementById('whenBack_cal_radio'),
    labelReturnItemBy: document.getElementById('label__return_item_by'),
    whenBackCal: document.getElementById('whenBack_cal'),
    goBack: document.querySelector('.btn__goback')  ,
    buttonCreateItem: document.querySelector('.btn__createItem'),
    buttonAddQ: document.querySelector('.btn__addQ'),
    buttonSaveItem: document.querySelector('.btn__saveItem'),
    borrowedByMe: document.querySelector('.borrowedByMe'),
    borrowedFromMe: document.querySelector('.borrowedFromMe'),
    borrowedByMeItem: document.querySelector('.borrowedByMe__item'),
    borrowedFromMeItem: document.querySelector('.borrowedFromMe__item')
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