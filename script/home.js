const labelStyles = {
    "bug": {
        bg: "bg-[#FEECEC]",
        border: "border-[#FECACA]",
        text: "text-[#EF4444]",
        icon: "./assets/BugDroid.png"
    },

    "help wanted": {
        bg: "bg-[#FFF8DB]",
        border: "border-[#FDE68A]",
        text: "text-[#F59E0B]",
        icon: "./assets/Lifebuoy.png"
    },

    "enhancement": {
        bg: "bg-[#DCFCE7]",
        border: "border-[#86EFAC]",
        text: "text-[#16A34A]",
        icon: "./assets/Sparkle.png"
    },

    "documentation": {
        bg: "bg-[#DBEAFE]",
        border: "border-[#93C5FD]",
        text: "text-[#2563EB]",
        icon: "./assets/book_icon_blue.png"
    },

    "good first issue": {
        bg: "bg-[#F3E8FF]",
        border: "border-[#C4B5FD]",
        text: "text-[#7C3AED]",
        icon: "./assets/star_icon_purple (1).png"
    }
};

const createElement = (arr) => {
    const htmlElements = arr.map((el) => {
        const style = labelStyles[el.toLowerCase()] || {};

        return `
      <span class="flex items-center gap-1 border ${style.border} ${style.bg} ${style.text} rounded-xl text-xs px-2 py-1">
        <img src="${style.icon}" class="w-3 h-3">
        ${el}
      </span>
    `;
    });

    return htmlElements.join("");
};

// Store all issues here after loading from the API.
// Then we can easily show all, only open, or only closed issues.
let allIssuesData = [];
const issueCountElement = document.getElementById("issue-count");

// Update the summary title with the current visible issue count.
function updateIssueCount(issues) {
    issueCountElement.textContent = `${issues.length} Issues`;
}

// Format API date into a readable local date.
function formatIssueDate(dateString) {
    return new Date(dateString).toLocaleDateString();
}

// Match priority pill color with HIGH / MEDIUM / LOW from the API.
function getPriorityStyle(priority) {
    const currentPriority = priority.toLowerCase();

    if (currentPriority === "high") {
        return "bg-[#FEE2E2] text-[#EF4444]";
    }

    if (currentPriority === "medium") {
        return "bg-[#FEF3C7] text-[#F59E0B]";
    }

    return "bg-[#E5E7EB] text-[#6B7280]";
}

// This function only changes the active button style.
function removeActive(_className) {
    const arr = ["issue-all", "issue-open", "issue-closed"];

    for (const cl of arr) {
        document.querySelector(`.${cl}`).classList.remove("btn-primary", "text-white");
    }

    document.querySelector(`.${_className}`).classList.add("btn-primary", "text-white");
}

// Load all issues from the API and save them in allIssuesData.
const loadLesson = () => {
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

    fetch(url)
        .then(res => res.json())
        .then((json) => {
            allIssuesData = json.data || [];
            displayAllIssue(allIssuesData);
        });
}

// Filter data when the user clicks All / Open / Closed.
document.getElementById("filter-buttons").addEventListener("click", (event) => {
    if (event.target.classList.contains("issue-all")) {
        removeActive("issue-all");
        displayAllIssue(allIssuesData);
    }
    else if (event.target.classList.contains("issue-open")) {
        removeActive("issue-open");
        const openIssues = allIssuesData.filter((issue) => issue.status === "open");
        displayAllIssue(openIssues);
    } else if (event.target.classList.contains("issue-closed")) {
        removeActive("issue-closed");
        const closedIssues = allIssuesData.filter((issue) => issue.status === "closed");
        displayAllIssue(closedIssues);
    }
})

// {
// "status": "success",
// "message": "Issue fetched successfully",
// "data": {
// "id": 33,
// "title": "Add bulk operations support",
// "description": "Allow users to perform bulk actions like delete, update status on multiple items at once.",
// "status": "open",
// "labels": [
// "enhancement"
// ],
// "priority": "low",
// "author": "bulk_barry",
// "assignee": "",
// "createdAt": "2024-02-02T10:00:00Z",
// "updatedAt": "2024-02-02T10:00:00Z"
// }
// }

// modal
const loadWordDetail = async (id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displayIssueDetails(details.data);
};

const displayIssueDetails = (data) => {
    const detailsBox = document.getElementById("details-container");
    const statusClass = data.status === "closed" ? "bg-purple-500" : "bg-green-500";
    const assigneeName = data.assignee ? data.assignee : "Unassigned";

    detailsBox.innerHTML = `
    <div>
        <h3 class="text-2xl font-bold text-gray-800 mb-3">
            ${data.title}
        </h3>

        <div class="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-4">
            <span class="${statusClass} text-white px-3 py-1 rounded-full text-xs font-semibold uppercase">
                ${data.status}
            </span>
            <span>Opened by ${data.author}</span>
            <span>Created: ${formatIssueDate(data.createdAt)}</span>
            <span>Updated: ${formatIssueDate(data.updatedAt)}</span>
        </div>

        <div class="flex flex-wrap gap-2 mb-5">
            ${createElement(data.labels || [])}
        </div>

        <p class="text-gray-600 mb-6">
            ${data.description}
        </p>

        <div class="bg-gray-100 rounded-xl p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
                <p class="text-gray-500 text-sm">Issue ID</p>
                <p class="font-semibold text-gray-800">#${data.id}</p>
            </div>

            <div>
                <p class="text-gray-500 text-sm">Priority</p>
                <span class="${getPriorityStyle(data.priority)} inline-block text-xs px-3 py-1 rounded-full font-semibold uppercase">
                    ${data.priority}
                </span>
            </div>

            <div>
                <p class="text-gray-500 text-sm">Author</p>
                <p class="font-semibold text-gray-800">${data.author}</p>
            </div>

            <div>
                <p class="text-gray-500 text-sm">Assignee</p>
                <p class="font-semibold text-gray-800">${assigneeName}</p>
            </div>
        </div>

        <div class="modal-action">
            <form method="dialog">
                <button class="btn btn-primary">Close</button>
            </form>
        </div>
    </div>
    `;

    document.getElementById("word_modal").showModal();
}

// "status": "success",
// "message": "Issues fetched successfully",
// "data": [
// {
// "id": 1,
// "title": "Fix navigation menu on mobile devices",
// "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
// "status": "open",
// "labels": [
// "bug",
// "help wanted"
// ],
// "priority": "high",
// "author": "john_doe",
// "assignee": "jane_smith",
// "createdAt": "2024-01-15T10:30:00Z",
// "updatedAt": "2024-01-15T10:30:00Z"
// },

displayAllIssue = (word) => {
    const allIssues = document.getElementById("card-container");
    allIssues.innerHTML = "";

    // Show the current visible issue count in the title.
    updateIssueCount(word);

    word.forEach((word) => {
        const createDiv = document.createElement("div");

        createDiv.innerHTML = `
        <div onclick="loadWordDetail(${word.id})" class="card h-full bg-white shadow-md border border-gray-200 w-full cursor-pointer">
                    <div class="flex flex-col h-full">
                        <div class="p-4 border-t-4 ${word.status === "closed" ? "border-purple-500" : "border-green-500"} rounded-t-lg flex-1">
                            <div class="flex justify-between items-center mb-3">
                                <div class="w-8 h-8 rounded-full ${word.status === "closed" ? "bg-purple-100" : "bg-green-100"} flex items-center justify-center">
                                    <img src="${word.status === "closed" ? "./assets/Closed- Status .png" : "./assets/Open-Status.png"}" alt="${word.status} status" class="w-4 h-4">
                                </div>

                                <div class="text-right">
                                    <p class="text-[10px] uppercase text-gray-500 mb-1">${word.status}</p>
                                    <span class="${getPriorityStyle(word.priority)} text-xs px-4 py-1 rounded-full font-medium uppercase">
                                        ${word.priority}
                                    </span>
                                </div>
                            </div>

                            <h2 class="font-semibold text-gray-800 text-sm mb-2 min-h-[40px]">
                                ${word.title}
                            </h2>

                            <p class="text-gray-500 text-xs mb-4 min-h-[60px] line-clamp-3">
                                ${word.description}
                            </p>

                            <div class="flex flex-wrap gap-2 min-h-[32px]">
                                <div class="flex flex-wrap gap-1"> ${createElement(word.labels)} </div>
                            </div>
                        </div>

                        <div class="border-t px-4 py-3 text-xs text-gray-500 mt-auto">
                             <p>#${word.id} by <span class="text-gray-700">${word.author}</span></p>
                             <p>${formatIssueDate(word.createdAt)}</p>
                        </div>
                    </div>
                </div>
        `;

        allIssues.append(createDiv);
    })
}

loadLesson();

// Search using the required API endpoint.
const handleSearch = async () => {
    const input = document.getElementById("input-search");
    const searchValue = input.value.trim();

    if (!searchValue) {
        loadLesson();
        return;
    }

    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${encodeURIComponent(searchValue)}`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        // Save search result in allIssuesData too.
        // This makes the Open / Closed buttons work after searching.
        allIssuesData = data.data || [];
        displayAllIssue(allIssuesData);
        removeActive("issue-all");
    } catch (error) {
        console.error("Search failed", error);
    }
}

document.getElementById("btn-search")
    .addEventListener("click", handleSearch);

document.getElementById("input-search")
    .addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    });







