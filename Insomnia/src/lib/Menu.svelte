<script>
import { days, months, years } from '../data/data.js'

let isOpenNav = false;
const toggleNav = () => {
  isOpenNav = !isOpenNav
}
</script>
<main>
  <nav class="menu {isOpenNav ? "active": "inactive"}">
    <ul class="drawer years">
      {#each years as year}
        <li class="year">{year}</li>
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
    <button on:click={toggleNav}>
      bonjour
    </button>
  </nav>
</main>
<style>
  .menu {
    display: flex;
    height: 100vh;
    position: fixed;
    top: 0;
    transition: all .2s ease-in-out;
  }
  .active {
    left: -450px;
  }
  .inactive {
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
    height: 2rem;
  }
  .month {
    height: 2rem;
  }
  .day {
    height: 2rem;  
  }
</style>