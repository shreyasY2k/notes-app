// Read existing notes from localStorage
const getSavedNotes =  () => {
    const notesJSON = localStorage.getItem('notes')

    if (notesJSON) {
        return JSON.parse(notesJSON)
    } else {
        
        return []
    }
}

// Save the notes to localStorage
const saveNotes =  (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes))
}

// Remove a note from the list
const removeNote =  (note,id) => {
    const noteIndex = notes.findIndex((note) => note.id === id)
    
    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)
        localStorage.removeItem(note)
        
    }
}

// Generate the DOM structure for a note
const generateNoteDOM = (note) => {
    const noteEl = document.createElement('a')
    const textEl = document.createElement('p')
    const statusEl = document.createElement('p')
    const removeEl = document.createElement('a')

    // Setup the note title text
    if (note.title.length > 0) {
        textEl.textContent = note.title
    } else {
        textEl.textContent = 'Unnamed note'
    }
    textEl.classList.add('list-item__title')
    noteEl.appendChild(textEl)
    //Setup the link
    noteEl.setAttribute('href', `edit.html#${note.id}`)
    noteEl.classList.add('list-item')

    //Status Message
    statusEl.textContent = generatelastEdited(note.updatedAt)
    textEl.classList.add('list-item__subtitle')
    noteEl.appendChild(statusEl)
    
        //Remove Element
        removeEl.textContent = 'Remove'
        removeEl.classList.add('list-item__removebutton')
        noteEl.appendChild(removeEl)
        removeEl.addEventListener('click',  (e) => {
        location.assign('index.html')
        removeNote(note,note.id)
        saveNotes(notes)
        
    })

    return noteEl
}

//Sort by 3 Ways
const sortnote = (notes,sortBy) => {
    if(sortBy === 'byEdited'){
        return notes.sort((a,b) => {
            if(a.updatedAt > b.updatedAt){
                return -1
            }
            else if(a.updatedAt < b.updatedAt) {
                return 1
            }
        })}
    else if(sortBy === 'byCreated'){
        return notes.sort((a,b) => {
            if(a.createdAt > b.createdAt){
                return -1
            }
            else if(a.createdAt < b.createdAt) {
                return 1
            }
        })

    }
    else if(sortBy === 'alphabetical'){
        return notes.sort((a,b) => {
            if(a.title.toLowerCase() < b.title.toLowerCase()){
                return -1
            }
            else if(a.title.toLowerCase() > b.title.toLowerCase()){
                return 1
            }
            else {
                return 0 
            }
        })
    }

}

// Render application notes
const renderNotes = (notes,filters) => {
    const notesEl = document.querySelector('#notes')
    notes = sortnote(notes,filters.sortBy)
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    notesEl.innerHTML = ''

    if(filteredNotes.length > 0){
        filteredNotes.forEach( (note) => {
            const noteEl = generateNoteDOM(note)
            notesEl.appendChild(noteEl)
        })
    }
    else{
        const emptyMessage = document.createElement('h2')
        emptyMessage.textContent = "No Notes to Show"
        emptyMessage.classList.add('empty-message')
        notesEl.appendChild(emptyMessage)
    }

    
}

//Gemnerate Last Edited
const generatelastEdited = ((timeStamp) => `Last Edited ${moment(timeStamp).fromNow()}`)
