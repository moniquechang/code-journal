/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', handleBeforeunload);

function handleBeforeunload(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('code-journal-local-storage', dataJSON);
}

var previousData = localStorage.getItem('code-journal-local-storage');

if (previousData !== null) {
  data = JSON.parse(previousData);
}
