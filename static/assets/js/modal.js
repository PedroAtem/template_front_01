/*
 * @author: Pedro Henrique Silva Rosa
 *
 * Javascript do modal
 */

/*
 * Exibe um modal
 * @param msg: texto do modal
 * @param modal_type: tipo do modal (success, error, warning e info)
 */
function show_modal(msg, modal_type) {
	var time = new Date().getTime();

	// overlay do modal, fundo preto transparente
	var modal_overlay = document.createElement('div');
	modal_overlay.className = 'modal_overlay';
	modal_overlay.id = 'modal_'+time;

	// conteudo do modal
	var modal_content = document.createElement('div');
	modal_content.className = 'modal_content';

	// div de titulo
	var modal_title = document.createElement('div');
	modal_title.className = 'modal_title modal_'+modal_type;
	if (modal_type == 'success') modal_title.innerHTML = 'Sucesso';
	else if (modal_type == 'error') modal_title.innerHTML = 'Erro';
	else if (modal_type == 'warning') modal_title.innerHTML = 'Atenção';
	else if (modal_type == 'info') modal_title.innerHTML = 'Informação';

	// icone de x para fechar
	var modal_close = document.createElement('span');
	modal_close.className = 'modal_close';
	modal_close.innerHTML = '&#10006';
	modal_close.addEventListener('click', function() {
		document.getElementById('modal_'+time).remove();
	});

	// texto do modal
	var modal_text = document.createElement('div');
	modal_text.className = 'modal_text';
	modal_text.innerHTML = msg;

	// botao de fechar o modal
	var modal_button = document.createElement('a');
	modal_button.href = '#';
	modal_button.className = 'modal_button';
	modal_button.innerHTML = 'OK';
	modal_button.addEventListener('click', function() {
		document.getElementById('modal_'+time).remove();
	});

	// criando estrutura do modal
	modal_title.appendChild(modal_close);
	modal_content.appendChild(modal_title);
	modal_content.appendChild(modal_text);
	modal_content.appendChild(modal_button);
	modal_overlay.appendChild(modal_content);

	// adicionando modal no body
	document.body.appendChild(modal_overlay);
}

// criando Element.remove() caso não existe (ex. IE9)
if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function() {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}