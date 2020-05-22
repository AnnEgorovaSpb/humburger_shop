class Hamburger {
    constructor(size, stuffing, ...toppings) {
        this.size = size;
        this.stuffing = stuffing;
        this.toppings = toppings; //массив
        this.allSizes = [];
        this.allStuffings = [];
        this.allToppings = [];
        this.totalPrice = 0;
        this.totalCalorie = 0;
        this._fetchSize(); // добавляет в массив объекты с размерами бургеров и их ценами и калориями
        this._fetchStuffing(); // добавляет в массив объекты с начинками бургеров и их ценами и калориями
        this.getSize(); // получает объект с размером выбранного бургера и вызывает методы подсчета цены и калорий
        this.getStuffing(); // получает объект с начинкой выбранного бургера и вызывает методы подсчета цены и калорий
        this.isTopping(); // проверяет, выбраны ли добавки к бургеру, вызывает метод добавления в массив объектов с добавками
    }

    _fetchSize() {
        this.allSizes = [
            {size: 'big', price: 100, calorie: 40},
            {size: 'small', price: 50, calorie: 20},
        ]
    }

    _fetchStuffing() {
        this.allStuffings = [
            {stuffing: 'cheese', price: 10, calorie: 20},
            {stuffing: 'salad', price: 20, calorie: 5},
            {stuffing: 'potato', price: 15, calorie: 10},
        ]
    }

    _fetchTopping() {
        this.allToppings = [
            {topping: 'spice', price: 15, calorie: 0},
            {topping: 'mayo', price: 20, calorie: 5},
        ]
    }

    getSize() {
        const sizeOdj = this.allSizes.find(product => product.size == this.size); // ищем объект с выбранным размером бургера
        this.calcPrice(sizeOdj); // вызываем метод подсчета общей стоимости
        this.calcCalories(sizeOdj); // вызываем метод подсчета общих калорий

        /* отказалась от этого варианта поиска объекта, т.к. хотела, чтобы перебор заканчивался после совпадения */
        // this.allSizes.forEach(product => {
        //     if(this.size == product.size) {
        //         this.totalPrice += product.price;
        //         this.totalCalorie += product.calorie;
        //     }
        // });
    }

    getStuffing() {
        const stuffOdj = this.allStuffings.find(product => product.stuffing == this.stuffing);
        this.calcPrice(stuffOdj);
        this.calcCalories(stuffOdj);
    }

    isTopping() {
        if(this.toppings.length != 0) { // если длина массива с добавками не равна 0
            this._fetchTopping(); // , то добавляем в массив объекты с добавками
            this.addToppings(); // вызываем метод добавления добавки
        }
    }

    addToppings() {
        this.toppings.forEach(top => {
            let topObj = this.allToppings.find(product => product.topping == top);
            this.calcPrice(topObj);
            this.calcCalories(topObj);
        });
    }

    removeTopping(delTop) { // метод удаления добавок, вызывается по необходимости(в качестве параметра строка с названием добавки)
        this.toppings = this.toppings.filter(el => el != delTop); // переписываем массив выбранных добавок
        let delToppingObj = this.allToppings.find(product => product.topping == delTop); // ищем объект с добавкой, кот. нужно удалить
        this.totalPrice -= delToppingObj.price; // изменяем общую стоимость
        this.totalCalorie -= delToppingObj.calorie; // изменяем общие калории
    }

    calcPrice(obj) {
        this.totalPrice += obj.price;
    }

    calcCalories(obj) {
        this.totalCalorie += obj.calorie;
    }
}

let order1 = new Hamburger('small', 'salad', 'spice', 'mayo');
order1.removeTopping('spice');
