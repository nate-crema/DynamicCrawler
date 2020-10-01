/*

HTML-WRITTEN FILE || Script sequence: [12]

*/

 
					function viewContent2(ndl_bib_no, view_id)
					{										
						
						$("#viewFrm2 input[name=master_bib_no]").val(ndl_bib_no);
						$("#viewFrm2 input[name=review_id]").val(view_id);						
						
						$("#viewFrm2").submit(); 
					}
					