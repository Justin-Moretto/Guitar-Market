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
  let $product = `
  <div class="card">
    <p id="seller-id" style="display: none">${escape(data.seller_id)}</p>
    <img src=${escape(data.img_url)} alt="Denim Jeans" style="width:100%">
    <div class='product-details'>
      <h1>${escape(data.name)}</h1>
      <p>${escape(data.description)}</p>
      <p class="price">$${escape(data.price) / 100}</p>
      <p class="mark-sold"><button type="submit" class="btn btn-primary btn-lg btn-sm">Mark As Sold</button></p>
      <p><button type="button" class="btn btn-danger">Delete Listing</button></p>
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
