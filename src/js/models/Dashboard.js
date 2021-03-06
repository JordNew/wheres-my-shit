export default class Dashboard {
    constructor() {
        this.borrowedByMe = [];
        this.borrowedFromMe = [];
    }

    addItem(item) {
            
        if (item.borrower === 'me') {
            this.borrowedByMe.push(item);
    
            // Persist data in localStorage
            this.persistData();
            return item;
    
        } else {
            this.borrowedFromMe.push(item);
    
            // Persist data in localStorage
            this.persistData();
            return item;
        }
    }


    deleteItem(id) {

        // Delete from borrowedByMe ...
        this.borrowedByMe.forEach(el => {
            if (el.id === id) {
                const index = this.borrowedByMe.findIndex(el => el.id === id);
                this.borrowedByMe.splice(index, 1);
            }
        });

        // ... or delete from borrowedFromMe
        this.borrowedFromMe.forEach(el => {
            if (el.id === id) {
                const index = this.borrowedFromMe.findIndex(el => el.id === id);
                this.borrowedFromMe.splice(index, 1);
            }
        });
        
        // Persist data in localStorage
        this.persistData();
        
    }


    editItem(id) {
            
        if (item.borrower === 'me') {
            // this.borrowedByMe.push(item);
    
            // TODO

            // Persist data in localStorage
            this.persistData();
            return item;
    
        } else {
            // this.borrowedFromMe.push(item);
    

            // TODO

            // Persist data in localStorage
            this.persistData();
            return item;
        }
    }
    

    getNumItems() {
        const numBorrowedByMe = this.borrowedByMe.length;
        const numBorrowedFromMe = this.borrowedFromMe.length;
        return numBorrowedByMe, numBorrowedFromMe;
    }

    persistData() {
        localStorage.setItem('borrowedByMe', JSON.stringify(this.borrowedByMe));
        localStorage.setItem('borrowedFromMe', JSON.stringify(this.borrowedFromMe));
    }

    readStorage() {
        const storage1 = JSON.parse(localStorage.getItem('borrowedByMe'));
        const storage2 = JSON.parse(localStorage.getItem('borrowedFromMe'));
        
        // Restore borrowed items from the localStorage
        if (storage1) this.borrowedByMe = storage1;
        if (storage2) this.borrowedFromMe = storage2;
    }

}

