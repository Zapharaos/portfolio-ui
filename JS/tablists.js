window.addEventListener("DOMContentLoaded", () => {

    const experiencePanels = document.querySelectorAll('[data-head="experience"]');
    experiencePanels.forEach(panel => {
        panel.addEventListener("click", function(e) {
            changeActivePanel(e, "experience")
        });
    });

    const formationPanels = document.querySelectorAll('[data-head="formation"]');
    formationPanels.forEach(panel => {
        panel.addEventListener("click", function(e) {
            changeActivePanel(e, "formation")
        });
    });

    const projectPanels = document.querySelectorAll('[data-head="project"]');
    projectPanels.forEach(panel => {
        panel.addEventListener("click", function(e) {
            changeActivePanel(e, "project")
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