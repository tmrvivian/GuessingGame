$(document).ready(function() {
	//hide congrats image at the beginning
	var target;
	var numGuess;
	var history;
	var temperature;
	function newGame(){
		$('img').hide();
		$('.input-group').show();
		target = Math.floor(Math.random()*100+1);
		numGuess = 7;
		$('table').find('tr:gt(0)').remove();
		history =[];
		temperature=[];
		$('p1').text('New game.');
		$('p2').text('You have '+numGuess+' guess(es) left.');
		$('body').css('background-image','none' );
	};
	newGame();

	//function indicate cold or hot
	function temp(guess, index){
		var diff = Math.abs(guess-target);
		var comp='You guessed '+guess+'. ';
		if (history.length>1){
			var diff2=Math.abs(history[history.length-2]-target);
			if(diff<diff2){
				comp=guess+' is hotter! ';
			} else {
				comp=guess+' is colder! ';
			}
		}
		var t;
		if (diff>25) {
			t ='ice cold';
		} else if (diff>15){
			t ='cold';
		} else if (diff>5){
			t = 'hot';
		} else {
			t ='super hot';
		}
		if (index ===1){
			return t;
		} else {
			return comp+'Your guess is '+t +'.';
		}		
	}


	//decide if it is a the right guess
	function judge(guess) {
		if(guess==target) {
			$('p1').text(guess+" is right!");
			$('p2').text('Play agin?');
			$('.input-group').hide();
			$('body').css('background-image','url(http://cliparts.co/cliparts/riL/nzg/riLnzgMdT.gif)' );
			$('img').fadeIn('fast');
		} else if(numGuess<=0){//run out of
			$('p1').text('Your guess '+guess+' is incorrect. The number is '+target+'.');
			$('p2').text('Play again?');
			//(code here to disable input)
			$('.input-group').hide();
		} else {
			$('p1').text(temp(guess));//indicate how close is the guess by calling temp
			//provide direction for number
			var tempIndicator=temp(guess, 1);
			if ( tempIndicator ==='ice cold'){
				$('body').css('background-image','url(http://previews.123rf.com/images/mmediac/mmediac0706/mmediac070600253/998622-icy-cold-ice-ridges-Stock-Photo.jpg)');
			} else if (tempIndicator==='cold'){
				$('body').css('background-image','url(http://images.forwallpaper.com/files/thumbs/preview/48/488100__it-s-so-cold_p.jpg)');		
			} else if (tempIndicator==='hot'){
				$('body').css('background-image','url(http://images.forwallpaper.com/files/thumbs/preview/35/354639__polar-bear_p.jpg)');
			} else if (tempIndicator==='super hot'){
				$('body').css('background-image','url(http://themarginalized.files.wordpress.com/2011/06/hot-sun.jpg)');
			}


			$('table tr:last').after('<tr><td>'+(7-numGuess)+'</td><td>'+guess+'</td><td>'+tempIndicator+'</td></tr');
			if(guess<target) {
				$('p1').append(' Guess higher.');			
			}else {
				$('p1').append(' Guess lower.');
			}
		}
	}


	//enter guessed number when click enter button
	$(".enter").click(function(){
		//validate input
		var guess = $('input[name=guess]').val();
		if (isNaN(guess) || guess <1 || guess >100){
			alert('Not a valid number!');
		}else {
			guess = parseInt(guess,10);
			if ($.inArray(guess, history)=== -1){
				numGuess-=1;
				history.push(guess);
				$('input[name=guess]').val('');
				judge(guess);
				//$('#history').text(history);
				//$('#temperature').text(temperature);
				$('p2').text('You have '+numGuess+' guess(es) left.');	
			} else{
				alert('You already guessed that number!');
			}
		}
	});

	 $('input[name=guess]').keydown(function(e){
        if(e.which == 13){//Enter key pressed
        	e.preventDefault();//diable submit handler
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