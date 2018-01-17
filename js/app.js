//List of all the cards
var cards = $('.deck').children();

//global variables
var time = 0;
var opened = [];
var move = 0;
var timer = 0;
var stars = 3;

//Shuffle the cards and place them on deck
shuffle(cards);
$('.deck').append(cards); 

//Listener on restart icon 
$('.restart').on('click',reload);

//Functionality to reset game
function reload() {
	
	//Reset time
	time = 0;
	$('.time').html(time);
	clearInterval(timer);
	timer = 0;
	
	//Reset stars
	stars = 3;
	$('.stars').find('i').attr('class','fa fa-star');

	//Reset cards
	$('.open').attr('class','card');
	$('.match').attr('class','card');
	
	//Reset opened variable
	$(opened).on('click',start);
	opened = [];
	
	//Reshuffleing cards and placing them on deck
	shuffle(cards);
	$('.deck').append(cards);
	
	//Reset moves
	move = 0;
	$('.moves').html(move);
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
	
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) 
	{
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


$('.card').on('click',start);

//Starting the game
function start() {
	if (timer === 0) 
	{
    timer = setInterval(seconds, 1000);
    }
	show(this);
	openCards(this);
	end();
}

//Function to regulate time interval
function seconds() {
	time += 1;
	$('.time').html(time);
}

//Flipping cards and increaminting moves
function show(card) {
	$(card).attr('class','card open show');
	$(card).off('click');
	move += 1;
	$('.moves').html(move);
	checkStar();
}

//Functioning of star rating
function checkStar() {
	var star = $('.stars').find('i');
	if(move >= 32)
	{
		$(star[1]).attr('class','fa fa-star-o');
		stars = 1;
	}
	else if(move >= 24)
	{
		$(star[2]).attr('class','fa fa-star-o');
		stars = 2;
	}
}

//Functioning of opened cards
function openCards(card) {
	if(move % 2 == 1)
	{
		opened.push(card);
	}
	else if(move % 2 === 0)
	{
		var a=opened.pop();
		var b=$(card).children();
		var c=$(a).children();
		var d=$(b[0]).attr('class');
		var e=$(c).attr('class');
		if(e == d)
		{
			matched(a,card);
		}
		else
		{
			setTimeout(function(){notMatched(a,card);},500);
		}
	}
}

//Functioning if cards match
function matched(a,card) {
	$(card).attr('class','card match');
	$(a).attr('class','card match');
	opened.push(a,card);
}

//Functioning if cards do not match
function notMatched(a,card) {
	$(card).attr('class','card');
	$(a).attr('class','card');
	$(card).on('click',start);
	$(a).on('click',start);
}

//Functioning of ending the game
function end() {
	if(opened.length == 16)
	{
		modal();
	}
}

//Functing to show winning message
function modal() {
	$('.score-panel').hide();
	$('.deck').hide();
	$('.modal').css('display','flex');
	$('#star').html(stars);
	$('#move').html(move);
	$('#time').html(time);
	$('#replay').on('click',replay);
}

//Function to restart the game
function replay() {
	$('.score-panel').show();
	$('.deck').show();
	$('.modal').css('display','none');
	reload();
}