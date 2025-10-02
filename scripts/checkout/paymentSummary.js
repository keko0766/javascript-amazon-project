import { cart } from "../../data/cart-class.js";
import { getProductById } from "../../data/products.js";
import {getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";
import { addOrder } from "../../data/orders.js";

export function renderPaymentSummary(){
  let productPriceCents = 0;
  let shipPriceCents = 0;
  cart.cartItems.forEach(element => {
    const product = getProductById(element.productId);
    productPriceCents += product.priceCents * element.quantity;

    const deliveryOption = getDeliveryOption(element.deliveryId);
    shipPriceCents += deliveryOption.priceCents;
  });
  const totalBeforeTaxCents = productPriceCents + shipPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;

  const paymentHtml = `
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cart.quantityNum()}):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shipPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>
  `

  document.querySelector('.payment-summary')
    .innerHTML = paymentHtml;

  document.querySelector('.js-place-order')
    .addEventListener('click', async () => {
      try {
        const response = await fetch('https://supersimplebackend.dev/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cart: cart
          })
        });
        const order = await response.json()
        addOrder(order)
      } catch (error){
        console.log('unexpected Error');
      }
      window.location.href = 'orders.html'
    })

}