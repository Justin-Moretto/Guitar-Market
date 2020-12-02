const contactOwner = (data) => {
  let dropdown = `
  <div id="contact-slider">
    <h2>Contact:</h2>
    <form method="POST" action="/twilioEmail" id="twilio_email_wrapper">
    <input type="text" placeholder="Email the owner" name="${data["0"].email}">
      ${data["0"].email}
      <button class="btn btn-success">Send Email</button>
    </form>
    <form method="POST" action="/twilioSMS" id="twilio_email_wrapper">
      <input type="text" name="twilio-sms" placeholder="Text the owner">
      <button class="btn btn-success">Send SMS</button>
    </form>
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
      contactOwner(ownerEmail);
    $('#contact-slider').slideDown('slow');
    })
  });

  $(document).on('click', "#hide-contact", () => {
    $('#contact-slider').slideUp('slow');
  })


});

