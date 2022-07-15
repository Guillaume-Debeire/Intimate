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
})



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
          <li class="year">{year.name}</li>
        {/each}
    </ul>
    <ul class="drawer months">
      {#each months as month}
        <li class="month">{month}</li>
      {/each}
    </ul>
    <ul class="drawer days">
      {#each days as day}
        <li class="day">{day}</li>
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
  }
  .years {
    background-color: red;
    color: white;
  }
  .months {
    background-color: blue;
    color: white;
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