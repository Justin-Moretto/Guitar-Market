$(document).ready(function() {
  $('#form-search').on('submit', event => {
    event.preventDefault();
    console.log("Clicked HERE")

    $.ajax('/search', {
      method:'POST',
      data: $('#form-search').serialize()
    }).then(res => {
      console.log("RES HERE: ", res)
      renderGuitars(res)
    })
  })

  $('#clear-button').on('click', event => {
    event.preventDefault();
    $('#new-search_price').val('')
    $('#new-search_type').val('')
    $('#new-search_name').val('')
    loadProducts();
  })
});

const renderGuitars = (productData) => {
  $('.listings').empty();
  for (const product of productData) {
    const $product = createProduct(product);
    $('.listings').prepend($product);
  }
};
