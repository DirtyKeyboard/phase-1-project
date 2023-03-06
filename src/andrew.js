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