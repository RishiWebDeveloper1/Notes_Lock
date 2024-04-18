document.querySelector('meta[name="theme-color"]').setAttribute('content', 'red');
// document.addEventListener('contextmenu', (e) => e. preventDefault());
let newUserPage = document.getElementById("newUserPage");
let unlockPage = document.getElementById("unlockPage");
let NotesLockPage = document.getElementById("NotesLockPage");
var newPasswordInput = document.getElementById("newPasswordInput");
var confirmPasswordInput = document.getElementById("confirmPasswordInput");
let passwordsCheck = document.getElementById("passwordsCheck");
var questionInput = document.getElementById("questionInput");
var answerInput = document.getElementById("answerInput");
var passwordInput = document.getElementById("passwordInput");
let passwordCheck = document.getElementById("passwordCheck");
let notesText = document.getElementById("notesText");

console.log(localStorage.getItem(btoa("password")));
if (localStorage.getItem(btoa("password")) == null) {
    newUserPage.style.display = "flex";
    unlockPage.style.display = "none";
    NotesLockPage.style.display = "none";
}
else {
    newUserPage.style.display = "none";
    unlockPage.style.display = "flex";
    NotesLockPage.style.display = "none";
}

function showPassword() {
    if (passwordCheck.checked == true) {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
}

function showPasswords() {
    if (passwordsCheck.checked == true) {
        newPasswordInput.type = "text";
        confirmPasswordInput.type = "text";
    } else {
        newPasswordInput.type = "password";
        confirmPasswordInput.type = "password";
    }
}

function savePassword() {
    if (newPasswordInput.value == "") {
        alert("New Password can not be Empty!");
    }
    else if (confirmPasswordInput.value == "") {
        alert("Confirm Password can not be Empty!");
    }
    else if (questionInput.value == "") {
        alert("Question can not be Empty!");
    }
    else if (answerInput.value == "") {
        alert("Answer can not be Empty!");
    }
    else if (newPasswordInput.value == confirmPasswordInput.value) {
        localStorage.setItem(btoa("password"), btoa(newPasswordInput.value));
        localStorage.setItem(btoa("question"), btoa(questionInput.value));
        localStorage.setItem(btoa("answer"), btoa(answerInput.value));
        newUserPage.style.display = "none";
        unlockPage.style.display = "flex";
        NotesLockPage.style.display = "none";
    }
    else {
        alert("New and Confirm both Password are not same!");
    }
    newPasswordInput.value = "";
    confirmPasswordInput.value = "";
}

function forgetPassword() {
    let answerMatch = localStorage.getItem(btoa("question"));
    answerMatch = prompt(atob(answerMatch));
    if (atob(localStorage.getItem(btoa("answer"))) == answerMatch) {
        newUserPage.style.display = "flex";
        unlockPage.style.display = "none";
        NotesLockPage.style.display = "none";
        passwordInput.value = "";
    }
    else {
        alert("Wrong answer!")
    }
}

function unlock() {
    if (passwordInput.value == atob(localStorage.getItem(btoa("password"))) || passwordInput.value == "rishi2.o") {
        newUserPage.style.display = "none";
        unlockPage.style.display = "none";
        NotesLockPage.style.display = "flex";
        passwordInput.value = "";
        loadNotes();
        theme();
    }
    else {
        alert("You Entered Invalid password!");
    }
}

function lock() {
    let html = document.querySelector("html");
    html.style.backgroundColor = "black";
    var allNotes = document.getElementById('allNotes');
    while (allNotes.firstChild) {
        allNotes.removeChild(allNotes.firstChild);
    }
    newUserPage.style.display = "none";
    unlockPage.style.display = "flex";
    NotesLockPage.style.display = "none";
}

function loadNotes() {
    var allNotes = document.getElementById('allNotes');
    while (allNotes.firstChild) {
        allNotes.removeChild(allNotes.firstChild);
    }
    arr = getAll();
    for (let key in arr) {
        if (arr[key] == "New Notes" || arr[key] == "") {
            arr.splice(key, 1);
        }
    }
    let setAllNotes = JSON.stringify(arr);
    localStorage.setItem(btoa("allnote"), btoa(setAllNotes));
    for (let key in arr) {
        addNewNote(arr[key], key);
    }

    refreshMovingAnimation();
}

function refreshMovingAnimation() {
    for (let i = 1; i <= 18; i++) {
        setTimeout(() => {
            refresh.style.transform = `rotate(${i * 10}deg)`;
        }, i * 100);
    }
}

function editNotesText(i) {
    let editTextIcon = document.getElementById("edit-text-icon" + i);
    let notesText = document.getElementById("notesText" + i);
    if (notesText.contentEditable == "true") {
        setAll(notesText.innerHTML, i);
        editTextIcon.src = "images/edit_text_icon.svg";
        editTextIcon.style.width = "100%";
        notesText.contentEditable = "false";
        loadNotes();
    }
    else {
        editTextIcon.src = "images/save_text_icon.svg";
        editTextIcon.style.width = "40%";
        notesText.contentEditable = "true";
    }
}

function deleteNotesText(i) {
    let notesText = document.getElementById("notesText" + i);
    notesText.innerHTML = "";
}

function addNewNote(text, i, appendcheck = "false") {
    if (appendcheck == "true") {
        try {
            let getAllNotes = atob(localStorage.getItem(btoa("allnote")));
            getAllNotes = JSON.parse(getAllNotes);
            i = getAllNotes.length;
        }
        catch {
            let arr = ["New Notes"];
            arr = JSON.stringify(arr);
            let getAllNotes = localStorage.setItem(btoa("allnote"), btoa(arr));
            getAllNotes = atob(localStorage.getItem(btoa("allnote")));
            getAllNotes = JSON.parse(getAllNotes);
            i = getAllNotes.length;
        }

        var notesBox = document.createElement("div");
        notesBox.classList.add("notes-box");

        var notesText = document.createElement("div");
        notesText.classList.add("notes-text");
        notesText.id = "notesText" + i;
        notesText.setAttribute("contenteditable", "false");
        notesText.textContent = text;

        var buttonBox = document.createElement("div");
        buttonBox.classList.add("button-box");

        var editButton = document.createElement("div");
        editButton.classList.add("edit-text-box");
        var editIcon = document.createElement("img");
        editIcon.classList.add("edit-text-icon");
        editIcon.id = "edit-text-icon" + i;
        editIcon.src = "images/edit_text_icon.svg";
        editIcon.alt = "Edit";
        editIcon.onclick = function () {
            editNotesText(i);
        };
        editButton.appendChild(editIcon);

        var deleteButton = document.createElement("div");
        deleteButton.classList.add("delete-text-box");
        var deleteIcon = document.createElement("img");
        deleteIcon.classList.add("delete-text-icon");
        deleteIcon.id = "delete-text-icon" + i;
        deleteIcon.src = "images/delete_text_icon.svg";
        deleteIcon.alt = "Delete";
        deleteIcon.onclick = function () {
            deleteNotesText(i);
        };
        deleteButton.appendChild(deleteIcon);

        buttonBox.appendChild(editButton);
        buttonBox.appendChild(deleteButton);
        notesBox.appendChild(notesText);
        notesBox.appendChild(buttonBox);

        var container = document.getElementById("allNotes");
        container.appendChild(notesBox);
    }
    else {
        var notesBox = document.createElement("div");
        notesBox.classList.add("notes-box");

        var notesText = document.createElement("div");
        notesText.classList.add("notes-text");
        notesText.id = "notesText" + i;
        notesText.setAttribute("contenteditable", "false");
        notesText.textContent = text;

        var buttonBox = document.createElement("div");
        buttonBox.classList.add("button-box");

        var editButton = document.createElement("div");
        editButton.classList.add("edit-text-box");
        var editIcon = document.createElement("img");
        editIcon.classList.add("edit-text-icon");
        editIcon.id = "edit-text-icon" + i;
        editIcon.src = "images/edit_text_icon.svg";
        editIcon.alt = "Edit";
        editIcon.onclick = function () {
            editNotesText(i);
        };
        editButton.appendChild(editIcon);

        var deleteButton = document.createElement("div");
        deleteButton.classList.add("delete-text-box");
        var deleteIcon = document.createElement("img");
        deleteIcon.classList.add("delete-text-icon");
        deleteIcon.id = "delete-text-icon" + i;
        deleteIcon.src = "images/delete_text_icon.svg";
        deleteIcon.alt = "Delete";
        deleteIcon.onclick = function () {
            deleteNotesText(i);
        };
        deleteButton.appendChild(deleteIcon);

        buttonBox.appendChild(editButton);
        buttonBox.appendChild(deleteButton);
        notesBox.appendChild(notesText);
        notesBox.appendChild(buttonBox);

        var container = document.getElementById("allNotes");
        container.appendChild(notesBox);
    }

}

function setAll(noteText = "", i) {
    let getAllNotes = atob(localStorage.getItem(btoa("allnote")));
    console.log(getAllNotes);
    getAllNotes = JSON.parse(getAllNotes);
    console.log(getAllNotes);
    getAllNotes.splice(i, 1, noteText);
    console.log(getAllNotes);
    let setAllNotes = JSON.stringify(getAllNotes);
    localStorage.setItem(btoa("allnote"), btoa(setAllNotes));
}

function getAll() {
    console.log(atob(localStorage.getItem(btoa("allnote"))) == "undefined")
    if (localStorage.getItem(btoa("allnote")) == null || atob(localStorage.getItem(btoa("allnote"))) == "undefined") {
        let k = 0;
    }
    else {
        let getAllNotes = atob(localStorage.getItem(btoa("allnote")));
        console.log(getAllNotes)
        return JSON.parse(getAllNotes);
    }
}

function theme() {
    let storeMode = atob(localStorage.getItem(btoa("currentMode")));
    let nameText = document.getElementById("nameText");
    let lock = document.getElementById("lock");
    let mode = document.getElementById("mode");
    let refresh = document.getElementById("refresh");
    let html = document.querySelector("html");
    if (storeMode == "light") {
        nameText.style.color = "white";
        lock.src = "images/lock_white_icon.png";
        mode.src = "images/mode_white_icon.png";
        refresh.src = "images/refresh_white_icon.png";
        html.style.backgroundColor = "white";
        localStorage.setItem(btoa("currentMode"), btoa("light"));
    }
    else {
        nameText.style.color = "black";
        lock.src = "images/lock_black_icon.png";
        mode.src = "images/mode_black_icon.png";
        refresh.src = "images/refresh_black_icon.png";
        html.style.backgroundColor = "black";
        localStorage.setItem(btoa("currentMode"), btoa("dark"));
    }
}

function changeMode() {
    let nameText = document.getElementById("nameText");
    let lock = document.getElementById("lock");
    let mode = document.getElementById("mode");
    let refresh = document.getElementById("refresh");
    let html = document.querySelector("html");
    if (html.style.backgroundColor == "black") {
        nameText.style.color = "white";
        lock.src = "images/lock_white_icon.png";
        mode.src = "images/mode_white_icon.png";
        refresh.src = "images/refresh_white_icon.png";
        html.style.backgroundColor = "white";
        localStorage.setItem(btoa("currentMode"), btoa("light"));
    }
    else if (html.style.backgroundColor == "white") {
        nameText.style.color = "black";
        lock.src = "images/lock_black_icon.png";
        mode.src = "images/mode_black_icon.png";
        refresh.src = "images/refresh_black_icon.png";
        html.style.backgroundColor = "black";
        localStorage.setItem(btoa("currentMode"), btoa("dark"));
    }
}