$(document).ready(function() {
  $('#listing-slider').hide();

  $('#create_listing').on('click', () => {
    $('#listing-slider').slideDown('slow');
    visible = true;
  })

  $('#form-toggle').on('click', () => {
    $('#listing-slider').slideUp('slow');
  })
});
