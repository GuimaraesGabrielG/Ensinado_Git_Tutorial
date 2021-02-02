var dict = { 
	    "index" : "1-_Git" , 
	    "2-_Overview_of_Git" : "2-_Introducao_de_sobre_Git" , 
	    "3-_Initial_settings-EN" : "3-_Configuracoes_iniciais",
	    "4-_Start_on_the_project-EN" : "4-_Inicio_no_projeto",
	    "5-_Ignoring_files-EN" : "5-_Ignorando_arquivos",
	    "6-_Removing_commit-EN" : "6-_Removendo_commit",
	    "7-_Returning_Commit-EN" : "7-_Voltando_Commit",
	    "8-_Branch-EN" : "8-_Branch",
	    "9-_Starting_a_branch-EN" : "9-_Iniciando_uma_branch",
	    "10-_Stash-EN"  : "10-_Stash",
	    "11-_Joining_branch-EN" : "11-_Juntando_branch",
	    "12-_Conflict-EN" : "12-_Conflito",
	    "13-_Amend-EN" : "13-_Amend",
	    "14-_Rebase-EN" : "14-_Rebase",
	    "15-_Remote-EN" : "15-_Remoto",
	    "16-_Github-EN" : "16-_Github",
	    "17-_Terminal_and_Github-EN" : "17-_Terminal_e_Github",
	    "18-_Fetch_and_Pull-EN" : "18-_Fetch_e_Pull",
	    "19-_Push-EN" : "19-_Push",
	    "20-_Serious_problems-EN" : "20-_Problemas_serios",
	    "21-_Tag-EN" : "21-_Tag",
	    "22-_Tools-EN" : "22-_Ferramentas"
	  };
	
	  var optLang = ' ';



function languagePickerGrid(gitbook, elem, maxColumns, langData) {
	var CurAddr = location.href.substr(gitbook.state.root.length);
	var sharp = CurAddr.indexOf("#");
	var CurAddrNoAnchor = (sharp == -1)? CurAddr : CurAddr.substr(0, sharp);

	var table = $("<table>");
	var ins = 0;
	var maxRows = Math.ceil(langData.length / maxColumns);
	for (var i = 0; i < maxRows; i++) {
		var r = $("<tr>");
		for (var ii = 0; (i * maxColumns + ii < langData.length) && (ii < maxColumns); ii++) {
			var c = $("<td>");
			var l = $("<a>");
			l.attr("href", gitbook.state.bookRoot.replace(/([^\/])$/, "$1/") + langData[ins][0] +"/"+ CurAddrNoAnchor);
			l.attr("data-lang", langData[ins][0]);
			if (langData[ins][0] == gitbook.state.innerLanguage) l.addClass("current");
			l.html(langData[ins][1]);
			c.append(l);
			r.append(c);
			ins++;
		}
		table.append(r);
	}
	elem.append(table);
}
function parseLanguages(gitbook, elem, maxColumns, cb) {
	if (location.protocol == "file:") {
		var langData = [];
		langData.push(["en", "English"]);
		languagePickerGrid(gitbook, elem, maxColumns, langData);
		cb(elem);
	}
	else {
		$.get(gitbook.state.bookRoot +"index.html", function(data) {
			var list = data.match(/<ul class=\"languages\">([\s\S]+?)<\/ul>/);
			if (list) {
				var langData = [];
				list[1].replace(/<a href=\"([^\/]+)[^>]+>(.+?)<\/a>/g, function(a, b, c) {
					langData.push([b, c]);
				});
				languagePickerGrid(gitbook, elem, maxColumns, langData);
				cb(elem);
			}
		}, "html");
	}
}
                            
                            // Decrease font size


require(["gitbook", "jQuery"], function(gitbook, $) {
	gitbook.events.bind("start", function(e, config) {
		let urlString =  window.location.href

		if(urlString.includes('index') || urlString.includes('en')){
			optLang = 'pt-br';
		}else{
			optLang = 'en';

		}
		var opts = config["language-picker"];
		gitbook.toolbar.createButton({
            icon: "fa fa-globe",
            label: "Change language",
			className: "language-picker",
			dropdown: [
                       [
                           {
							   
							   text: optLang,
							   
                               onClick: function(e) {
								   e.preventDefault();
								   let urlString =  window.location.href

								   console.log(urlString)
								   if(urlString.includes("en_html") || urlString.includes("index")){
									 
										for (var key in dict){
											if(urlString.includes(key)){
											
												window.location.replace("https://lucid-bartik-341def.netlify.app/pt-br_html/"+dict[key]+".html");

											}
										}
									   
								   }else{
										
										for (var key in dict){
											console.log(key)
											console.log(dict[key]);
											console.log(urlString)

											console.log("pass")
											if(urlString.includes(dict[key])){
											
												if(key.includes("index")){
													window.location.replace("https://lucid-bartik-341def.netlify.app/"+key+".html");
												}else{
													console.log(dict[key])
													window.location.replace("https://lucid-bartik-341def.netlify.app/en_html/"+key+".html");
												}
											}
										}
									   console.log("Brasil")
								   }

								  
								  
								 

								}
                              
                           }
                       ]
                    ]
        });

		$(function() {
			var DDMenu_selector = ".language-picker .dropdown-menu";
			$(document).one("click", ".language-picker .btn", function(e) {
				parseLanguages(gitbook, $(DDMenu_selector), opts["grid-columns"], function(elem) {
					elem.addClass("language-picker-grid");
					elem.trigger("parsedContent");
				});
			});
			/*$(document).on("parsedContent", DDMenu_selector, function() {
				alert("ready");
			});*/
		});
	});
});


	