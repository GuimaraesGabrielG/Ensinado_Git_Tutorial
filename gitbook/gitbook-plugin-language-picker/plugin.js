var dict = { 
	    "index" : "1-_git" , 
	    "2-_overview_of_git" : "2-_introducao_de_sobre_git" , 
	    "3-_initial_settings-en" : "3-_configuracoes_iniciais",
	    "4-_start_on_the_project-en" : "4-_inicio_no_projeto",
	    "5-_ignoring_files-en" : "5-_ignorando_arquivos",
	    "6-_removing_commit-en" : "6-_removendo_commit",
	    "7-_returning_commit-en" : "7-_voltando_commit",
	    "8-_branch-en" : "8-_branch",
	    "9-_starting_a_branch-en" : "9-_iniciando_uma_branch",
	    "10-_stash-en"  : "10-_stash",
	    "11-_joining_branch-en" : "11-_juntando_branch",
	    "12-_conflict-en" : "12-_conflito",
	    "13-_amend-en" : "13-_amend",
	    "14-_rebase-en" : "14-_rebase",
	    "15-_remote-en" : "15-_remoto",
	    "16-_github-en" : "16-_github",
	    "17-_terminal_and_github-en" : "17-_terminal_e_github",
	    "18-_fetch_and_pull-en" : "18-_fetch_e_pull",
	    "19-_push-en" : "19-_push",
	    "20-_serious_problems-en" : "20-_problemas_serios",
	    "21-_tag-en" : "21-_tag",
	    "22-_tools-en" : "22-_ferramentas"
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
											
												window.location.replace("https://gitutorial.netlify.app/pt-br_html/"+dict[key]+".html");

											}
										}
									   
								   }else{
										
										for (var key in dict){


											console.log("pass")
											console.log(key)
console.log(dict[key])
											console.log(urlString)
											if(urlString.includes(dict[key])){
											
												if(key.includes("index")){
													window.location.replace("https://gitutorial.netlify.app/"+key+".html");
												}else{
													console.log()
													console.log(dict[key])
													window.location.replace("https://gitutorial.netlify.app/en_html/"+key+".html");
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


	