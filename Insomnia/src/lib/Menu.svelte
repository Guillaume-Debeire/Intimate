<script>
import { onMount } from 'svelte';

// import { days, months, years } from '../data/data.js'
import getDiaries from '../hooks/getDiaries';

let years = [];
const dataUrl = "http://localhost:3000/years";
onMount(async () => {
  const response = await fetch(dataUrl);
  const data = await response.json();
  data.map((y) => {
    years = [...years, y]
  })
console.log("years", years)

})
let selectedYear = {}
let selectedMonths = [];
let selectedDays = [];

const selectMonths = (year) => {
  selectedMonths = [];
  selectedDays = []
  years.find(y => y.name == year).months.map((month) => {
    selectedMonths = [...selectedMonths, month]
  })
  console.log(selectedMonths)
}
const selectDays = (month) => {
  selectedDays = [];
  selectedMonths.find(m => m.name == month.name).days.map((d) => {
    selectedDays = [...selectedDays, d]
  })
  console.log("days", selectedDays)
}



let days = [
  "01"
];

const months = ["janvier", "février"]
</script>
<main>
  {#if years === []}
    Loading...
  {:else}
  <nav class="menu">
    <ul class="drawer years">
        {#each years as year, i}
          <li class="year " on:click={() => selectMonths(year.name)}>{year.name}</li>
        {/each}
    </ul>
    <ul class="drawer months {selectedDays === [] ? "inactive" : "active"}">
      {#each selectedMonths as month}
        <li class="month" on:click={() => selectDays(month)}>{month.name}</li>
      {/each}
    </ul>
    <ul class="drawer days {selectedDays === [] ? "inactive" : "active"}">
      {#each selectedDays as day, i}
        <li class="day">{`${i < 10 ? "0" : ""}${i}/`}</li>
      {/each}
    </ul>
  </nav>
  {/if}
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