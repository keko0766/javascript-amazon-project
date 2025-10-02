class Cart {
  cartItems;
  localStorageKeyf;
  
  constructor(localStorageKey){
    this.localStorageKey = localStorageKey;
    this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey)) || [];
  }

  saveToStorage(){
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems))
  };

  quantityUpdate(){
    
    let num = this.quantityNum();
    if (num === 0){
      return '';
    } else {
      return num;
    }
  };

  quantityNum(){
    let quantity = 0;
    this.cartItems.forEach((item) => {
      quantity += item.quantity;
    })
    return quantity;
  };

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
  };

  removeFromCart(deleteId) {
    this.cartItems = this.cartItems.filter(item => item.productId !== deleteId);
    this.saveToStorage() 
  };

  saveQuantityToCart(id, val){
    this.cartItems.forEach((item) => {
      if(item.productId === id){
        if(val>0){
          item.quantity=val
        }
      }
    })
    this.saveToStorage()
  };
  updateDeliveryOptions(productId, deliveryId){
    let matchingItem;
    
    this.cartItems.forEach((item) => {//Checks item to copy
      if(item.productId === productId){
        matchingItem = item
      }
    })

    matchingItem.deliveryId = deliveryId;
    this.saveToStorage();
  };
  loadCart(){
    fetch('https://supersimplebackend.dev/products').then((response) => {
      return response.json()
    }).then((classData) => {
      console.log(classData)
    })
  }
}

export const cart = new Cart('cart')