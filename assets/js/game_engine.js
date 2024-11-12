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
  var player_choice = FindChoice(_id);
  var enemy_choice = RandomizeEnemyChoice();
  var class_ = active_choice + "enemy--temp";
  var options = enemy_options.querySelectorAll(".choice_container");

  player_choice.element = element;

  clearInterval(highlight_interval);
  ResetHighlights(options,class_);

  return {
    player:player_choice,
    enemy:enemy_choice
  }

}

const RandomizeEnemyChoice = () =>{

  var choices_for_enemy = enemy_options.querySelectorAll(".choice_container");
  var random_index = Math.floor(0,choices_for_enemy.length);
  var enemy_choice_element = choices_for_enemy[random_index];
  var enemy_id = enemy_choice_element.getAttribute("_id");
  var enemy_choice = FindChoice(enemy_id);

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

  RenderResultWin(did_win,true);

  if(did_win){
    player_score++;
  }
  else{
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
