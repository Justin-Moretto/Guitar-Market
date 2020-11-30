$(document).ready(function() {
  $('#listing-slider').hide();

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
    let text = [];
    $('textarea').each(function() {
      text.push($(this).val())
    })
    console.log(text)
  })
});
