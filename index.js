let store = {customers: [], meals: [], deliveries: [], employers: []}

let customerId = 0
let mealId = 0
let employerId = 0
let deliveryId = 0

class Customer {
  constructor(name, employer = {}) {
    this.name = name
    this.id = customerId++
    this.employerId = employer.id
    store.customers.push(this)
  }

  meals() {
    let answer = this.deliveries().map(delivery => store.meals.filter(meal => delivery.mealId === meal.id))
    return [].concat.apply([], answer)
  }

  deliveries() {
    return store.deliveries.filter(delivery => delivery.customerId === this.id)
  }

  totalSpent() {
    const total = this.meals().reduce(function (currentTotal, meal) {
      return currentTotal + meal.price
    }, 0)
    return total
  }

}

class Meal {
  constructor(title, price) {
    this.title = title
    this.price = price
    this.id = mealId++
    store.meals.push(this)
  }

  deliveries() {
     return store.deliveries.filter(delivery => delivery.mealId === this.id)
  }

  customers() {
    let answer = this.deliveries().map(delivery => store.customers.filter(customer => delivery.customerId === customer.id))
    return [].concat.apply([], answer)
  }

  static byPrice() {
    let mealsOrdered = store.meals.slice()
    mealsOrdered.sort(function (a, b) {return b.price - a.price})
    return mealsOrdered
  }
}

class Delivery {
  constructor(meal = {}, customer= {}) {
    this.mealId = meal.id
    this.customerId = customer.id
    this.id = deliveryId++
    store.deliveries.push(this)
  }

  meal() {
    return store.meals.find(meal => meal.id === this.mealId)
  }

  customer() {
    return store.customers.find(customer => customer.id === this.customerId)
  }
}

class Employer {
  constructor(name) {
    this.name = name
    this.id = employerId++
    store.employers.push(this)
  }

  employees() {
    return store.customers.filter(customer => customer.employerId === this.id)//list of all customers employed by employer
  }

  deliveries() {
    //go through each employee, pull of an employee, get the deliveries
    let answer =  this.employees().map(employee => store.deliveries.filter(delivery => employee.id === delivery.customerId))
    return [].concat.apply([], answer)
  }

  meals() {
    let answer = this.deliveries().map(delivery => store.meals.filter(meal => meal.id === delivery.mealId))
    return [...new Set([].concat.apply([], answer))]
  }

  mealTotals() {
    const returnObj = {}

    for (let delivery of this.deliveries()) {
      //console.log(delivery);
      if (returnObj[delivery.mealId] === undefined) {
        returnObj[delivery.mealId] = 1
      }
      else {
        returnObj[delivery.mealId]++;
      }
    }
    return returnObj;
  }
}
