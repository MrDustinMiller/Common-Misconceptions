const userInput = document.querySelector('.misconceptionCategories');
const prop = 'page';
let searchParam = '';
let started;
let chosen;

function displayMisconceptionCategories(jsonData) {
  started = false;
  const categories = jsonData.parse.sections;

  for (let index = 0; index < categories.length; index += 1) {
    const option = document.createElement('OPTION');
    option.setAttribute('value', `${categories[index].line}`);
    const t = document.createTextNode(`${categories[index].line}`);
    option.appendChild(t);
    userInput.appendChild(option);
  }
}

function fetchWikiData(url) {
  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      const jsonData = JSON.parse(data);
      console.log(jsonData);
      if (started === true) {
        displayMisconceptionCategories(jsonData);
      }

      if (chosen === true) {
        document.querySelector('.test').innerHTML = jsonData.parse.text['*'];
        console.log(jsonData);
      }
    });
}

function getSectionDescription() {
  const url = `https://en.wikipedia.org/w/api.php?${new URLSearchParams({
    origin: '*',
    action: 'parse',
    [prop]: searchParam,
    format: 'json',
  })}`;
  fetchWikiData(url);
}

function getMisconceptionCategories() {
  started = true;
  const url = `https://en.wikipedia.org/w/api.php?${new URLSearchParams({
    origin: '*',
    action: 'parse',
    page: 'List of common misconceptions',
    prop: 'sections',
    format: 'json',
  })}`;
  fetchWikiData(url);
}

getMisconceptionCategories();

userInput.addEventListener('change', () => {
  searchParam = `list of common misconceptions#${userInput.value}`;
  chosen = true;
  getSectionDescription();
});
