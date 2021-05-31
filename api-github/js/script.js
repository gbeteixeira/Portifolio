function gerarTimeline(username){

	var username = username;

	if (username == '') {
		window.location.href = "./";
		return
	}

	var notify = $.notify('<strong> </strong>', {
	    type: 'success',
	    allow_dismiss: true,
	    showProgressbar: false
	});

	//const formData = new FormData();
	//const searchField = document.querySelector('input[class="inputsearch"]');

	const valorSearch = username

	if (valorSearch == '') {
		notify.update('type', 'danger');
        notify.update('message', '<strong>Preencha o campo de pesquisa!</strong>. Tente novamente');
        return
	}
	//console.log(valorSearch);
			
	fetch('https://api.github.com/users/'+valorSearch+'/repos?sort=created&direction=desc',{
		method: 'GET',
		//body: formData,
	})
	.then(response => response.json())
	.then(result =>{

		//verifica se o user é inválido
		if (result['message'] == "Not Found") 
		{
			notify.update('type', 'danger');
        	notify.update('message', '<strong>Usuário inválido</strong>. Tente novamente');
        	return
		}

		//console.log('Success:', result);
		notify.update('type', 'success');
        notify.update('message', '<strong>Sucesso!</strong>. Carregando dados...');

		//resutados
		const resultados = result;

		//console.log(resultados.length)
		//console.log(resultados)

		//timeline
		var exibeTimeline = document.getElementById('timelineID');

		var i;
		for (i = 0; i < resultados.length ; i++){

			//console.log('resultados: ', i);
			//exibeTimeline.innerHTML += "<li><div><time>1934</time> At vero um</div></li>";

			let data = new Date(resultados[i]['created_at']);
			let dataAlt = new Date(resultados[i]['updated_at']);

			$('#timelineID').append(JSON.stringify('<li><div><time>'+ data.getFullYear() +'</time> O repositório:  '+ resultados[i]['name'] +' foi criado em : '+  data.getDate() + '/' +  (data.getMonth() + 1)  + '/' +  data.getFullYear() +' as '

				+ data.getHours() + ':' + data.getMinutes() + ':' + data.getSeconds() +' ultima alteração foi em: '

				+  dataAlt.getDate() + '/' +  (dataAlt.getMonth() + 1)  + '/' +  dataAlt.getFullYear() +' as ' 

				+ dataAlt.getHours() + ':' + dataAlt.getMinutes() + ':' + dataAlt.getSeconds() +'</div></li>'));

		}

		//$('body').append(JSON.stringify(result));

		(function () {
		  "use strict";

		  // define variables
		  var items = document.querySelectorAll(".timeline li");

		  // check if an element is in viewport
		  // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
		  function isElementInViewport(el) {
		    var rect = el.getBoundingClientRect();
		    return (
		      rect.top >= 0 &&
		      rect.left >= 0 &&
		      rect.bottom <=
		        (window.innerHeight || document.documentElement.clientHeight) &&
		      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
		    );
		  }

		  function callbackFunc() {
		    for (var i = 0; i < items.length; i++) {
		      if (isElementInViewport(items[i])) {
		        items[i].classList.add("in-view");
		      }
		    }
		  }

		  // listen for events
		  window.addEventListener("load", callbackFunc);
		  window.addEventListener("resize", callbackFunc);
		  window.addEventListener("scroll", callbackFunc);
		})();


	})
	.catch(error => {
		 //console.error('Error: ', error);
		 notify.update('type', 'danger');
         notify.update('message', '<strong>Erro</strong>. Tente novamente');
	});
};

function pesquisar(){

	var notify = $.notify('<strong> </strong>', {
	    type: 'success',
	    allow_dismiss: true,
	    showProgressbar: false
	});

	//const formData = new FormData();
	const searchField = document.querySelector('input[class="inputsearch"]');

	const valorSearch = searchField.value

	if (valorSearch == '') {
		notify.update('type', 'danger');
        notify.update('message', '<strong>Preencha o campo de pesquisa!</strong>. Tente novamente');
        return
	}
	//console.log(valorSearch);

	fetch('https://api.github.com/users/'+valorSearch+'/repos',{
		method: 'GET',
		//body: formData,
	})
	.then(response => response.json())
	.then(resultReposit =>{
		console.log('Success:', resultReposit);
		var i;
		document.getElementById('repositories').innerHTML = 'Repositórios Públicos: <br>';
		var exibirRepositoris = document.getElementById('repositories');

		for(i =0; i < 4; i++){

			exibirRepositoris.innerHTML += "<span class='text-muted'><a class='linkRepositories' href='"+ resultReposit[i]['html_url'] + "'>"+ resultReposit[i]['name'] + "</a></span><br>";
	    }



		
	})
	.catch(error => {
		console.error('Error: ', error);
		notify.update('type', 'danger');
        notify.update('message', '<strong>Usuario inválido</strong>. Tente novamente');
	});
			
	fetch('https://api.github.com/users/'+valorSearch,{
		method: 'GET',
		//body: formData,
	})
	.then(response => response.json())
	.then(result =>{

		//verifica se o user é inválido
		if (result['message'] == "Not Found") 
		{
			notify.update('type', 'danger');
        	notify.update('message', '<strong>Usuário inválido</strong>. Tente novamente');
        	return
		} 

		//console.log('Success:', result);
		notify.update('type', 'success');
	        notify.update('message', '<strong>Sucesso!</strong>. Carregando dados...');


	        //stats
	        var urlStats = 'https://github-readme-stats.vercel.app/api?username='+ valorSearch +'&show_icons=true&theme=dracula&include_all_commits=true&count_private=true';
	        document.getElementById('iframestats').src = urlStats ;

	        ///https://github-readme-stats.vercel.app/api/top-langs/?username=gbeteixeira&layout=compact&langs_count=16&theme=dracula
	        var urlStatsMost = 'https://github-readme-stats.vercel.app/api/top-langs/?username='+ valorSearch +'&layout=compact&langs_count=16&theme=dracula';
	        document.getElementById('iframeMostUsed').src = urlStatsMost ;

	        console.log(urlStatsMost);

	        //dados 
	        document.getElementById('result').style.display = '';
	        document.getElementById('imgUser').src = result['avatar_url'] ;
	        document.getElementById('nome').innerHTML = result['name'];
	        document.getElementById('username').innerHTML = '@' + result['login'] + '<p>Bio: ' + result['bio'] + '</p>';
	        document.getElementById('followers').innerHTML = 'Seguidores: ' + result['followers'] + ' - Seguindo: ' + result['following'];
	        document.getElementById('gerartimeline').href = 'timeline.html?username='+ result['login'] ;

	})
	.catch(error => {
		 //console.error('Error: ', error);
		 notify.update('type', 'danger');
         notify.update('message', '<strong>Erro</strong>. Tente novamente');
	});


	//function para reotnar um iframe com os stats do repositorio.
	/* https://github-readme-stats.vercel.app/api?username=gbeteixeira&show_icons=true&theme=dracula&include_all_commits=true&count_private=true */

};
