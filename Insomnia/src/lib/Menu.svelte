<script>
// @ts-nocheck

import { onMount } from 'svelte';
import {clickOutside} from '../hooks/clickOutside';
import placeholders from '../data/placeholders.json';
import { element, intros } from 'svelte/internal';

// Initialisation de variables;
let years = [];
const dataUrl = "http://localhost:3000/years";
let selectedYear = {}
let selectedMonth = {}
let selectedMonths = [];
let selectedDays = [];
let selectedDay = {};
let isSelectedYear = false;
let isSelectedMonth = false;
let isSelectedDay = false;
let diaryTitle = "Bienvenue sur votre Journal Intime.";
let diaryContent = "Vous pouvez y écrire ce que vous voulez.";
let isOpenNav = false;
let lastYear = {}

let today = new Date;
let thisDay = today.getDate() + "/" + (today.getMonth() < 10 ? "0" : "") + (today.getMonth() + 1) +  "/" + today.getFullYear();
// Charge les années depuis le fichier db.json
onMount(async () => {
  const response = await fetch(dataUrl);
  const data = await response.json();
  data.map((y) => {
    years = [...years, y]

  })
  lastYear = years[years.length - 1];
})

// Selectionne les mois à faire apparaitre dans la navigation
const selectMonths = (year) => {
  selectedYear = {};
  selectedYear = year;
  selectedMonths = [];
  selectedDays = [];
  years.find(y => y.name == year).months.map((month) => {
    selectedMonths = [...selectedMonths, month]
  })
    isSelectedYear = true;
    isSelectedMonth = false;
  
}

// Selectionne les jours à faire apparaitre dans la navigation
const selectDays = (month) => {
  selectedDays = [];
  selectedMonth = {};
  selectedMonth = month;
  selectedMonths.find(m => m.name == month.name).days.map((d) => {
    selectedDays = [...selectedDays, d]
  })
    isSelectedMonth = true;
  
}

// Selectionne le jour qui va alimenter le journal
const selectDay = (day) => {
  selectedDay = [];
  const target = selectedDays.find((d, i) => d == day)
  selectedDay = target;
  diaryTitle = selectedDay.title;
  diaryContent = selectedDay.content;
}

function handleClickOutside(event) {
  isOpenNav = false;
}

// Gestion du change du title, redimension du textarea
// et envoi de données sur db.json
const handleTitleChange = (event) => {
  // console.log(event.target.clientHeight);
  // console.log(event.target.scrollHeight);
//   fetch(dataUrl + "", {
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     method: "POST",
//     body: JSON.stringify({title : event.target.value})
// })
  const title = event.target;
  let adjustedWidth = title.clientWidth;
  adjustedWidth = Math.max(title.style.width, adjustedWidth);
  if (adjustedWidth > title.clientWidth) {
    title.style.width = adjustedWidth + "px";
}
}
const handleContentChange = (event) => {
  const textArea = event.target;
  let adjustedHeight = textArea.clientHeight;
  adjustedHeight = Math.max(textArea.scrollHeight, adjustedHeight);
  if (adjustedHeight > textArea.clientHeight) {
  textArea.style.height = adjustedHeight + "px";
  }
}

const months = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
const daysEven = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];
const daysUneven = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];
const daysFebruary = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];

// permet d'ajouter une année à la liste
const addYear = async () => {
  const yearName = parseInt(lastYear.name) + 1;
  let monthsToFeed = [];
  let daysToFeed = []
  
  const monthModel = months.map((month, ind) => {
      daysToFeed = [];
    const daysEvenModel = daysEven.map((day, i) => {
      const p = {
        id: i + 1,
        title: `${i < 9 ? "0" : ""}${i + 1}/${ind < 9 ? "0" : ""}${ind + 1}/${yearName} `,
        content: ""
      };
      daysToFeed = [...daysToFeed, p]
      console.log("here", daysToFeed)
    })
    const j = {
      id: ind + 1,
      name: month,
      days: daysToFeed,
    };
    monthsToFeed = [...monthsToFeed, j];
  });
  const monthBody = monthModel;
  const m = months.map((month, i) => (i + 1));
  const body = JSON.stringify({
    id: lastYear.id + 1,
    name: yearName.toString(),
    months : monthsToFeed,
  })
//   if (prevYear !== null) {
  await fetch(dataUrl, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: body
    })
    // .then(() => {
    //     years = [...years, body]
    // })
//   } 

}

console.log("this month", today.getMonth())
// Génère un placeholder de façon aléatoire
const randomPlaceHolder = placeholders[Math.floor((3 * Math.random()) + 1)]
</script>
<main>
  
  <nav class="menu {isOpenNav ? "open" : "close"}" use:clickOutside on:click_outside={handleClickOutside}>
    <div class="menu-container">
      {#if years === []}
        Loading...
      {:else}
      <ul class="drawer years">
        <button  class="year-button">
          +
        </button>
        {#each years as year}
          {#if year.name !== undefined}
          <li class="element year" on:click={() => selectMonths(year.name)}>{year.name}</li>
          {/if}
          {/each}
        <button on:click={() => addYear()} class="year-button">
          +
        </button>
      </ul>
      <ul class="drawer months {isSelectedYear ? "active" : "inactive"}">
        {#each selectedMonths as month}
          <li class="element month" on:click={() => selectDays(month)}>{month.name}</li>
        {/each}
      </ul>
      <ul class="drawer days {isSelectedMonth ? "active" : "inactive"}">
        {#each selectedDays as day, i}
          <li class="element day {day.content === "" ? "empty" : ""} {day.title == thisDay ? "today" : ""}" on:click={() => selectDay(day)}>
            {day.title == thisDay ? "Aujourd'hui" : day.title}
          </li>
        {/each}
      </ul>
      {/if}
      <button class="menu-button" on:click={() => isOpenNav = !isOpenNav}>
          <div class="{isOpenNav ? "nav-open" : ""}">></div>
      </button>
    </div>
  </nav>
  <div class="diary {isOpenNav ? "little" : "big"}">
    <input type="text" bind:value={diaryTitle} class="diary-title" on:input={handleTitleChange}>
    <textarea 
      bind:value={diaryContent} 
      class="diary-content" 
      on:input={handleContentChange}
      placeholder={randomPlaceHolder}
    />
  </div>
</main>
<style>

  /* MENU NAVIGATION **/
  main {
    width: 100%;
  }
  .menu {
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    width: 450px;
    transition: width .2s ease-in-out;
    box-shadow: 2px 2px 15px 0px rgba(0, 0, 0, 0.25);
    z-index: 5;

  }

  .menu-container {
    position: relative;
    display: flex;
    height: 100%;
  }
  .close {
    width: 0;
  }
  .drawer {
    width: 100%;
    height: 100%;
    list-style: none;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding: 2rem 0;
    transition: all .2s ease-in-out;
    box-shadow: 2px 2px 15px 0px rgba(0, 0, 0, 0.25);
  }
  .element {
    cursor: pointer;
    padding: 0.2rem 0;
    margin: .2rem 1rem;
    background: transparent;
    font-size: 18px;
    border-radius: 5px;
    transition: all .2s ease-in-out;
  }
  .element:hover {
    background: rgba(40, 183, 249, 0.562);
    /* color: white; */
    transform: scale(1.1)
  }
  .years {
    background-color: white;
    overflow: auto;
  }
  .months {

    background-color: white;
    overflow: auto;

  }
  .active { 
    color: black;
  }
  .inactive {
    width: 0px;
  }
  .days {
    background-color: white;
    overflow: auto;
  }
  .year {
  }
  .month {

  }
  .day {
    
  }
  .today {
    color: coral;
    transform: scale(1.1);
  }
  .empty {
    color: rgb(188, 188, 188)  
  }

  .menu-button {
    border: none;
    color: rgb(10, 136, 194);
    font-size: 40px;
    font-weight: 600;
    background-color: transparent;
    transition: transform .5s ease-in-out;
    box-shadow: 2px 2px 15px 0px rgba(0, 0, 0, 0.25);
    height: 4rem;
    width: 3rem;
    border-radius: 0 10px 10px 0 ;
    position: absolute;
    right: -3rem;
    top: 6rem;  
    z-index: 4;
  }
  .menu-button div {
    transition: transform .5s ease-in-out;
  }

  .nav-open {
    transform:rotate(540deg)
  }

  /* CONTENU DU JOURNAL **/
  .diary {
    display: flex;
    flex-direction: column;
    padding: 4rem;
    transition: all .2s ease-in-out;
    margin-right: 5rem;
    min-width: 300px;
    width: 80%;
  }
  .big {
    margin-left: 5rem;
  }
  .little {
    margin-left: 26rem;
  }
  .diary-title {
    font-size: 30px;
    width: fit-content;
    margin: auto;
    border: none;
    border-bottom: 1px solid lightgrey;
    padding: 1rem 2rem;
    outline: none;
    text-align: center;
  }
  .diary-content {
    border: none;
    margin: 5rem auto;
    padding: 1rem 2rem;
    height: 100%;
    width: 100%;
    overflow: visible;
    outline: none;
    resize: none;
  }
  .diary-content::placeholder {
    color: lightgrey;
    font-style: italic;
  }

  /* Button **/
  .year-button {
    border: none;
    color: rgb(10, 136, 194);
    border : 3px solid rgb(10, 136, 194);
    background-color: transparent;
    cursor: pointer;
    padding: 0.2rem 0;
    margin: .2rem 1rem;
    font-size: 18px;
    border-radius: 5px;
    transition: all .2s ease-in-out;
    width: 3rem;
    margin: 2rem auto;
  }
  .year-button:hover {
    background-color: rgb(10, 136, 194);
    color: white;
  }
</style>