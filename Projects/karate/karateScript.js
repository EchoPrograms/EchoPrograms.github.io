var triDo = 0;
var toEnd = 0;
var timeActivated = 0;
var time;
function start()
{

  document.querySelector("form").style.visibility = "hidden";
  var innervalue = document.querySelector("#number").value;
  if(parseInt(innervalue) == NaN || parseInt(innervalue) < 1)
  {
    alert("please enter a number 1+");
  }else {
    for(var i = 0; i < parseInt(innervalue)-1; i++)
    {
      triStrait(i, "true");

    }

    triStrait(i, "false");
  }
}
function exersize(type, delay)
{
  setTimeout(()=>{
    document.querySelector("#type").innerHTML = type;
    document.querySelector("body").style.backgroundColor = "red";
    playAudio()
    setTimeout(()=>{document.querySelector("body").style.backgroundColor = "white"}, 150);
  }, delay)
}
function triStrait(time, needs)
{
  if(needs == "true")
  {
    var timer = time * 240000;
  }else if(needs == "false")
  {
    var timer = time * 180000;

  }

  setTimeout(()=>{ 
    var loop = setInterval(()=>{
      if(timeActivated == 1)
      {

        time--;
        document.querySelector("#timer").innerHTML = time;

      }
      if(timeActivated == 0)
      {
        clearInterval(loop);
      }
    }, 1000)
    timeActivated = 1;
    setTimeout(()=>{time = 30;}, 0)
    exersize("tricep pushups", 0)
    setTimeout(()=>{time = 30;}, 30000)
    exersize("hook punches", 30000)
    setTimeout(()=>{time = 30;}, 60000)
    exersize("normal pushups", 60000)
    setTimeout(()=>{time = 30;}, 90000)
    exersize("uppercuts", 90000)
    setTimeout(()=>{time = 30;}, 120000)
    exersize("wide pushups", 120000)
    setTimeout(()=>{time = 30;}, 150000)
    exersize("strait punches", 150000)
    setTimeout(()=>{time = 60;}, 180000)
    setTimeout(()=>{
      if(needs == "false")
      {
        document.querySelector("#type").innerHTML = "COMPLETE";
        timeActivated = 0;
      }
     }, 180000) 
            
    setTimeout(()=>{
      if(needs == "true")
      {
        
        exersize("legs or abbs", 0)
        
      }

    }, 180000)
  }, timer)
}
function playAudio()
{
  var a = document.getElementById("audio");
  a.play();
}