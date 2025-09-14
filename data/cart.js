export let cart = [
  {
    productId: '58b4fc92-e98c-42aa-8c55-b6b79996769a',
    quantity: 3
  }, 
  {
    productId: '3fdfe8d6-9a15-4979-b459-585b0d0545b9',
    quantity: 5
  }
]
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