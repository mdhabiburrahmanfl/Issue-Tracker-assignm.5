const createElement = (arr) => {
    const htmlElements = arr.map((el) => `<span class="btn"> ${el} </span>`);
    return htmlElements.join("");
};



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

const loadLesson = () => {
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues"
    fetch(url)
        .then(res => res.json())
        .then((json) => displayAllIssue(json.data));

}

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
    detailsBox.innerHTML = `
    <div>
                <!-- Title -->
                <h3 class="text-2xl font-bold text-gray-800 mb-3">
                    ${data.title}
                </h3>

                <!-- Status + Meta -->
                <div class="flex items-center gap-3 text-sm text-gray-500 mb-4">
                    <span class="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        ${data.status}
                    </span>
                    <span>Opened by</span><span>${data.author}</span>
                    <span>•</span>
                    <span>${data.updatedAt}</span>
                </div>

                <!-- Labels -->
                <div class="flex gap-2 mb-5">
                    <span class="badge border-red-300 text-red-500 bg-red-100 gap-1">
                        🐞 BUG
                    </span>

                    <span class="badge border-orange-300 text-orange-500 bg-orange-100 gap-1">
                        🛟 HELP WANTED
                    </span>
                </div>

                <!-- Description -->
                <p class="text-gray-600 mb-6">
                    ${data.description}
                </p>

                <!-- Info Box -->
                <div class="bg-gray-100 rounded-xl p-5 flex justify-between mb-6">

                    <div>
                        <p class="text-gray-500 text-sm">Assignee:</p>
                        <p class="font-semibold text-gray-800">${data.assignee}</p>
                    </div>

                    <div>
                        <p class="text-gray-500 text-sm">Priority:</p>
                        <span class="bg-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                            ${data.priority}
                        </span>
                    </div>

                </div>
    <div class="modal-action">
        <form method="dialog">
            <button class="btn btn-primary">Close</button>
        </form>
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
    word.forEach((word) => {
        const createDiv = document.createElement("div")

        createDiv.innerHTML = `
        <div onclick="loadWordDetail(${word.id})" class="card  bg-white shadow-md border border-gray-200 w-full">
                    <div class="p-4 border-t-4 border-green-500 rounded-t-lg">

                        <div class="flex justify-between items-center mb-3">

                            <!-- icon -->
                            <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                <i class="fa-regular fa-circle-dot text-green-500"></i>
                            </div>

                            <!-- priority -->
                            <span class="bg-red-100 text-red-500 text-xs px-4 py-1 rounded-full font-medium">
                                ${word.priority}
                            </span>

                        </div>

                        <!-- title -->
                        <h2 class="font-semibold text-gray-800 text-sm mb-2">
                            ${word.title}
                        </h2>

                        <!-- description -->
                        <p class="text-gray-500 text-xs mb-4">
                            ${word.description}
                        </p>

                        <!-- tags -->
                        <div class="flex gap-2">

                        <div class=""> ${createElement(word.labels)} </div>

                        </div>

                    </div >

                    
                     <div class="border-t px-4 py-3 text-xs text-gray-500">
                         <p>#1 by <span class="text-gray-700">john_doe</span></p>
                         <p>1/15/2024</p>
                     </div>
                </div >
        `
        allIssues.append(createDiv);
    })
}
loadLesson();


// search section

document.getElementById("btn-search")
    .addEventListener("click", () => {
        const input = document.getElementById("input-search");
        const searchValue = input.value.trim().toLowerCase();
        console.log(searchValue);

        const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                const allWords = data.data;
                console.log(allWords);
                const filterWords = allWords.filter((word) =>
                    word.title.toLowerCase().includes(searchValue)
                );
                displayAllIssue()
            })
    })