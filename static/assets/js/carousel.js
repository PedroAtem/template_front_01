/*
 * @author: Pedro Henrique Silva Rosa
 *
 * Javascript de controle dos carrosséis
 */

var all_carousel = []; // todos os elementos de carousel
var carousel_index = []; // vetor dos index dos elementos

/*
 * Inicia o carousel
 */
function init_carousel() {
	var carousels = document.getElementsByClassName('carousel'); // pegando todos os carousels
	for (var i = 0; i < carousels.length; i++) {
		var carItem = carousels[i];
		all_carousel.push(carousels[i]);
		var num_items = carItem.querySelector('.carousel-content').children.length;

		// criando html dos pontos
		for (var n = 1; n <= num_items; n++) {
			carItem.querySelector('.carousel-dots').innerHTML += '<span class="carousel-dot" onclick="currentSlide('+n+', '+i+')"></span>';
		}

		// criando index do carousel
		carousel_index.push(1);

		// processando ícone prev, criando evento de click
		carItem.querySelector('.carousel-prev').setAttribute('data-carousel-index', i);
		carItem.querySelector('.carousel-prev').addEventListener('click', function() {
			change_carousel(-1, Number(this.getAttribute('data-carousel-index')));
			this.setAttribute('data-change-click', true);
		});

		// processando ícone next, criando evento de click
		carItem.querySelector('.carousel-next').setAttribute('data-carousel-index', i);
		carItem.querySelector('.carousel-next').addEventListener('click', function() {
			change_carousel(1, Number(this.getAttribute('data-carousel-index')));
			this.setAttribute('data-change-click', true);
		});
		
		// definindo o primeiro item de cada carousel
		currentSlide(carousel_index[i], i);
	}

	// intervalo para os itens mudarem sozinhos
	setInterval(function() {
		for (var i = 0; i < all_carousel.length; i++) {
			if (all_carousel[i].querySelector('.carousel-next').getAttribute('data-change-click')) {
				all_carousel[i].querySelector('.carousel-next').removeAttribute('data-change-click', false);
			}
			else {
				var _car_index = all_carousel[i].querySelector('.carousel-next').getAttribute('data-carousel-index');
				change_carousel(1, _car_index);
			}
		}
	}, 7000);
}

/*
 * Processa qual item do carousel deve aparecer baseado nos botões prev e next
 * @param n: indice do item do carousel, 1 para next e -1 para prev
 * @param carousel_i: indice de qual carousel o item pertence
 */
function change_carousel(n, carousel_i) {
	show_carousel(carousel_index[carousel_i] += n, carousel_i);
}

/*
 * Processa qual item do carousel deve aparecer baseado no clique no circulo
 * @param n: indice do item do carousel
 * @param carousel_i: indice de qual carousel o item pertence
 */
function currentSlide(n, carousel_i) {
	show_carousel(carousel_index[carousel_i] = n, carousel_i);
}

/*
 * Processa um carousel específico e qual item deve aparecer
 * @param n: indice do item do carousel
 * @param carousel_i: indice de qual carousel o item pertence
 */
function show_carousel(n, carousel_i) {
	var carousel = document.getElementsByClassName('carousel')[carousel_i]; // pegando o elemento do carousel
	var slides = carousel.querySelector(".carousel-content").children; // pegando os elementos dos itens do carousel
	var dots = carousel.querySelector(".carousel-dots").children; // pegandos os elementos dos pontos
	
	// validando indice do item
	if (n > slides.length) {
		carousel_index[carousel_i] = 1;
	}
	if (n < 1) {
		carousel_index[carousel_i] = slides.length
	} 
	
	// escondendo todos os itens
	for (var i = 0; i < slides.length; i++) {
	  slides[i].style.display = "none";  
	}

	// removendo a classe carousel-active de todos os pontos
	for (var i = 0; i < dots.length; i++) {
	  dots[i].className = dots[i].className.replace(" carousel-active", "");
	}

	// exibindo apenas o item correto do carousel
	slides[carousel_index[carousel_i]-1].style.display = "block";  
	// definindo o ponto do item correto como ativo
	dots[carousel_index[carousel_i]-1].className += " carousel-active";
}