// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  console.log("Marvel-Wikia JS imported successfully!");
});

const searchInput = document.querySelector('input[type="search"]')
searchInput.addEventListener("input", ()=>{
  console.log(`value: ${searchInput.value}`)
});


      

