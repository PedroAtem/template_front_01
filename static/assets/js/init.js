/*
 * @author: Pedro Henrique Silva Rosa
 *
 * Javascript para iniciar os procedimentos do site 
 */

// iniciando quando o documento carregar
(function() {
	init_accordion();
	init_carousel();
	init_contact();
})();

/*
 * Função para ir até o formulário de contato
 */
function go_to_contact() {
	setTimeout(function() {
		window.scrollTo(0, document.getElementById('footer').getBoundingClientRect().y);
	}, 10);
}
