var urlInput = document.querySelector('#url');
var $img = document.querySelector('img');

function handleInput(event) {
  $img.setAttribute('src', urlInput.value);
}

urlInput.addEventListener('input', handleInput);
