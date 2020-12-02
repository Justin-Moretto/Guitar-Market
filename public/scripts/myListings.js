//Scripts

$(document).ready(function() {
  $('#myListings').on('click', event => {
    event.preventDefault();
    $.ajax('/myListings', {
      method: 'POST',
      data: $('#myListings').serialize()
    }).then(res => {
      renderListings(res)
    })
  }
)}
)

const createListing = (data) => {
  const disabled = (data.sold) ? `style="display: none"` : ``
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
      <p><button type="submit" class="btn btn-primary btn-lg btn-sm" id="mark-sold" ${disabled}>Mark As Sold</button></p>
      <p><button type="button" class="btn btn-danger" id="delete-listing">Delete Listing</button></p>
    </div>
  </div>
  `;
  return $product
};


const renderListings = (productData) => {
  $('.listings').empty();
  for (const product of productData) {
    const $product = createListing(product);
    $('.listings').prepend($product);
  }
};
