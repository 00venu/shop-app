import moment, * as moments from "moment";

class Order {
  constructor(id, items, totalPrice, date) {
    this.id = id;
    this.items = items;
    this.totalPrice = totalPrice;
    this.date = date;
  }

  get formateDate() {
    return moment(this.date).format("MMMM Do YYYY, hh:mm");
  }
}

export default Order;
