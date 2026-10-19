// 데이터 아카이브 (archive.php inline script 이관)
	
	$(".navbar .navbar-nav a.nav-link").click(function(e) {
		const anchor = $(this).attr('href');
		if (parseInt($(document).width()) < 960) {
			if (anchor == "/") {
				alert('PC로 보시면 시청각 타임라인 페이지도 보실 수 있습니다');	
				e.preventdefault();
			}
			
		}
		
		
	});
	
	var globalPath1 = "", globalPath2 = "", globalPath3 = "", globalPath4 = "";
	function navTitleClearly(title_, output) {
		var tempTitle = title_;
		if (output == "title") {
			if (tempTitle.indexOf('(') > -1) {
				tempTitle = tempTitle.split("(")[0];
			} else {
				tempTitle = title_;
			}
		} else if (output == "date") {
			if (tempTitle.indexOf('(') > -1) {
				tempTitle = tempTitle.split("(")[1].replace(")", "").replace(/ /gi, "").replace(/\./g, ". ");
			} else {
				tempTitle = "";
			}
		}
		return tempTitle;
	}
	window.onload = function() {	
		
		var clipboard = new ClipboardJS('[data-clipboard]');
		
		$.each(archiveDatas, function( index, value ) {
			const tempTitle_ = navTitleClearly(value.title, "title");
			const tempTitleDate_ = navTitleClearly(value.title, "date");
			var tempStandardListWrap = '<div class="row"><div class="col-sm-3 mb-5 mb-sm-0"><h4 class="pointer IamParent archiveDatasTrigger" data-id="'+value.id+'">'+tempTitle_+'</h4><p>'+tempTitleDate_+'</p></div><div class="col-sm-9"><div class="row row-cols-sm-2 row-cols-md-3">';
			var tempDate = "";
			var tempContent = ""; 
			if(typeof value.children == 'undefined') {
				if (tempTitleDate_ != "") tempContent += '<li class="nav-item"><span class="nav-subtitle">'+tempTitleDate_+'</span></li>';
				tempContent += '<li class="nav-item"><a class="nav-link IamParent archiveDatasTrigger" data-id="'+value.id+'" href="javascript:;">'+tempTitle_+'</a></li>'
				tempStandardListWrap += '<div class="col mb-4"><div class="card card-bordered card-transition shadow-none border-0"><a class="card-body" href="javascript:;"><h5 class="card-title mb-0"></h5></a></div></div>';
			} else {
				if (tempTitleDate_ != "") tempContent += '<li class="nav-item"><span class="nav-subtitle">'+tempTitleDate_+'</span></li>';
				tempContent += '<li class="nav-item "><a class="nav-link dropdown-toggle menuParentWrap IamParent archiveDatasTrigger" href="#snippetsSidebarNavFeaturesCollapse'+value.id+'" data-id="'+value.id+'" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="snippetsSidebarNavFeaturesCollapse'+value.id+'">'+tempTitle_+'</a>';
				tempContent += '<div id="snippetsSidebarNavFeaturesCollapse'+value.id+'" class="nav-collapse collapse ">';
				$.each(value.children, function( index2, value2 ) {
					tempContent += '<a class="nav-link archiveDatasTrigger subMenu IamChild archiveDatasTrigger" data-id="'+value2.id+'" data-parentid="'+value.id+'" href="javascript:;"><span>'+value2.title+'</span></a>';
					tempStandardListWrap += '<div class="col mb-4"><div class="card card-bordered card-transition shadow-none"><a class="card-body IamChild archiveDatasTrigger" data-id="'+value2.id+'" data-parentid="'+value.id+'" href="javascript:;"><h5 class="card-title mb-0">'+value2.title+'</h5></a></div></div>';
				});
				tempContent += '</div>';
			}
			tempStandardListWrap += '</div></div></div><hr class="mb-5">';
				
			$("ul#navbarSettings").append(tempContent); 
			$(".standardList").append(tempStandardListWrap); 
			
		}); 
		
	} 
	
	function nl2br (str, is_xhtml) {   
		var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';    
		return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
	}
	
	function doParentsData(parentId, status) {
		var index = -1;
		if (status == "update") {
			
			index = archiveDatas.findIndex(i => i.id == parentId); 
			if (index != -1) {
				$('#subWrap .subTitleWrap b').text(navTitleClearly(archiveDatas[index].title, "title"));
				$('#subWrap .subDateWrap').text(navTitleClearly(archiveDatas[index].title, "date"));
				$('#subWrap .descDateWrap').html(nl2br(archiveDatas[index].content));
				
			}	
		} else if (status == "clear") {
			$('#subWrap .subTitleWrap b').text('');
			$('#subWrap .subDateWrap').text('');
			$('#subWrap .descDateWrap').html('');
			
		}
		return index;
		
	} 
	function doParentsDataClear() {
		$('#subWrap .subTitleWrap b').text('');
		$('#subWrap .subDateWrap').text('');
		$('#subWrap .descDateWrap').html('');
		$('details.fileList').html('');
	}
	
	function fallbackCopyTextToClipboard(text) {
		  var textArea = document.createElement("textarea");
		  textArea.value = text;
		   
		  textArea.style.top = "0";
		  textArea.style.left = "0";
		  textArea.style.position = "fixed";
		
		  document.body.appendChild(textArea);
		  textArea.focus();
		  textArea.select();
		
		  try {
			var successful = document.execCommand('copy');
			var msg = successful ? 'successful' : 'unsuccessful';
			console.log('Fallback: Copying text command was ' + msg);
		  } catch (err) {
			console.error('Fallback: Oops, unable to copy', err);
		  }
		
		  document.body.removeChild(textArea);
	}
	function copyTextToClipboard(text) {
		  if (!navigator.clipboard) {
			fallbackCopyTextToClipboard(text);
			return;
		  }
		  navigator.clipboard.writeText(text).then(function() {
			console.log('Async: Copying to clipboard was successful!');
		  }, function(err) {
			console.error('Async: Could not copy text: ', err);
		  });
	}
	$(document).on('click', '#newFileLinkForDownloadTrigger', function () {
		$('#newFileLinkForDownloadTrigger').attr('disabled', true);
		
		var payload = {};
		payload["path"] = $("#newFileLinkForDownloadPath").val();
		$.ajax({
			url: '/api/archive/presign',
			data: JSON.stringify(payload),
			contentType: 'application/json',
			dataType: 'text',
			type: 'POST',
			success: function(data) {
				var obj = JSON.parse(data);
				if (obj.status) {    
					
					const presignedUrl = obj.presignedUrl;
					$('.copyUrlWrap input').val(presignedUrl); 
					
					$('#newFileLinkForDownloadTrigger').attr('disabled', false);
					$('#newFileLinkForDownloadTrigger').hide();
					$('#staticBackdrop .modal-content .copyUrlWrap').show();
				} else {
					alert(obj.msg);
				}
			}
		});
		
	});
	$('#staticBackdrop').on('shown.bs.modal', function (e) {
		$('#newFileLinkForDownloadTrigger').show();
		$('#staticBackdrop .modal-content .copyUrlWrap').hide();
		$('#newFileLinkForDownloadTrigger').attr('disabled', false);
	});
	$('#staticBackdrop').on('hidden.bs.modal', function (e) {
		$('.copyUrlWrap input').val('');
		$('#newFileLinkForDownloadTrigger').show();
		$('#staticBackdrop .modal-content .copyUrlWrap').hide();
		$('#newFileLinkForDownloadTrigger').attr('disabled', false);
	});
	
	let globalCurrentDataId = "";
	function getFileCountFromDirectory() {
		const newCurrentDataId = $('details.fileList summary[data-call="1b"]').data('id');
		const newCurrentDataPath = $('details.fileList summary[data-call="1b"]').data('path');
		if (globalCurrentDataId != newCurrentDataId) { 
			globalCurrentDataId = newCurrentDataId;
		}
		// 폴더별 파일 수를 요청 하나로 묶어서 받는다 (폴더당 1요청 → 프록시 rate limit 503 유발)
		const targets = [];
		$('details.fileList li[data-fullpath]').each(function() {
			targets.push({ id: $(this).data('id'), fullpath: $(this).data('fullpath') });
		});
		if (targets.length === 0) return;
		$.ajax({
			url: '/api/archive/counts',
			data: JSON.stringify({ fullpaths: targets.map(t => t.fullpath) }),
			contentType: 'application/json',
			dataType: 'text',
			type: 'POST',
			success: function(data) {
				var obj = JSON.parse(data);
				if (!obj.status) { alert(obj.msg); return; }
				targets.forEach(function(t) {
					var results_ = obj.results[t.fullpath];
					if (results_ == null) return;
					//over count 1000 Direct input
					if (t.id == 'Mp2zQcLTKI3i') results_ = 3377;
					if (t.id == 'h3m2xkmI3') results_ = 1367;
					$("span.fileCount#" + t.id).text('(' + results_ + ')');
				});
			}
		});
	}

	$(document).on('click', '.archiveDatasTrigger', function () {
		if (!$(this).hasClass('menuParentWrap1')) {
			$('.ListObjectsWrap').html('');
			$(".navbar-light .navbar-nav .nav-link.active").removeClass('active');
			$(this).addClass('active');
			doParentsDataClear();
			if ($(this).hasClass('all')) {
				globalCurrentDataId = "";
				$('#searchAppsForm').val('');
				$("#mainIndexWrap").show();
				$("#subWrap").hide(); 
				$('#searchResultsInJson').val('');
				$(".standardList").show();
				$(".searchResultsWrap").hide(); 
				
			} else { 
				let amIParent = false;
				let getParentId = $(this).data('id');
				let getMyId = getParentId;
				if ($(this).hasClass('IamChild')) {
					getParentId = $(this).data('parentid');
				}  
				let fileListWrap = "";
				$.each(archiveDatas, function( index, value ) {
					if (value.id == getParentId) {
						const parentTitle = navTitleClearly(value.title, "title");
						$("strong.fileTitle").text(parentTitle);
						$('#subWrap .subTitleWrap b').text(parentTitle);
						if(typeof value.children == 'undefined') {
							fileListWrap += '<summary><i class="bi-folder text-body me-1"></i><strong> '+parentTitle+'</strong></summary><ul class="list-py-1 list-unstyled ps-4"><li class="getFileDataTrigger" data-call="1a" data-path="'+value.path+'" data-fullpath="'+value.path+'" data-id="'+value.id+'" data-depth="2"><i class="bi-folder me-1"></i>'+parentTitle+'<span class="fileCount" id="'+value.id+'"></span></li></ul>';
						} else {
							fileListWrap += '<summary data-call="1b" data-path="'+value.path+'" data-fullpath="'+value.path+'" data-id="'+value.id+'"><i class="bi-folder text-body me-1"></i><strong>'+parentTitle+'<span class="fileCount" id="'+value.id+'"></span></strong></summary>';
						}
						
						$('#subWrap .subDateWrap').text(navTitleClearly(value.title, "date"));
						$('#subWrap .descDateWrap').html(nl2br(value.content));
						
						
						fileListWrap += '<ul class="list-py-1 list-unstyled ps-4">';
						
						$.each(value.children, function( index2, value2 ) {
							
							if(typeof value2.children == 'undefined') {
								fileListWrap += '<li class="getFileDataTrigger" data-call="2a" data-path="'+value2.path+'" data-fullpath="'+value.path+'/'+value2.path+'" data-id="'+value2.id+'" data-depth="2"><i class="bi-folder me-1"></i>'+value2.title+'<span class="fileCount" id="'+value2.id+'"></span></li>';	
							} else {
								
								fileListWrap += '<li class="getFileDataTrigger" data-call="2b" data-path="'+value2.path+'" data-fullpath="'+value.path+'/'+value2.path+'" data-id="'+value2.id+'"><summary><i class="bi-folder text-body me-1"></i>'+value2.title+'<span class="fileCount" id="'+value2.id+'"></span></summary><ul class="list-unstyled ps-4">';
								$.each(value2.children, function( index3, value3 ) {
									if(typeof value3.children == 'undefined') {
										fileListWrap += '<li class="getFileDataTrigger" data-call="3a" data-path="'+value3.path+'" data-fullpath="'+value.path+'/'+value2.path+'/'+value3.path+'" data-id="'+value3.id+'" data-depth="3"><i class="bi-folder me-1"></i>'+value3.title+'<span class="fileCount" id="'+value3.id+'"></span></li>';	
									} else {
										
										fileListWrap += '<li class="getFileDataTrigger" data-call="3b" data-path="'+value3.path+'" data-fullpath="'+value.path+'/'+value2.path+'/'+value3.path+'" data-id="'+value3.id+'"><summary><i class="bi-folder text-body me-1"></i>'+value3.title+'<span class="fileCount" id="'+value3.id+'"></summary><ul class="list-unstyled ps-4">';
										$.each(value3.children, function( index4, value4 ) {
											fileListWrap += '<li class="getFileDataTrigger" data-call="4a" data-path="'+value4.path+'" data-fullpath="'+value.path+'/'+value2.path+'/'+value3.path+'/'+value4.path+'" data-id="'+value4.id+'" data-depth="4"><i class="bi-folder me-1"></i>'+value4.title+'<span class="fileCount" id="'+value4.id+'"></span></li>';	
										});	
										fileListWrap += '</ul></li>';
										
										
									}
									
								});	
								fileListWrap += '</ul></li>';
								
							} 
						});	
						fileListWrap += '</ul>';
						
					}
				});  
				$('details.fileList').html(fileListWrap);
				$("#subWrap").show();
				$("#mainIndexWrap").hide();
				getFileCountFromDirectory();
			}
			
		}
	});
	$(document).on('click', 'li[data-download=true]', function () {
		const fileType = $(this).data('filetype');
		const filePath = $(this).data('path');
		if (fileType == "nope") {
			alert("이 파일은 개인정보보호 처리 완료 후 공개 예정입니다.");
		} else {
			var payload = {};
			payload["path"] = filePath;
			$.ajax({
				url: '/api/archive/presign',
				data: JSON.stringify(payload),
				contentType: 'application/json',
				dataType: 'text',
				type: 'POST',
				success: function(data) {
					var obj = JSON.parse(data);
					if (obj.status) {    
						
						$.fileDownload(obj.presignedUrl).done(function () { 
							console.log('다운로드 성공'); 
						}).fail(function () { 
							
							window.open(obj.presignedUrl);
							return false;
						});
					} else {
						alert(obj.msg);
					}
				}
			});
			
			return false;
		}

	});  
	 
	$('details.fileList').on('click', '.getFileDataTrigger', function(e) { 
		e.stopPropagation();
		
		///
		globalPath1 = "", globalPath2 = "", globalPath3 = "", globalPath4 = "";
		const currentCall = $(this).data('call');
		if (currentCall == "4a") {
			globalPath4 = $(this).data('path');
			globalPath3 = $(this).closest('[data-call=3b]').data('path');
			globalPath2 = $(this).closest('[data-call=2b]').data('path');
			globalPath1 = $('[data-call=1b]').data('path'); 
		} else if (currentCall == "3a") {
			globalPath3 = $(this).data('path');
			globalPath2 = $(this).closest('[data-call=2b]').data('path');
			globalPath1 = $('[data-call=1b]').data('path'); 
		} else if (currentCall == "2a" || currentCall == "2b") {
			globalPath2 = $(this).data('path');
			globalPath1 = $('[data-call=1b]').data('path'); 
		} else if (currentCall == "1a") {
			globalPath1 = $('[data-call=1a]').data('path'); 
		}
		$('.ListObjectsWrap').html('');
		var payload = {};
		payload["currentCall"] = currentCall;
		payload["globalPath1"] = globalPath1;
		payload["globalPath2"] = globalPath2;
		payload["globalPath3"] = globalPath3;
		payload["globalPath4"] = globalPath4;
		$.ajax({
			url: '/api/archive/list',
			data: JSON.stringify(payload),
			contentType: 'application/json',
			dataType: 'text',
			type: 'POST',
			success: function(data) {
				var obj = JSON.parse(data);
				if (obj.status) {    
					let i=0;
					if (currentCall == obj.currentCall) {
						
						
						
						$.each(obj.results, function( index, value ) { 
							// console.log(obj.fullPath);
							let _fileName = value;
							_filetype = _fileName.split('.').pop().toLowerCase();
							_fileName = _fileName.split('/').pop().replace('.pdf', '').replace('.NOPE', '').replace(/_/gi, " ").replace(/-/gi, " ");
							let _modalWrap = 'data-download="true"';
							if (_filetype == "pdf") {
								_modalWrap = ' data-bs-toggle="modal" data-bs-target="#exampleModalFullscreen"';
							}
							
							if (currentCall == "2b") {
								const _fileNameCheck = value.replace(obj.fullPath, '');
								if (_fileNameCheck.indexOf("/") <= 0) {
									$('.ListObjectsWrap').append('<li class="pointer" data-filetype="'+_filetype+'" data-path="'+value+'" '+_modalWrap+'><i class="'+fileIcons[_filetype]+' me-1"></i> '+_fileName+'</li>');
								}
								
							} else {
								$('.ListObjectsWrap').append('<li class="pointer" data-filetype="'+_filetype+'" data-path="'+value+'" '+_modalWrap+'><i class="'+fileIcons[_filetype]+' me-1"></i> '+_fileName+'</li>');	
							}
							
						}); 
					}
				} else {
					alert(obj.msg);
				}
			}
		});
	});
	/* ---------- 모달: PDF 본문을 글자로 먼저 보여 주고, 버튼으로 원본 PDF ----------
	   본문은 검색 색인(ES)의 쪽별 글자(/api/archive/text). 글자가 없거나 불러오지 못하면 바로 원본 PDF. */
	const DOC_CHUNK = 20;
	const doc = { path: '', words: [], first: 0, last: 0, lastPage: 0, seq: 0, pdfUrl: '', pdfAt: 0, hasText: false, busy: false };
	const $docModal = $('#exampleModalFullscreen');

	function docEnsureMarkup() {
		if ($docModal.find('.docText').length) return;
		$docModal.find('.modal-body').prepend(
			'<div class="docText">' +
				'<p class="docNotice"><i class="bi-info-circle me-1"></i>문서에서 자동으로 읽어 낸 글자라 원본과 다를 수 있습니다. 표·서명·도장 등은 <button type="button" class="btn btn-link p-0 align-baseline docShowPdf">원본 PDF</button>로 확인하세요.</p>' +
				'<div class="text-center"><button type="button" class="btn btn-outline-secondary btn-sm docPrev" hidden>이전 쪽 보기</button></div>' +
				'<div class="docPages"></div>' +
				'<div class="text-center"><button type="button" class="btn btn-outline-secondary btn-sm docNext" hidden>다음 쪽 보기</button></div>' +
				'<p class="docStatus text-center text-muted"></p>' +
			'</div>');
		$docModal.find('.modal-footer').prepend('<button type="button" class="btn btn-outline-primary me-auto docToggle" hidden>원본 PDF 보기</button>');
		$docModal.find('iframe').hide();
	}
	function docEsc(t) {
		return String(t).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; });
	}
	function docMark(html) {
		if (!doc.words.length) return html;
		const re = new RegExp('(' + doc.words.map(function (w) { return docEsc(w).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }).join('|') + ')', 'g');
		return html.replace(re, '<mark>$1</mark>');
	}
	function docPageHtml(p) {
		let h = '<section class="docPage" data-page="' + p.page + '">' +
			'<div class="docPageHead"><span>' + p.page + ' / ' + doc.lastPage + '쪽</span>' +
			'<button type="button" class="btn btn-link btn-sm p-0 docPagePdf" data-page="' + p.page + '">이 쪽 원본 보기</button></div>';
		if (p.image) h += '<p class="docImage"><i class="bi-image me-1"></i>[이미지 · 원본 확인 요망]</p>';
		if (p.text.trim()) h += '<div class="docPageText">' + docMark(docEsc(p.text)) + '</div>';
		else if (!p.image) h += '<p class="docImage"><i class="bi-file-earmark me-1"></i>[글자를 읽지 못한 쪽 · 원본 확인 요망]</p>';
		return h + '</section>';
	}
	function docButtons() {
		$docModal.find('.docPrev').prop('hidden', !(doc.first > 1));
		$docModal.find('.docNext').prop('hidden', !(doc.last < doc.lastPage));
	}
	function docScrollTo(page) {
		const el = $docModal.find('.docPage[data-page="' + page + '"]')[0];
		if (el) el.scrollIntoView({ block: 'start' });
	}
	// place: 'replace' | 'append' | 'prepend'
	function docLoad(params, place, then) {
		const seq = doc.seq;
		doc.busy = true;
		$docModal.find('.docStatus').text('불러오는 중…');
		$.ajax({
			url: '/api/archive/text',
			type: 'POST',
			contentType: 'application/json',
			dataType: 'json',
			data: JSON.stringify($.extend({ path: doc.path }, params)),
			success: function (obj) {
				if (seq !== doc.seq) return;
				doc.busy = false;
				$docModal.find('.docStatus').text('');
				if (!obj.status || !obj.pages.length) {
					if (place === 'replace') docShowPdf();
					return;
				}
				doc.hasText = true;
				doc.lastPage = obj.lastPage;
				const html = obj.pages.map(docPageHtml).join('');
				const $pages = $docModal.find('.docPages');
				const body = $docModal.find('.modal-body')[0];
				if (place === 'append') {
					$pages.append(html);
				} else if (place === 'prepend') {
					const before = body.scrollHeight;
					$pages.prepend(html);
					body.scrollTop += body.scrollHeight - before;   // 보던 자리 유지
				} else {
					$pages.html(html);
					body.scrollTop = 0;
				}
				const firstP = obj.pages[0].page, lastP = obj.pages[obj.pages.length - 1].page;
				if (place !== 'append') doc.first = firstP;
				if (place !== 'prepend') doc.last = lastP;
				if (place === 'replace') { doc.first = firstP; doc.last = lastP; }
				$docModal.find('.docToggle').prop('hidden', false);
				docButtons();
				if (then) then(obj);
			},
			error: function () {
				if (seq !== doc.seq) return;
				doc.busy = false;
				$docModal.find('.docStatus').text('');
				if (place === 'replace') docShowPdf();
				else $docModal.find('.docStatus').text('불러오지 못했습니다. 잠시 후 다시 시도해 주세요.');
			}
		});
	}
	function docShowText() {
		$docModal.find('iframe').hide();
		$docModal.find('.docText').show();
		$docModal.find('.docToggle').text('원본 PDF 보기');
	}
	// 원본 PDF (page 가 있으면 그 쪽). 받은 링크는 10분 유효라 9분이 지나면 다시 받는다
	function docShowPdf(page) {
		const seq = doc.seq;
		$docModal.find('.docText').hide();
		$docModal.find('iframe').show();
		$docModal.find('.docToggle').text('텍스트로 보기').prop('hidden', !doc.hasText);
		const go = function () {
			const $f = $docModal.find('iframe');
			$f.attr('src', 'about:blank');
			setTimeout(function () { if (seq === doc.seq) $f.attr('src', doc.pdfUrl + (page ? '#page=' + page : '')); }, 0);
		};
		if (doc.pdfUrl && Date.now() - doc.pdfAt < 9 * 60 * 1000) return go();
		$.ajax({
			url: '/api/archive/presign',
			data: JSON.stringify({ path: doc.path }),
			contentType: 'application/json',
			dataType: 'text',
			type: 'POST',
			success: function (data) {
				if (seq !== doc.seq) return;
				const obj = JSON.parse(data);
				if (obj.status) {
					doc.pdfUrl = obj.presignedUrl;
					doc.pdfAt = Date.now();
					go();
				} else {
					alert(obj.msg || obj.message);
				}
			}
		});
	}

	$docModal.on('shown.bs.modal', function (e) {
		docEnsureMarkup();
		const $t = $(e.relatedTarget);
		const filePath = String($t.attr('data-path') || '');
		$("#newFileLinkForDownloadPath").val(filePath);
		$('h5#exampleModalFullscreenLabel').text($t.text());

		doc.seq++;
		$.extend(doc, { path: filePath, first: 0, last: 0, lastPage: 0, pdfUrl: '', pdfAt: 0, hasText: false, busy: false });
		// 검색 결과 목록에서 연 경우만 검색어 표시 (앞의 '영상:' 같은 종류 접두어는 뺌)
		doc.words = [];
		if ($t.closest('.searchResultsListObjectsWrap').length && searchLastWord) {
			doc.words = searchLastWord.normalize('NFC').replace(/^(영상|자막|장면|받아쓰기|사진|문서|PDF)\s*[:：]\s*/, '').split(/\s+/).filter(function (w) { return w.length >= 2; });
		}
		$docModal.find('.docPages').html('');
		$docModal.find('.docPrev, .docNext, .docToggle').prop('hidden', true);
		docShowText();

		if (!/\.pdf$/i.test(filePath)) return docShowPdf();
		docLoad({ q: doc.words.join(' ') }, 'replace', function (obj) {
			const hit = obj.hitPage;
			if (!hit || hit <= 1) return;
			if (hit <= doc.last) return docScrollTo(hit);
			docLoad({ start: Math.max(1, hit - 1) }, 'replace', function () { docScrollTo(hit); });   // 검색어가 처음 나오는 쪽으로
		});
	});
	$docModal.on('hidden.bs.modal', function (e) {
		doc.seq++;
		$("#newFileLinkForDownloadPath").val('');
		$('h5#exampleModalFullscreenLabel').text('');
		$docModal.find('iframe').attr('src', '');
		$docModal.find('.docPages').html('');
	});
	$(document).on('click', '#exampleModalFullscreen .docToggle', function () {
		if ($docModal.find('.docText').is(':visible')) docShowPdf(); else docShowText();
	});
	$(document).on('click', '#exampleModalFullscreen .docShowPdf', function () { docShowPdf(); });
	$(document).on('click', '#exampleModalFullscreen .docPagePdf', function () { docShowPdf($(this).data('page')); });
	$(document).on('click', '#exampleModalFullscreen .docNext', function () {
		if (!doc.busy) docLoad({ start: doc.last + 1 }, 'append');
	});
	$(document).on('click', '#exampleModalFullscreen .docPrev', function () {
		if (!doc.busy) docLoad({ start: Math.max(1, doc.first - DOC_CHUNK), end: doc.first }, 'prepend');
	});
	// 끝까지 내리면 다음 쪽을 이어서 불러옴
	$docModal.find('.modal-body').on('scroll', function () {
		if (doc.busy || !doc.hasText || doc.last >= doc.lastPage || !$docModal.find('.docText').is(':visible')) return;
		if (this.scrollTop + this.clientHeight > this.scrollHeight - 600) docLoad({ start: doc.last + 1 }, 'append');
	});
	function getTheTitle(pathName) {
		let results = pathName;
		var index = archiveDatas.findIndex(i => i.path == pathName); 
		if (index != -1) {
			results = navTitleClearly(archiveDatas[index].title, "title");
		}
		return results;
	}
	$(document).on('click', '.getSearchFileDataTrigger', function () {
		globalPath1 = "", globalPath2 = "", globalPath3 = "", globalPath4 = "";
		
		globalPath1 = typeof $(this).data('path1') != 'undefined' ? $(this).data('path1') : "";
		globalPath2 = typeof $(this).data('path2') != 'undefined' ? $(this).data('path2') : "";
		globalPath3 = typeof $(this).data('path3') != 'undefined' ? $(this).data('path3') : "";
		globalPath4 = typeof $(this).data('path4') != 'undefined' ? $(this).data('path4') : "";
		
		
		$('.searchResultsListObjectsWrap').html(''); 
		
		let fullPath = "데이터 아카이빙/";
		var results = "";
		var obj = JSON.parse($('#searchResultsInJson').val()); 
		if (globalPath1.length > 0) {
			results = obj[globalPath1];
			fullPath = '데이터 아카이빙/'+globalPath1+'/';
		}
		if (globalPath2.length > 0) {
			results = obj[globalPath1][globalPath2];
			fullPath = '데이터 아카이빙/'+globalPath1+'/'+globalPath2+'/';
		}
		if (globalPath3.length > 0) {
			results = obj[globalPath1][globalPath2][globalPath3];
			fullPath = '데이터 아카이빙/'+globalPath1+'/'+globalPath2+'/'+globalPath3+'/';
		}
		if (globalPath4.length > 0) {
			results = obj[globalPath1][globalPath2][globalPath3][globalPath4];
			fullPath = '데이터 아카이빙/'+globalPath1+'/'+globalPath2+'/'+globalPath3+'/'+globalPath4+'/';
		}
		 
		$.each(results, function( key, row ) {	
			if ($.type(row) == "string") { 
				_filetype = row.split('.').pop().toLowerCase();
				_fileName = row.split('/').pop().replace('.pdf', '').replace(/_/gi, " ").replace(/-/gi, " ");
				let _modalWrap = "";
				if (_filetype == "pdf") _modalWrap = 'data-path="'+fullPath+row+'" data-bs-toggle="modal" data-bs-target="#exampleModalFullscreen"';
				$('.searchResultsListObjectsWrap').append('<li class="pointer" '+_modalWrap+'><i class="'+fileIcons[_filetype]+' me-1"></i> '+_fileName+'</li>');
			}
		});		
			
			
			
			
	});
	/* ---------- 아카이브 검색 (debounce + race guard) ---------- */
	const SEARCH_DEBOUNCE_MS = 300;   // 타이핑 멈춘 뒤 대기시간
	const SEARCH_COMPOSING_MS = 600;  // 한글 조합 중에는 더 여유있게
	const SEARCH_MIN_LENGTH  = 2;     // 최소 검색 글자수
	
	let searchTimer   = null;         // debounce 타이머
	let searchXHR     = null;         // 진행 중인 요청
	let searchSeq     = 0;            // 요청 일련번호 (stale 응답 폐기용)
	let searchLastWord = "";          // 직전 검색어 (중복 요청 방지)
	let isComposing   = false;        // 한글 IME 조합 중 여부
	
	// 검색 결과 트리 노드 아래 파일 수 (하위 폴더 포함). 파일은 문자열, 폴더는 객체·배열
	function countSearchFiles(node) {
		if (typeof node === 'string') return 1;
		let n = 0;
		$.each(node, function(k, v) { n += countSearchFiles(v); });
		return n;
	}
	function searchFileCount(node) {
		return '<span class="fileCount">(' + countSearchFiles(node).toLocaleString('en-US') + ')</span>';
	}

	function renderSearchResults(obj) {
		let fileListWrap = "";
		fileListWrap += '<summary data-path="" data-id=""></summary>';
		$.each(obj.results, function(key, row) {
			fileListWrap += '<summary data-path="'+key+'" data-depth="1"><i class="bi-folder text-body me-1"></i><strong> '+getTheTitle(key)+searchFileCount(row)+'</strong></summary>';
			fileListWrap += '<ul class="list-py-1 list-unstyled ps-4">';
			$.each(row, function( key2, row2 ) {
				if (typeof row2 === 'string') return;   // 기관 폴더 바로 아래 파일: 이 트리는 폴더만 그림
				fileListWrap += '<li class="getSearchFileDataTrigger" data-path1="'+key+'" data-path2="'+key2+'" data-depth="2"><i class="bi-folder me-1"></i> '+getTheTitle(key2)+searchFileCount(row2)+'</li>';
				fileListWrap += '<ul class="list-py-1 list-unstyled ps-4">';
				$.each(row2, function( key3, row3 ) {
					if (isNaN(key3)) {
						fileListWrap += '<li class="getSearchFileDataTrigger" data-path1="'+key+'" data-path2="'+key2+'" data-path3="'+key3+'" data-depth="3"><i class="bi-folder me-1"></i> '+getTheTitle(key3)+searchFileCount(row3)+'</li>';
						fileListWrap += '<ul class="list-py-1 list-unstyled ps-4">';
						$.each(row3, function( key4, row4 ) {
							if (isNaN(key4)) fileListWrap += '<li class="getSearchFileDataTrigger" data-path1="'+key+'" data-path2="'+key2+'" data-path3="'+key3+'" data-path4="'+key4+'" data-depth="4"><i class="bi-folder me-1"></i> '+getTheTitle(key4)+searchFileCount(row4)+'</li>';
						});
						fileListWrap += '</ul>';
					}
				});
				fileListWrap += '</ul>';
			});
			fileListWrap += '</ul>';
		});
		$("details.searchResultsfileList").html(fileListWrap);
	}
	
	function setSearchLoading(on) {
		const $btn  = $('#searchSubmitBtn');
		const $icon = $('#searchSubmitIcon');
		if (on) {
			$btn.prop('disabled', true).attr('aria-busy', 'true');
			$icon.removeClass('bi-arrow-right').addClass('bi-arrow-repeat icon-spin');
		} else {
			$btn.prop('disabled', false).removeAttr('aria-busy');
			$icon.removeClass('bi-arrow-repeat icon-spin').addClass('bi-arrow-right');
		}
	}

	function resetSearchView() {
		$('#searchResultsInJson').val('');
		$('.searchResultsListObjectsWrap').html('');
		$(".searchResultsWrap").hide();
		$(".standardList").show();
	}
	
	function runArchiveSearch(searchWord) {
		// 같은 검색어면 재요청하지 않음
		if (searchWord === searchLastWord) return;
		searchLastWord = searchWord;
	
		// 진행 중이던 이전 요청은 취소
		if (searchXHR) { searchXHR.abort(); searchXHR = null; }
	
		const mySeq = ++searchSeq;
	
		$('.searchResultsListObjectsWrap').html('');
		$('#searchResultsInJson').val('');
		$(".standardList").hide();
		$(".searchResultsWrap").show();
		$("details.searchResultsfileList").html('<summary class="text-muted">검색 중…</summary>');
		setSearchLoading(true);
	
		var payload = {};
		payload["page"] = 0;
		payload["search_word"] = searchWord;
	
		searchXHR = $.ajax({
			url: '/api/archive/search',
			data: JSON.stringify(payload),
			contentType: 'application/json',
			dataType: 'text',
			type: 'POST',
			success: function(data) {
				if (mySeq !== searchSeq) return;   // 늦게 도착한 옛 응답 폐기
				let obj;
				try { obj = JSON.parse(data); }
				catch (e) {
					$("details.searchResultsfileList").html('<summary class="text-muted">검색 결과를 불러오지 못했습니다.</summary>');
					return;
				}
				console.log(JSON.stringify(obj));
				if (obj.status) {
					$('#searchResultsInJson').val(JSON.stringify(obj.results));
					renderSearchResults(obj);
				} else {
					$("details.searchResultsfileList").html('<summary class="text-muted">'+(obj.msg || '검색 결과가 없습니다.')+'</summary>');
				}
			},
			error: function(xhr, status) {
				if (status === 'abort' || mySeq !== searchSeq) return;
				$("details.searchResultsfileList").html('<summary class="text-muted">일시적인 오류입니다. 잠시 후 다시 시도해 주세요.</summary>');
			},
			complete: function() {
				if (mySeq !== searchSeq) return;   // 취소된 옛 요청은 무시
				searchXHR = null;
				setSearchLoading(false);
			}
		});
	}
	
	function scheduleArchiveSearch(immediate) {
		clearTimeout(searchTimer);
	
		const searchWord = $("input#searchAppsForm").val().trim();
	
		if (searchWord.length < SEARCH_MIN_LENGTH) {
			if (searchXHR) { searchXHR.abort(); searchXHR = null; }
			searchSeq++;                 // 대기 중이던 응답 무효화
			searchLastWord = "";
			setSearchLoading(false);
			resetSearchView();
			return;
		}
	
		if (immediate) {
			runArchiveSearch(searchWord);
		} else {
			const delay = isComposing ? SEARCH_COMPOSING_MS : SEARCH_DEBOUNCE_MS;
			searchTimer = setTimeout(function() { runArchiveSearch(searchWord); }, delay);
		}
	}
	
	$("input#searchAppsForm")
		.on('compositionstart', function() { isComposing = true; })
		.on('compositionend', function() {
			isComposing = false;
			scheduleArchiveSearch(false);
		})
		.on('input', function() {
			// 조합 중에도 반드시 타이머를 리셋한다.
			// (여기서 return 하면 직전 음절의 타이머가 살아남아 타이핑 도중 검색이 나감)
			scheduleArchiveSearch(false);
		})
		.on('keydown', function(e) {
			if (e.key === 'Enter') {      // Enter는 기다리지 않고 즉시 검색
				e.preventDefault();
				clearTimeout(searchTimer);
				scheduleArchiveSearch(true);
			}
		});
	function downloadPDF() {
		const path = $(this).data('path');
		const filename_ = $(this).data('filename');
		alert(path);
		alert(filename_);
	} 
	 
		(function() { 
		  new HSHeader('#header').init()
	  
		  new HSGoTo('.js-go-to')
		  HSCore.components.HSTyped.init('.js-text-animation')
		})()
