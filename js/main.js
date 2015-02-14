
var isError = false;

/** Tabs Click **/
function bindTabsClickFunction(){
	$(".tabs").click(function(){
		$(".tabs").removeClass('active');
		$(this).addClass('active');
		var currentEleID = this.id;
		$(".tabContent").removeClass('displayBlock').addClass('displayNone');
		$('#'+currentEleID+'-cont').addClass('displayBlock').removeClass('displayNone');
	})
}

/**
 * @function checkforValidation - Function to check type of field using switch-case construct and invoke appropriate validation implementation method based on type
 * @param {fieldID} - HTML element id for text field whose validation method has to be called
 * @param {type} - Type of element (alpha-numeric, numneric, date, email)
 * @param {minlength} - Minimum length of the text field value
 * @param {maxlength} - Maximum length of the text field value
 * @param {required} - Mandatory field or not
 * @param {errorMSG} - Error message to display
 * @param {isErrorPage} - Optional Boolean parameter
 */
function checkforValidation(fieldID, type, minlength, maxlength, required, errorMSG, isErrorPage){
	if(type =='' || type==undefined || type == null){
		return false;
	}else{
		switch (type){
		case 1://Alpha Numeric
			processAlphaNum(fieldID, minlength, maxlength, required, errorMSG, isErrorPage);
			break;
		case 2://Number
			processNumber(fieldID, minlength, maxlength, required, errorMSG, isErrorPage);
			break;
		case 3://Email
			processEmail(fieldID, minlength, maxlength, required, errorMSG, isErrorPage);
			break;
		case 4://Float - Decimal
			processFloat(fieldID, minlength, maxlength, required, errorMSG, isErrorPage);
			break;
		case 5:// Date Validation
			processDate(fieldID, minlength, maxlength, required, errorMSG, isErrorPage);
			break;
		case 6:// Password field validation
			processPassword(fieldID, minlength, maxlength, required, errorMSG, isErrorPage);
			break;
		case 7:// Password field validation
			processTime(fieldID, minlength, maxlength, required, errorMSG, isErrorPage);
			break;
		case 8:// Password field validation
			processRadio(fieldID, minlength, maxlength, required, errorMSG, isErrorPage);
			break;
		}
	}
}

/**
 * @function processNumber - Generic validation implementation for number type fields
 * @param {fieldID} - HTML element ID for the number type input field
 * @param {minlength} - Minimum length
 * @param {maxlength} - Maximum length
 * @param {required} - Is Mandatory
 * @param {errorMSG} - Error message to set, if any
 * @param {isErrorPage} - Optional boolean variable
 */
function processNumber(fieldID, minlength, maxlength, required, errorMSG, isErrorPage){
	
	// Fetch the value entered for the input field
	var val = $('#'+fieldID).val();
	
	// If mandatory
	if(required!='' && required==1){
		// If field is blank
		if(val==''){
			
			// Make function call to set mandatory field error message
			errorMSG = 'must enter';
			setErrorMSG(fieldID, errorMSG);
			isError = true;
			
			// Call function to manipulate progress bar with invalid status of this field
		}else if(val !=''){ // if field is not blank
			if (val.match(/^[1-9]\d*(\.\d+)?$/)) { // if only numbers are entered
				if(val.length <	 minlength){ // if value's length is lesser than minimum length
					
					// Make function calls to set minlength field error message and manipulate progress bar with invalid status of this field
					errorMSG = 'must be minimum '+minlength+' characters long';
					setErrorMSG(fieldID, errorMSG);
					isError = true;
				}else if(val.length > maxlength){ // if value's length is greater than maximum length
					
					// Make function calls to set maxlength field error message and manipulate progress bar with invalid status of this field
					errorMSG = 'must not be longer than '+minlength+' characters';
					setErrorMSG(fieldID, errorMSG);
					isError = true;
				}else{ // if value entered is valid
					
					// Make function calls to remove any error message for this field and manipulate progress bar with valid status of this field
					removeErrorMSG(fieldID);
				}
			} else { // if field contains characters other than numbers
				
				// Make function calls to set numbers only error message and manipulate progress bar with invalid status of this field
				errorMSG = 'only numbers are allowed';
				setErrorMSG(fieldID, errorMSG);
				isError = true;
			}
		}
	}else if(required==0){ // if not a mandatory field
		if(val!='' || val==0){
			if (val.match(/^[1-9]\d*(\.\d+)?$/)) {
				if(val.length <	 minlength){
					errorMSG = 'must be minimum '+minlength+' characters long';
					setErrorMSG(fieldID, errorMSG);
					isError = true;
				}else if(val.length > maxlength){
					errorMSG = 'must not be longer than '+minlength+' characters';
					setErrorMSG(fieldID, errorMSG);
					isError = true;
				}
				else{
					removeErrorMSG(fieldID);
				}
			} else {
				errorMSG = 'only numbers are allowed';
				setErrorMSG(fieldID, errorMSG);
				isError = true;
			}
		}
	}else{
	}
	
	// Return the value of global isError memory variable that is set to true/false as per invalid/valid field data respectively
	return isError;
}

/**
 * @function processDate - Generic validation implementation for date type fields
 * @param {fieldID} - HTML element ID for date type input field
 * @param {minlength} - Minimum length
 * @param {maxlength} - Maximum length
 * @param {required} - Is Mandatory
 * @param {errorMSG} - Error message to set, if any
 * @param {isErrorPage} - Optional boolean variable
 */
function processDate(fieldID, minlength, maxlength, required, errorMSG, isErrorPage){
	
	// Fetch the value entered for the input field
	var val = document.getElementById(fieldID).valueAsDate;
	
	// If mandatory
	if(required!='' && required==1){
		// If field is blank or contains invalid value
		if(val=='' || val == null || isNaN(val) == true){
			
			// Make function calls to set invalid or empty date error message and manipulate progress bar with invalid status of this field
			errorMSG = 'invalid or no date selected';
			setErrorMSG(fieldID, errorMSG);
			isError = true;
		}else if(val != ''){ // if not blank
			if(Date.parse(val)){ // if the value entered is a date
				var d = new Date(), e = new Date(val);
				if(e.setHours(0,0,0,0) == d.setHours(0,0,0,0)){
					// Make function calls to remove any error message for this field and manipulate progress bar with valid status of this field
					removeErrorMSG(fieldID);
				}else{
					errorMSG = 'invalid date';
					setErrorMSG(fieldID, errorMSG);
					isError = true;
				}
			}else{
				
				// Make function calls to set invalid date error message and manipulate progress bar with invalid status of this field
				errorMSG = 'invalid date';
				setErrorMSG(fieldID, errorMSG);
				isError = true;
			}
		}
	}else if(required==0){ // if not mandatory
		if(val != ''){
			if(Date.parse(val)){
				removeErrorMSG(fieldID);
			}else{
				errorMSG = 'invalid date';
				setErrorMSG(fieldID, errorMSG);
				isError = true;
			}
		}
	}else{
	}
	
	// Return the value of global isError memory variable that is set to true/false as per invalid/valid field data respectively
	return isError;
}



/**
 * @function processDate - Generic validation implementation for date type fields
 * @param {fieldID} - HTML element ID for date type input field
 * @param {minlength} - Minimum length
 * @param {maxlength} - Maximum length
 * @param {required} - Is Mandatory
 * @param {errorMSG} - Error message to set, if any
 * @param {isErrorPage} - Optional boolean variable
 */
function processTime(fieldID, minlength, maxlength, required, errorMSG, isErrorPage){
	
	// Fetch the value entered for the input field
	var val = document.getElementById(fieldID).value;
	var regex = /^([0]\d|[1][0-2]):([0-5]\d)\s?(?:AM|PM)$/i;
	
	// If mandatory
	if(required!='' && required==1){
		// If field is blank or contains invalid value
		if(val=='' || val == null){
			// Make function calls to set invalid or empty date error message and manipulate progress bar with invalid status of this field
			errorMSG = 'must enter';
			setErrorMSG(fieldID, errorMSG);
			isError = true;
		}else if(val != ''){ // if not blank
			if(regex.test(val)){ // if the value entered is a date
				
				// Make function calls to remove any error message for this field and manipulate progress bar with valid status of this field
				removeErrorMSG(fieldID);
			}else{
				
				// Make function calls to set invalid date error message and manipulate progress bar with invalid status of this field
				errorMSG = 'invalid time';
				setErrorMSG(fieldID, errorMSG);
				isError = true;
			}
		}
	}else if(required==0){ // if not mandatory
		if(val != ''){
			if(regex.test(val)){
				removeErrorMSG(fieldID);
			}else{
				errorMSG = 'invalid time';
				setErrorMSG(fieldID, errorMSG);
				isError = true;
			}
		}
	}else{
	}
	
	// Return the value of global isError memory variable that is set to true/false as per invalid/valid field data respectively
	return isError;
}


/**
 * @function processEmail - Generic validation implementation for email type fields
 * @param {fieldID} - HTML element ID for email type input field
 * @param {minlength} - Minimum length
 * @param {maxlength} - Maximum length
 * @param {required} - Is Mandatory
 * @param {errorMSG} - Error message to set, if any
 * @param {isErrorPage} - Optional boolean variable
 */
function processEmail(fieldID, minlength, maxlength, required, errorMSG, isErrorPage){
	
	// Fetch the value entered for the input field
	var val = $('#'+fieldID).val();
	// If mandatory
	if(required!='' && required==1){
		// If field is blank
		if(val==''){
			
			// Make function call to set mandatory field error message
			errorMSG = 'must enter';
			setErrorMSG(fieldID, errorMSG);
			isError = true;
			// Call function to manipulate progress bar with invalid status of this field
		}else if(val !=''){ // if field is not blank
			if (val.match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)) { // if value contains characters cooresponding to the given regular expression
				if(val.length >	 maxlength){ // if value's length is greater than maximum length
					
					// Make function calls to set maxlength field error message and manipulate progress bar with invalid status of this field
					errorMSG = 'must be '+maxlength+' characters long';
					setErrorMSG(fieldID, errorMSG);
					isError = true;
				}else{
					
					// Make function calls to remove any error message for this field and manipulate progress bar with valid status of this field
					removeErrorMSG(fieldID);
				}
			} else {
				
				// Make function calls to set invalid email error message and manipulate progress bar with invalid status of this field
				errorMSG = 'invalid email';
				setErrorMSG(fieldID, errorMSG);
				isError = true;
			}
		}
	}else if(required==0){ // if not mandatory
		if(val!=''){
			if (val.match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)) {
				if(val.length >	 maxlength){
					errorMSG = 'must be '+maxlength+' characters long';
					setErrorMSG(fieldID, errorMSG);
					isError = true;
				}else{
					removeErrorMSG(fieldID);
				}
			} else {
				errorMSG = 'invalid email';
				setErrorMSG(fieldID, errorMSG);
				isError = true;
			}
		}else{
			removeErrorMSG(fieldID);
		}
	}else{
	}
	
	// Return the value of global isError memory variable that is set to true/false as per invalid/valid field data respectively
	return isError;
}

/**
 * @function processAlphaNum - Generic validation implementation for aplhanumeric type fields
 * @param {fieldID} - HTML element ID for the alphanumeric type input field
 * @param {minlength} - Minimum length
 * @param {maxlength} - Maximum length
 * @param {required} - Is Mandatory
 * @param {errorMSG} - Error message to set, if any
 * @param {isErrorPage} - Optional boolean variable
 */
function processAlphaNum(fieldID, minlength, maxlength, required, errorMSG, isErrorPage){
	
	// Fetch the value entered for the input field
	var val = $('#'+fieldID).val();
	
	// If mandatory
	if(required!='' && required==1){
		
		// If field is blank
		if(val==''){
			
			// Make function call to set mandatory field error message
			errorMSG = 'must enter';
			setErrorMSG(fieldID, errorMSG);
			isError = true;
			
			// Call function to manipulate progress bar with invalid status of this field
		}else if(val !=''){ // if field is not blank
			if (val.match(/^[0-9a-zA-Z_#\-.& ]+$/)) { // if value contains only alphanumeric characters
				if(val.length >	 maxlength){ // if value's length is greater than maximum length
					
					// Make function calls to set maxlength field error message and manipulate progress bar with invalid status of this field
					errorMSG = 'must be '+maxlength+' characters long';
					setErrorMSG(fieldID, errorMSG);
					isError = true;
				}else{
					
					// Make function calls to remove any error message for this field and manipulate progress bar with valid status of this field
					removeErrorMSG(fieldID);
				}
			} else {
				
				// Make function calls to set invalid text error message and manipulate progress bar with invalid status of this field
				errorMSG = 'only a-z, 0-9 are allowed';
				setErrorMSG(fieldID, errorMSG);
				isError = true;
			}
		}
	}else if(required==0){ // if not mandatory
		if(val!=''){
			if (val.match(/^[0-9a-zA-Z_#-.& ]+$/)) {
				if(val.length > maxlength){
					errorMSG = 'must be '+maxlength+' characters long';
					setErrorMSG(fieldID, errorMSG);
					isError = true;
				}else{
					removeErrorMSG(fieldID);
				}
			} else {
				errorMSG = 'only a-z, 0-9 are allowed';
				setErrorMSG(fieldID, errorMSG);
				isError = true;
			}
		}else{
			removeErrorMSG(fieldID);
		}
	}else{
	}
	
	// Return the value of global isError memory variable that is set to true/false as per invalid/valid field data respectively
	return isError;
}

/**
 * @function processAlphaNum - Generic validation implementation for aplhanumeric type fields
 * @param {fieldID} - HTML element ID for the alphanumeric type input field
 * @param {minlength} - Minimum length
 * @param {maxlength} - Maximum length
 * @param {required} - Is Mandatory
 * @param {errorMSG} - Error message to set, if any
 * @param {isErrorPage} - Optional boolean variable
 */
function processRadio(fieldID, minlength, maxlength, required, errorMSG, isErrorPage){
	
	// Fetch the value entered for the input field
	var ele = $("input:radio[name="+fieldID+"]");
	
	for(var x in ele){
		if(ele[x].type == 'radio'){
			if(ele[x].checked==true){
				removeErrorMSG(fieldID);
				isError = false;
				return isError;
			}else{
				errorMSG = 'must select one';
				setErrorMSG(fieldID, errorMSG);
				isError = true;
			}
		}
	}
	
	// Return the value of global isError memory variable that is set to true/false as per invalid/valid field data respectively
	return isError;
}
/**
 * @function processPassword - Generic validation implementation for password type fields
 * @param {fieldID} - HTML element ID for the password type input field
 * @param {minlength} - Minimum length
 * @param {maxlength} - Maximum length
 * @param {required} - Is Mandatory
 * @param {errorMSG} - Error message to set, if any
 * @param {isErrorPage} - Optional boolean variable
 */
function processPassword(fieldID, minlength, maxlength, required, errorMSG, isErrorPage){
	
	// Fetch the value entered for the input field
	var val = $('#'+fieldID).val();
	
	// If mandatory
	if(required!='' && required==1){
		if(val==''){ // If field is blank
			
			// Make call to set mandatory field error message
			errorMSG = 'must enter';
			setErrorMSG(fieldID, errorMSG);
			isError = true;
		}else if(val !=''){ // If not blank
			if(val.length <	 minlength){ // If value contains lesser number of characters than minlength
				
				// Make a call to set minimum length error message
				errorMSG = 'must be minimum '+minlength+' characters long';
				setErrorMSG(fieldID, errorMSG);
				isError = true;
			}else if(val.length > maxlength){ // If value contains more number of characters than maxlength
				
				// Make a call to set maximum length error message
				errorMSG = 'must not be between '+minlength+'-'+maxlength;
				setErrorMSG(fieldID, errorMSG);
				isError = true;
			}else{
				
				// If valid, remove any error message present
				removeErrorMSG(fieldID);
			}
		}
	}
	
	// return isError value set after validation
	return isError;
}

/**
 * @function setErrorMSG - Generic function to set error messages for fields based on their IDs
 * @param {id} - html element ID of the field for which error message has to set
 * @param {msg} - The message to set in the error html element
 */
function setErrorMSG(id, msg){
	
	// Precautionary check if ID received is not invalid
	if(id==undefined || id=="" || msg==undefined || msg==""){
		//do nothing
	}else{
		// Set HTML mesaage to field's error element and show the error element
		$('#'+id+'ERROR').html(msg);
		$('#'+id+'ERROR').addClass('errorYes');
		var c = $('#'+id).attr('type');
		$('#'+id).addClass('inputError');
		
	}
}

/**
 * @function removeErrorMSG - Generic function to remove error messages for fields based on their IDs
 * @param {id} - html element ID of the field for which error message has to removed
 */
function removeErrorMSG(id){
	if(id==undefined || id==""){
		//do nothing
	}else{
		// Remove error message from the error element of the ID received
		$('#'+id+'ERROR').html('');
		$('#'+id+'ERROR').removeClass('errorYes');
		$('#'+id).removeClass('inputError');
	}
}

/**
 * @function appendDataToLocalStorage - Append data to LS based on key
 * @param {key} - Key to which data needs to appended or modified to in LS
 * @param {data} - Actual data that needs to be appended
 */
function appendDataToLocalStorage(key, data) {
	
	// Retrieve key's object from LS
	tmp = localStorage.getItem(key);
	
	// If object is null, create an empty object else parse the retrieved object
	tmp = (tmp === null) ? {} : JSON.parse(tmp);
	
	// Append data to object
	tmp = jQuery.extend(tmp, data);
	
	// Set modified object to key in LS
	localStorage.setItem(key, JSON.stringify(tmp));
}


/** Save outgoing inventory data **/
function checkSaveOutgoing(){
	$('#out-loader').removeClass('displayNone').addClass('displayInLineBlock');
	$(this).attr('disabled','disabled').addClass('disabled');
	isError = false;
	$('#fName').blur();
	$('#mName').blur();
	$('#lName').blur();
	$('#department').blur();
	$('#date').blur();
	$('#time').change();
	$('#device').blur();
	$("#chargerYes, #chargerNo").change();
	$("#cableYes, #cableNo").change();
	$('#allotedfName').blur();
	$('#allotedmName').blur();
	$('#allotedlName').blur();
	
	if(isError==true){
		$('#save-out').removeAttr('disabled').removeClass('disabled');
		$('#out-loader').addClass('displayNone').removeClass('displayInLineBlock');
		return false; // Stop the control flow
	}
	var fname = $('#fName').val();
	var lname = $('#lName').val();
	var mname = '';
	if($('#mName').val() !=''){
		mname = $('#mName').val();
		var fullnameuser = fname.trim()+' '+mname.trim()+' '+lname.trim();
	}else{
		var fullnameuser = fname.trim()+' '+lname.trim();
	}
	var department = $('#department').val();
	var date = $('#date').val();
	var time = $('#time').val();
	var device = $('#device').val();
	if($('#chargerYes').is(':checked')){
		var charger = 'Yes';
	}else if($('#chargerNo').is(':checked')){
		var charger = 'No';
	}
	if($('#cableYes').is(':checked')){
		var cable = 'Yes';
	}else if($('#cableNo').is(':checked')){
		var cable = 'No';
	}
	var allotedfname = $('#allotedfName').val();
	var allotedlname = $('#allotedlName').val();
	var allotedmname = '';
	if($('#allotedmName').val() !=''){
		allotedmname = $('#allotedmName').val();
		var allotedfullnameuser = allotedfname.trim()+' '+allotedmname.trim()+' '+allotedlname.trim();
	}else{
		var allotedfullnameuser = allotedfname.trim()+' '+allotedlname.trim();
	}
	
	var jsonObj = new Object();
	jsonObj.un = fullnameuser;
	jsonObj.dp = department;
	jsonObj.dv = device;
	jsonObj.dt = date +' '+ time;
	jsonObj.cg = charger;
	jsonObj.cb = cable;
	jsonObj.al = allotedfullnameuser;
	
	if((window.localStorage) && window.localStorage != undefined && window.localStorage != ''){
		var id = Date.now();
		var outgoing = new Object();
		outgoing[id] = jsonObj;
		if(localStorage.getItem('outData') == null){
			localStorage.setItem('outData', JSON.stringify(outgoing));
		}else{
			appendDataToLocalStorage('outData', outgoing);
		}
		setTimeout(function(){
			$('#save-out').removeAttr('disabled').removeClass('disabled');
			$('#out-loader').addClass('displayNone').removeClass('displayInLineBlock');
			location.reload();
		}, 2000);
	}else{
		alert('Local Storage is not available for you Browser.');
	}
}

function checkSaveIncoming(){
	$('#in-loader').removeClass('displayNone').addClass('displayInLineBlock');
	$(this).attr('disabled','disabled').addClass('disabled');
	isError = false;
	$('#infName').blur();
	$('#inmName').blur();
	$('#inlName').blur();
	$('#indepartment').blur();
	$('#indate').blur();
	$('#intime').change();
	$('#indevice').blur();
	$("#inchargerYes, #inchargerNo").change();
	$("#incableYes, #incableNo").change();
	$('#inallotedfName').blur();
	$('#inallotedmName').blur();
	$('#inallotedlName').blur();
	
	if(isError==true){
		$('#save-in').removeAttr('disabled').removeClass('disabled');
		$('#in-loader').addClass('displayNone').removeClass('displayInLineBlock');
		return false; // Stop the control flow
	}
	var fname = $('#infName').val();
	var lname = $('#inlName').val();
	var mname = '';
	if($('#inmName').val() !=''){
		mname = $('#inmName').val();
		var fullnameuser = fname.trim()+' '+mname.trim()+' '+lname.trim();
	}else{
		var fullnameuser = fname.trim()+' '+lname.trim();
	}
	var department = $('#indepartment').val();
	var date = $('#indate').val();
	var time = $('#intime').val();
	var device = $('#indevice').val();
	if($('#inchargerYes').is(':checked')){
		var charger = 'Yes';
	}else if($('#inchargerNo').is(':checked')){
		var charger = 'No';
	}
	if($('#incableYes').is(':checked')){
		var cable = 'Yes';
	}else if($('#incableNo').is(':checked')){
		var cable = 'No';
	}
	var allotedfname = $('#inallotedfName').val();
	var allotedlname = $('#inallotedlName').val();
	var allotedmname = '';
	if($('#inallotedmName').val() !=''){
		allotedmname = $('#inallotedmName').val();
		var allotedfullnameuser = allotedfname.trim()+' '+allotedmname.trim()+' '+allotedlname.trim();
	}else{
		var allotedfullnameuser = allotedfname.trim()+' '+allotedlname.trim();
	}
	
	var jsonObjin = new Object();
	jsonObjin.un = fullnameuser;
	jsonObjin.dp = department;
	jsonObjin.dv = device;
	jsonObjin.dt = date +' '+ time;
	jsonObjin.cg = charger;
	jsonObjin.cb = cable;
	jsonObjin.al = allotedfullnameuser;
	
	if((window.localStorage) && window.localStorage != undefined && window.localStorage != ''){
		var id = Date.now();
		var outgoingin = new Object();
		outgoingin[id] = jsonObjin;
		if(localStorage.getItem('in') == null){
			localStorage.setItem('in', JSON.stringify(outgoingin));
		}else{
			appendDataToLocalStorage('in', outgoingin);
		}
		setTimeout(function(){
			$('#save-in').removeAttr('disabled').removeClass('disabled');
			$('#in-loader').addClass('displayNone').removeClass('displayInLineBlock');
			location.reload();
		}, 2000);
	}else{
		alert('Local Storage is not available for you Browser.');
	}
}

function showOutgoingData(){
	$("#downloadin").addClass('displayNone');
	$("#downloadout").addClass('displayNone');
	var typedashboard = $('#typedashboard').val();
	if(typedashboard == 'in'){
		var metadata = [];
		metadata.push({ name: "al", label: "Received By", datatype: "string", editable: false});
		metadata.push({ name: "dv", label: "Device", datatype: "string", editable: false});
		metadata.push({ name: "cb", label: "Cable", datatype: "string", editable: false});
		metadata.push({ name: "cg", label: "Charger", datatype: "string", editable: false});
		metadata.push({ name: "un", label: "User Name", datatype: "string", editable: false});
		metadata.push({ name: "dp", label: "Department", datatype: "string", editable: false});
		metadata.push({ name: "dt", label: "Date and Time", datatype: "string", editable: false});
		
		var data = [];
		if(localStorage.getItem('in')!= null){
			$("#downloadin").addClass('displayBlock').removeClass('displayNone');
			var i = 0;
			var lsData = JSON.parse(localStorage.getItem('in'));
			for(var l in lsData){
				data[i] = {"id": i+1, "values":lsData[l]};
				i++;
			}
		}
		editableGrid = new EditableGrid("DemoGridJsData");
		editableGrid.load({"metadata": metadata, "data": data});
		editableGrid.renderGrid("tablecontent", "testgrid");
	}else if(typedashboard =='out'){
		var metadata = [];
		metadata.push({ name: "un", label: "User Name", datatype: "string", editable: false});
		metadata.push({ name: "dp", label: "Department", datatype: "string", editable: false});
		metadata.push({ name: "dv", label: "Device", datatype: "string", editable: false});
		metadata.push({ name: "dt", label: "Date and Time", datatype: "string", editable: false});
		metadata.push({ name: "cb", label: "Cable", datatype: "string", editable: false});
		metadata.push({ name: "cg", label: "Charger", datatype: "string", editable: false});
		metadata.push({ name: "al", label: "Allotted By", datatype: "string", editable: false});
		var data = [];
		if(localStorage.getItem('outData')!= null){
			$("#downloadout").addClass('displayBlock').removeClass('displayNone');
			var i = 0;
			var lsData = JSON.parse(localStorage.getItem('outData'));
			for(var l in lsData){
				data[i] = {"id": i+1, "values":lsData[l]};
				i++;
			}
		}
		editableGrid = new EditableGrid("DemoGridJsData");
		editableGrid.load({"metadata": metadata, "data": data});
		editableGrid.renderGrid("tablecontent", "testgrid");
	}else{
		// do nothing
	}
}

function JSON2CSV(objArray, src) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';
    var line = '';
    if(src == 'in'){
    	line = '"User Name","Department","Device","Date & Time","Charger","Cable","Received By"';
    }else{
    	line = '"User Name","Department","Device","Date & Time","Charger","Cable","Allocated By"';
    }
    str += line + '\r\n';
    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            var value = array[i][index] + "";
            line += '"' + value.replace(/"/g, '""') + '",';
        }
        line = line.slice(0, -1);
        str += line + '\r\n';
    }
    return str;
}


$(document).ready(function() {
	bindTabsClickFunction();
	
	$('#fName').blur(function(e){
		checkforValidation(e.target.id, 1, 1, 30, 1, '', true);
	});
	$('#mName').blur(function(e){
		checkforValidation(e.target.id, 1, 0, 30, 0, '', true);
	});
	$('#lName').blur(function(e){
		checkforValidation(e.target.id, 1, 1, 30, 1, '', true);
	});
	$('#department').blur(function(e){
		checkforValidation(e.target.id, 1, 2, 20, 1, '', true);
	});
	$('#department').change(function(e){
		checkforValidation(e.target.id, 1, 2, 20, 1, '', true);
	});
	$('#date').blur(function(e){
		checkforValidation(e.target.id, 5, 1, 10, 1, '', true);
	});
	$('#time').change(function(e){
		checkforValidation(e.target.id, 7, 1, 8, 1, '', true);
	});
	$('#device').change(function(e){
		checkforValidation(e.target.id, 1, 2, 20, 1, '', true);
	});
	$('#device').blur(function(e){
		checkforValidation(e.target.id, 1, 2, 20, 1, '', true);
	});
	$("#chargerYes, #chargerNo").change(function () {
		checkforValidation('charger', 8, 1, 30, 1, '', true);
	});
	$("#chargerYes, #chargerNo").blur(function () {
		checkforValidation('charger', 8, 1, 30, 1, '', true);
	});
	$("#cableYes, #cableNo").change(function () {
		checkforValidation('cable', 8, 1, 30, 1, '', true);
	});
	$("#cableYes, #cableNo").blur(function () {
		checkforValidation('cable', 8, 1, 30, 1, '', true);
	});
	$('#allotedfName').blur(function(e){
		checkforValidation(e.target.id, 1, 1, 30, 1, '', true);
	});
	$('#allotedmName').blur(function(e){
		checkforValidation(e.target.id, 1, 0, 30, 0, '', true);
	});
	$('#allotedlName').blur(function(e){
		checkforValidation(e.target.id, 1, 1, 30, 1, '', true);
	});
	$('#save-out').click(checkSaveOutgoing);
	$('#cancel-out').click(function(){
		location.reload();
	});
	
	
	$('#infName').blur(function(e){
		checkforValidation(e.target.id, 1, 1, 30, 1, '', true);
	});
	$('#inmName').blur(function(e){
		checkforValidation(e.target.id, 1, 0, 30, 0, '', true);
	});
	$('#inlName').blur(function(e){
		checkforValidation(e.target.id, 1, 1, 30, 1, '', true);
	});
	$('#indepartment').blur(function(e){
		checkforValidation(e.target.id, 1, 2, 20, 1, '', true);
	});
	$('#indepartment').change(function(e){
		checkforValidation(e.target.id, 1, 2, 20, 1, '', true);
	});
	$('#indate').blur(function(e){
		checkforValidation(e.target.id, 5, 1, 10, 1, '', true);
	});
	$('#intime').change(function(e){
		checkforValidation(e.target.id, 7, 1, 8, 1, '', true);
	});
	$('#indevice').change(function(e){
		checkforValidation(e.target.id, 1, 2, 20, 1, '', true);
	});
	$('#indevice').blur(function(e){
		checkforValidation(e.target.id, 1, 2, 20, 1, '', true);
	});
	$("#inchargerYes, #inchargerNo").change(function () {
		checkforValidation('incharger', 8, 1, 30, 1, '', true);
	});
	$("#inchargerYes, #inchargerNo").blur(function () {
		checkforValidation('incharger', 8, 1, 30, 1, '', true);
	});
	$("#incableYes, #incableNo").change(function () {
		checkforValidation('incable', 8, 1, 30, 1, '', true);
	});
	$("#incableYes, #incableNo").blur(function () {
		checkforValidation('incable', 8, 1, 30, 1, '', true);
	});
	$('#inallotedfName').blur(function(e){
		checkforValidation(e.target.id, 1, 1, 30, 1, '', true);
	});
	$('#inallotedmName').blur(function(e){
		checkforValidation(e.target.id, 1, 0, 30, 0, '', true);
	});
	$('#inallotedlName').blur(function(e){
		checkforValidation(e.target.id, 1, 1, 30, 1, '', true);
	});
	
	$('#save-in').click(checkSaveIncoming);
	$('#cancel-in').click(function(){
		location.reload();
	});
	
	$(function(){
	    $('#time').mobiscroll().time({
	        theme: 'android-ics light',
	        display: 'modal',
	        mode: 'scroller'
	    });    
	    $('#time').click(function(){
	    	$('#time').mobiscroll('show');
	    })
	    
	});
	$(function(){
	    $('#intime').mobiscroll().time({
	        theme: 'android-ics light',
	        display: 'modal',
	        mode: 'scroller'
	    });    
	    $('#intime').click(function(){
	    	$('#intime').mobiscroll('show');
	    })
	    
	});
	
	$('#typedashboard').change(showOutgoingData);
	$('#typedashboard').change();
	
	$("#downloadin").click(function() {
	    var json = JSON.parse(localStorage.getItem('in'));
	    var data = [];
		var i = 0;
		for(var l in json){
			data[i] = json[l];
			i++;
		}
	    var csv = JSON2CSV(data, 'in');
	    window.open("data:text/csv;charset=utf-8," + escape(csv));
	});
	$("#downloadout").click(function() {
	    var json = JSON.parse(localStorage.getItem('outData'));
	    var data = [];
		var i = 0;
		for(var l in json){
			data[i] = json[l];
			i++;
		}
	    var csv = JSON2CSV(data, 'out');
	    window.open("data:text/csv;charset=utf-8," + escape(csv));
	});
	
});