import { deleteRequest, getCompletions, getPlumbers, getRequests, saveCompletion, statusChange } from "./dataAccess.js";

const mainContainer = document.querySelector('#container')

mainContainer.addEventListener("click", click => {
    if(click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    } 
})

mainContainer.addEventListener(
    "change",
    (event) => {
        const [requestId, plumberId] = event.target.value.split("--")
            const requestToCompleted = parseInt(requestId)
            const plumber = parseInt(plumberId)
            const date = Date.now()
            const completion = {
                requestId: requestToCompleted,
                plumberId: plumber,
                completed: true,
                date_created: date
            }
        if (event.target.id === "plumbers") {
            saveCompletion(completion)
            statusChange(requestId)
        }
    }
)

const listPlumbers = (request) => {
    const plumbers = getPlumbers()
    let html = `<select class="plumbers" id="plumbers">
    <option value="">Choose</option>
    ${plumbers.map(
            plumber => {
                return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
            }
        ).join("")}
    </select>`
    return html
}

const listRequests = (request) => {
    const plumberRender = listPlumbers(request)
    let html = ``
    if(request.completed === false) {
        html += `<li class="list__requests">
        ${request.description}
        ${plumberRender}
        </li>`
    } else {
        html += `<li class="completed__requests">
        ${request.description}
        </li>`
    }
    html += `<button class="request__delete" id="request--${request.id}">Delete</button>`
    return html
}

/*
Confused on why you dont put () after listRequests below?
Is it because its a callback? No idea bro
*/
export const Requests = () => {
    const requests = getRequests()
    let html = `<div class="request-list">
        <ul class="pending__requests">
            ${requests.map(listRequests).join("")}
        </ul></div>
    `
    return html
}