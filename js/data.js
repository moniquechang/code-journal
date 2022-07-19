/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', handleBeforeunload);

function handleBeforeunload(event) {
  var $data = JSON.stringify(data);
  localStorage.setItem('code-journal-local-storage', $data);
}
