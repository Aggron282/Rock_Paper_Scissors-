
const RenderOptions = (isPlayer) => {

  var html = "";
  var container_query = isPlayer ? "player_options" : "enemy_options";
  var container = document.querySelector("."+container_query);

  for(var i = 0; i  < game_data.length; i++){
    html += ReturnChoiceHTML(game_data[i])
  }

  container.innerHTML = html;

}

function ReturnChoiceHTML(data){

  return (`
    <div class="choice_container" _id = ${data.id}>
      <img class ="choice_img" src = "./assets/images/${data.name}.png" _id = ${data.id} />
    </div>
  `);

}

function RenderResultWin(didWin,isOn){

  var container = document.querySelector(".result_container");
  var result_background = document.querySelector(".result_background")

  var {class_,text} = GetClasses(didWin);

  var html =( `<div><p class="result ${class_}"> ${text} </p></div>`);

  container.innerHTML = isOn ? html : "";

  if(isOn){
    result_background.classList.add("result_background--active");
  }
  else{
    result_background.classList.remove("result_background--active");
  }

  function GetClasses(didWin){

    var text = "Oops!"
    var class_ = "lose"

    if(didWin){
       text = "Good Job!"
       class_ = "won"
    }

    return {text:text,class_:class_}

  }

}

const HighlightElement = (element,highlight,active_class) => {

  if(highlight){
    element.classList.add(active_class);
  }
  else{
    element.classList.remove(active_class);
  }

}

function SetScoreText(isPlayer){

  var id_root = "_score";
  var who = isPlayer ? "player" : "enemy";

  var score = isPlayer ? player_score : enemy_score;

  _id = who + id_root;

  var score_text = document.querySelector("#"+_id);

  score_text.classList.add("score_active--"+who);
  score_text.innerHTML = score.toString();

}
