$(document).on("click", ".favorite", function() {
  $(this).toggleClass('favorite-clicked')
  $(this).text(function(i, text) {
    return text === 'Remove from Favorites' ? "Add to Favorites" : "Remove from Favorites";
    // toggle text on click
  })

  if ($(this)["0"].innerHTML === 'Remove from Favorites') {
    let product_id;
    if ($(this).parents().find('#product-id')["1"] !== undefined) {
      product_id = $(this).parents().find('#product-id')["1"].innerHTML
    } else {
      product_id = $(this).parents().find('#product-id')["0"].innerHTML
    }

    const obj = {
      seller_id: product_id
    }
    // this will be the req body

    $.ajax({
      url: '/addFavorite',
      method: "POST",
      data: obj
    })

  } else {
    let product_id;
    if ($(this).parents().find('#product-id')["1"] !== undefined) {
      product_id = $(this).parents().find('#product-id')["1"].innerHTML
    } else {
      product_id = $(this).parents().find('#product-id')["0"].innerHTML
    }

    const obj = {
      seller_id: product_id
    }
    // this will be the req body

    $.ajax({
      url: '/rmFavorite',
      method: "POST",
      data: obj
    })
  }
});
