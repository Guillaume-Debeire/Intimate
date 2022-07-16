<script>
import { onMount } from 'svelte';

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
let diaryContent = "";
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
  diaryContent = Object.values(selectedDay)[0]
}

</script>
<main>
  
  <nav class="menu {isOpenNav ? "open" : "close"}">
    {#if years === []}
      Loading...
    {:else}
    <ul class="drawer years {isOpenNav ? "open" : "close"}">
      {#each years as year, i}
        <li class="element year" on:click={() => selectMonths(year.name)}>{year.name}</li>
      {/each}
    </ul>
    <ul class="drawer months {isSelectedYear ? "active" : "inactive"} {isOpenNav ? "open" : "close"}">
      {#each selectedMonths as month}
        <li class="element month" on:click={() => selectDays(month)}>{month.name}</li>
      {/each}
    </ul>
    <ul class="drawer days {isSelectedMonth ? "active" : "inactive"} {isOpenNav ? "open" : "close"}">
      {#each selectedDays as day, i}
        <li class="element day" on:click={() => selectDay(day)}>{`${i < 10 ? "0" : ""}${i}/`}</li>
      {/each}
    </ul>
    {/if}
    <button class="menu-button" on:click={() => isOpenNav = !isOpenNav}>

    </button>
  </nav>
  <textarea bind:value={diaryContent} class="diary" />
</main>
<style>

  /* MENU NAVIGATION **/
  .menu {
    display: flex;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
  }
  .close {
    width: 0 !important;
  }
  .drawer {
    width: 150px;
    filter: opacity(0.8);
    list-style: none;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding: 0;
    transition: all .2s ease-in-out;
  }
  .element {
    cursor: pointer;
  }
  .years {
    background-color: red;
    color: white;
  }
  .months {

    background-color: blue;
    color: white;

  }
  .active { 
    color: black;
  }
  .inactive {
    color: white;
    width: 0px;
  }
  .days {
    background-color: green;
    color: white;
    overflow: auto;
  }
  .year {
    color: white;
  }
  .month {
    color: white;

  }
  .day {
    
  }

  /* CONTENU DU JOURNAL **/
  .diary {
    border: none;
    background-color: red;
    width: 80vw;
    height: 60vh;
    margin: 5rem auto;
    padding: 1rem 2rem;
  }
  .diary:active {
    border: unset;
  }
</style>