$(document).ready(function() {
  loadProducts();
  $('#listing-slider').hide();
  $('#error-slider').hide();

  $('#create_listing').on('click', () => {
    $('#listing-slider').slideDown('slow');
  })

  $('#form-toggle').on('click', () => {
    $('#listing-slider').slideUp('slow');
    $('#error-slider').hide();
    // clear the text area
  })

  $('#add-listing').on('submit', event => {
    event.preventDefault();
    let text = [1];
    $('input').each(function() {
      text.push($(this).val())
    })
    if (text[1] && text[2] && text[3] && text[4] && text[5]){
      $('#error-slider').slideUp('slow');
      let product = {
        seller_id: text[0],
        name: text[1],
        price: Number(text[2] * 100),
        type: text[3],
        img_url: text[4],
        description: text[5]
      }

      $.ajax({
        url: '/newProduct',
        method: "POST",
        data: product
      })
      loadProducts();
      $('#listing-slider').slideUp('slow');
      loadProducts();
      loadProducts();
      loadProducts();
      loadProducts();
      loadProducts();
      // preventitive measure since the website wont cooperate
    } else {
      $("#error-message").text('No Boxes Should Be Left Empty');
      $('#error-slider').slideDown('slow');
    }
  })
});


