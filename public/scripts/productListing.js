const escape = function(str) {
  // avoid js style inputs affecting the code
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createProduct = (data) => {
  let $product = `
  <div class="card">
    <img src=${escape(data.img_url)} alt="Denim Jeans" style="width:100%">
    <div class='product-details'>
      <h1>${escape(data.name)}</h1>
      <p>${escape(data.description)}</p>
      <p class="price">$${escape(data.price) / 100}</p>
      <p class="contact-owner"><button type="submit" class="btn btn-dark btn-lg btn-sm">Contact Seller</button></p>
      <p><button type="button" class="btn btn-warning btn-lg btn-sm favorite">Add to Favorties</button></p>
    </div>
  </div>
  `;
  return $product
};

const renderProducts = (productData) => {
  for (const product of productData.guitars) {
    const $product = createProduct(product);
    $('.listings').prepend($product);
  }
};

const loadProducts = () => {
  $.ajax('/api/guitars', {
    method:'GET'
  }).then(res => {
    $('.listings').empty();
    renderProducts(res);
  })
};



$(document).ready(function() {
  loadProducts()
});
