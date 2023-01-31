const labelExperience = 'experience'
const selectorExperiencePanels = '[data-head="' + labelExperience + '"]'
const labelFormation = 'formation'
const selectorFormationPanels = '[data-head="' + labelFormation + '"]'
const labelProject = 'project'
const selectorProjectPanels = '[data-head="' + labelProject + '"]'

window.addEventListener("DOMContentLoaded", () => {

    const experiencePanels = document.querySelectorAll(selectorExperiencePanels)
    experiencePanels.forEach(panel => {
        panel.addEventListener("click", function(e) {
            changeActivePanel(e, labelExperience)
        });
    })

    const formationPanels = document.querySelectorAll(selectorFormationPanels);
    formationPanels.forEach(panel => {
        panel.addEventListener("click", function(e) {
            changeActivePanel(e, labelFormation)
        });
    });

    const projectPanels = document.querySelectorAll(selectorProjectPanels);
    projectPanels.forEach(panel => {
        panel.addEventListener("click", function(e) {
            changeActivePanel(e, labelProject)
        });
    });
});

function changeActivePanel(e, name) {
    const target = e.target;
    const parent = target.parentNode;
    const grandparent = parent.parentNode;

    // Remove all current selected tabs
    parent.querySelectorAll('[aria-selected="true"]').forEach(t => t.setAttribute("aria-selected", false));

    // Set this tab as selected
    target.setAttribute("aria-selected", true);

    // Hide all tab panels
    grandparent.querySelectorAll('[data-body='+name+']').forEach(p => p.classList.add("hidden"));

    // Show the selected panel
    grandparent.parentNode.querySelector(`#${target.getAttribute("aria-controls")}`).classList.remove("hidden");
}