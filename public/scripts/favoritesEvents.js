$(document).on("click", ".add", function() {
  $(this).css('display', "none")
  $(this.find('.rm').css('display', 'inline'))
  $(this).text('Remove from Favorites')

  if ($(this)["0"].innerHTML === 'Remove from Favorites') {
    let product_id;
    if ($(this).parents().find('#product-id')["1"] !== undefined) {
      product_id = $(this).parents().find('#product-id')["1"].innerHTML
    } else {
      product_id = $(this).parents().find('#product-id')["0"].innerHTML
    }

    const obj = {
      product_id,
    }
    // this will be the req body

    $.ajax({
      url: '/addFavorite',
      method: "POST",
      data: obj
    })

  } else {
    $(this).text('Add to Favorites')
    let product_id;
    if ($(this).parents().find('#product-id')["1"] !== undefined) {
      product_id = $(this).parents().find('#product-id')["1"].innerHTML
    } else {
      product_id = $(this).parents().find('#product-id')["0"].innerHTML
    }

    const obj = {
      product_id,
    }
    // this will be the req body

    $.ajax({
      url: '/rmFavorite',
      method: "POST",
      data: obj
    })
  }
});
