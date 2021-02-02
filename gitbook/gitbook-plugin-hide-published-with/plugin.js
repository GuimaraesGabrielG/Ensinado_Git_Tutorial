require(["gitbook"], function(gitbook) {
	$('.gitbook-link').hide(); 
    gitbook.events.bind("page.change", function() {
    	console.log("Hello custom plugin")
        $('.gitbook-link').hide();   
        console.log("mudou??") 
        let urlString =  window.location.href

        console.log(urlString)

        if(urlString == "https://gitutorial.netlify.app/"){
                window.location.replace("https://gitutorial.netlify.app/index.html");

        }

        if(urlString == "https://gitutorial.netlify.app/en_html/"){
            window.location.replace("https://gitutorial.netlify.app/index.html");

        }
        // $('ul.summary li li').hide();
        // $('ul.summary li').find('li.active').parent().children().show();
        // $('ul.summary li li.active').parents().children().show();
        // $('ul.summary li.active > ul > li').show();        
    });
    

});
