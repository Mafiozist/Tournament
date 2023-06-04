
var adjective = ["Excited", "Anxious", "Overweight", "Demonic", "Jumpy", "Misunderstood", "Squashed", "Gargantuan","Broad", "Crooked", "Curved", "Deep", "Even","Excited", "Anxious", "Overweight", "Demonic", "Jumpy", "Misunderstood", "Squashed", "Gargantuan","Broad", "Crooked", "Curved", "Deep", "Even", "Flat", "Hilly", "Jagged", "Round", "Shallow", "Square", "Steep", "Straight", "Thick", "Thin", "Cooing", "Deafening", "Faint", "Harsh", "High-pitched", "Hissing", "Hushed", "Husky", "Loud", "Melodic", "Moaning", "Mute", "Noisy", "Purring", "Quiet", "Raspy", "Screeching", "Shrill", "Silent", "Soft", "Squeaky", "Squealing", "Thundering", "Voiceless", "Whispering"] 
var object = ["Taco", "Operating System", "Sphere", "Watermelon", "Cheeseburger", "Apple Pie", "Spider", "Dragon", "Remote Control", "Soda", "Barbie Doll", "Watch", "Purple Pen", "Dollar Bill", "Stuffed Animal", "Hair Clip", "Sunglasses", "T-shirt", "Purse", "Towel", "Hat", "Camera", "Hand Sanitizer Bottle", "Photo", "Dog Bone", "Hair Brush", "Birthday Card"]

function generator() {
 return adjective[Math.floor(Math.random() * adjective.length)] + " " + object[Math.floor(Math.random() * object.length)];
}


  function generateStartMatchData(teamsCount){
        var idTeam = 1, idMatch = 1;
        var matchTemplate = {
            id: null,
            //name: 'Final - Match',
            nextMatchId: null,
            nextLooserMatchId: null,
            tournamentRoundText: null,
            startTime: new Date().toDateString(),
            state: 'TBD',
            participants: [],
        }

        var teamTemplate = {
            id: null,
            resultText: null,
            isWinner: false,
            status: 'TBD',
            name: null,
        };

        var matches = [];
        var nextMatches = [];
        var teams = [];

        if(teamsCount % 2 === 0){
            
            var firstMatchesCount = teamsCount / 2;
            var nextMatchesCount = firstMatchesCount;


            for(var i = 0; i<teamsCount; ++i){
                var team = {...teamTemplate};
                team.id = idTeam++;
                team.name = generator();
                teams.push(team);
            }

            
            for(var i = 0; i<firstMatchesCount; ++i){ //имеем n команд, получаем n/2 матчей для первого этапа
                var match = {...matchTemplate};
                match.id = idMatch++;
                match.tournamentRoundText = 'Test' + i;

                for(var t = (i===0)? 0 : i + 2; t < (i === 0)? 2 : i + 4; ++t){
                    match.participants.push(teams[t]);
                }

                matches.push(match);
            }

            // while(nextMatches != 1){



            // }
            
            return matches;
        } else{


        }
  }


  class Match {
    constructor(value) {
      this.id = value.id,
      //name: 'Final - Match',
      this.nextMatchId= null,
      //this.nextLooserMatchId: null,
      //this.tournamentRoundText: null,
      this.startTime= new Date().toDateString(),
      this.state= 'TBD',
      this.participants= value.participants,
      this.leftMatch = null;
      this.rightMatch = null;
    }
  }
  
  function createBinaryTree(levels, leaves) {
    if (levels <= 0 || leaves <= 0) {
      return null;
    }
  
    const root = new Match(1);
    const queue = [root];
    let level = 1;
  
    while (level < levels) {
      const levelNodes = queue.length;
      let count = 0;
  
      while (count < levelNodes) {
        const node = queue.shift();
  
        if (count < leaves && level < levels) {
          node.left = new Match(1);
          queue.push(node.left);
          count++;
        }
  
        if (count < leaves && level < levels) {
          node.right = new Match(1);
          queue.push(node.right);
          count++;
        }
  
        if (count >= leaves) {
          break;
        }
      }
  
      level++;
    }
  
    return root;
  }