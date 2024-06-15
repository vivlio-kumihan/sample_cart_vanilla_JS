class TakeCartCalc {
  constructor(takeCartInstance) {
    this.cart = takeCartInstance.cart;
    this.result = this.orderedEachItemResult();
    // console.log(this.orderedEachItemResult);
  }

  orderedEachItemResult() {
    const order = [];

    // cart 内の各アイテムに対して処理を行う
    this.cart.forEach(itemObject => {
      // order に同じ品名が含まれていないかをチェック
      const isAlreadyInOrder = order.some(orderItem => orderItem["品名"] === itemObject.name);

      if (!isAlreadyInOrder) {
        // 内訳を格納するオブジェクト
        const orderTypeQuantityObj = {};

        // types を走査し、quantity が 0 でないものを内訳として追加
        itemObject.types.forEach(type => {
          if (type.quantity !== 0) {
            orderTypeQuantityObj[type.name] = type.quantity;
          }
        });

        const subQuantity = Object.values(orderTypeQuantityObj).reduce((sum, quantity) => sum + quantity, 0);
        const subtotal = parseFloat(itemObject.price) * subQuantity;
        order.push({ "品名": itemObject.name, "内訳": orderTypeQuantityObj, "小計": subQuantity > 0 ? subtotal : "―" });
      }
    });

    return order;
  }
}