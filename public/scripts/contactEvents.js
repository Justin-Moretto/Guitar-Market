const contactOwner = () => {
  let dropdown = `
  <div id="contact-slider">
    slide down
    <button class="btn btn-light btn-lg"  id="hide-contact">^</button>
    <button>Email</button>
    <button>SMS</button>
  </div>`
  $('header').prepend(dropdown)
  $('#contact-slider').hide();
}

$(document).ready(function() {
  $('#contact-slider').hide();

  $(document).on("click", ".contact-owner", function() {
    contactOwner();
    $('#contact-slider').slideDown('slow');
  });

  $(document).on('click', "#hide-contact", () => {
    $('#contact-slider').slideUp('slow');
  })
});

