/* formation part */

window.addEventListener("DOMContentLoaded", () => {
    const tabsF = document.querySelectorAll('[role="tabF"]');
    const tabListF = document.querySelector('[role="tablistF"]');

    // Add a click event handler to each tab
    tabsF.forEach(tab => {
        tab.addEventListener("click", changeTabsF);
    });

    // Enable arrow navigation between tabs in the tab list
    let tabFocusF = 0;

    tabListF.addEventListener("keydown", e => {
        // Move right
        if (e.keyCode === 39 || e.keyCode === 37) {
            tabsF[tabFocusE].setAttribute("tabindex", -1);
            if (e.keyCode === 39) {
                tabFocusF++;
                // If we're at the end, go to the start
                if (tabFocusF >= tabsF.length) {
                    tabFocusF = 0;
                }
                // Move left
            } else if (e.keyCode === 37) {
                tabFocusF--;
                // If we're at the start, move to the end
                if (tabFocusF < 0) {
                    tabFocusF = tabsF.length - 1;
                }
            }

            tabsF[tabFocusF].setAttribute("tabindex", 0);
            tabsF[tabFocusF].focus();
        }
    });
});

function changeTabsF(e) {
    const target = e.target;
    const parent = target.parentNode;
    const grandparent = parent.parentNode;

    // Remove all current selected tabs
    parent .querySelectorAll('[aria-selected="true"]').forEach(t => t.setAttribute("aria-selected", false));

    // Set this tab as selected
    target.setAttribute("aria-selected", true);

    // Hide all tab panels
    grandparent.querySelectorAll('[role="tabpanelF"]').forEach(p => p.classList.add("hidden"));

    // Show the selected panel
    grandparent.parentNode.querySelector(`#${target.getAttribute("aria-controls")}`).classList.remove("hidden");
}

/* experience part */

window.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll('[role="tabE"]');
    const tabList = document.querySelector('[role="tablistE"]');

    // Add a click event handler to each tab
    tabs.forEach(tab => {
        tab.addEventListener("click", changeTabsE);
    });

    // Enable arrow navigation between tabs in the tab list
    let tabFocus = 0;

    tabList.addEventListener("keydown", e => {
        // Move right
        if (e.keyCode === 39 || e.keyCode === 37) {
            tabs[tabFocus].setAttribute("tabindex", -1);
            if (e.keyCode === 39) {
                tabFocus++;
                // If we're at the end, go to the start
                if (tabFocus >= tabs.length) {
                    tabFocus = 0;
                }
                // Move left
            } else if (e.keyCode === 37) {
                tabFocus--;
                // If we're at the start, move to the end
                if (tabFocus < 0) {
                    tabFocus = tabs.length - 1;
                }
            }

            tabs[tabFocus].setAttribute("tabindex", 0);
            tabs[tabFocus].focus();
        }
    });
});

function changeTabsE(e) {
    const target = e.target;
    const parent = target.parentNode;
    const grandparent = parent.parentNode;

    // Remove all current selected tabs
    parent.querySelectorAll('[aria-selected="true"]').forEach(t => t.setAttribute("aria-selected", false));

    // Set this tab as selected
    target.setAttribute("aria-selected", true);

    // Hide all tab panels
    grandparent.querySelectorAll('[role="tabpanelE"]').forEach(p => p.classList.add("hidden"));

    // Show the selected panel
    grandparent.parentNode.querySelector(`#${target.getAttribute("aria-controls")}`).classList.remove("hidden");
}