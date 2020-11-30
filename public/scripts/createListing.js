const submitProduct = (data) => {
  return $.ajax({
    method: "POST",
    url: "/guitars",
    data,
  });
}

$(document).ready(function() {
  $('#listing-slider').hide();
  $('#error-slider').hide();

  $('#create_listing').on('click', () => {
    $('#listing-slider').slideDown('slow');
    visible = true;
  })

  $('#form-toggle').on('click', () => {
    $('#listing-slider').slideUp('slow');
    // clear the text area
  })

  $('#add-listing').on('submit', event => {
    event.preventDefault();
    let text = [1];
    $('input').each(function() {
      text.push($(this).val())
    })
    if (!text[1] || !text[2] || !text[3] || !text[4] || !text[5]){
      $("#error-message").text('No Boxes Should Be Left Empty');
      $('#error-slider').slideDown('slow');
    } else {
      $('#error-slider').slideUp('slow');
      let product = {
        seller_id: text[0],
        name: text[1],
        price: Number(text[2]),
        type: text[3],
        img_url: text[4],
        description: text[5]
      }
      console.log(product)
      submitProduct(product).then(() => {
        loadProducts();
      })
    }
  })
});
