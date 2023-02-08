const historyIcon = document.querySelector('.fa-list-ul');
const closeHistoryIcon = document.querySelector('.fa-x');
const saveHistory = document.querySelector('.save-history');
const listIcon = document.querySelector('.fa-list-ul');
const deleteSavedItems = document.querySelector('.fa-trash');

function displaySavedMisconceptions() {
  const items = localStorage.getItem('misconceptions').replace(/['"]+/g, '');
  const itemsWithNoBrackets = items.replace(/[[\]']+/g, '');
  const itemsWithNoNewLines = itemsWithNoBrackets.replace(/\\n/g, '');
  document.querySelector('.save-history-content').innerHTML =
    itemsWithNoNewLines.replace(/\\/g, '"');
}

historyIcon.addEventListener('click', () => {
  saveHistory.style.visibility = 'visible';
  listIcon.style.visibility = 'hidden';

  if (localStorage.getItem('misconceptions')) {
    displaySavedMisconceptions();
  } else
    document.querySelector('.save-history-content').innerHTML =
      'Save a misconception you like to see it here!';
});

closeHistoryIcon.addEventListener('click', () => {
  saveHistory.style.visibility = 'hidden';
  listIcon.style.visibility = 'visible';
});

deleteSavedItems.addEventListener('click', () => {
  localStorage.removeItem('misconceptions');
  localStorage.removeItem('favorited');
  if (!localStorage.getItem('misconceptions')) {
    document.querySelector('.save-history-content').innerHTML =
      'Save a misconception you like to see it here!';
  }
});
