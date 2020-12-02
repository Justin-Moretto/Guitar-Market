  $(document).on("click", "#mark-sold", function() {
    let product_id;
    if ($(this).parents().find('#product-id')["1"] !== undefined) {
      product_id = $(this).parents().find('#product-id')["1"].innerHTML
    } else {
      product_id = $(this).parents().find('#product-id')["0"].innerHTML
    }

    const obj = {
      product_id,
    }

    console.log(obj)
    $.ajax({
      url: '/sold',
      method: "POST",
      data: obj
    }).then(() => {
      location.reload();
    })
  })

