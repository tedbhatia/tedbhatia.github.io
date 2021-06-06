$("#login-button").click(function(event){
    event.preventDefault();

$('form').fadeOut(500);
$('.wrapper').addClass('form-success');
});

let navbarHeight;
	
function computeNavbarHeight() {
	navbarHeight = getComputedStyle(document.querySelectorAll('.navbar')[0]).height;
	document.querySelectorAll('.topmost-container')[0].style.overflow = 'auto';
	document.querySelectorAll('.topmost-container')[0].style.minHeight = document.querySelectorAll('.topmost-container')[0].style.height = 'calc(100vh - ' + navbarHeight + ')';
	document.querySelectorAll('.topmost-container')[0].style.zIndex = '-1';
}

function selectActiveNavLink(linkIdCssSelector) {
	document.querySelectorAll('.nav-link').forEach(node => {
		node.classList.remove('active');
	});
	document.querySelector('#' + linkIdCssSelector).classList.add('active');
}