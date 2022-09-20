const applicationState = {
    requests: [],
    plumbers: [],
    completions: []
}

const API = "http://localhost:8088"

export const fetchRequests = async () => {
    const dataFetch = await fetch(`${API}/requests`)
    const jsonData = await dataFetch.json()
    applicationState.requests = jsonData 
}

export const fetchPlumbers = async () => {
    const dataFetch = await fetch(`${API}/plumbers`)
    const plumbers = await dataFetch.json()
    applicationState.plumbers = plumbers
}

export const fetchCompletions = async () => {
    const dataFetch = await fetch(`${API}/completions`)
    const jsonData = await dataFetch.json()
    applicationState.completions = jsonData
}

export const sendRequest = async (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }
    const mainContainer = document.querySelector('#container')
    const response = await fetch(`${API}/requests`, fetchOptions)
    const responseJson = await response.json()
    mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
    return responseJson
}

export const saveCompletion = async (data) => {
    const fetchOptions  = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }
    const mainContainer = document.querySelector('#container')
    const response = await fetch(`${API}/completions`, fetchOptions)
    const responseJson = await response.json()
    mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
    return responseJson
}

export const deleteRequest = async (id) => {
    await fetch(`${API}/requests/${id}`, {method: "DELETE"})
    const mainContainer = document.querySelector('#container')
    mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
}

export const getCompletions = () => {
    return applicationState.completions.map(state => ({...state}))
}

export const getRequests = () => {
    return applicationState.requests.map(state => ({...state}))
}

export const getPlumbers = () => {
    return applicationState.plumbers.map(state => ({...state}))
}