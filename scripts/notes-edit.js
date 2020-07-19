const titleElement = document.querySelector('#note-title')
const bodyElement = document.querySelector('#note-body')

const noteId = location.hash.substring(1)
const dateEl = document.querySelector('#last-edited')
let notes = getSavedNotes()
let note = notes.find(function (note) {
    return note.id === noteId
})

if (note === undefined) {
    location.assign('index.html')
}

titleElement.value = note.title
bodyElement.value = note.body
dateEl.textContent = generatelastEdited(note.updatedAt)


titleElement.addEventListener('input',  (e) => {
    note.title = e.target.value
    note.updatedAt = moment().valueOf()
    dateEl.textContent = generatelastEdited(note.updatedAt)
    saveNotes(notes)
})

bodyElement.addEventListener('input',  (e) => {
    note.body = e.target.value
    note.updatedAt = moment().valueOf()
    dateEl.textContent = generatelastEdited(note.updatedAt)
    saveNotes(notes)
})



window.addEventListener('storage', (e) => {
    if(e.key === 'notes'){
        notes = JSON.parse(e.newValue)
        note = notes.find(function (note) {
            return note.id === noteId
        })
        
        if (note === undefined) {
            location.assign('index.html')
        }
    
    titleElement.value = note.title
    bodyElement.value = note.body
    dateEl.textContent = generatelastEdited(note.updatedAt)
    }
})