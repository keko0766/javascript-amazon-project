import {cart, quantityNum, removeFromCart, saveQuantityToCart, updateDeliveryOptions} from  "../../data/cart.js";
import {products, getProductById} from "../../data/products.js"
import {formatCurrency} from "../utils/money.js";
import { deliveryOptions, getDeliveryOption, deliveryDateFormatting } from "../../data/deliveryOptions.js";
import {renderPaymentSummary} from "./paymentSummary.js"
import {renderCheckoutHeader} from "./checkoutHeader.js"

const now = dayjs()

// console.log(now.format('YYYY-MM-DD HH:mm:ss'));
export function checkoutRender(){
  orderSummaryRender()

  function orderSummaryRender(){
    let cardSummaryHTML = '';
    
    cart.forEach((cartItem, index) => { //render
      const productId = cartItem.productId;
      
      const matchItem = getProductById(productId);
      
      if (!matchItem) {
        console.warn("Product not found for id:", productId);
        return; // пропустить, если товара нет
      }
      
      const deliveryOptionId = cartItem.deliveryId;
      const deliveryOption = getDeliveryOption(deliveryOptionId);
      const dateString = deliveryDateFormatting(deliveryOption)
      

      let list = `
            <div class="cart-item-container js-cart-item-container-${matchItem.id}">
              <div class="delivery-date">
                Delivery date: ${dateString}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchItem.image}">

                <div class="cart-item-details">
                  <div class="product-name">
                    ${matchItem.name}
                  </div>
                  <div class="product-price js-product-price-${matchItem.id}">
                    $${formatCurrency(matchItem.priceCents * cartItem.quantity)}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label js-quantity-label-${matchItem.id}">${cartItem.quantity}</span>
                    </span>
                    <span 
                      class="update-quantity-link link-primary"
                      data-js-update-link="${matchItem.id}"
                    >
                      Update
                    </span>
                    <input 
                      class="quantity-input 
                      js-quantity-input-${matchItem.id}"
                      type="number"
                      >
                    <span 
                      class="save-quantity-link link-primary"
                      data-js-save-link="${matchItem.id}">
                        Save
                    </span>
                    <span class="delete-quantity-link link-primary" data-delete-id="${matchItem.id}">
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${renderDeliveryDate(matchItem.id, cartItem.deliveryId)}
                </div>
              </div>
            </div>

            `
      cardSummaryHTML += list;
    })
      renderCheckoutHeader()
      document.querySelector('.order-summary').innerHTML = cardSummaryHTML
  }


  document.querySelectorAll('.delete-quantity-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const {deleteId} = link.dataset;
        removeFromCart(deleteId);
        renderCheckoutHeader()
        renderPaymentSummary();
        checkoutRender();
      })
    })

  document.querySelectorAll('.update-quantity-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.jsUpdateLink
        console.log(productId)

        const container = document.querySelector(`.js-cart-item-container-${productId}`)
        console.log(container)
        container.classList.add('is-editing-quantity');
      })
    })


  document.querySelectorAll('.save-quantity-link')
    .forEach((save) => {
      save.addEventListener('click', () => {
        saveQuantity(save)
      })
      save.addEventListener('keydown', (event) => {
        if(event.key === 'Enter'){
          saveQuantity(save)
        }
      })
      renderCheckoutHeader();
    })
  // data-js-update-link="${matchItem.id}

  function saveQuantity(save){
    const productId = save.dataset.jsSaveLink
    const inputVal = Number(document.querySelector(`.js-quantity-input-${productId}`).value)
    const container = document.querySelector(`.js-cart-item-container-${productId}`)

    if (inputVal > 0){
      container.classList.remove('is-editing-quantity');
      
      saveQuantityToCart(productId, inputVal);
      updateCountAndPrice(productId, inputVal);
      renderCheckoutHeader();
      renderPaymentSummary();
    }
  }

  function updateCountAndPrice(id, quantity){
    const quantityElem = document.querySelector(`.js-quantity-label-${id}`)
    const priceElem = document.querySelector(`.js-product-price-${id}`)
    const matchingItem = products.find((product) => product.id === id)

    quantityElem.innerHTML = quantity;
    priceElem.innerHTML = `$${formatCurrency(matchingItem.priceCents * quantity)}`

  }

  function renderDeliveryDate(id, cartItemId){
    let html = ''
    deliveryOptions.forEach((item) => {
      const isChecked = item.id === cartItemId;
      const dateString = deliveryDateFormatting(item)
      const priceString = item.priceCents === 0
      ? 'FREE'
      : `$${formatCurrency(item.priceCents)} - `;
      html += `
                  <div class="delivery-option js-delivery-option"
                    data-product-id="${id}"
                    data-delivery-id="${item.id}"
                  >
                    <input type="radio" 
                      ${isChecked ? 'checked' : ''}
                      class="delivery-option-input"
                      name="delivery-option-${id}">
                    <label>
                      <div class="delivery-option-date">
                        ${dateString}
                      </div>
                      <div class="delivery-option-price">
                        ${priceString} Shipping
                      </div>
                    </label>
                  </div>
      `
    })
    return html
  }

  document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
      element.addEventListener('click', () => {
        const {productId, deliveryId} = element.dataset;
        updateDeliveryOptions(productId, deliveryId);
        checkoutRender()
      })
    })

  renderPaymentSummary()
}
