const darkModeBtn = document.querySelector('button.fr')
darkModeBtn.addEventListener('click', (e) =>
{
    if (darkModeBtn.textContent === 'Dynamic BG: Disabled')
    {
        console.log('Enable Dynamic BG')
        darkModeBtn.textContent = 'Dynamic BG: Enabled'
        //enable dark mode
    }
    else
    {
        console.log('Disabling Dynamic BG')
        darkModeBtn.textContent = 'Dynamic BG: Disabled'
        //enable light mode
    }
})

const sellCarBtn = document.querySelector('button.fl')
sellCarBtn.addEventListener('click', addYourOwnCar)

function addYourOwnCar(e)
{
    /*
    <form id="new-car-form">
        <h3>Submit your car to sell!</h3>
        <label for ='new-year'>Year: </label>
        <input type="number" id="new-year">

        <label for ='new-make'>Make: </label>
        <input type="text" id="new-make">

        <label for ='new-model'>Model: </label>
        <input type="text" id="new-model">

        <label for ='new-image'>Image: </label>
        <input type="text" id="new-image">

        <label for ='new-number'>Phone Number: </label>
        <input type="text" id="new-number">
          <br>
          <label for ='new-details'>Details: </label>
          <input type="text" id="new-details">

      </form>
      */

      const form = document.createElement('form');
      const h = document.createElement('h3')
      const yearIn = document.createElement('input')
      const makeIn = document.createElement('input')
      const modelIn = document.createElement('input')
      const imgIn = document.createElement('input')
      const numIn = document.createElement('input')
      const detailsIn = document.createElement('input')

      h.textContent = "Sell Your Car!"
      yearIn.type = 'number'
      makeIn.type = 'text'
      modelIn.type = 'text'
      imgIn.type = 'text'
      numIn.type = 'text'
      detailsIn.type = 'text'
}