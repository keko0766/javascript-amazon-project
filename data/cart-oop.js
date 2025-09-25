export let cart = {
  cartItems: JSON.parse(localStorage.getItem('cart')) || [],
  saveToStorage(){
    localStorage.setItem('cart-oop', JSON.stringify(this.cartItems))
    console.log(localStorage.getItem('cart-oop'))
  },
  quantityUpdate(){
    const quantityElem = document.querySelector('.cart-quantity');
    let num = this.quantityNum();
    if (num === 0){
      quantityElem.innerHTML = ''
    } else {
      quantityElem.innerHTML = num;
    }
  },
  quantityNum(){
    let quantity = 0;
    this.cartItems.forEach((item) => {
      quantity += item.quantity;
    })
    return quantity;
  },
  addToCart(productId, quantityItems){ //Adds item to cart
    const quantity = quantityItems || 1
    let matchingItem;
    
    this.cartItems.forEach((item) => {//Checks item to copy
      if(item.productId === productId){
        matchingItem = item
      }
    })
  
    if(matchingItem){
      matchingItem.quantity += quantity
    } else{
      this.cartItems.push({
        productId,
        quantity,
        deliveryId: '1'
      })
    }
    this.saveToStorage()
    this.quantityUpdate()
  },
  removeFromCart(deleteId) {
    this.cartItems = this.cartItems.filter(item => item.productId !== deleteId);
    saveToStorage() 
  },
  saveQuantityToCart(id, val){
    this.cartItems.forEach((item) => {
      if(item.productId === id){
        if(val>0){
          item.quantity=val
        }
      }
    })
    saveToStorage()
  },
  updateDeliveryOptions(productId, deliveryId){
    let matchingItem;
    
    this.cartItems.forEach((item) => {//Checks item to copy
      if(item.productId === productId){
        matchingItem = item
      }
    })

    matchingItem.deliveryId = deliveryId;
    saveToStorage();
  }
}
console.log(cart.cartItems)

cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 2)

console.log(cart.cartItems)
