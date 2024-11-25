// var start_container = document.querySelector(".start_container");
// var start_btn = document.querySelector(".start_btn");
// var main_container = document.querySelector(".main_container");

// var watermark_container = document.querySelector(".watermark_container");

// var isPlaying = false;

// start_btn.addEventListener("click",(e)=>{
//   isPlaying = true;
//   StartGame();
// });

// const ToggleScreens = (isPlaying_) =>{
//
//   if(isPlaying){
//     start_container.classList.add("inactive");
//     main_container.classList.remove("inactive");
//     watermark_container.classList.add("inactive--watermark")
//   }
//   else{
//     main_container.classList.add("inactive");
//     start_container.classList.remove("inactive");
//     watermark_container.classList.remove("inactive--watermark")
//   }
//
// }

const StartGame = () => {

  RenderOptions(true);
  RenderOptions(false);
  HighlightEnemyOptions();
  AddEventsToPlayerChoice();

}

// isPlaying = false;


StartGame();
