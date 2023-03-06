const darkModeBtn = document.querySelector('button.fr')
const container = document.getElementById('action-window');
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
sellCarBtn.addEventListener('click', showForm)

function showForm(e)
{
      container.innerHTML = "";
      const form = document.createElement('form');
      const h = document.createElement('h3')
      const yearIn = document.createElement('input')
      const makeIn = document.createElement('input')
      const modelIn = document.createElement('input')
      const imgIn = document.createElement('input')
      const contactIn = document.createElement('input')
      const detailsIn = document.createElement('input')

      const labelYear = document.createElement('label')
      const labelMake = document.createElement('label')
      const labelModel = document.createElement('label')
      const labelImg = document.createElement('label')
      const labelContact = document.createElement('label')
      const labelDetails = document.createElement('label')
      const br = document.createElement('br')
      const submitBtn = document.createElement('input')

      labelYear.for = 'new-year'
      labelMake.for = 'new-make'
      labelModel.for = 'new-model'
      labelImg.for = 'new-image'
      labelContact.for = 'new-contact'
      labelDetails.for = 'new-details'

      labelYear.textContent = 'Year: ';
      labelMake.textContent = 'Make: ';
      labelModel.textContent = 'Model: ';
      labelImg.textContent = 'Image: ';
      labelContact.textContent = 'Contact Info: ';
      labelDetails.textContent = 'Details: ';
      submitBtn.textContent = 'Submit'

      h.textContent = "Sell Your Car!"
      yearIn.type = 'number'
      makeIn.type = 'text'
      modelIn.type = 'text'
      imgIn.type = 'text'
      contactIn.type = 'number'
      detailsIn.type = 'text'
      submitBtn.type = 'submit'

      yearIn.classList.add('new-year')
      makeIn.classList.add('new-make')
      modelIn.classList.add('new-model')
      imgIn.classList.add('new-image')
      contactIn.classList.add('new-contact')
      detailsIn.classList.add('new-details')
      form.addEventListener('submit', () => {
        
      })
      form.append(labelYear, yearIn, labelMake, makeIn, labelModel, modelIn, labelImg, imgIn, labelContact, contactIn, br, labelDetails, detailsIn, submitBtn)
      container.append(form)
}