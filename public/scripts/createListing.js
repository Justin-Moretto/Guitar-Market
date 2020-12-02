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
    let text = [];
    $('input').each(function() {
      text.push($(this).val())
    })
    if (text[0] && text[1] && text[2] && text[3] && text[4]){
      $('#error-slider').slideUp('slow');
      let product = {
        name: text[0],
        price: Number(text[1] * 100),
        type: text[2],
        img_url: text[3],
        description: text[4]
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
