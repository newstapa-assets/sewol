// 사이트 공통 스크립트 (archive, QF, 타임라인에서 페이지 스크립트보다 먼저 읽는다)

// '맨 위로' 버튼: 700px 넘게 내리면 나타나고, 누르면 맨 위로 부드럽게 이동
(function () {
	var btn = document.querySelector('.sw-go-to');
	if (!btn) return;
	var OFFSET = 700, shown = false;
	function update() {
		var show = (window.pageYOffset || document.documentElement.scrollTop) > OFFSET;
		if (show === shown) return;
		shown = show;
		btn.classList.toggle('sw-go-to-show', show);
		btn.classList.toggle('sw-go-to-hide', !show);
	}
	window.addEventListener('scroll', update, { passive: true });
	update();
	btn.addEventListener('click', function (e) {
		e.preventDefault();
		window.scrollTo({ top: 0, behavior: 'smooth' });
	});
})();
