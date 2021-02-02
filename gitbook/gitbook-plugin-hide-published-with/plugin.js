require(["gitbook"], function(gitbook) {
	$('.gitbook-link').hide(); 
    gitbook.events.bind("page.change", function() {
    	console.log("Hello custom plugin")
    	$('.gitbook-link').hide();    
        // $('ul.summary li li').hide();
        // $('ul.summary li').find('li.active').parent().children().show();
        // $('ul.summary li li.active').parents().children().show();
        // $('ul.summary li.active > ul > li').show();        
    });
    let urlString =  window.location.href

    console.log(urlString)

    if(urlString == "http://127.0.0.1:5500/"){
            window.location.replace("http://127.0.0.1:5500/index.html");

    }

    if(urlString == "http://127.0.0.1:5500/EN_html/"){
        window.location.replace("http://127.0.0.1:5500/index.html");

    }

});
