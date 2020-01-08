let element = document.getElementById('palette');
let xhr = new XMLHttpRequest();
xhr.onreadystatechange = () =>{
  console.log(this);
}
xhr.open("GET","./async/palette.txt," true);
xhr.send();

