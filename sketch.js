var buttonValue = 1;
var Sliderlabel;
var currentMonthSelection;
var table;
var dailyDate;
var radioGroup;
var minSteps = 100;
var maxSteps = 10;
var ID;
var date;
var steps;
var miles;
var radius = 100;
var dateArray = [];
var phase = 0;
var speed = 0.3;
var monthArray = ["January", "February", "March", "April"];
var mapValue;
var checkSelected;
var startTime;
var previous;
var totalMiles=0;
var myFont;



// Load the csv file

function preload() {
    table = loadTable("finalData.csv", "csv");
    myFont = loadFont('Inconsolata-Regular.otf');
    


}

//MIN STEPS
function getMinSteps() {
    if (steps < minSteps) {
        minSteps = steps;
        print(minSteps);
    }

}

//MAX STEPS
function getMaxSteps() {
    if (steps > maxSteps) {
        maxSteps = steps;
        print(maxSteps);
    }

}


function setup() {
    
    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('sketch-holder');
    
    
    startTime = millis();
    radioGroup = createRadio();

    radioGroup.option(' Total Miles ', 7);
    radioGroup.option(' >1 Miles  ', 2);
    radioGroup.option(' >2 Miles  ', 3);
    radioGroup.option(' >3 Miles  ', 4);
    radioGroup.option(' >4 Miles  ', 5);
    radioGroup.option(' >5 Miles  ', 6);
    radioGroup.option(' >6 Miles  ', 8);


    radioGroup.style('width', '1200px');
    radioGroup.position(700, 50);
    radioGroup.style('color', '#999999');
    radioGroup.style('font-family', 'Inconsolata');
    

    
    //Reading the data
    var currentMonth;
    var currentIndex = 0;

    //reads the data
    for (var r = 0; r < table.getRowCount(); r++) {
        ID = table.getString(r, 0);
        date = table.getString(r, 1);
        steps = table.getNum(r, 2);

        //splits the date
        var dateSplit = date.split("-");

        //Checks for the first month and creates a date object
        if (currentMonth == undefined) {
            currentMonth = dateSplit[1];
            var dateObj = {
                days: [],
                steps: []
            };
            dateArray.push(dateObj);
        }


        //Checks for the second month and so on
        if (dateSplit[1] != currentMonth) {
            currentMonth = dateSplit[1];
            var dateObj = {
                days: [],
                steps: []
            };
            dateArray.push(dateObj);

            //circles through the records
            currentIndex++;

        }

        //fill the date array and the day array
        dateArray[currentIndex].days.push(dateSplit[2]);

        //Fills the steps array
        dateArray[currentIndex].steps.push(steps);


    }



}

function myCheckedEvent(value) {
    if (value == 7) {
        checkSelected = 0;

    } else if (value == 2) {
        checkSelected = 4000;
    } else if (value == 3) {
        checkSelected = 6000;
    } else if (value == 4) {
        checkSelected = 8000;
    } else if (value == 5) {
        checkSelected = 10000;
    } else if (value == 6) {
        checkSelected = 12000;
    } else if (value == 8) {
        checkSelected = 14000;
    } else {
        checkSelected = 22000;
    }




}



function drawPattern(numberOfMonths) {
    
    //var step = frameCount % 50;
    translate(-mouseX * 1.5, 0);
        
    

    for (var i = 0; i < numberOfMonths; i++) {
        var x = 0;
        var y = 0;
         
        var lineDistance = 200;

        //stem

        stroke('#009999');
        strokeWeight(6);
        line(x, y, x, 200);
        rotate(radians(90));

        strokeWeight(0);

        for (textLabel = 0; textLabel < numberOfMonths; textLabel++) {
            textFont('Inconsolata');
            textSize(20);
            stroke(0);
            strokeWeight(6);
            text(monthArray[i], 15, 23);
            

        }
        
       
        
            rotate(radians(-90));
            textSize(16);
            fill(255);
            rotate(radians(0));
            text(totalMiles +" Steps ",15,40);
            text(totalMiles/2000 +" Miles ",15,60);
            fill(255);
        
            rotate(radians(0));
            totalMiles=0;
        

            //rotates sketch to be upright
            rotate(radians(180))

        for (var dl = 0; dl < dateArray[i].days.length; dl++) {


            push();

            var rotationAngle = (radians(int(dateArray[i].days[dl]) * 5.8) - HALF_PI);
            rotate(rotationAngle);

            noFill();
            stroke(255);
            



            var colorConstrain = constrain(dateArray[i].steps[dl], minSteps, 16000);

            var percentageNum = norm(colorConstrain, minSteps, 16000);
            var percentageNum = norm(colorConstrain, minSteps, 16000);

            var from = color('#ff0066');
            var to = color('#0000ff');
            var between = lerpColor(from, to, percentageNum);

            // draws the distance line



            strokeWeight(2);
            stroke(between);



            mapValue = map(dateArray[i].steps[dl], minSteps, 21226, 10, 400);
            
            totalMiles=totalMiles+dateArray[i].steps[dl];

            console.log(totalMiles);


            if (dateArray[i].steps[dl] < checkSelected) {

                stroke(50);
                fill(50);
                strokeWeight(2);

                line(x, y, x, (mapValue) + 100);

                //stroke(255);
                strokeWeight(1);
                ellipse(x, mapValue + 100, 8, 8);


            } else {

                //colorful

                stroke(255);
                fill(between);

                
                stroke(between);
                line(x, y, x, (mapValue) + 100);

                stroke(255);
                strokeWeight(1);
                ellipse(x, mapValue + 100, 8, 8);

                stroke('#009999');
                strokeWeight(6);


            }



            //draws the thick date lines
            //draws the thick date lines
            stroke('#009999');
            strokeWeight(6);
            
            
            line(x, y, x, 100);
            //noLoop();


            //fill('#009999');
            //draws the text labels
            strokeWeight(0.2);
            textFont('Inconsolata');
            textSize(11);

            if (dateArray[i].steps[dl] > checkSelected) {

                fill('#006666');
                //fill(100);
                translate(-3, mapValue + 110);

                if (dl > ((dateArray[i].steps.length) / 2)) {
                    rotate(HALF_PI);
                    textAlign(CENTER + 2, 0);
                    text("Day " + dateArray[i].days[dl] + " | " + dateArray[i].steps[dl], 0, 0);
                    fill(100);

                } else {
                    translate(6, 75);


                    rotate(radians(90));
                    rotate(radians(180));


                    textAlign(CENTER + 2, 0);
                    text("Day " + dateArray[i].days[dl] + " | " + dateArray[i].steps[dl], 0, 0);


                    fill(100);

                }


            } else {
                fill(0);
                translate(0, mapValue + 110);
                rotate(HALF_PI);
                textAlign(CENTER + 5, 0);
                text(dateArray[i].steps[dl], 0, 0);


            }




            pop();


        }


        rotate(radians(180));
       

        translate(800, 0);




    }


}




function draw() {
    
    //drawing canvas
    
    background(0);
   
    fill(255);

    textSize(40);
    text("Number of Steps Walked", 50, 50);

    textSize(25);
    fill('#009999');
    text("LOS ANGELES: ", 50, 75);
    textSize(20);
    fill('#ff1ab3');
    text("Jan - April 2018", 210, 75);
    fill(255);
    

    fill(255);

    translate(480, 550);
    myCheckedEvent(radioGroup.value())
    
    drawPattern(4);

    getMinSteps();
    print(minSteps);



}