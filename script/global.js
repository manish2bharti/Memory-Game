var imageBox = "";
var imageSrc = "";
var count = 0;
var found = 0;


function randomFromTo(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
}

function shuffle() {
    var children = $("#puzzleBox").children();
    var child = $("#puzzleBox div:first-child");
    var array_img = [];

    for (i = 0; i < children.length; i++) {
        array_img[i] = $("#" + child.attr("id") + " img").attr("src");
        child = child.next();
    }

    child = $("#puzzleBox div:first-child");

    for (z = 0; z < children.length; z++) {
        randIndex = randomFromTo(0, array_img.length - 1);
		$("#" + child.attr("id") + " img").attr("src", array_img[randIndex]);
        array_img.splice(randIndex, 1);
		child = child.next();
    }
	
}

function resetGame() {

$("#puzzleBox").empty();
$(".fields").show();
$(".matrixCount").val("");
    
	$("#message").removeClass(".congrats");
    $("#message").hide();
	imageBox = "";
    imageSrc = "";
    found = 0;
    return false;
}

function jsonload(matrixCount) {

    var words = [{
        "data": [{
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHQ5Sf2Cffo0QdRtFw0t8zdk90FWgywc1kDKAuOV874zYO_0pC",
            "phrase": "Ra.One"
        }, {
            "image": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQkVg9n2UbPTeiPNGUOw2SqdAzJsZzuHrkYw78sjaMMCcTWcuFjUtT3NZ8",
            "phrase": "3 Idiots"
        }, {
            "image": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQ0Wam0d96ASpEHDFfskGTBdILKlDpXAKzELFdfdKmkoye5JmrF9qS1u1qtZw",
            "phrase": "Chaalis Chauraasi (4084)"
        }, {
            "image": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSAf7q-m96JL88_W8EATmVlwC-%20fOKb5dw1keyDSO6PWwzaSVtqGyix2lvE",
            "phrase": "Gangs Of Wasseypur"
        }, {
            "image": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT0s8gwKiTiGlA7ReE0X9_Etm8a2lhEGUD_j4a2VrLZSZuBNeviGRoRrNs",
            "phrase": "Jodi Breakers"
        }, {
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQogG0I0JlOnGEstbajO_58Az4lOR7TAdnGhP1BtvhcPUgl2q1I5Q",
            "phrase": "Kahaani"
        }, {
            "image": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRHVQ5HkvH3EY3rGmpDFzPTz2JO6lKWh6oIA6qy-5KAAvF4VKX2fcuCxyE",
            "phrase": "Ekk Main Aur Ekk Tu"
        }, {
            "image": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT8oL0tVOPZvi9lCopFfuxDv4U0w80trjT9D1_zcMiRsPMbYPXi8w",
            "phrase": "Barfii"
        }, {
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMSR6-riNiZaqJB9W8l8ka1tCH87uEXF1mVgBqoUxSzDEGPTL2",
            "phrase": "Talaash"
        }, {
            "image": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT8C4ytjUo-5xeUS3olEg4LCz8N7ehLFW7kPIVX5ljg34dsdBdd",
            "phrase": "Agneepath"
        }]
    }];
    var doubleLength = words[0].data.length;


    var randIndex;

    var array_img = [];

    for (z = 0; z < parseInt(matrixCount) && parseInt(matrixCount) <= doubleLength; z++) {
        randIndex = randomFromTo(0, doubleLength - 1);
		array_img.push(words[0].data[randIndex]);
	}
    if ((doubleLength * 2) >= parseInt(matrixCount) && array_img.length === 0) {
        $("#message").show();
		$("#message").html("Count Not be greater than " + doubleLength );
    } else {
        words[0].data = array_img;
		$(".fields").hide();
		$("#message").html('');
        $("#puzzleBox").show();
        $("#message").hide();

        var dataLength = parseInt(matrixCount);
        
		var count = 0;
        var countLoop = 1;
        for (var i = 0; i < dataLength; i++) {

            var root_images = words[0].data[i];
            if (typeof root_images != "undefined") {
                $("#puzzleBox").append("<div id='card" + count + "' class='cards'><img src=" + root_images.image + "><span class='phrase'>"+root_images.phrase+"</span></div>");
            }
            count++;
            if ((i === (dataLength - 1)) && countLoop < 2) {
                i = -1;
                countLoop++;
            }
        }
    }
}

$(document).ready(function () {
    
	function openCard() {

        id = $(this).attr("id");

        if ($("#" + id + " img").is(":hidden")) {
            $("#puzzleBox div").unbind("click", openCard);

            $("#" + id + " img").slideDown('fast');

            if (imageSrc === "") {
                imageBox = id;
                imageSrc = $("#" + id + " img").attr("src");
                setTimeout(function () {
                    $("#puzzleBox div").bind("click", openCard);
                }, 300);
            } else {
                currentopened = $("#" + id + " img").attr("src");
                if (imageSrc != currentopened) {
                    // close again
                    setTimeout(function () {
                        $("#" + id + " img").slideUp('slow');
                        $("#" + imageBox + " img").slideUp('slow');
                        imageBox = "";
                        imageSrc = "";
                    }, 400);
					$("#message").show();
                    $("#message").html("Tiles do not match!");
					$("#message").addClass("error");
					$("#message").removeClass("success");
                } else {
                    // match
                    $("#" + id).addClass("hidden");
                    $("#" + imageBox).addClass("hidden");
					
                    found++;
                    imageBox = "";
                    imageSrc = "";
                    $("#message").show();
					$("#message").html("Removed matching tiles!");
					$("#message").removeClass("error");
					$("#message").addClass("success");
				}
				
				if ($('#puzzleBox .cards:visible').length == (found*2)) {
					$("#puzzleBox").hide();
					$("#heading").hide();
					$("#message").show();
					$("#message").html("Good Job <input type='button' onClick='resetGame();' value='Play Again' class='restart' />");
					$("#message").removeClass("error");
					$("#message").removeClass("success");
					$("#message").addClass("congrats");
				}

                setTimeout(function () {
                    $("#puzzleBox div").bind("click", openCard);
                }, 400);
            }
			
        }
		
    }

    $(".btn_submit").click(function () {
		$("#message").hide();
		var item = $(".matrixCount"); 
		if(item.val() == "null" || item.val() == ""){
			$(".errormsg").show();
			$(".errormsg").html("Please enter Number.");
		}
		else if((parseInt(item.val()) == 0) || item.val() <=3 ){
			$(".errormsg").show();
			$(".errormsg").html("Please enter greater than 3.");
		}
		else{
			$("#message").hide();
			$(".errormsg").hide();
			$("#heading").show();
			$("#puzzleBox").empty();
			jsonload(item.val());
			shuffle();
			$("img").hide();
			$("#puzzleBox div").bind("click", openCard);
		}
    });
    
});