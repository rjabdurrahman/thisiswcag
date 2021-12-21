const interactiveBtns = document.querySelectorAll('button.interactive-btn');
for (i of interactiveBtns) 
{
    i.addEventListener('click', function()
    {
        const parentContainerID = document.getElementById(this.getAttribute('data-container'));
        const containerID = this.getAttribute('aria-controls');
        const interactiveContainer = document.getElementById(containerID);
        const chevronID = document.getElementById(this.getAttribute('data-heading'));

        if(parentContainerID.classList.contains('h-lg-100'))
        {
            parentContainerID.classList.remove('h-lg-100');
            interactiveContainer.classList.add('d-none');
            this.setAttribute('aria-expanded','false');
            chevronID.setAttribute('aria-label','expand');            
        }
        else
        {
            parentContainerID.classList.add('h-lg-100');
            interactiveContainer.classList.remove('d-none');
            this.setAttribute('aria-expanded','true');
            chevronID.setAttribute('aria-label','collapse');
        }
    });
}