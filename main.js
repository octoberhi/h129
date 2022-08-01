song1="";
song2="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreLeftWrist=0;
scoreRightWrist=0;
statusSong1="";
statusSong2="";
function preload()
{
song1 = loadSound("song1.mp3");
song2 = loadSound("Mask(1).mp3");
}
function setup()
{
canvas = createCanvas(700,450);
canvas.center();
video = createCapture(VIDEO);
video.hide();
poseNet = ml5.poseNet(video, modelLoaded);
poseNet.on("pose", gotPoses);
}
function modelLoaded()
{
console.log("Model is loaded");
}

function gotPoses(results)
{
if(results.length > 0)
{
console.log(results);

leftWristX = results[0].pose.leftWrist.x;
leftWristY = results[0].pose.leftWrist.y;
rightWristX = results[0].pose.rightWrist.x;
rightWristY = results[0].pose.rightWrist.y;
scoreLeftWrist=results[0].pose.keypoints[9].score;
scoreRightWrist=results[0].pose.keypoints[10].score;
}
}
function draw()
{
image(video, 0,0,700,450);
statusSong1 = song1.isPlaying();
statusSong2 = song2.isPlaying();
fill("blue");
stroke("blue");
if(scoreLeftWrist > 0.2){
circle(leftWristX,leftWristY,20);
song1.stop();
if(statusSong2 == false)
{
song2.play();
document.getElementById("song_name").innerHTML="playing music"
}
}
if(scoreRightWrist > 0.2){
    circle(rightWristX,rightWristY,20);
    song2.stop();
    if(statusSong1 == false)
    {
    song1.play();
    document.getElementById("song_name").innerHTML="playing To the void"
    }
    }
}

function play()
{
song1.play();
song1.setVolume(1);
song1.rate(1);
}