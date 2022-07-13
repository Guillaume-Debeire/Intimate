<script>
import { days, months, years } from '../data/data.js'
</script>
<main>
  <nav class="menu">
    <ul class="drawer years">
      {#each years as year}
        <li>{year}</li>
      {/each}
    </ul>
    <ul class="drawer months">
      {#each months as month}
        <li>{month}</li>
      {/each}
    </ul>
    <ul class="drawer days">
      {#each days as day}
        <li class="day">{day}</li>
      {/each}
    </ul>
  </nav>
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

  }
  .month {

  }
  .day {
    
  }
</style>