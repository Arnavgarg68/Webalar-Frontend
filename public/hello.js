var arr = ["Tasky-for all taskings","Lets kill all tasks"]
var i=0;

function changetitle(){
    document.title=arr[i];
    i = (i == arr.length - 1) ? 0 : i + 1;
}
setInterval(changetitle,3000);