/* eslint-disable no-use-before-define */
const userInput = document.querySelector('.misconceptionCategories');
let searchParam;
let started;
let chosen = false;
let needIndex;
let index;
const section = 'section';

function displayMisconceptionCategories(jsonData) {
  started = false;
  const categories = jsonData.parse.sections;

  for (let i = 0; i < categories.length - 6; i += 1) {
    const option = document.createElement('OPTION');
    option.setAttribute('value', `${categories[i].line}`);
    option.setAttribute('class', 'display-options');
    const t = document.createTextNode(`${categories[i].line}`);
    option.appendChild(t);
    userInput.appendChild(option);
  }
}

function createCard() {
  const list = document.createElement('ul');
  list.setAttribute('class', 'content');
  document.querySelector('.main-content').appendChild(list);
}

function displayData(jsonData) {
  if (!document.querySelector('.content')) {
    createCard();
  }

  const misconceptionsArray = jsonData.parse.text['*'];
  const splitArray = misconceptionsArray.split('</ul>');
  const dataArray = splitArray[0].split('</li>');
  // last index of array is empty string for every category. pop it off to have only data points
  dataArray.pop();
  const randomPoint = dataArray[Math.floor(Math.random() * dataArray.length)];
  document.querySelector('.content').innerHTML = randomPoint;
}

function fetchWikiData(url) {
  try {
    fetch(url)
      .then((response) => response.text())
      .then((data) => {
        const jsonData = JSON.parse(data);
        if (started === true && searchParam === undefined) {
          displayMisconceptionCategories(jsonData);
        }

        if (searchParam === userInput.value && needIndex === true) {
          getSectionIndex(jsonData);
        }

        if (chosen === true) {
          displayData(jsonData);
        }
      });
  } catch (error) {
    throw new Error(error);
  }
}

function getSectionDescription() {
  chosen = true;
  const url = `https://en.wikipedia.org/w/api.php?${new URLSearchParams({
    origin: '*',
    action: 'parse',
    [section]: index,
    format: 'json',
    pageid: 321956,
    prop: 'text',
  })}`;
  fetchWikiData(url);
}

function getSectionIndex(jsonData) {
  needIndex = false;
  const { sections } = jsonData.parse;
  for (let i = 0; i < sections.length; i += 1) {
    if (searchParam === sections[i].line) {
      index = sections[i].index;
    }
  }
  getSectionDescription();
}

function getMisconceptionCategories() {
  started = true;
  needIndex = true;
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

function makeNewMisconceptionButton() {
  if (!document.querySelector('.newButton')) {
    const button = document.createElement('button');
    button.setAttribute('class', 'newButton');
    button.innerHTML = 'Get another?';
    document.querySelector('.button').appendChild(button);
  }
}

userInput.addEventListener('change', () => {
  searchParam = userInput.value;
  makeNewMisconceptionButton();
  getMisconceptionCategories();
});

document.querySelector('.button').addEventListener('click', () => {
  searchParam = userInput.value;
  getMisconceptionCategories();
});
