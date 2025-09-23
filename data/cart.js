import { getProductById } from "./products.js";

export let cart = JSON.parse(localStorage.getItem('cart')) || [
  {
    productId: '58b4fc92-e98c-42aa-8c55-b6b79996769a',
    quantity: 3, 
    deliveryId: '1'
  }, 
  {
    productId: '3fdfe8d6-9a15-4979-b459-585b0d0545b9',
    quantity: 5, 
    deliveryId: '1'
  },
  {
    productId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
    quantity: 1, 
    deliveryId: '1'
  }
]

function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart))
}

const quantityElem = document.querySelector('.cart-quantity');
export function quantityUpdate(){ //Update item quantity
  let num = quantityNum();
  if (num === 0){
    quantityElem.innerHTML = ''
  } else {

    quantityElem.innerHTML = num;
  }
}

export function quantityNum(){
  let quantity = 0;
  cart.forEach((item) => {
    quantity += item.quantity;
  })
  return quantity;
}

export function addToCart(productId, quantity){ //Adds item to cart
  let matchingItem;
  
  cart.forEach((item) => {//Checks item to copy
    if(item.productId === productId){
      matchingItem = item
    }
  })

  if(matchingItem){
    matchingItem.quantity += quantity
  } else{
    cart.push({
      productId,
      quantity,
      deliveryId: 1
    })
  }
  saveToStorage()
  quantityUpdate()
}



export function removeFromCart(deleteId) {
  cart = cart.filter(item => item.productId !== deleteId);
  saveToStorage() 
}

export function saveQuantityToCart(id, val){
  
  cart.forEach((item) => {
    if(item.productId === id){
      if(val>0){
        item.quantity=val
      }
    }
  })
  saveToStorage()
}

export function updateDeliveryOptions(productId, deliveryId){
  let matchingItem;
  
  cart.forEach((item) => {//Checks item to copy
    if(item.productId === productId){
      matchingItem = item
    }
  })

  matchingItem.deliveryId = deliveryId;
  saveToStorage();
}