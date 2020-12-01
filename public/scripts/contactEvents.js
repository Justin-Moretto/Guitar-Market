const contactOwner = (data) => {
  let dropdown = `
  <div id="contact-slider">
    slide down
    <button class="btn btn-light btn-lg"  id="hide-contact">^</button>
    <p>${data["0"].email}<p>
    <button>Email</button>
    <button>SMS</button>
  </div>`
  $('header').prepend(dropdown)
  $('#contact-slider').hide();
}

$(document).ready(function() {
  let ownerEmail;
  $('#contact-slider').hide();

  $(document).on("click", ".contact-owner", function() {
    const obj = {
      seller_id: Number(document.getElementById('seller-id').innerHTML)
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

