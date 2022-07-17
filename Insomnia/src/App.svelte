<script>
  import logo from './assets/svelte.png'
  import Menu from './lib/Menu.svelte';
  import Content from './lib/Content.svelte';
</script>

<main>
  <Menu/>

</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    /* height: 100vh; */
    width: 100vw;
  }

  main {
    text-align: center;
    padding: 0;
    margin: 0 auto;
    box-sizing: border-box;
  }

  

  img {
    height: 16rem;
    width: 16rem;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4rem;
    font-weight: 100;
    line-height: 1.1;
    margin: 2rem auto;
    max-width: 14rem;
  }

  @media (min-width: 480px) {
    h1 {
      max-width: none;
    }

  }

</style>
