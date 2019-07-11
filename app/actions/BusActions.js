import {REQUEST_SEARCH_BUS, SEARCH_BUS_RESULT, SEARCH_BUS_FAILED, SET_SEARCH_NUMBER} from "./actionTypes";

export const setSearchBusNum = (busNum) => ({type: SET_SEARCH_NUMBER, busNum})

export const searchBusStarted = (busNum) => ({type: REQUEST_SEARCH_BUS, busNum})
export const searchResultReceived = (data) => ({type: SEARCH_BUS_RESULT, data})
export const searchFailed = (message) => ({type: SEARCH_BUS_FAILED, message})


