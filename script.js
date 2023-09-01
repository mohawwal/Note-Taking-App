const addBox = document.querySelector('.add-box');
const popupBox = document.querySelector('.popup-box');

const cancelPopupBtn = document.querySelector('header .cancel-popup');
const addNoteBtn = document.querySelector('.addNoteBtn')

const tittleTag =document.querySelector('.title input')
const descTag =document.querySelector('.description textarea')

const popText = document.querySelector('.pop-text')


const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]


const notes = JSON.parse(localStorage.getItem("note") || "[]")
//get note in our local storage if exist and 
//parse(convert) them to JS object else pass
//an empty array to notes

let isUpdate = false, updateId


addBox.addEventListener('click', ()=> {
    tittleTag.focus();
    popupBox.classList.add("show")
})


cancelPopupBtn.addEventListener('click', ()=> {
    isUpdate = false;
    tittleTag.value = ""
    descTag.value = ""
    popupBox.classList.remove("show")
})

function showNotes() {
    document.querySelectorAll(".note").forEach(note => {note.remove()})
    notes.forEach((note, index) => {
        let liTag = `<li class="note">
                        <div class="details">
                            <p>${note.title}</p>
                            <span
                                >${note.description}</span
                            >
                        </div>
                        <div class="bottom-content">
                            <span
                            >${note.date}</span
                            >
                            <div class="settings">
                                <i onclick="showMenu(this)" class="fa-solid fa-ellipsis"></i>

                                <ul class="menu">
                                    <li onclick="updateNote(${index}, '${note.tittle}', '${note.description}')" class="edit">
                                    <i class="fa-solid fa-pen menu-icon"></i>
                                    <p>Edit</p>
                                    </li>
                                    <li onclick="deleteNote(${index})" class="delete">
                                    <i class="fa-solid fa-trash menu-icon"></i>
                                    <p>Delete</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </li>`
        addBox.insertAdjacentHTML("afterend", liTag)
    });
}
showNotes()

function showMenu(elem) {
    elem.parentElement.classList.add("show")
    document.addEventListener('click', e => {
        if(e.target.tagName != "I" || e.target != elem) {
            elem.parentElement.classList.remove("show")
        }
    })
}

function deleteNote(noteId) {
    //remove selected note from the notes
    notes.splice(noteId, 1)
    //update the note list to the local server
    localStorage.setItem("note", JSON.stringify(notes));
    showNotes()
}

function updateNote(noteId, tittle, desc) {
    isUpdate = true
    updateId = noteId;
    addBox.click()
    tittleTag.value = tittle
    descTag.value = desc
    popText.innerText = "Update Note"
    addNoteBtn.innerText = "Update a Note"
    console.log(noteId, tittle, desc)
}

addNoteBtn.addEventListener('click', ()=> {
    let noteTittle = tittleTag.value, noteDesc =descTag.value;

    if (noteTittle || noteDesc) {
        console.log(noteTittle, noteDesc)
        let dateObj = new Date()
        day = dateObj.getDate()
        month = months[dateObj.getMonth()]
        year = dateObj.getFullYear()


        let noteInfo = {
            tittle: noteTittle, description: noteDesc,
            date: `${day}, ${month}, ${year}`
        }
        if(!isUpdate) {
            notes.push(noteInfo)
        }else {
            notes[updateId] = noteInfo //update a specific field
        }

        //adding note to notes
        localStorage.setItem("note", JSON.stringify(notes));
       //saving notes in our local storage in string
       cancelPopupBtn.click();
       showNotes()
    }
})

