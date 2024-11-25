function CreateSrc(string){
  return `./assets/audio/${string}.mp3`;
}

function PlayAudio(src){
  var audio =  new Audio(src);
  audio.play();
  setTimeout(()=>{audio.pause()},2500)
}

var audio_player = {
  click: CreateSrc("click"),
  lose: CreateSrc("lose"),
  tie: CreateSrc("tie"),
  ui:CreateSrc("ui"),
  win:CreateSrc("win"),
  quit:CreateSrc("quit"),
  play:PlayAudio
}
