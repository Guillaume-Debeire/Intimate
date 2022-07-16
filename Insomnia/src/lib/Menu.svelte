<script>
import { onMount } from 'svelte';

// import { days, months, years } from '../data/data.js'
import getDiaries from '../hooks/getDiaries';

let years = [];
const dataUrl = "http://localhost:3000/years";
let selectedYear = {}
let selectedMonths = [];
let selectedDays = [];
let selectedDay = {};
let isSelectedYear = false;
let isSelectedMonth = false;
let isSelectedDay = false;
onMount(async () => {
  const response = await fetch(dataUrl);
  const data = await response.json();
  data.map((y) => {
    years = [...years, y]
  })
console.log("years", years)

})

const selectMonths = (year) => {
  selectedMonths = [];
  selectedDays = [];
  years.find(y => y.name == year).months.map((month) => {
    selectedMonths = [...selectedMonths, month]
  })
    isSelectedYear = true;
    isSelectedMonth = false;
  
}
const selectDays = (month) => {
  selectedDays = [];
  selectedMonths.find(m => m.name == month.name).days.map((d) => {
    selectedDays = [...selectedDays, d]
  })
    isSelectedMonth = true;
  
}
const selectDay = (day) => {
  selectedDay = [];
    console.log('second', parseInt(Object.keys(day)[0]))
  const target = selectedDays.find((d, i) => d == day)
  selectedDay = target;
  
}



console.log("here", selectedDay)
let days = [
  "01"
];

const months = ["janvier", "février"]
</script>
<main>
  
  <nav class="menu">
    {#if years === []}
    Loading...
  {:else}
    <ul class="drawer years">
        {#each years as year, i}
          <li class="year " on:click={() => selectMonths(year.name)}>{year.name}</li>
        {/each}
    </ul>
    <ul class="drawer months {isSelectedYear ? "active" : "inactive"}">
      {#each selectedMonths as month}
        <li class="month" on:click={() => selectDays(month)}>{month.name}</li>
      {/each}
    </ul>
    <ul class="drawer days {isSelectedMonth ? "active" : "inactive"}">
      {#each selectedDays as day, i}
        <li class="day" on:click={() => selectDay(day)}>{`${i < 10 ? "0" : ""}${i}/`}</li>
      {/each}
    </ul>
    {/if}
    <button class="menu-button">

    </button>
  </nav>
  <button>

  </button>
  <textarea class="diary" id="diary" />
</main>
<style>
  .menu {
    display: flex;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
  }
  .drawer {
    width: 150px;
    filter: opacity(0.4);
    list-style: none;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding: 0;
    transition: all .2s ease-in-out;
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
</style>