const escape =  function(str) {
  // avoid js style inputs affecting the code
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

