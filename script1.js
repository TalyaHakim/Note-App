class Note{
    constructor(ToDo,Date,Time,id){
        this.ToDo = ToDo;
        this.Date = Date;
        this.Time = Time;
        this.id = id;
    }
}
let notes = loadFromStorage('notes') ? loadFromStorage('notes') : [];
let tempIdNumber = loadFromStorage('noteId') ? loadFromStorage('noteId') : 0;

function note(ToDo,Date,Time){
    
    if(ToDo !='' && Date !='' && Time !=''){
        creatNote(ToDo,Date,Time);
    }
    else{
        if(ToDo == ''){
            document.getElementById('todo').style.borderColor = "red";
        }else if(Date == ''){
            document.getElementById('todo').style.borderColor = "transparent";
            document.getElementById('date').style.borderColor = "red";
        }else{
            document.getElementById('todo').style.borderColor = "transparent";
            document.getElementById('date').style.borderColor = "transparent";
            document.getElementById('time').style.borderColor = "red";
        }
    }
}
const creatNote = (ToDo,Date,Time) => {
    tempIdNumber++
    const x = new Note(ToDo,Date,Time,tempIdNumber);
    notes.push(x);
    showNote(x);
    savenote();
}
const showNote = (noteObject) => {
    const divItem = document.createElement('div');
    divItem.innerHTML = `<p>${noteObject.ToDo}</p>
                         <p>${noteObject.Date}</p>
                         <p>${noteObject.Time}</p>`
    divItem.className = 'divItem';
    const removeButton = document.createElement('button');
    removeButton.innerHTML = 'X'
    divItem.appendChild(removeButton)
    removeButton.addEventListener('click', () => removeNote(noteObject.id))
    document.getElementById('allnotes').appendChild(divItem)
}
const removeNote = (id) => {
    for(let i=0; i<notes.length; i++){
        if(notes[i].id == id){
        notes.splice(i,1);
        document.getElementById('allnotes').innerHTML = '';
        notes.forEach(showNote);
        savenote();
        }
    }
}
function findNote(text){     
    text = text.trim();
    matchItems = notes.filter(e => e.ToDo.startsWith(text));
    if(matchItems.length > 0 ){
    document.getElementById('allnotes').innerHTML = '';
    matchItems.forEach(showNote);
    }
}
const savenote = () => {
    localStorage.setItem('noteId', tempIdNumber);
    localStorage.setItem('notes', JSON.stringify(notes))
}
function loadFromStorage(key){
    return JSON.parse(localStorage.getItem(key));
}
window.onload = () => {
   notes.forEach(showNote);
};
