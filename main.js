belupacito = "";
sonic_unleashed = "";
rightWristX = 0
rightWristY = 0
leftWristX = 0
leftWristY = 0
scoreLeftWrist = 0
songstatus = ""

function preload(){
    belupacito = loadSound("belupacito.mp3");
    sonic_unleashed = loadSound("sonic_unleashed.mp3")
}

function setup(){
    canvas = createCanvas(600,500)
    canvas.center()

    video = createCapture(VIDEO)
    video.hide()

    poseNet = ml5.poseNet(video,modelLoaded)
    poseNet.on('pose',gotPoses)


}

function draw(){
    image(video, 0, 0, 600, 500);
    songstatus = belupacito.isPlaying()
    if(scoreLeftWrist > 0.2){
        circle(leftWristX,leftWristY,20);
        belupacito.stop();
        if(song_name == false){
            sonic_unleashed.play();
        }
        else{
            console.log("Song Name: Sonic Unleashed");
            document.getElementById("song_name").innerHTML = "Song Name: Sonic Unleashed";
        }
    }
    fill("#FF0000")
    stroke("#FF0000")
}

function modelLoaded(){
    console.log("PoseNet successfully operational!")
}

function gotPoses(results){
    if (results.length > 0){
        console.log(results)
        scoreLeftWrist = results[0].pose.keypoints[9].score
        leftWristX = results[0].pose.leftWrist.x
        leftWristY = results[0].pose.leftWrist.y 
        console.log("Left wrist X = " + leftWristX + " Left wrist Y = " + leftWristY)
        rightWristX = results[0].pose.rightWrist.x
        rightWristY = results[0].pose.rightWrist.y
        console.log("Right wrist X = " + rightWristX + " Right wrist Y = " + rightWristY)
    }
}



