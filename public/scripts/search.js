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

  // $('#search-guitars').click(function() {
  //   $('new-search').slideDown('slow').css('display', 'flex')
  // })

  $('#search-guitars').on('click', event => {
    event.preventDefault();
    $('#form-search').slideToggle().css('display', 'flex')
  })

  $('#clear-button').on('click', event => {
    event.preventDefault();
    $('#new-search_price').val('')
    $('#new-search_type').val('')
    $('#new-search_name').val('')
    loadProducts();
    $('#form-search').slideToggle('slow').css('display', 'none')
  })
});

const renderGuitars = (productData) => {
  $('.listings').empty();
  for (const product of productData) {
    const $product = createProduct(product);
    $('.listings').prepend($product);
  }
};
