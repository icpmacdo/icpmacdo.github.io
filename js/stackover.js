$( document ).ready(function() {

var distToBottom;
var pageNumber = 1;
var pollingData = false;
var url;
var getQuestionsFromLoad = Math.round(new Date().getTime() / 1000);

function loadQuestions(){
  
  url = "https://api.stackexchange.com/2.2/questions?page=" + pageNumber + "&pagesize=15&max=" + getQuestionsFromLoad + "&order=desc&sort=creation&site=stackoverflow"
  pageNumber += 1;
  $.ajax({
    type: 'GET',
    url: url,
    dataType: 'json',
    cache: false,
    success: function(data){
  	  var questionItems = [];
        for(var key in data.items) {
          questionItems.push('<div class="questionCard"> <button class="accordion"><h2> '+ data.items[key].title + '</h2></button>  <div class="panel"><h3> Submitted by: <a href="' + data.items[key].owner.link + '">' + data.items[key].owner.display_name  + '</a> </h3>  <p>Answer count:  ' + data.items[key].answer_count +' </p> <p>Score: ' + data.items[key].score+ '</p> <a href="' + data.items[key].link + ' ">link</a></div></div><br>' );
        } 
      $(questionItems.join('')).appendTo('.questionsContainer');
      pollingData = false;
       	var acc = document.getElementsByClassName("accordion");
		var i;
		for (i = 0; i < acc.length; i++) {
		    acc[i].onclick = function(){
		        this.classList.toggle("active");
		        this.nextElementSibling.classList.toggle("show");
		    }
		}
    }
  });
}

function getDistFromBottom () {  
  var scrollPosition = window.pageYOffset;
  var windowSize     = window.innerHeight;
  var bodyHeight     = document.body.offsetHeight;
  return Math.max(bodyHeight - (scrollPosition + windowSize), 0);
}

document.addEventListener('scroll', function() {        
  distToBottom = getDistFromBottom();
  if (!pollingData && distToBottom > 0 && distToBottom <= 1111) {
    pollingData = true;
    loadQuestions();
  }
});

loadQuestions();

});
