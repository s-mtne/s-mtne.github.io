(()=>{"use strict";const box=document.querySelector("#mtne-caesar");if(!box)return;
const phrases=["LES LEGIONS APPROCHENT DE ROME","LE MESSAGER ARRIVERA DEMAIN","CESAR TRAVERSE LE RUBICON","LE SENAT SE REUNIT CE SOIR","LES GARDES PROTEGENT LA PORTE","LE CAMP EST PRES DE LA RIVIERE","UN NAVIRE ARRIVE AU PORT","LA ROUTE VERS ROME EST LIBRE","LES SOLDATS ATTENDENT UN ORDRE","LE GENERAL PREPARE LA MARCHE"];
const alphabet="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const clean=s=>s.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^A-Z]/g,"");
const group=s=>(s.match(/.{1,5}/g)||[]).join(" ");
const rotate=(msg,shift)=>msg.replace(/[A-Z]/g,ch=>alphabet[(alphabet.indexOf(ch)+shift+26)%26]);
let index=-1,secret=0,cipher="";
function show(){const shift=Number(box.querySelector("#caesar-shift").value);const decoded=rotate(cipher,26-shift);box.querySelector("#caesar-shift-value").textContent=shift+" lettre"+(shift===1?"":"s");box.querySelector("#caesar-rotated").textContent=rotate(alphabet,shift);box.querySelector("#caesar-output").textContent=group(decoded);const success=shift===secret;box.querySelector("#caesar-status").textContent=success?"Code trouvé ! Tu as retrouvé le message.":shift===0?"Fais glisser le curseur pour tester les décalages et retrouver une phrase lisible.":"Lis les groupes de cinq lettres : reconnais-tu une phrase ?";box.querySelector("#caesar-status").classList.toggle("is-solved",success);box.querySelector("#caesar-answer").hidden=!success;box.querySelector("#caesar-answer").textContent=success?"Message reconstitué : "+phrases[index]:""}
function newMessage(){index=(index+1)%phrases.length;secret=3+(index*7)%20;cipher=rotate(clean(phrases[index]),secret);box.querySelector("#caesar-intercept").textContent=group(cipher);box.querySelector("#caesar-shift").value="0";show()}
box.addEventListener("input",e=>{if(e.target.id==="caesar-shift")show()});
box.addEventListener("click",e=>{if(e.target.closest("#caesar-new"))newMessage();if(e.target.closest("#caesar-reset")){box.querySelector("#caesar-shift").value="0";show()}});
newMessage()})();