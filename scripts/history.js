const historyIcon = document.querySelector('.fa-list-ul');
const closeHistoryIcon = document.querySelector('.fa-x');
const saveHistory = document.querySelector('.save-history');
const listIcon = document.querySelector('.fa-list-ul');

function displaySavedMisconceptions() {
  const items = localStorage.getItem('misconceptions');
  const itemsWithNoBrackets = items.replace(/[[\]']+/g, '');
  document.querySelector('.save-history-content').innerHTML =
    itemsWithNoBrackets.replace(/\\n/g, '');
}

historyIcon.addEventListener('click', () => {
  saveHistory.style.visibility = 'visible';
  listIcon.style.visibility = 'hidden';

  if (localStorage.length !== 0) {
    displaySavedMisconceptions();
  } else
    document.querySelector('.save-history-content').innerHTML =
      'Save a misconception you like to see it here!';
});

closeHistoryIcon.addEventListener('click', () => {
  saveHistory.style.visibility = 'hidden';
  listIcon.style.visibility = 'visible';
});
