$(document).ready(function() {
  $('#form-search').on('submit', event => {
    event.preventDefault();

    //Remove console log when done
    console.log("Clicked HERE")
    //Remove console log when done

    $.ajax('/search', {
      method:'POST',
      data: $('#form-search').serialize()
    }).then(res => {
      //Remove console log when done
      console.log("RES HERE: ", res)
      //Remote console log when done
      renderGuitars(res)
    })
  })

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
