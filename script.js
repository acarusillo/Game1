// Created by Aki Carusillo

var PlayerX=0;
var ToMove=30;



var Shooted=false;
var BulletY=-25;
var BulletX=17;
var GameOver=true;
var Score=0;
var StoneMovingSpeed=2;
var ContinuouslyMove=false;
var ToMoveContinuously=1;
var HighScore=0;
var CollisionDetectorX;

var deg=0;
var Time=1;
var Comments=["Nice Try!","Great!","Yay!","Wow!","Awesome!","Sweet!","Yes!","You are the best!","Amazing!","Good!"];
function MoveRight()
{
    
    ContinuouslyMove=true;
    ToMoveContinuously=1;
        //  Move(ToMove);
      

}
function MoveLeft()
{

    ContinuouslyMove=true;
    ToMoveContinuously=-1;
            //  Move(-ToMove);
    
    
    
}



function BodyLoaded()
{
    $("#MainMenu").fadeToggle(300);
    $("#L_Parent").hide();
    clearInterval(int1);
    
}



function Move(Amount) //Positive number to move right and negative to move left
{
    var Player=document.getElementById("Player");
    var CollisionDetector=parseInt($("#CollisionDetector").css("left"));
    PlayerX+=Amount;
    Player.style.left=PlayerX;
    document.getElementById("CollisionDetector").style.left=CollisionDetector+Amount;
    BulletX+=Amount;
    if(!Shooted)
        {
            document.getElementById("Bullet").style.left=BulletX;
        }
    
}
function Shoot()
{
    if(!GameOver)
       $("#Bullet").show();
    Shooted=true;
}



function ToggleBullet()
{
    if(!Shooted)
        return;
    var Bullet=document.getElementById("Bullet");
    BulletY-=8;
    Bullet.style.top=BulletY;
    if(!Shooted)
        {
            Bullet.style.left=BulletX;
        }
    if(BulletY<=-window.innerHeight-30)
        {
            BulletY=-25;
            Bullet.style.top=BulletY;
            Bullet.style.left=BulletX;
            Shooted=false;
            $(Bullet).hide();
        }
    
    
}







function setRandomStonePosition()
{
    var stones=document.getElementsByClassName("Stones");
    
    for(var i=0;i<stones.length;i++)
        {
            var width=parseInt($(stones[i]).attr("width"));
            var height=parseInt($(stones[i]).attr("height"));
            $(stones[i]).css("left",RangedRandomNumberGenerator(30,document.getElementById("PlaygroundParent").offsetWidth-width));
            do
               $(stones[i]).css("top",RangedRandomNumberGenerator(-window.innerHeight-170,-40));
            while((StonesCollidingY(i)));
        }
}






function RangedRandomNumberGenerator(Min,Max)
{
    return Math.floor(Math.random()*(Max-Min+1))+Min;
}





function MoveStones()
{
    
    if(GameOver)
        return;
    var stones=document.getElementsByClassName("Stones");
    var yPos;
    for(var i=0;i<stones.length;i++)
        {
            yPos=parseInt($(stones[i]).css("top"));
            if(yPos>=window.innerHeight+20)
                {
                    var width=parseInt($(stones[i]).attr("width"));
                    var height=parseInt($(stones[i]).attr("height"));
                    $(stones[i]).show();
                    $(stones[i]).css("left",RangedRandomNumberGenerator(30,document.getElementById("PlaygroundParent").offsetWidth-width));
                    do
                        $(stones[i]).css("top",RangedRandomNumberGenerator(-window.innerHeight-170,-40));
                    while((StonesCollidingY(i)));
                    continue;


                   
                }


                
              
            stones[i].style.top=yPos+StoneMovingSpeed;
        }
        
}




function StonesCollidingY(index)
{
    var stones=document.getElementsByClassName("Stones");
    for(var i=0;i<stones.length;i++)
        {
            if(i==index)
                continue;
            var height=parseInt($(stones[index]).attr("height"));
            var yPos=parseFloat($(stones[index]).css("top"));
            var _height=parseInt($(stones[i]).attr("height"));
            var _yPos=parseFloat($(stones[i]).css("top"));
            if(yPos<_yPos+_height  &&  yPos+height>_yPos)
                return true;

            
        }
        return false;
 
}




function PlayNow()
{
    $("#PlaygroundParent").show();
    $("#MainMenu").hide();
    AddEventListeners();
    setRandomStonePosition();

    GameOver=false;
}

function Load()
{
    if(deg==0)
        {
            Time++;
            if(Time>35)
                {
                    Time=0;
                }
            else
                {
                    return;
                }
            
        }
    var LoadingBar=document.getElementById("Load");
    LoadingBar.style.transform="rotate("+deg+"deg)";
    LoadingBar.style.webkitTransform="rotate("+deg+"deg)";
   // LoadingBar.style.mozTransform="rotate("+deg+"deg)";
    deg+=2;
    if(deg>=360)
        {
            deg=0;
            
        }
    if(deg==100)
        {
            LoadingBar.style.borderBottomColor="#288a80";
           
        }
    if(deg==50)
        {
            
            LoadingBar.style.borderRightColor="#288a80";
        }
    if(deg==200)
        {
            
        }
    if(deg==320)
        {
            LoadingBar.style.borderBottomColor="##288a80";

           /// LoadingBar.style.borderRightColor="#1D1D1D";
        }
    if(deg==330)
        {
         //   LoadingBar.style.borderBottomColor="#1D1D1D";

            LoadingBar.style.borderRightColor="##288a80";
        }
 

}

function DestroyStones()
{
    if(!Shooted)
        return;
    var Stones=document.getElementsByClassName("Stones");
    var BulletElement=document.getElementById("Bullet");
    for(var i=0;i<Stones.length;i++)
        {
                        
        
              var  sx=Stones[i].offsetLeft;
              var  sy=Stones[i].offsetTop;
              var  sh=Stones[i].offsetHeight;
              var  sw=Stones[i].offsetWidth;
            


            var Bullet=
            {
            
                 x:BulletElement.offsetLeft +document.getElementById("PlayerParent").offsetLeft,
                 y:BulletElement.offsetTop +document.getElementById("PlayerParent").offsetTop,
                 h:BulletElement.offsetHeight,
                 w:BulletElement.offsetWidth,
            }
            


            if(Bullet.x < sx + sw &&
               Bullet.x + Bullet.w > sx &&
               
               Bullet.y < sy + sh &&
               Bullet.y + Bullet.h > sy)
               {
                   $(Stones[i]).hide();
                   BulletY=-25;
                   document.getElementById("Bullet").style.top=BulletY;
                   document.getElementById("Bullet").style.left=BulletX;
                   Shooted=false;
                   $("#Bullet").hide();
                   AddScore(10);

                   
                   

               }



        }
}


function AddScore(ToAdd)
{
    Score+=ToAdd;
    document.getElementById("Score").innerHTML="Score: "+ Score;
    
}

function DestroyPlayer()
{
    if(GameOver)
        return;
    var CollisionDetector= document.getElementById("CollisionDetector");
    var Stones=document.getElementsByClassName("Stones");
    for(var i=0;i<Stones.length;i++)
        {
            var Player=
            {
                x:CollisionDetector.offsetLeft+document.getElementById("PlayerParent").offsetLeft,
                y:CollisionDetector.offsetTop+document.getElementById("PlayerParent").offsetTop,
                w:CollisionDetector.offsetWidth,
                h:CollisionDetector.offsetHeight
            }


            var CurrentStone=
            {
                x:Stones[i].offsetLeft,
                y:Stones[i].offsetTop,
                w:Stones[i].offsetWidth,
                h:Stones[i].offsetHeight
            }



            if(Player.x < CurrentStone.x + CurrentStone.w &&
               Player.x + Player.w > CurrentStone.x &&
               
               Player.y < CurrentStone.y + CurrentStone.h &&
               Player.y + Player.h > CurrentStone.y)
               {               
                   GameOver=true;
                   setTimeout(Gameover,100);
               }
        }

}






function AddEventListeners()
{
    CollisionDetectorX=parseInt($("#CollisionDetector").css("left"));
    document.getElementById("Left").addEventListener("mousedown",MoveLeft);
    document.getElementById("Right").addEventListener("mousedown",MoveRight);
    document.getElementById("Left").addEventListener("mouseup",StopMovingContinuously);
    document.getElementById("Right").addEventListener("mouseup",StopMovingContinuously);



    //For Android devices...

    document.getElementById("Left").addEventListener("touchstart",MoveLeft)
    document.getElementById("Right").addEventListener("touchstart",MoveRight)
    document.getElementById("Left").addEventListener("touchend",StopMovingContinuously);
    document.getElementById("Right").addEventListener("touchend",StopMovingContinuously);




    document.getElementById("Restart").addEventListener("click",Restart);
}
function MoveContinuously()
{
    if(!ContinuouslyMove)
        return;
    var Player=document.getElementById("Player");
    var PlayerParent=document.getElementById("PlayerParent");
    if(Player.offsetLeft+PlayerParent.offsetLeft>=window.innerWidth-Player.getAttribute("width") && ToMoveContinuously==1)
        return;
    if(Player.offsetLeft+PlayerParent.offsetLeft<=0  && ToMoveContinuously==-1)
        return;
    Move(ToMoveContinuously);

}
function StopMovingContinuously()
{
    ContinuouslyMove=false;
}



function Gameover()
{
    $("#Comment").html(Comments[Math.floor(Score/100)]);
    $("#MessageParent").css("background","rgba(0,0,0,0.6)");
    $("#Message").css("top","0");
    $("#Message").css("bottom","0");
    $("#Bullet").hide();
    var Stones=document.getElementsByClassName("Stones");
    $("#Player").hide();


    $("#ScoreText").html("Score : "+Score);


    if(Score>HighScore)
        HighScore=Score;

    $("#HighScore").html("Personal Best : "+HighScore);
    for(var i=0;i<Stones.length;i++)
        {
            Stones[i].style.display="none";
        }

}


function Restart()
{
    
    PlayerX=0;
    ToMove=30;
    Shooted=false;
    BulletY=-25;
    BulletX=17;
    GameOver=false;
    Score=0;
    StoneMovingSpeed=2;
    ContinuouslyMove=false;
    ToMoveContinuously=1;


    $("#Player").css("left",0);
    $("#Bullet").css("left",BulletX);
    $("#Bullet").css("top",BulletY);

    $("#Player").show();
    $("#Bullet").show();
    $("#Message").css("top",-500);
    $("#Message").css("bottom","");
    $("#MessageParent").css("background","rgba(0,0,0,0)");
    $("#CollisionDetector").css("left",CollisionDetectorX);

    $("#Score").html("Score : "+Score);


}


setInterval(MoveStones,3);
setInterval(ToggleBullet,1);
setInterval(DestroyStones,1);
setInterval(DestroyPlayer,1);
var int1=setInterval(Load,4);
setInterval(MoveContinuously,2);