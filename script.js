// Protect dashboard
if(!localStorage.getItem("loggedIn")){
window.location.href="index.html"
}

const API="https://phi-lab-server.vercel.app/api/v1/lab/issues"

const container=document.getElementById("issuesContainer")
const issueCount=document.getElementById("issueCount")

let allIssues=[]


async function loadIssues(type="all",btn=null){

showSpinner()

// Fetch only once
if(allIssues.length===0){
const res=await fetch(API)
const data=await res.json()
allIssues=data.data
}

let issues=[...allIssues]

if(type==="open"){
issues=issues.filter(i=>i.status==="open")
}

if(type==="closed"){
issues=issues.filter(i=>i.status==="closed")
}

issueCount.innerText=issues.length

setActive(btn)

renderIssues(issues)

}



function renderIssues(issues){

container.innerHTML=""

issues.forEach((issue,index)=>{

const border=issue.status==="open"
?"border-t-4 border-green-500"
:"border-t-4 border-purple-500"


// Safe labels mapping
const labels=(issue.labels || []).map(label=>

`<span class="text-[10px] bg-orange-100 text-orange-600 px-2 py-[2px] rounded-full">${label}</span>`

).join("")


const priorityColor=
issue.priority==="high"
?"bg-red-200 text-red-700"
:issue.priority==="medium"
?"bg-yellow-200 text-yellow-700"
:"bg-gray-200 text-gray-700"


const card=document.createElement("div")

card.className=`bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer flex flex-col ${border}`


card.innerHTML=`

<div class="flex justify-between items-start mb-2">

<img src="assets/${issue.status}.png">

<span class="text-[10px] px-2 py-[2px] rounded-full ${priorityColor}">
${issue.priority.toUpperCase()}
</span>

</div>


<h3 class="font-semibold text-sm mb-1">
${issue.title}
</h3>


<p class="text-xs text-gray-500 mb-3">
${issue.description.substring(0,70)}...
</p>


<div class="mt-auto">

<div class="flex flex-wrap gap-2 mb-2">
${labels}
</div>

<p class="text-[11px] text-gray-500">
#${index+1} by ${issue.author}
</p>

<p class="text-[11px] text-gray-400">
${new Date(issue.createdAt).toLocaleDateString()}
</p>

</div>

`

card.onclick=()=>openModal(issue)

container.appendChild(card)

})

}



function showSpinner(){

container.innerHTML=`

<div class="col-span-4 text-center py-10">

<div class="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600 mx-auto"></div>

</div>

`

}



function setActive(btn){

document.querySelectorAll(".tabBtn").forEach(b=>{
b.classList.remove("bg-[#4A00FF]","text-white")
b.classList.add("bg-gray-200")
})

if(btn){
btn.classList.remove("bg-gray-200")
btn.classList.add("bg-[#4A00FF]","text-white")
}

}



function openModal(issue){

const modal=document.getElementById("modal")
const content=document.getElementById("modalContent")

content.innerHTML=`

<h2 class="text-xl font-bold mb-3">
${issue.title}
</h2>


<div class="flex items-center gap-2 mb-3">

<span class="text-xs px-2 py-1 rounded-full ${
issue.status==="open"
?"bg-green-100 text-green-600"
:"bg-purple-100 text-purple-700"
}">
${issue.status}
</span>

<span class="text-xs text-gray-500">
Opened by ${issue.author} • ${new Date(issue.createdAt).toLocaleDateString()}
</span>

</div>


<div class="flex gap-2 mb-4">
${(issue.labels || []).map(l=>`<span class="text-[10px] bg-orange-100 text-orange-600 px-2 py-[2px] rounded-full">${l}</span>`).join("")}
</div>


<p class="text-sm text-gray-600 mb-6">
${issue.description}
</p>


<div class="bg-gray-100 rounded p-4 flex justify-between items-center">

<div>
<p class="text-xs text-gray-500">Assignee</p>
<p class="text-sm font-medium">${issue.assignee || "None"}</p>
</div>

<div>
<p class="text-xs text-gray-500">Priority</p>

<span class="text-xs px-2 py-1 rounded ${
issue.priority==="high"
?"bg-red-200 text-red-700"
:issue.priority==="medium"
?"bg-yellow-200 text-yellow-700"
:"bg-gray-200 text-gray-700"
}">
${issue.priority.toUpperCase()}
</span>

</div>

</div>

`

modal.classList.remove("hidden")
modal.classList.add("flex")

}



function closeModal(){

const modal=document.getElementById("modal")

modal.classList.add("hidden")
modal.classList.remove("flex")

}



async function searchIssues(){

const text=document.getElementById("searchInput").value

showSpinner()

const res=await fetch(
`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`
)

const data=await res.json()

const issues=data.data

issueCount.innerText=issues.length

renderIssues(issues)

}



loadIssues("all",document.querySelector(".tabBtn"))
