<script>
// @ts-nocheck

import { onMount } from 'svelte';
import {clickOutside} from '../hooks/clickOutside';

// Initialisation de variables;
let years = [];
const dataUrl = "http://localhost:3000/years";
let selectedYear = {}
let selectedMonths = [];
let selectedDays = [];
let selectedDay = {};
let isSelectedYear = false;
let isSelectedMonth = false;
let isSelectedDay = false;
let diaryTitle = "Bienvenue sur votre Journal Intime.";
let diaryContent = "Vous pouvez y écrire ce que vous voulez.";
let isOpenNav = false;

// Charge les années depuis le fichier db.json
onMount(async () => {
  const response = await fetch(dataUrl);
  const data = await response.json();
  data.map((y) => {
    years = [...years, y]
  })

})

// Selectionne les mois à faire apparaitre dans la navigation
const selectMonths = (year) => {
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

// Insertion de contenu dans le db.json
const handleTitleChange = (event) => {
  console.log(event.target.value);
  fetch(dataUrl + "", {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({title : event.target.value})
})
}


</script>
<main>
  
  <nav class="menu {isOpenNav ? "open" : "close"}" use:clickOutside on:click_outside={handleClickOutside}>
    {#if years === []}
      Loading...
    {:else}
    <ul class="drawer years">
      {#each years as year}
        <li class="element year" on:click={() => selectMonths(year.name)}>{year.name}</li>
      {/each}
    </ul>
    <ul class="drawer months {isSelectedYear ? "active" : "inactive"}">
      {#each selectedMonths as month}
        <li class="element month" on:click={() => selectDays(month)}>{month.name}</li>
      {/each}
    </ul>
    <ul class="drawer days {isSelectedMonth ? "active" : "inactive"}">
      {#each selectedDays as day, i}
        <li class="element day {day.content === "" ? "empty" : ""}" on:click={() => selectDay(day)}>{`${i < 10 ? "0" : ""}${i}/`}</li>
      {/each}
    </ul>
    {/if}
    <button class="menu-button" on:click={() => isOpenNav = !isOpenNav}>
        {isOpenNav ? "<" : ">"}
    </button>
  </nav>
  <div class="diary {isOpenNav ? "little" : "big"}">
    <input type="text" bind:value={diaryTitle} class="diary-title" on:input={handleTitleChange}>
    <textarea bind:value={diaryContent} class="diary-content" />
  </div>
</main>
<style>

  /* MENU NAVIGATION **/
  .menu {
    display: flex;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    width: 450px;
    transition: width .2s ease-in-out;
  }
  .close {
    width: 0;
  }
  .drawer {
    width: 100%;
    list-style: none;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding: 2rem 0;
    transition: all .2s ease-in-out;
  }
  .element {
    cursor: pointer;
    padding: 0.2rem 0;
    font-size: 18px;
    border-radius: 5px;
    transition: all .2s ease-in-out;
  }
  .element:hover {
    background-color: rgb(201, 224, 235);
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
  .empty {
    color: rgb(231, 231, 231)  }

  /* CONTENU DU JOURNAL **/
  .diary {
    display: flex;
    flex-direction: column;
    padding: 4rem;
    height: 60vh;
    transition: all .2s ease-in-out;
    margin-right: 5rem;
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
    padding: 1rem 0;
  }
  .diary-content {
    border: none;
    margin: 5rem auto;
    padding: 1rem 2rem;
    height: 100%;
    width: 100%;
  }
  .diary-title:focus {

  }
</style>