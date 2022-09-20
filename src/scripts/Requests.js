import { deleteRequest, getCompletions, getPlumbers, getRequests, saveCompletion } from "./dataAccess.js";

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
        const [requestId, plumberId, requestDescription] = event.target.value.split("--")
            const requestToCompleted = parseInt(requestId)
            const plumber = parseInt(plumberId)
            const description = requestDescription
            const date = Date.now()
            const completion = {
                requestId: requestToCompleted,
                plumberId: plumber,
                description: description,
                completed: true,
                date_created: date
            }
        if (event.target.id === "plumbers") {
            saveCompletion(completion)
        }
    }
)

const listPlumbers = (request) => {
    const plumbers = getPlumbers()
    let html = `<select class="plumbers" id="plumbers">
    <option value="">Choose</option>
    ${
        plumbers.map(
            plumber => {
                return `<option value="${request.id}--${plumber.id}--${request.description}">${plumber.name}</option>`
            }
        ).join("")}
    </select>`
    return html
}

const listRequests = (request) => {
    const plumberRender = listPlumbers(request)
    let html = ``
    if(request.completed === false) {
        html += `<li>
        ${request.description}
        ${plumberRender}
        <button class="request__delete" id="request--${request.id}">Delete</button>
        </li>`
    } else {
        html += `<li>
        ${request.description}
        <button class="request__delete" id="request--${request.id}">Delete</button>
        </li>`
    }
    return html
}

/*
Confused on why you dont put () after listRequests below?
Is it because its a callback? No idea bro
*/
export const Requests = () => {
    const requests = getRequests()
    const completions = getCompletions()
    let html = `
        <ul class="pending__requests">
            ${requests.map(listRequests).join("")}
            ${completions.map(listRequests).join("")}
        </ul>
    `
    return html
}