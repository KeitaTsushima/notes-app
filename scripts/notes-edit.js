'use strict'

const noteTitleEl = document.querySelector('#note-title')
const timePassedEl = document.querySelector('#time-passed')
const noteBodyEl = document.querySelector('#note-body')
const removeNoteBtn = document.querySelector('#remove-note')
const noteId = location.hash.substring(1)
let notes = getSavedNotes()
let note = notes.find(note => note.id === noteId)

if (!note) {
    location.assign('/index.html')
}

noteTitleEl.value = note.title
timePassedEl.textContent = generateLastEdited(note.updatedAt)
noteBodyEl.value = note.body

noteTitleEl.addEventListener('input', e => {
    note.title = e.target.value
    note.updatedAt = moment().valueOf()
    saveNotes(notes)

    timePassedEl.textContent = generateLastEdited(note.updatedAt)
})

noteBodyEl.addEventListener('input', e => {
    note.body = e.target.value
    note.updatedAt = moment().valueOf()
    saveNotes(notes)

    timePassedEl.textContent = generateLastEdited(note.updatedAt)
})

removeNoteBtn.addEventListener('click', () => {
    removeNote(note.id)
    saveNotes(notes)
    location.assign('/index.html')
})

window.addEventListener('storage', e => {
    if(e.key === 'notes') {
        notes = JSON.parse(e.newValue)
        note = notes.find(note => note.id === noteId)
        
        if (!note) {
            location.assign('/index.html')
        }

        noteTitleEl.value = note.title
        noteBodyEl.value = note.body
        timePassedEl.textContent = generateLastEdited(note.updatedAt)

    }
})


