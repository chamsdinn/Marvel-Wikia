// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  console.log("Marvel-Wikia JS imported successfully!");
});

const searchInput = document.querySelector('input[type="search"]')
searchInput.addEventListener("input", ()=>{
  console.log(`value: ${searchInput.value}`)
});

// document
//     .getElementById("searchBtn")
//     .addEventListener("click", async function (event) {
//       const id = document.querySelector('input[name="superheroes"]').value;
//       const { data } = await axios.get(
//         `http://localhost:27017/Marvel-Wikia
//         .characters/${_id}`
//       );
      
//     });
