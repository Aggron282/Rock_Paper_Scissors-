const StartGame = () => {
  audio_player.play(audio_player.ui);
  setTimeout(()=>{
    window.location.assign("main.html");
  },500)
}

const QuitGame = () => {

  audio_player.play(audio_player.quit);

  setTimeout(()=>{
    window.location.assign("index.html");
  },500)

}

if(document.querySelector(".quit")){

  var quit = document.querySelector(".quit");

  quit.addEventListener("click",(e)=>{
    QuitGame();
  })

}

if(document.querySelector(".start_btn")){

  var start_game = document.querySelector(".start_btn");

  start_game.addEventListener("click",(e)=>{
    StartGame();
  })

}
