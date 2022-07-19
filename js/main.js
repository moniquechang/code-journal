var $urlInput = document.querySelector('#url');
var $img = document.querySelector('img');

function handleInput(event) {
  $img.setAttribute('src', $urlInput.value);
}

$urlInput.addEventListener('input', handleInput);

var $titleInput = document.querySelector('#title');
var $notesTextarea = document.querySelector('#notes');
var $form = document.querySelector('form');

function handleSubmit(event) {
  event.preventDefault();
  var inputObj = {
    title: $titleInput.value,
    url: $urlInput.value,
    notes: $notesTextarea.value,
    entryId: data.nextEntryId
  };
  data.entries.unshift(inputObj);
  data.nextEntryId += 1;
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
}

$form.addEventListener('submit', handleSubmit);
