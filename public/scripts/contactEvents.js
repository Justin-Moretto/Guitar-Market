const contactOwner = (data) => {
  let dropdown = `
  <div id="contact-slider">
    <h2>Contact:</h2>
    <form method="POST" action="/twilioEmail">
    <p>
      ${data["0"].email}
      <button class="btn btn-success">Email</button>
    </p>
    </form>
    <p>
      1-800-267-2001
      <button class="btn btn-success">SMS</button>
    </p>
    <button class="btn btn-light btn-sm" id="hide-contact">
      <i class="fas fa-angle-up"></i>
      Hide Form
      <i class="fas fa-angle-up"></i>
    </button>
  </div>`
  $('header').prepend(dropdown)
  $('#contact-slider').hide();
}

$(document).ready(function() {

  let ownerEmail;
  let ownerId;

  $('#contact-slider').hide();

  $(document).on("click", ".contact-owner", function() {
    if ($(this).parents().find('#seller-id')["1"] !== undefined) {
      ownerId = $(this).parents().find('#seller-id')["1"].innerHTML
    } else {
      ownerId = $(this).parents().find('#seller-id')["0"].innerHTML
    }

    const obj = {
      seller_id: Number(ownerId)
      // traverse up tree, find the correct id and find the text in the object
    }
    console.log(obj)
    $.ajax({
      url: '/contactSeller',
      method: "POST",
      data: obj
    }).then((email) => {
      ownerEmail = email
      console.log(ownerEmail)
      contactOwner(ownerEmail);
    $('#contact-slider').slideDown('slow');
    })
  });

  $(document).on('click', "#hide-contact", () => {
    $('#contact-slider').slideUp('slow');
  })


});

