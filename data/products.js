import { formatCurrency } from "../scripts/utils/money.js";

let products = [];

class Product{
  id;
  image;
  name;
  rating;
  priceCents;
  constructor(productDetails){
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
  };
  ratingStars(){
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  };
  ratingCount(){
    return this.rating.count;
  };
  price(){
    return formatCurrency(this.priceCents);
  }
  extraHTML(){
    return "";
  }
}

class Clothes extends Product{
  sizeChartLink;
  constructor(productDetails){
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }
  extraHTML(){
    return `<a href="${this.sizeChartLink}" target="_blank">link</a>`
  }
}

export function loadProducts() {
  return fetch('https://supersimplebackend.dev/products')
    .then((response) => {
      return response.json();
      console.log('Response')
    })
    .then((productsData) => {
      products = productsData.map((productDetail) => {
        if (productDetail.type === "clothing") {
          return new Clothes(productDetail);
        }
        return new Product(productDetail);
      });
      return products;
    })
}

export function getProductById(productId){
  return products.find(product => product.id === productId);
}