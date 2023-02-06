const historyIcon = document.querySelector('.fa-list-ul');
const closeHistoryIcon = document.querySelector('.fa-x');

historyIcon.addEventListener('click', () => {
  document.querySelector('.save-history').style.visibility = 'visible';
  document.querySelector('.fa-list-ul').style.visibility = 'hidden';
});

closeHistoryIcon.addEventListener('click', () => {
  document.querySelector('.save-history').style.visibility = 'hidden';
  document.querySelector('.fa-list-ul').style.visibility = 'visible';
});
