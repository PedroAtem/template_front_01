/*
 * @author: Pedro Henrique Silva Rosa
 *
 * Javascript de controle do formulário de contato
 */

/*
 * Inicia o formulário de contato
 */
function init_contact() {
	init_mask();

	// blur email
	var elements = document.getElementsByClassName('contact_item_input');
	for (var i = 0; i < elements.length; i++) {
		elements[i].addEventListener('blur', function() {
			remove_invalid(document.getElementById('div_'+this.name));
			if (ret = window['validate_'+this.name](this.value), ret.invalid)
				show_invalid(document.getElementById('div_'+this.name), ret.invalid_msg);
		});
	}
}

/*
 * Inicia as máscaras nos inputs
 */
function init_mask() {
	var el_phone = document.getElementById("phone");
	var phone_mask = new Inputmask("(99) 99999-9999");
	phone_mask.mask(el_phone);
}

/*
 * Processo o email da mensagem, validando os campos
 */
function send_message() {
	remove_all_invalid();

	var val_name = document.getElementById('name').value;
	var val_phone = document.getElementById('phone').value;
	var val_email = document.getElementById('email').value;
	var val_message = document.getElementById('message').value;

	// validando campos
	if (ret_name = validate_name(val_name), ret_name.invalid)
		show_invalid(document.getElementById('div_name'), ret_name.invalid_msg);
	if (ret_email = validate_email(val_email), ret_email.invalid)
		show_invalid(document.getElementById('div_email'), ret_email.invalid_msg);
	if (ret_phone = validate_phone(val_phone), ret_phone.invalid)
		show_invalid(document.getElementById('div_phone'), ret_phone.invalid_msg);
	if (ret_message = validate_message(val_message), ret_message.invalid)
		show_invalid(document.getElementById('div_message'), ret_message.invalid_msg);
	
	if (!ret_name.invalid && !ret_email.invalid && !ret_phone.invalid && !ret_message.invalid) {
		document.getElementById('name').value = '';
		document.getElementById('email').value = '';
		document.getElementById('phone').value = '';
		document.getElementById('message').value = '';
		
		show_modal('Mensagem enviada!', 'success');
	}

}

/*
 * Exibe o erro em um input
 * @param element: elemento para exibir o erro
 * @param msg: mensagem de erro
 */
function show_invalid(element, msg) {
	element.className += ' invalid';
	element.querySelector('.invalid_msg').innerHTML = msg;
}

/*
 * Remove todos os erros dos inputs
 */
function remove_all_invalid() {
	var elements = document.getElementsByClassName('contact_item');
	for (var i = 0; i < elements.length; i++) {
		remove_invalid(elements[i]);
	}
}


/*
 * Remove o erro em um input
 * @param element: elemento para remover o erro
 */
function remove_invalid(element) {
	element.className = element.className.replace(/ invalid/g, '');
	element.querySelector('.invalid_msg').innerHTML = '';
}