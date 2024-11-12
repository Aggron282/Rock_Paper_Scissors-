var start_container = document.querySelector(".start_container");
var start_btn = document.querySelector(".start_btn");
var main_container = document.querySelector(".main_container");
var quit_btn = document.querySelector(".quit_btn");
var watermark_container = document.querySelector(".watermark_container");

var isPlaying = false;

start_btn.addEventListener("click",(e)=>{
  isPlaying = true;
  StartGame();
});

quit_btn.addEventListener("click",(e)=>{
  isPlaying = false;
  ToggleScreens();
});

const ToggleScreens = () =>{

  if(isPlaying){
    start_container.classList.add("inactive");
    main_container.classList.remove("inactive");
    watermark_container.classList.add("inactive--watermark")
  }
  else{
    main_container.classList.add("inactive");
    start_container.classList.remove("inactive");
    watermark_container.classList.remove("inactive--watermark")
  }

}

const StartGame = () => {
  ToggleScreens();
  RenderOptions(true);
  RenderOptions(false);
  HighlightEnemyOptions();
  AddEventsToPlayerChoice();
}

ToggleScreens();
