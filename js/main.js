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

function renderEntry(entry) {
  var $list = document.createElement('li');
  $list.setAttribute('class', 'column-full');

  var rowDiv = document.createElement('div');
  rowDiv.setAttribute('class', 'row');
  $list.appendChild(rowDiv);

  var imageDiv = document.createElement('div');
  imageDiv.setAttribute('class', 'column-half display-image');
  rowDiv.appendChild(imageDiv);

  var $image = document.createElement('img');
  $image.setAttribute('src', entry.url);
  imageDiv.appendChild($image);

  var columnHalfDiv = document.createElement('div');
  columnHalfDiv.setAttribute('class', 'column-half');
  rowDiv.appendChild(columnHalfDiv);

  var $h2 = document.createElement('h2');
  $h2.setAttribute('class', 'column-full');
  var title = document.createTextNode(entry.title);
  $h2.appendChild(title);
  columnHalfDiv.appendChild($h2);

  var $p = document.createElement('p');
  $p.setAttribute('class', 'column-full entries-text');
  var notes = document.createTextNode(entry.notes);
  $p.appendChild(notes);
  columnHalfDiv.appendChild($p);

  return $list;
}

var $ul = document.querySelector('ul');

function handleDOMContentLoaded(event) {
  for (var i = 0; i < data.entries.length; i++) {
    $ul.appendChild(renderEntry(data.entries[i]));
  }
}

document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);

var noEntriesDiv = document.querySelector('.no-entries');
if (data.entries.length === 0) {
  noEntriesDiv.className = 'column-full no-entries';
} else {
  noEntriesDiv.className = 'column-full no-entries hidden';
}

var $view = document.querySelectorAll('.view');
function checkView(string) {
  for (var i = 0; i < $view.length; i++) {
    if (string.target.getAttribute('data-view') === $view[i].getAttribute('data-view')) {
      $view[i].className = 'view container';
    } else {
      $view[i].className = 'view container hidden';
    }
  }
}

function handleClick(event) {
  if (event.target.matches('a') === false) {
    return;
  }
  checkView(event);
}

document.addEventListener('click', handleClick);
