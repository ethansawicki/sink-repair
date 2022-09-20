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
        if (event.target.id === "plumbers") {
            const [requestId, plumberId, requestDescription] = event.target.value.split("--")
            const request = parseInt(requestId)
            const plumber = parseInt(plumberId)
            const description = requestDescription
            const date = Date.now()
            const completion = {
                requestId: request,
                plumberId: plumber,
                description: description,
                completed: true,
                date_created: date
            }
            saveCompletion(completion)
        }
    }
)

const listRequests = (request) => {
    const plumbers = getPlumbers()
    const completion = getCompletions()
    let html = ``

    if(request.completed === false) {
        html += `<li>
        ${request.description}
        <select class="plumbers" id="plumbers">
            <option value="">Choose</option>
            ${
                plumbers.map(
                    plumber => {
                        return `<option value="${request.id}--${plumber.id}--${request.description}">${plumber.name}</option>`
                    }
                ).join("")
            }
        </select>
        <button class="request__delete" id="request--${request.id}">Delete</button>
    </li>`
    } else {
        html += `<li>${completion.map()}`
    }
    
    return html
}

/*
Confused on why you dont put () after listRequests below?
Is it because its a callback? No idea bro
*/
export const Requests = () => {
    const requests = getRequests()
    const completed = getCompletions()
    let html = `
        <ul>
            ${requests.map(listRequests).join("")}
        </ul>
    `
    return html
}