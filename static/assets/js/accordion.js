/*
 * @author: Pedro Henrique Silva Rosa
 *
 * Javascript de controle dos accordions
 */

/*
 * Inicia o accordion
 */
function init_accordion() {
	var elements = document.querySelectorAll(".accordion-title");
	for (var i = 0; i < elements.length; i++) {
		var el = elements[i];
		el.addEventListener("click", function() {
			toggle_class(this, "accordion-active");
			var content = this.nextElementSibling;
			if (content.style.maxHeight){
				content.style.maxHeight = null;
				this.children[0].style.transform = 'rotate(-90deg)';
			} else {
				content.style.maxHeight = content.scrollHeight + "px";
				this.children[0].style.transform = 'rotate(90deg)';
			}
			var el_contents = document.querySelectorAll(".accordion-content");
			for (var j = 0; j < el_contents.length; j++) {
				var el_content = el_contents[j];
				if (content !== el_content) {
					remove_class(el_content.previousElementSibling, "accordion-active");
					el_content.style.maxHeight = null;
					el_content.previousElementSibling.children[0].style.transform = 'rotate(-90deg)';
				}
			}
		});
	}
}

/*
 * Alterna a classe do elemento, se ele possui tira a classe se não, adiciona
 * @param element: elemento para a classe ser alternada
 * @param _class: classe para ser alternada
 */
function toggle_class(element, _class) {
	var classList = element.className.split(' ');
	var index = classList.indexOf(_class);
	if (index == -1) {
		classList.push(_class);
	}
	else {
		classList.splice(index, 1);
	}
	element.classList = classList.join(' ');
}

/*
 * Remove uma classe do elemento
 * @param element: elemento para a classe ser removida
 * @param _class: classe para ser removida
 */
function remove_class(element, _class) {
	var classList = element.className.split(' ');
	var index = classList.indexOf(_class);
	if (index != -1) {
		classList.splice(index, 1);
	}
	element.classList = classList.join(' ');
}