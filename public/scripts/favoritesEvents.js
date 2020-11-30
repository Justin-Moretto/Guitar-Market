$(document).on("click", ".favorite", function() {
  $(this).toggleClass('favorite-clicked')
  $(this).text(function(i, text) {
    return text === 'Remove from Favorites' ? "Add to Favorites" : "Remove from Favorites";
    // toggle text on click
  })
});
