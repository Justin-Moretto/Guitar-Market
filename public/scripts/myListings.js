//Scripts

$(document).ready(function() {
  $('#myListings').on('click', event => {
    event.preventDefault();
    $.ajax('/myListings', {
      method: 'POST',
      data: $('#myListings').serialize()
    }).then(res => {
      renderGuitars(res)
    })
  }
)}
)
