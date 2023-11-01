var button = {}; 
var speed = 2; 
var keybutton = {"C":"A", "D":"S", "E":"D", "F":"F", "G":"G", "A":"H", "B":"J", "C2":"K", "bC":"W", "bD":"E", "bF":"T", "bA":"Y", "bB":"U"};
var buttonkey = {"A":"C", "S":"D", "D":"E", "F":"F", "G":"G", "H":"A", "J":"B", "K":"C2", "W":"bC", "E":"bD", "T":"bF", "Y":"bA", "U":"bB"};
var tilewidth = {"TC":50, "TbC":25, "TD":50, "TbD":25, "TE":50, "TF":50, "TbF":25, "TG":50, "TbA":25, "TA":50, "TbB":25, "TB":50};
var score = 0;
var buttonuse = ["A", "S", "D", "F", "G", "H", "J", "W", "E", "T", "Y", "U"]; 
var presscount = 0; 
var notedowned = 0; 
var miss = 0; 
var combo = 0; 
var maxcombo = 0;


//In summary, this function is designed to play sounds associated with specific musical notes. 
//It sets the volume, resets the playback position, 
//and attempts to play the sound. Additionally, 
//it handles cases where autoplay might be restricted by attempting to play the sound again. 
//The function is meant to be called with the name of the sound to play and the desired volume level.

function playsound(soundname, vol){
    var thesound = document.querySelector(`audio[data-key="` + soundname +`"]`)
    thesound.volume = vol;
    thesound.pause();
    const playPromise = thesound.play(); 
    if (playPromise !== null){
        thesound.currentTime = 0;
        playPromise.catch(() => { thesound.play(); })
    }
}

//The purpose of this code is to keep track of the state of keys being pressed and released
// It updates the button object with key states, increments presscount for key releases, and clears any previous key presses.
//The condition countpress() < 2 suggests that there may be a limit on the number of keys that can be pressed simultaneously (possibly a two-key limit in this case).
document.onkeydown = document.onkeyup = function(e){
    var key_code = String.fromCharCode(e.keyCode);
    if(countpress() < 2 || e.type == "keyup") 
        button[key_code] = e.type == "keydown";
    presscount += e.type == "keyup";
    pressing = "";
}


//This function is used to determine how many keys are currently being held down, which is likely essential for the game's logic
// It uses the button object and the buttonuse array (which was defined in your previous code snippet)
//to keep track of the keys being pressed and then counts them using the countpress() function. The allkeyid object is used to map numeric values to note names for display or processing.
var allkeyid = {0:"C", 1:"D", 2:"E", 3:"F", 4:"G", 5:"A", 6:"B", 7:"bC", 8:"bD", 9:"bF", 10:"bA", 11:"bB"};

function countpress(){
    var count = 0;
    for(i = 0 ; i <= 11 ; i++){
        if(button[buttonuse[i]])
            count += 1;
    }
    return count;
}

//In summary, this code iterates through a set of HTML elements represented by allkeyid values (presumably corresponding to musical notes or keys in a game)
// and it adjusts their horizontal (left) position based on their x attribute and their vertical (top) position to a fixed value of 450 pixels. 
//This code is likely positioning elements on the page or screen for a game or application with musical elements.
for(i = 0 ; i <= 11 ; i++){
    var pk = document.getElementById(allkeyid[i])
    pk.style.left = pk.getAttribute("x")*50;
    pk.style.top = 450;
}

// This suggests that these elements have IDs like "TC," "TD," "TE," and so on, where the "T" prefix may indicate their type or category. The code positions these elements horizontally based on their x attributes.

for(i = 0 ; i <= 11 ; i++){
    var pk = document.getElementById("T" + allkeyid[i])
    pk.style.left = pk.getAttribute("x")*50;
}

//So, this line of code is setting up a timer that will repeatedly call the whatkeypress function every 10 milliseconds.
setInterval(whatkeypress, 10);
// It ensures that the game interface reflects the user's input and interactions.
// The specific implementation details of the updatekeyart function would determine how these visual updates are applied.
function whatkeypress(){
    for(i = 0 ; i <= 11 ; i++){
        if(button[keybutton[allkeyid[i]]]){
            updatekeyart(allkeyid[i], "onpress");
            updatekeyart("T" + allkeyid[i], "onpress");
        }
        else{
            updatekeyart(allkeyid[i], "unpress");
            updatekeyart("T" + allkeyid[i], "unpress");
        }
    }   
}
//This function appears to be used in conjunction with the whatkeypress function to update the visual representation of musical notes or other game elements in response to user input (e.g., key presses).
function updatekeyart(keyname, statset){
    var keypressed = document.getElementById(keyname);
    keypressed.setAttribute("status", statset);
}

var fallingnote = [];
function addnote(tileid, rythm){
    var note = document.createElement("div"); 
    note.setAttribute("class", "note");
    note.setAttribute("y", 0); 
    note.setAttribute("size", rythm);
    note.setAttribute("keytohit", tileid.slice(1, tileid.length - 1));
    note.setAttribute("soundkey", tileid.slice(1, tileid.length) + "-" + rythm);
    note.setAttribute("hit", "false"); 
    note.style.width = tilewidth[tileid]; 
    fallingnote.push(note); 
    tile = document.getElementById(tileid.slice(0, tileid.length - 1));
    tile.appendChild(note); 
}
var song = [["F3", 1], ["D3", 1], ["A2", 1], ["F3", 1], ["D3", 1], ["A2", 1], ["F3", 1], ["D3", 1], ["A2", 1], ["F3", 1], ["D3", 1], ["A2", 1], ["E3", 2], ["E3", 2], ["E3", 2],
["F3", 1], ["D3", 1], ["A2", 1], ["F3", 1], ["D3", 1], ["A2", 1], ["F3", 1], ["D3", 1], ["A2", 1], ["F3", 1], ["D3", 1], ["A2", 1], ["G3", 2], ["G3", 2], ["G3", 2],
["F3", 1], ["D3", 1], ["A2", 1], ["F3", 1], ["D3", 1], ["A2", 1], ["F3", 1], ["D3", 1], ["A2", 1], ["F3", 1], ["D3", 1], ["A2", 1], ["E3", 2], ["E3", 2], ["E3", 2],
["F3", 1], ["D3", 1], ["A2", 1], ["F3", 1], ["D3", 1], ["A2", 1], ["F3", 1], ["D3", 1], ["A2", 1], ["F3", 1], ["D3", 1], ["A2", 1], ["G3", 2], ["G3", 2], ["G3", 2],
["F3", 1], ["D3", 1], ["A2", 1], ["F3", 1], ["D3", 1], ["A2", 1], ["F3", 1], ["D3", 1], ["A2", 1], ["F3", 1], ["D3", 1], ["A2", 1], ["E3", 2], ["E3", 2], ["E3", 2],
["F3", 1], ["D3", 1], ["A2", 1], ["F3", 1], ["D3", 1], ["A2", 1], ["F3", 1], ["D3", 1], ["A2", 1], ["F3", 1], ["D3", 1], ["A2", 1], ["G3", 2], ["G3", 2], ["G3", 2],
["F3", 1], ["D3", 1], ["A2", 1], ["F3", 1], ["D3", 1], ["A2", 1], ["F3", 1], ["D3", 1], ["A2", 1], ["F3", 1], ["D3", 1], ["A2", 1], ["bB3", 2], ["G3", 1], ["E3", 1],

["A3", 2], ["F3", 2], ["bA3", 2], ["E3", 2], ["B3", 2], ["bA3", 2], ["G3", 2], ["bB3", 2], ["A3", 2], ["F3", 2],
["bA3", 2], ["E3", 2], ["B3", 2], ["bA3", 2], ["G3", 4],
["A3", 2], ["F3", 2], ["bA3", 2], ["E3", 2], ["B3", 2], ["bA3", 2], ["G3", 2], ["bB3", 2], ["A3", 2], ["F3", 2],
["bA3", 2], ["E3", 2], ["B3", 2], ["bA3", 2], ["G3", 4], ["0", 1],


["D3", 2], ["A3", 2], ["E3", 2], ["A3", 2], ["F3", 2], ["G3", 1], ["A3", 1], ["G3", 2], ["B3", 2], ["D4", 1], ["A3", 1], ["E4", 1], ["F4", 1], ["E4", 1], ["F4", 1], ["E4", 1], ["D4", 1], ["C4", 1], ["A3", 1], ["C4", 1], ["G3", 1], ["A3", 1], ["F3", 4],
["D3", 2], ["A3", 2], ["E3", 2], ["A3", 2], ["F3", 2], ["G3", 1], ["A3", 1], ["G3", 2], ["B3", 2], ["D4", 1], ["A3", 1], ["E4", 1], ["F4", 1], ["E4", 1], ["F4", 1], ["E4", 1], ["D4", 1], ["C4", 1], ["D4", 4], ["0", 1],

["D3", 2], ["A3", 2], ["E3", 2], ["A3", 2], ["F3", 2], ["G3", 1], ["A3", 1], ["G3", 2], ["B3", 2], ["D4", 1], ["A3", 1], ["E4", 1], ["F4", 1], ["E4", 1], ["F4", 1], ["E4", 1], ["D4", 1], ["C4", 1], ["D4", 4], ["0", 1],
["D3", 2], ["A3", 2], ["E3", 2], ["A3", 2], ["F3", 2], ["G3", 1], ["A3", 1], ["G3", 2], ["B3", 2], ["D4", 1], ["A3", 1], ["E4", 1], ["F4", 1], ["E4", 1], ["F4", 1], ["E4", 1], ["D4", 1], ["C4", 1], ["A3", 1], ["C4", 1], ["G3", 1], ["A3", 1], ["F3", 4],
["D3", 2], ["A3", 2], ["E3", 2], ["A3", 2], ["F3", 2], ["G3", 1], ["A3", 1], ["G3", 2], ["B3", 2], ["D4", 1], ["A3", 1], ["E4", 1], ["F4", 1], ["E4", 1], ["F4", 1], ["E4", 1], ["D4", 1], ["C4", 1], ["D4", 4], ["0", 1]]; 


var songtime = 0; 
var cordsong = [["D0", 4], ["0", 2], ["A0", 3], ["D1", 3], ["0", 1], ["E0", 3], ["E0", 3],
["D0", 4], ["0", 2], ["A0", 3], ["D1", 3],["0", 1], ["G0", 3], ["G0", 3],
["D0", 4], ["0", 2], ["A0", 3], ["D1", 3],["0", 1], ["E0", 3], ["E0", 3], 
["D0", 4], ["0", 2], ["A0", 3], ["D1", 3],["0", 1], ["G0", 3], ["G0", 3],
["D0", 4], ["0", 2], ["A0", 3], ["D1", 3],["E0", 3], ["E0", 3],
["D0", 4], ["0", 2], ["A0", 3], ["D1", 3],["0", 1],  ["G0", 3], ["G0", 3],
["0", 4], ["0", 4],
["D1", 4], ["bC1", 4], ["E1", 4], ["bD1", 4], ["D1", 2], ["D1", 2], ["bC1", 2], ["bC1", 2], ["E1", 2], ["E1", 2], ["bD1", 2], ["bD1", 2],
["D1", 2], ["D1", 2], ["bC1", 2], ["bC1", 2], ["E1", 2], ["E1", 2], ["bD1", 2], ["bD1", 2], ["D1", 2], ["D1", 2], ["bC1", 2], ["bC1", 2], ["E1", 2], ["E1", 2], ["bD1", 2], ["bD1", 2],
["0", 4], ["0", 4],


["A0", 4], ["A0", 4], ["D1", 4], ["B0", 4], ["bB0", 4], ["C1", 4], ["D1", 2], ["D1", 2], ["D1", 2], ["D1", 2],
["A0", 4], ["A0", 4], ["D1", 4], ["B0", 4], ["bB0", 4], ["C1", 4], ["D1", 2], ["D1", 2], ["D1", 2], ["D1", 2],
["A0", 2], ["A0", 2], ["C1", 2], ["C1", 2], ["D1", 2], ["D1", 2], ["B0", 2], ["B0", 2], ["A0", 2], ["A0", 2], ["C1", 3], ["C1", 2], ["A0", 3], ["D0", 2],

["A0", 4], ["A0", 4], ["D1", 4], ["B0", 4], ["bB0", 4], ["C1", 4], ["D1", 2], ["D1", 2], ["D1", 2], ["D1", 2],
["A0", 2], ["A0", 2], ["C1", 2], ["C1", 2], ["D1", 2], ["D1", 2], ["B0", 2], ["B0", 2], ["A0", 2], ["A0", 2], ["C1", 3], ["C1", 2], ["A0", 3], ["D0", 2]];


var cordtime = 0;

function countdown(cd){
    Thecountdowntext.style.display = "none";
    Thecountdownnum.style.visibility = "visible";   
    for(let i = 1 ; i <= 4 ; i++){
        setTimeout(function(){
            console.log(cd);
            cd --;
            Thecountdownnum.innerText = cd + "s";
            if(i == 4){
                Thecountdown.style.display = "none";
                playsong();
                setTimeout(function(){
                    playcord();
                }, 5400);
            }
        }, i*1000);
    }
}



function playcord(){
    for(let i = 0 ; i <= cordsong.length - 1 ; i++){
        cordtime += cordsong[i][1]*(i != 0) + 0.05;
        setTimeout(function(){
            if(cordsong[i][0] != "0"){
                console.log(cordsong[i][0]);
                playsound(cordsong[i][0] + "-" + cordsong[i][1], 0.4);
            }
        }, cordtime*1000/Math.pow(speed, 2));
    }
}


function playsong(){
    for(let i = 0 ; i <= song.length - 1 ; i++){
        songtime += song[i][1]*(i != 0) + 0.05;
        setTimeout(function(){
            if(song[i][0] != "0"){
                addnote("T" + song[i][0], song[i][1]);
            }
            if(i == song.length - 1){
                setTimeout(function(){
                    model.style.visibility = "visible";
                    sumscore.innerText = score;
                    var acc = ((notedowned - miss)/notedowned*100);
                    resultacc.innerText = "Accuracy : " + ((notedowned - miss)/notedowned*100).toString().slice(0, 5) + "%";
                    Mcombo.innerText = "Max Combo : " + maxcombo;
                    if(acc >= 90){
                        rank.setAttribute("Getrank", "S");
                    }else if(acc >= 80){
                        rank.setAttribute("Getrank", "A");
                    }else if(acc >= 65){
                        rank.setAttribute("Getrank", "B");
                    }else{
                        rank.setAttribute("Getrank", "C");
                    }
                }, 6400)
            }
        }, songtime*1000/Math.pow(speed, 2)); 
}
function falldownnote(noteid){
        var note = fallingnote[noteid];
        var posy = Number(note.getAttribute("y"));
        posy += speed;
        note.setAttribute("y", posy);
        note.style.top = posy;
}

function delunbound(noteid){
    var note = fallingnote[noteid];
    if(note.getAttribute("hit") == "false"){
        miss += 1;
        combo = 0
    }
    if(note.getAttribute("hit") == "true"){
        combo += 1;
        score += 100 + combo*10; 
    }
    if(combo > maxcombo){
        maxcombo = combo;
    }
    note.parentNode.removeChild(note) 
    fallingnote.splice(noteid, 1);
    notedowned += 1; 
    accuracy.innerText = "Accuracy : " + ((notedowned - miss)/notedowned*100).toString().slice(0, 5) + "%";
}

function isunboundnote(noteid){
    var note = fallingnote[noteid];
    var posy = Number(note.getAttribute("y"));
    return (posy >= 480)
}

function keyhit(){
    for(let i = 0 ; i < fallingnote.length ; i++){
        var posy = fallingnote[i].getAttribute("y");
        var notesize = Number(fallingnote[i].getAttribute("size"))*20;
        var canhit = (posy >= (450 - notesize)) && (posy <= 450);
        var hit = canhit && button[keybutton[fallingnote[i].getAttribute("keytohit")]] 
        if(fallingnote[i].getAttribute("hit") == "false" && hit){
            fallingnote[i].setAttribute("hit", hit);
            playsound(fallingnote[i].getAttribute("soundkey"), 1); 
        }
    }
}
setInterval(function(){
    if(fallingnote){
        for(let i = 0 ; i < fallingnote.length ; i ++){
            falldownnote(i);
            if(isunboundnote(i)){
                delunbound(i);
        }
    }
}
    progress.style.width = notedowned/song.length*100 + "%";
    pacman.style.left = notedowned/song.length*100 + "%";
    keyhit();
    Thescore.innerText = score;
    Thecombo.innerText = "Combo : " + combo;
}, 50/speed)

}
