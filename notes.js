// This function initializes the entire Notes feature
export function initNotes() {
  let noteInput = document.getElementById("note-input");
  let addNoteBtn = document.getElementById("add-note-btn");
  let notesContainer = document.getElementById("notes-container");

  let notes = JSON.parse(localStorage.getItem("notes")) || [];

  // Load saved notes
  notes.forEach((note, index) => {
    createNote(note, index);
  });

  // Add note button
  addNoteBtn.addEventListener("click", () => {
    const noteText = noteInput.value.trim();
    if (noteText === "") return;

    notes.push(noteText);
    saveNotes();
    createNote(noteText, notes.length - 1);
    noteInput.value = "";
  });

  function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  function createNote(text, index) {
    const noteCard = document.createElement("div");
    noteCard.classList.add("note"); // note card styling

    const noteText = document.createElement("p");
    noteText.textContent = text;

    // Container for buttons
    const actionsDiv = document.createElement("div");
    actionsDiv.classList.add("note-actions");

    // Edit button
    const EditBtn = document.createElement("button");
    EditBtn.textContent = "Edit";
    EditBtn.classList.add("note-edit-btn"); // ✅ always green

    // Delete button
    const DltBtn = document.createElement("button");
    DltBtn.textContent = "Delete";
    DltBtn.classList.add("note-delete-btn"); // ✅ always red

    // Edit functionality
    EditBtn.addEventListener("click", () => {
      if (EditBtn.textContent === "Edit") {
        noteText.contentEditable = true;
        noteText.focus();
        EditBtn.textContent = "Save";
      } else {
        noteText.contentEditable = false;
        EditBtn.textContent = "Edit";
        notes[index] = noteText.textContent;
        saveNotes();
      }

      // ✅ Ensure colors remain after click
      EditBtn.classList.add("note-edit-btn");
      DltBtn.classList.add("note-delete-btn");
    });

    // Delete functionality
    DltBtn.addEventListener("click", () => {
      noteCard.remove();
      notes.splice(index, 1);
      saveNotes();
      renderNotes();
    });

    actionsDiv.appendChild(EditBtn);
    actionsDiv.appendChild(DltBtn);

    noteCard.appendChild(noteText);
    noteCard.appendChild(actionsDiv);

    notesContainer.appendChild(noteCard);
  }

  function renderNotes() {
    notesContainer.innerHTML = "";
    notes.forEach((note, index) => {
      createNote(note, index);
    });
  }
}
