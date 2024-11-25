var active_choice = "active_choice--";
var enemy_options = document.querySelector(".enemy_options");
var player_options = document.querySelector(".player_options");
var highlight_interval = null;
var vs_line = document.querySelector(".vs_line");

const HighlightEnemyOptions = () => {

  var options = enemy_options.querySelectorAll(".choice_container");
  var class_ = active_choice + "enemy--temp";

  highlight_interval = setInterval(()=>{

    var random_index = Math.floor(Math.random() * options.length);
    ResetHighlights(options,class_);
    HighlightElement(options[random_index],true,class_);

  },500)

}

const ResetHighlights = (options,class_) => {

  for(var i =0; i < options.length; i ++){
    HighlightElement(options[i],false,class_);
  }

}

const SelectChoice = (element) => {

  var _id = element.getAttribute("_id");

  var player_choice = {...FindChoice(_id)};
  var class_ = active_choice + "enemy--temp";
  var options = enemy_options.querySelectorAll(".choice_container");

  player_choice.element = element;

  clearInterval(highlight_interval);

  ResetHighlights(options,class_);

  var enemy_choice = RandomizeEnemyChoice();

  console.log(enemy_choice.element)
  console.log(player_choice.element)

  return {
    player:player_choice,
    enemy:enemy_choice
  }

}

const RandomizeEnemyChoice = () =>{

  var choice_all = document.querySelectorAll(".choice_container[unique_id]");
  var choices_for_enemy = [];

  for(var i =0; i < choice_all.length; i++){

    if(choice_all[i].getAttribute("unique_id").includes("--enemy")){
      choices_for_enemy.push(choice_all[i])
    }

  }

  var index = Math.floor(Math.random() * choices_for_enemy.length);

  var enemy_choice_element = choices_for_enemy[index];

  var enemy_id = enemy_choice_element.getAttribute("_id");

  var enemy_choice = {...FindChoice(enemy_id)};


  enemy_choice.element = enemy_choice_element;

  return enemy_choice;

}

const AddEventsToPlayerChoice = () => {

  var choices = player_options.querySelectorAll(".choice_container");

  for(var i =0; i < choices.length; i++){

    choices[i].addEventListener("click",async (e)=>{

      if(!isCombating){

        var element = e.target.parentElement;

        var combat_data = SelectChoice(element);

        audio_player.play(audio_player.ui)

        await Combat(combat_data);
        await Delay(2000);

        Reset(combat_data);

      }

    })

  }

}

const Combat = async ({player,enemy}) => {

  ToggleActiveOptions(player,enemy,true);

  await Delay(2000);

  var did_win = CheckDidPlayerWin(player,enemy);
  var sound = did_win ? "win" : "lose";

  sound = did_win == null ? "tie" : did_win;

  audio_player.play(sound);

  RenderResultWin(did_win,true);

  if(did_win){
    player_score++;
  }
  else if(did_win != null){
    enemy_score ++;
  }

  SetScoreText(did_win);

}

const ToggleActiveOptions = (player,enemy,isOn) => {

  if(isOn){
    player.element.classList.add("active_choice--player");
    enemy.element.classList.add("active_choice--enemy");
    vs_line.classList.add("vs_line--active");
  }
  else{
    player.element.classList.remove("active_choice--player");
    enemy.element.classList.remove("active_choice--enemy");
    vs_line.classList.remove("vs_line--active");
  }

  isCombating = isOn;

}


const Reset = async ({player,enemy}) => {

  ToggleActiveOptions(player,enemy,false);
  await Delay(2000);
  RenderResultWin(null,false);

}


const Init = () => {
  RenderOptions(true);
  RenderOptions(false);
  HighlightEnemyOptions();
  AddEventsToPlayerChoice();
}

Init();
