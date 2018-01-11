class Meal {
  let id = 0

  constructor(title, price) {
    this.title = title
    this.price = price
    this.id = id++
  }

  deliveries() {
    return [] //array of all deliveries this meal has been part of
  }

  customers() {
    return [] //customers that have had this meal delivered
  }

  static byPrice() {
    return []//all meals ordered by price
  }
}

class Delivery {
  let id = 0

  constructor(meal, customer) {
    this.mealId = meal.id
    this.customerId = customer.id
    this.id = id++
  }

  meal() {
    return {}//meal associated with delivery
  }

  customer() {
    return {}//customer associated with delivery
  }
}

class Employer {
  let id = 0

  constructor(name) {
    this.name = name
    this.id = id++
  }

  employees() {
    return []//list of all customers employed by employer
  }

  deliveries() {
    return []//list of deliveries ordered by emplyees
  }

  meals() {
    return []//list of meals ordered by employers employees, dont return same multiple times
  }

  mealTotals() {
    return {}//js object displaying meal id of employers employees {mealId: timesOrders, etc...}
  }
}
