var player_score = 0;
var enemy_score = 0;
var isCombating = false;

var enums = {
  Rock:0,
  Paper:1,
  Scissor:3
}

var game_data = [
  {
    name : "rock",
    loses: enums.Paper,
    wins: enums.Scissor,
    id:enums.Rock,
  },
  {
    name : "paper",
    loses: enums.Scissor,
    wins: enums.Rock,
    id:enums.Paper,
  },
  {
    name : "scissor",
    loses: enums.Rock,
    wins: enums.Paper,
    id:enums.Scissor,
  },
]


function FindChoice(id){

    for(var i =0; i < game_data.length; i++){

      if(game_data[i].id == id){
        return game_data[i]
      }

    }

    return null;

}

function CheckDidPlayerWin(player,enemy){

    var loses = player.loses;
    var id = enemy.id;

    if(loses == id){
      return false;
    }
    else{
      return true;
    }

}

const Delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}
