$(document).on("click", ".favorite", function() {
  $(this).css('display', "none")
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
    }).then(() => {
      location.reload();
    })
});

$(document).on("click", ".rm", function() {
  $(this).css('display', "none")
  let product_id;
  console.log($(this).parents().find('#product-id'));
  if ($(this).parents().find('#product-id')["1"] !== undefined) {
    product_id = $(this).parents().find('#product-id')["1"].innerHTML
  } else {
    product_id = $(this).parents().find('#product-id')["0"].innerHTML
  }

  const obj = {
    product_id,
  }

  console.log(obj)

  // this will be the req body
  $.ajax({
    url: '/rmFavorite',
    method: "POST",
    data: obj
  }).then(() => {
    location.reload();
  })
})
