import { checkoutRender } from "./checkout/orderSummary.js";
import {renderPaymentSummary} from "./checkout/paymentSummary.js";
import '../data/backend-practice.js';
import { loadProducts } from "../data/products.js";
import { cart } from "../data/cart-class.js";

// loadProducts(() => {
//   cart.loadCart()
//   checkoutRender()
//   renderPaymentSummary()
// })

/*

new Promise((resolve) => {
  loadProducts(() => {
    resolve() 
  });
}).then(() => {
  checkoutRender()
  renderPaymentSummary() 
})
*/

// new Promise((resolve) => {
//   loadProducts(() => resolve());
// }).then(() => {
//   return new Promise((resolve) => {
//     cart.loadCart()
//   })
// }).then(() => {
//   checkoutRender();
//   renderPaymentSummary();
// })

// Promise.all([
//   loadProducts(),
//   new Promise((resolve) => cart.loadCart(() => resolve()) )
// ]).then(() => {
//   checkoutRender();
//   renderPaymentSummary();
// })

async function loadPage() {
  console.log('load page');
  await loadProducts();
  new Promise((resolve) => {
    cart.loadCart(() => {
      resolve()
    })
  })
  checkoutRender();
  renderPaymentSummary();
}
loadPage()