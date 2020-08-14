import uniqid from 'uniqid';

export default class Item {
    constructor() {
        this.properties = {
            id: '',
            desc: '',
            borrower: '',
            owner: '',
            when: '',
            whenBack: ''
        };
    }
}