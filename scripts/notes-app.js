let notes = getSavedNotes()

import axios from 'axios'; //suggested to use mongdb and express
import mongoose from 'mongoose';

const filters = {
    searchText: '',
    sortBy: 'byEdited'
}
renderNotes(notes,filters)
document.querySelector('#create-note').addEventListener('click', (e) => {
    
    const id = uuidv4()
    const timeStamp = moment().valueOf()
    notes.push({
        id: id,
        title: '',
        body: '',
        createdAt: timeStamp,
        updatedAt: timeStamp
    })
    saveNotes(notes)
    location.assign(`edit.html#${id}`)
})

document.querySelector('#search-text').addEventListener('input',  (e) => {
    filters.searchText = e.target.value
    renderNotes(notes, filters)
})

document.querySelector('#filter-by').addEventListener('change',  (e) => {
    filters.sortBy = e.target.value
    renderNotes(notes, filters)
})

window.addEventListener('storage', (e) => {
    if(e.key === 'notes'){
        notes = JSON.parse(e.newValue)
        renderNotes(notes,filters)
    }
})


