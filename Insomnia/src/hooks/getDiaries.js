
  export const getDiaries = () => {
    let years = [];
    const dataUrl = "http://localhost:3000/years";
    const myInit = { method: 'GET', };
    fetch(dataUrl, myInit).then((response) => {
      return response.json();
    }).then((d) => {
      // console.log(d)
      d.map((y) => {
        console.log(y)
        years.push(y);
      })
    }).catch((err) => {
      console.error(err);
    });
    return {years};
  }