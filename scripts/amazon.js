import {cart} from '../data/cart.js';

let productsHTML = ``;
const quantityElem = document.querySelector('.cart-quantity');


function quantityUpdate(){ //Update item quantity
  let quantity = 0
  cart.forEach((item) => {
    quantity += item.quantity
  })
  quantityElem.innerHTML = quantity
}

products.forEach((product) => { // Adds a product block from json
  productsHTML += `
          <div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="images/ratings/rating-${product.rating.stars * 10}.png">
              <div class="product-rating-count link-primary">
                ${product.rating.count}
              </div>
            </div>

            <div class="product-price">
              $${product.priceCents / 10}
            </div>

            <div class="product-quantity-container">
              <select class="js-quatity-selector-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            <div class="product-spacer"></div>

            <div class="added-to-cart">
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <button class="add-to-cart-button button-primary" data-product-id="${product.id}">
              Add to Cart
            </button>
          </div>
  `
})
 
document.querySelector('.products-grid')
  .innerHTML = productsHTML

let isClick;

document.querySelectorAll('[data-product-id]') //Adds a product to cart onclick
  .forEach((button, index) => {
    button.addEventListener('click', () => {
      const {productId} = button.dataset

      let matchingItem;

      cart.forEach((item) => {
        if(item.productId === productId){
          matchingItem = item
        }
      })

      isClick = true

      addToCart(index, isClick)

      let quantity = Number(document.querySelector(`.js-quatity-selector-${productId}`).value)

      if(matchingItem){
        matchingItem.quantity += quantity
      } else{
        cart.push({
          productId,
          quantity
        })
      }
      quantityUpdate()
  })
})




function addToCart(index, isClick){
  const showAdd = document.querySelectorAll('.added-to-cart')
  showAdd[index].classList.add('is-show');
  if (isClick){
    setTimeout(() => {
    showAdd[index].className = 'added-to-cart';
    }, 1500);
    isClick = false;
  } 
}