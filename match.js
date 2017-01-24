var tile = [];
var temp=[];
var words = [];

var tilesRemaining=16;
var wordsEasy = ['apple.jpg','ball.jpg','cat.jpg','dog.jpg','elephant.jpg','frog.jpg','giraffe.jpg','horse.jpg','apple.jpg','ball.jpg','cat.jpg','dog.jpg','elephant.jpg','frog.jpg','giraffe.jpg','horse.jpg'];
var wordsMedium = ['apple.jpg','ball.jpg','cat.jpg','dog.jpg','elephant.jpg','frog.jpg','giraffe.jpg','horse.jpg','ink.jpg','jar.jpg','apple.jpg','ball.jpg','cat.jpg','dog.jpg','elephant.jpg','frog.jpg','giraffe.jpg','horse.jpg','ink.jpg','jar.jpg'];
var wordsDifficult = ['apple.jpg','ball.jpg','cat.jpg','dog.jpg','elephant.jpg','frog.jpg','giraffe.jpg','horse.jpg','ink.jpg','jar.jpg','kite.jpg','lion.jpg','apple.jpg','ball.jpg','cat.jpg','dog.jpg','elephant.jpg','frog.jpg','giraffe.jpg','horse.jpg','ink.jpg','jar.jpg','kite.jpg','lion.jpg'];

var cover=0, count=0;
var first=' ', second=' ';
var x1=0,x2=0;
var i,x;

var win = document.createElement('p');
win.id= 'over';
win.textContent='';
var newGame= document.getElementById('newGame');
newGame.addEventListener('click', startGame);

function startGame()
{
  var clean= document.querySelectorAll('SPAN');
  for(i=0; i< clean.length; i++)
  {
    document.body.removeChild( clean[i]);
  }
  win.textContent='';

  var choice= document.querySelector('select');
  var level= choice.value;
  tile=[];
  words=[];
  temp=[];
  count=0;

  switch (level)
   {
    case 'medium':  for(i=0;i<wordsMedium.length; i++)
                        {
                          words[i] =wordsMedium[i];
                        }    j=4;  break;
    case 'diff':    for(i=0;i<wordsDifficult.length; i++)
                        {
                          words[i] =wordsDifficult[i];
                        } j=5;  break;
    default:
    case 'easy':    for(i=0;i<wordsEasy.length; i++)
                        {
                          words[i] =wordsEasy[i];
                        }      j=3;

  }
  //randomize
  var n= words.length;
  tilesRemaining= n;
  for (i=0; i<n-1; i++)
  {
      temp.push(words.splice(Math.floor(Math.random()*words.length),1)[0]);
  }
  temp.push(words[0]);
  words=temp;

  //create tiles
  for( i=0; i<words.length;i++)
  {
    var btn=document.createElement('SPAN');
    btn.id=i;
    tile[i]=btn;
    document.body.appendChild(tile[i]);
    tile[i].addEventListener('click', swapBtn);
    if((i%(j+1)) ===j)
    {
      var brk= document.createElement('p');
      document.body.appendChild(brk);
    }
  }
}

function swapBtn()
{
  count++;
  var ap=this.id;
  var x=Number(ap);
  var word=words[x];
  this.style.backgroundImage= "url("+word+")";
  if(cover===0)
    {
        first=word;
        x1=x;
    }
  else if(cover===1)
    {
        second=word;
        x2=x;
    }
  else
    {
      if(first===second)
      {
        tile[x1].style.visibility='hidden';
        tile[x2].style.visibility='hidden';
        tilesRemaining-=2;
      }
      else
      {
        tile[x1].style.backgroundImage = "url(\'back.jpg\')";
        tile[x2].style.backgroundImage = "url(\'back.jpg\')";
      }
      first=word;
      x1=x;
      second=' ';
      cover=0;
    }
  cover++;
  gameOver();
}

function gameOver()
{
  if(tilesRemaining===2)
  {
    var win1= 'Congrats. You have won the game. You took ' + count + ' turns.'
    win.textContent= win1;
    document.body.appendChild(win);
    for( i=0; i<tile.length;i++)
    {
      document.body.removeChild(tile[i]);
    }
  }
}
