$(document).ready(function() {
  $('#myFavorites').on('click', event => {
    event.preventDefault();
    $.ajax('/myFavorites', {
      method: 'POST',
      data: $('#myFavorites').serialize()
    }).then(res => {
      renderGuitars(res)
    })
  }
)}
)
