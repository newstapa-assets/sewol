// 의문과 팩트 (QF.php inline script 이관)
	
	$('#accordionQFBasics').on('hidden.bs.collapse', function (e) {   
		const _id = $(e.target).attr('id').replace('collapseBasics_', ''); 
		console.log("hidden");
		console.log(_id);
		$('#collapseBasics_'+_id+' .accordion-body-wrap').html('<center><i class="swf-icons swf-18_loading1 swf-spin qfLoading"></i></center>');
	});
	$('#accordionQFBasics').on('shown.bs.collapse', function (e) { 
		const _id = $(e.target).attr('id').replace('collapseBasics_', '');  
		
		$([document.documentElement, document.body]).animate({
			scrollTop: $("#headingBasics_"+_id).offset().top
		}, 1000);  
		
		var payload = {};
		payload["_id"] = _id;
		$.ajax({
			url: '/api/qf/content',
			data: JSON.stringify(payload),
			contentType: 'application/json',
			dataType: 'text',
			type: 'POST',
			success: function(data) {
				var obj = JSON.parse(data);
				if (obj.status) {    
					$('#collapseBasics_'+_id+' .accordion-body-wrap .qfLoading').hide();
					$('#collapseBasics_'+_id+' .accordion-body-wrap').html(obj.content); 
				} else {
					
					swal(obj.msg, { buttons: [false, "확인"], });
				}
			}
		});
		  
	});


	$(document).on("click", '#askAndContactUs', function() {
		
		const contactUsName = $("[name=contactUsName]").val(); 
		const contactUsEmail = $("[name=contactUsEmail]").val(); 
		const contactUsSources = $("[name=contactUsSources]").val(); 
		const contactUsContent = $("[name=contactUsContent]").val(); 
		
		var payload = {};
		payload["contactUsName"] = contactUsName;
		payload["contactUsEmail"] = contactUsEmail;
		payload["contactUsSources"] = contactUsSources;
		payload["contactUsContent"] = contactUsContent;
		payload["modalPrivacyAgreement"] = $("#modalPrivacyAgreement").is(':checked') ? true : false ;
		
		$.ajax({
			url: '/api/contact',
			data: JSON.stringify(payload),
			contentType: 'application/json',
			dataType: 'text',
			type: 'POST',
			success: function(data) {
				var obj = JSON.parse(data);
				if (obj.status) {    
					$('#contactUsModal').modal('hide');
					$("[name=contactUsName]").val(''); 
					$("[name=contactUsEmail]").val(''); 
					$("[name=contactUsSources]").val(''); 
					$("[name=contactUsContent]").val(''); 
					$("#modalPrivacyAgreement").prop( "checked", false );
					swal("팩트체크가 끝나는대로 이메일로 결과를 통지해 드립니다.", { buttons: [false, "확인"], });
				} else {
					
					swal(obj.msg, { buttons: [false, "확인"], });
				}
			}
		});
		
		
	});
