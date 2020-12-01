const contactOwner = (data) => {
  let dropdown = `
  <div id="contact-slider">
    Contact:
    <p>
      ${data["0"].email}
      <button>Email</button>
    <p>
    <p>
      1-800-267-2001
      <button>SMS</button>
    </p>
    <button class="btn btn-light btn-lg"  id="hide-contact">^</button>
  </div>`
  $('header').prepend(dropdown)
  $('#contact-slider').hide();
}

$(document).ready(function() {
  let ownerEmail;
  $('#contact-slider').hide();

  $(document).on("click", ".contact-owner", function() {
    const obj = {
      seller_id: Number($(this).parents().find('#seller-id')["1"].innerHTML)
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

