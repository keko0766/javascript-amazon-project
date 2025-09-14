export let cart = []
const quantityElem = document.querySelector('.cart-quantity');
export function quantityUpdate(){ //Update item quantity
  let quantity = 0
  cart.forEach((item) => {
    quantity += item.quantity
  })
  quantityElem.innerHTML = quantity
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
      quantity
    })
  }
}