//Scripts

$(document).ready(function() {
  $('#myFavorites').on('click', event => {
    event.preventDefault();
    $.ajax('/myFavorites', {
      method: 'POST',
      data: $('#myFavorites').serialize()
    }).then(res => {
      renderFavorites(res)
    })
  }
)}
)

const createFavorite = (data) => {
  const disabled = (data.sold) ? `disabled` : ``
  const status = (data.sold) ? `<p class="sold">SOLD</p>` : `<p class="price">$${escape(data.price) / 100}</p>`
  let $product = `
  <div class="card">
    <p id="product-id" style="display: none">${escape(data.product_id)}</p>
    <p id="seller-id" style="display: none">${escape(data.seller_id)}</p>
    <img src=${escape(data.img_url)} alt="Denim Jeans" style="width:100%">
    <div class='product-details'>
      <h1>${escape(data.name)}</h1>
      <p>${escape(data.description)}</p>
      ${status}
      <p class="contact-owner"><button type="submit" class="btn btn-dark btn-lg btn-sm" ${disabled}>Contact Seller</button></p>
      <p><button type="button" class="btn btn-warning btn-lg btn-sm rm">Remove From Favorites</button></p>
    </div>
  </div>
  `;
  return $product
};


const renderFavorites = (productData) => {
  $('.listings').empty();
  for (const product of productData) {
    const $product = createFavorite(product);
    $('.listings').prepend($product);
  }
};
