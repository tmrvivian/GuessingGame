$(document).ready(function() {
	//hide congrats image at the beginning
	var target;
	var numGuess;
	function newGame(){
		$('img').hide();
		target = Math.floor(Math.random()*100+1);
		numGuess = 7;
		$('p1').text('');
		$('p2').text('You have '+numGuess+' guess(es) left.');
	};
	newGame();
	//enter guessed number when click enter button
	$(".enter").click(function(){
		numGuess-=1;
		$('p2').text('You have '+numGuess+' guess(es) left.');
		var guess = $('input[name=guess]').val();
		$('input[name=guess]').val('');
		//$.isNuermic(guess); not null check
		if(guess==target) {
			$('p1').text(guess+" is right!");
			$('p2').text('Play agin?');
			$('img').fadeIn('fast');
		} else if(numGuess<=0){//run out of
			$('p1').text('Your guess '+guess+' is incorrect. The number is '+target+'.');
			$('p2').text('Play again?');
			//(code here to disable input)
		} else {
			$('p1').text('You guessed '+guess+'.');
			//provide direction for number
			if(guess<target) {
				$('p1').append(' The number is bigger');			
			}else {
				$('p1').append(' The number is smaller');
			}
		};
	});
	 $('input[name=guess]').keydown(function(e){
        if(e.which == 13){//Enter key pressed
        	event.preventDefault();//diable submit handler
            $('.enter').click();//Trigger enter button click event
        }
    });


	//print out answer when click hint button
	$('.hint').click(function(){
		$('p1').text("The number is "+target+".");
	});

	//Reset var target when hit play agagin
	$('.newGame').click(function(){
		newGame();
	});
});