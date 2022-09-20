import { SinkRepair } from "./SinkRepair.js"
import { fetchCompletions, fetchPlumbers, fetchRequests, sendRequest } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "submitRequest") {
        const userDescription = document.querySelector("input[name='serviceDescription']").value
        const userAddress = document.querySelector("input[name='serviceAddress']").value
        const userBudget = document.querySelector("input[name='serviceBudget']").value
        const userDate = document.querySelector("input[name='serviceDate']").value

        const dataToSendToAPI = {
            description: userDescription,
            address: userAddress,
            budget: userBudget,
            neededBy: userDate,
            completed: false
        }
        sendRequest(dataToSendToAPI)
    }
})

const render = async () => {
    await fetchRequests()
    await fetchPlumbers()
    await fetchCompletions()
    mainContainer.innerHTML = SinkRepair()
}

render()

mainContainer.addEventListener(
    "stateChanged",
    event => {
        render()
    }
)