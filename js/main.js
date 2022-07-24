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

  if (data.editing === null) {
    var inputObj = {
      title: $titleInput.value,
      url: $urlInput.value,
      notes: $notesTextarea.value,
      entryId: data.nextEntryId
    };
    data.entries.unshift(inputObj);
    $ul.prepend(renderEntry(data.entries[0]));
    data.nextEntryId += 1;
    noEntriesDiv.className = 'column-full no-entries hidden';
  } else if (data.editing !== null) {
    inputObj = {
      title: $titleInput.value,
      url: $urlInput.value,
      notes: $notesTextarea.value,
      entryId: data.editing.entryId
    };
    for (var u = 0; u < data.entries.length; u++) {
      if (data.entries[u].entryId === inputObj.entryId) {
        data.entries.splice(u, 1, inputObj);
      }
    }
    var $listNodeList = document.querySelectorAll('li');
    for (var m = 0; m < $listNodeList.length; m++) {
      if (parseInt($listNodeList[m].getAttribute('data-entry-id')) === inputObj.entryId) {
        $listNodeList[m].replaceWith(renderEntry(inputObj));
      }
    }

    data.editing = null;
  }
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
  switchView('entries');
}

$form.addEventListener('submit', handleSubmit);

function renderEntry(entry) {
  var $list = document.createElement('li');
  $list.setAttribute('class', 'column-full');
  $list.setAttribute('data-entry-id', entry.entryId);

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

  var entryHeaderDiv = document.createElement('div');
  entryHeaderDiv.setAttribute('class', 'column-full display-entries entry-header');
  columnHalfDiv.appendChild(entryHeaderDiv);

  var $h2 = document.createElement('h2');
  var title = document.createTextNode(entry.title);
  $h2.appendChild(title);
  entryHeaderDiv.appendChild($h2);

  var $i = document.createElement('i');
  $i.setAttribute('class', 'fa-solid fa-pen');
  $i.setAttribute('data-entry-id', entry.entryId);
  entryHeaderDiv.appendChild($i);

  var $p = document.createElement('p');
  $p.setAttribute('class', 'column-full entries-text');
  var notes = document.createTextNode(entry.notes);
  $p.appendChild(notes);
  columnHalfDiv.appendChild($p);

  return $list;
}

var $ul = document.querySelector('ul');
var noEntriesDiv = document.querySelector('.no-entries');

function handleDOMContentLoaded(event) {
  for (var i = 0; i < data.entries.length; i++) {
    $ul.appendChild(renderEntry(data.entries[i]));
  }

  if (data.entries.length === 0) {
    noEntriesDiv.className = 'column-full no-entries';
  } else {
    noEntriesDiv.className = 'column-full no-entries hidden';
  }

  switchView(data.view);
}

document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);

var $view = document.querySelectorAll('.view');
function switchView(viewName) {
  for (var i = 0; i < $view.length; i++) {
    if (viewName === $view[i].getAttribute('data-view')) {
      $view[i].className = 'view container';
      data.view = viewName;
    } else {
      $view[i].className = 'view container hidden';
    }
  }
}

function handleClickSwitchView(event) {
  if (event.target.matches('a') === false) {
    return;
  }
  switchView(event.target.getAttribute('data-view'));
}

document.addEventListener('click', handleClickSwitchView);

var $h1ForNewEntry = document.querySelector('form > h1');
var $formsDiv = document.querySelector('.form-buttons');
var $deleteButton = document.querySelector('.delete-button');

function handleClickEditIcon(event) {
  if (event.target.matches('i') === false) {
    return;
  }

  switchView('entry-form');

  $h1ForNewEntry.textContent = 'Edit Entry';
  $formsDiv.className = 'column-full form-buttons form-buttons-on-edit';
  $deleteButton.className = 'delete-button';

  for (var k = 0; k < data.entries.length; k++) {
    var parsedDataEntryId = parseInt(event.target.getAttribute('data-entry-id'));
    if (parsedDataEntryId === data.entries[k].entryId) {
      data.editing = data.entries[k];
    }
  }

  $titleInput.value = data.editing.title;
  $notesTextarea.value = data.editing.notes;
  $urlInput.value = data.editing.url;
  $img.setAttribute('src', data.editing.url);
}

$ul.addEventListener('click', handleClickEditIcon);

var $newAnchorButton = document.querySelector('.entries-anchor-button');

function handleClickNewAnchorButton(event) {
  $h1ForNewEntry.textContent = 'New Entry';
  $form.reset();
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $formsDiv.className = 'column-full form-buttons form-buttons-no-edit';
  $deleteButton.className = 'delete-button hidden';
}

$newAnchorButton.addEventListener('click', handleClickNewAnchorButton);

var $modalBackground = document.querySelector('.modal-background');
var $cancelButton = document.querySelector('.cancel-button');

function handleClickModal(event) {
  event.preventDefault();
  if (event.target.matches('.delete-button')) {
    $modalBackground.className = 'modal-background';
  }

  if (event.target.matches('.cancel-button')) {
    $modalBackground.className = 'modal-background hidden';
  }
}

$deleteButton.addEventListener('click', handleClickModal);
$cancelButton.addEventListener('click', handleClickModal);
