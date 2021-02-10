const escape = function(str) {
  // avoid js style inputs affecting the code
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const disable = () => {
    console.log($(this).find('button'))
  }

const createProduct = (data) => {
  //console.log(data);
  let favButton;
  const visible = (data.user_id === null) ? `disabled` : ``
  const userProductTrue = (data.current_user === data.seller_id) ? `style="display: none"` : ``
  const disabled = (data.sold) ? `disabled` : ``
  const status = (data.sold) ? `<p class="sold">SOLD</p>` : `<p class="price">$${escape(data.price) / 100}</p>`;


  if (data.fave_id === null) {
    favButton = `<button type="button" class="btn btn-warning btn-lg btn-sm favorite" ${disabled} ${visible}>Add to Favorties</button>`;
  } else {
    favButton = `<button type="button" class="btn btn-warning btn-lg btn-sm rm favorite-clicked" ${disabled} ${visible}>Remove from Favorites</button>`
  }

  let $product = `
  <div class="card">
    <p id="product-id" style="display: none">${escape(data.product_id)}</p>
    <p id="seller-id" style="display: none">${escape(data.seller_id)}</p>
    <img src=${escape(data.img_url)} alt="Air Guitar">
    <div class='product-details'>
      <h1><b>${escape(data.name)}</b></h1>
      <p>${escape(data.description)}</p>
      ${status}
      <p class="contact-owner"><button type="submit" class="btn btn-dark btn-lg btn-sm" ${userProductTrue} ${disabled} ${visible} >Contact Seller</button></p>
      <p> ${favButton} </P>
      </div>
  </div>
  `;
  return $product
};

const renderProducts = (productData) => {
  for (const product of productData.guitars) {
    // do the favorites check here
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
