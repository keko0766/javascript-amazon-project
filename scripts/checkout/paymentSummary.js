import { cart, quantityNum } from "../../data/cart.js";
import { getProductById } from "../../data/products.js";
import {getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";

export function renderPaymentSummary(){
  let productPriceCents = 0;
  let shipPriceCents = 0;
  cart.forEach(element => {
    const product = getProductById(element.productId);
    productPriceCents += product.priceCents * element.quantity;

    const deliveryOption = getDeliveryOption(element.deliveryId);
    shipPriceCents += deliveryOption.priceCents;
  });
  const totalBeforeTaxCents = productPriceCents + shipPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;
  console.log(productPriceCents);
  console.log(shipPriceCents);

  const paymentHtml = `
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${quantityNum()}):</div>
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

          <button class="place-order-button button-primary">
            Place your order
          </button>
  `

  document.querySelector('.payment-summary').innerHTML = paymentHtml;

}