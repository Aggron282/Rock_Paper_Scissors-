const RenderOptions = (isPlayer) => {

  var html = "";
  var container_query = isPlayer ? "player_options" : "enemy_options";
  var container = document.querySelector("."+container_query);

  for(var i = 0; i  < game_data.length; i++){
    html += ReturnChoiceHTML(game_data[i],isPlayer)
  }

  container.innerHTML = html;

}

function ReturnChoiceHTML(data,isPlayer){

  var unique = isPlayer ? "--player" : "--enemy";
  var unique_id = data.id + unique;

  return (`
    <div class="${"choice_container choice_container"+unique}" unique_id = ${unique_id} _id = ${data.id} >
      <img class ="choice_img" _id = ${data.id} src = "./assets/images/${data.name}.png" unique_id = ${unique_id} />
    </div>
  `);

}

function RenderResultWin(didWin,isOn){

  var container = document.querySelector(".result_container");

  var result_background = document.querySelector(".result_background")

  var {class_,text} = GetClasses(didWin);

  var html =( `
    <div>
      <p class="result ${class_}"> ${text} </p>
    </div>`
  );

  container.innerHTML = isOn ? html : "";

  if(isOn){
    result_background.classList.add("result_background--active");
  }
  else{
    result_background.classList.remove("result_background--active");
  }

 // Inner function for Render Result Win
  function GetClasses(didWin){

    var text;
    var class_;

    if(didWin){
       text = "You Win!"
       class_ = "won"
    }
    else if(didWin == null){
      text = "It's a Tie!"
      class_ = "tie";
    }
    else{
      text = "You Lost!"
      class_ = "lose"
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

async function SetScoreText(isPlayer){

  if(isPlayer == null){
    return;
  }

  var id_root = "_score";
  var who = isPlayer ? "player" : "enemy";

  var score = isPlayer ? player_score : enemy_score;

  _id = who + id_root;

  var score_text = document.querySelector("#"+_id);

  score_text.classList.add("score_active--"+who);
  score_text.innerHTML = score.toString();

  await Delay(3000);

  score_text.classList.remove("score_active--"+who);

}
