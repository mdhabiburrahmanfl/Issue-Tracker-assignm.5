document.getElementById("filter-buttons").addEventListener("click", (event) => {
    if (event.target.classList.contains("issue-all")) {
        removeActive("issue-all")
    }
    else if (event.target.classList.contains("issue-open")) {
        removeActive("issue-open")
    } else if (event.target.classList.contains("issue-closed")) {
        removeActive("issue-closed")
    }
})

function removeActive(_className) {
    const arr = ["issue-all", "issue-open", "issue-closed"]
    for (const cl of arr) {
        document.querySelector(`.${cl}`).classList.remove("btn-primary", "text-white")
    }
    document.querySelector(`.${_className}`).classList.add("btn-primary", "text-white")
}