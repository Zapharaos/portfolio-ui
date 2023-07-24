$(document).ready( () => {
    enableListChanges(['experience', 'formation', 'project']) // TODO : link to DB
});

function enableListChanges(listsLabels) {
    listsLabels.forEach(label => {
        let selector = '[data-head="' + label + '"]'
        let panels = document.querySelectorAll(selector)
        panels.forEach(panel => {
            panel.addEventListener('click', (e) => {
                changeActivePanel(e, label)
            })
        })
    })
}

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