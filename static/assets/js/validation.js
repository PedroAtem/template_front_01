/*
 * @author: Pedro Henrique Silva Rosa
 *
 * Javascript de validações
 */

var regex = {
 	email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
}

/*
 * Validar o nome
 * @param name: nome para ser validado
 * @return ret: objeto com o resultado da validação
 */
function validate_name(name) {
 	var ret = {
 		invalid: false,
 		invalid_msg: ''
 	}
 	if (name == '' || name == null) {
 		ret.invalid = true; ret.invalid_msg = 'Este campo é obrigatório';
 	}
 	else if (name.length <= 2) {
 		ret.invalid = true; ret.invalid_msg = 'Nome muito curto, minímo 3 caracteres';
 	}
 	return ret;
}

/*
 * Validar o email
 * @param email: email para ser validado
 * @return ret: objeto com o resultado da validação
 */
function validate_email(email) {
	var ret = {
		invalid: false,
		invalid_msg: ''
	}
	if (email == '' || email == null) {
 		ret.invalid = true; ret.invalid_msg = 'Este campo é obrigatório';
 	}
    else if (!regex.email.test(String(email).toLowerCase())) {
 		ret.invalid = true; ret.invalid_msg = 'E-mail inválido';
    }
 	return ret;
}

/*
 * Validar o telefone
 * @param phone: telefone para ser validado
 * @return ret: objeto com o resultado da validação
 */
function validate_phone(phone) {
	var ret = {
		invalid: false,
		invalid_msg: ''
	}
	phone = phone.replace(/\(/g, '')
				 .replace(/\)/g, '')
				 .replace(/ /g, '')
				 .replace(/_/g,'')
				 .replace(/\-/g, '');
	if (phone == '' || phone == null) {
 		ret.invalid = true; ret.invalid_msg = 'Este campo é obrigatório';
 	}
 	else if (phone.length != 10 && phone.length != 11) {
 		ret.invalid = true; ret.invalid_msg = 'Formato inválido';	
 	}
 	return ret;
}

/*
 * Validar a mensagem
 * @param message: mensagem para ser validada
 * @return ret: objeto com o resultado da validação
 */
function validate_message(message) {
	var ret = {
		invalid: false,
		invalid_msg: ''
	}
	if (message == '' || message == null) {
 		ret.invalid = true; ret.invalid_msg = 'Este campo é obrigatório';
 	}
 	else if (message.length < 5) {
 		ret.invalid = true; ret.invalid_msg = 'Mensagem muito curta';
 	}
 	else if (message.length > 500) {
 		ret.invalid = true; ret.invalid_msg = 'Mensagem muito longa';	
 	}
 	return ret;
}