$(document).ready(function() {
  $(document).on("click", "#delete-listing", function() {
    let product_id;
    if ($(this).parents().find('#product-id')["1"] !== undefined) {
      product_id = $(this).parents().find('#product-id')["1"].innerHTML
      $($(this).parents().find('.card')["1"]).css("display", "none")
    } else {
      product_id = $(this).parents().find('#product-id')["0"].innerHTML
      $($(this).parents().find('.card')["0"]).css("display", "none")
    }

    const obj = {
      product_id,
    }

    $.ajax({
      url: '/delete',
      method: "POST",
      data: obj
    })
  })
})
