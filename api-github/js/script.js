
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
        //dados 
        document.getElementById('result').style.display = '';
        document.getElementById('imgUser').src = result['avatar_url'] ;
        document.getElementById('nome').innerHTML = result['name'];
        document.getElementById('username').innerHTML = '@' + result['login'] + '<p>Bio: ' + result['bio'] + '</p>';
        document.getElementById('followers').innerHTML = 'Seguidores: ' + result['followers'] + ' - Seguindo: ' + result['following'];

	})
	.catch(error => {
		 //console.error('Error: ', error);
		 notify.update('type', 'danger');
         notify.update('message', '<strong>Erro</strong>. Tente novamente');
	});
};
