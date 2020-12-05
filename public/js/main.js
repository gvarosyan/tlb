function handleLocationChange() {
	if (document.getElementById('selected-location').value == "Other") {
		document.getElementById('otherLocationBox').style.display = "block";
	} else {
		document.getElementById('otherLocationBox').style.display = "none";
		document.getElementById('other-location').value = ""
	}
}
function handleDeliveryChange() {
	if(document.getElementById('howWillYouDonate').value=="Other") {
		document.getElementById('other-delivery').style.display="block";
	} else{
		document.getElementById('other-delivery').style.display="none";
		document.getElementById('howElsewillYouDonate').value=""
	}
}
function handleItemChange(){
	if(document.getElementById('checkboxOther').checked == true) {
		document.getElementById("OtherItemBox").style.display='block';
	} else { 
		document.getElementById("OtherItemBox").style.display='none';
		document.getElementById('OtherItems').value=""
	}
	

}
function loadExistingData() {
	donationInfo = JSON.parse(window.localStorage.getItem("donationInfo"));
	if (donationInfo && donationInfo.length > 0) {
		donationInfo = donationInfo[0]
		document.getElementById('fname').value = donationInfo.firstName;
		document.getElementById('lname').value = donationInfo.lastName;
		document.getElementById('email').value = donationInfo.email;
		document.getElementById('phonenumber').value = donationInfo.phone;
		
		var selectableLocationOptions = document.getElementsByClassName("location");
		var selectableLocationNames = []

		for (var i = 0; i < selectableLocationOptions.length; i++) {
			var locationName = selectableLocationOptions[i].value;
			if (locationName != "Other") {
				selectableLocationNames.push(locationName)
			}
		}

		if (selectableLocationNames.includes(donationInfo.location)) {
			document.getElementById('selected-location').value = donationInfo.location;
		} else {
			document.getElementById('selected-location').value = "Other";
			document.getElementById('other-location').value = donationInfo.location;
		}

		handleLocationChange()


		var selectableDeliveryOptions=document.getElementById("howWillYouDonate").children;
		var selectableDelivery =[]

		for(var k=0; k< selectableDeliveryOptions.length; k++){
			var deliveryWay=selectableDeliveryOptions[k].value;
			if (deliveryWay != "Other"){
				selectableDelivery.push(deliveryWay)
			}
		}
		if(selectableDelivery.includes(donationInfo.deliveryMethod)){
			document.getElementById('howWillYouDonate').value=donationInfo.deliveryMethod
		}else{
			document.getElementById('howWillYouDonate').value="Other";
			document.getElementById('howElsewillYouDonate').value=donationInfo.deliveryMethod
		}
		handleDeliveryChange()


		var checkbox = document.getElementsByClassName("checkboxlist");
		for (var i = 0; i < checkbox.length; i++) {
			if( donationInfo.items.includes(checkbox[i].value)){
				checkbox[i].checked = true
				var index = donationInfo.items.indexOf(checkbox[i].value)
				donationInfo.items.splice(index, 0);
				console.log(donationInfo.items)
			}
		}

		handleItemChange()

	}
}


function checkFunction() {
	var donationInfo = {
		"firstName" : "",
		"lastName" : "",
		"email" : "",
		"phone" : "",
		"location" : "",
		"items" : [],
		"deliveryMethod" : "",
		"hasShelter" : false 
	}	

	var fname = document.getElementById('fname').value;
	donationInfo.firstName = fname;

	var lname = document.getElementById('lname').value;
	donationInfo.lastName = lname;

	var email = document.getElementById('email').value;
	donationInfo.email = email; 

	var phoneNumber = document.getElementById('phonenumber').value;
	donationInfo.phone = phoneNumber;

	var location = document.getElementById('selected-location').value;
	donationInfo.location = location; 

	var otherLocation = document.getElementById('other-location').value;
	if (location == "Other" && otherLocation != "") {
		donationInfo.location = otherLocation
	}

	var checkbox = document.getElementsByClassName("checkboxlist");
	var allCheckedItems =[];
	for (var i = 0; i < checkbox.length; i++) {
		if( checkbox[i].checked == true){
			if (checkbox[i].value == "Other") {
				donationInfo.otherItems = document.getElementById('OtherItems').value;
			} else {
				allCheckedItems.push(checkbox[i].value);
			}
		}
	}
	donationInfo.items = allCheckedItems;


	var howWillYouDonate = document.getElementById('howWillYouDonate').value;
	donationInfo.deliveryMethod = howWillYouDonate;

	var howElsewillYouDonate = document.getElementById('howElsewillYouDonate').value;
	if (howWillYouDonate == "Other" && howElsewillYouDonate != "") {
		donationInfo.deliveryMethod = howElsewillYouDonate
	}

	var shelterForPeople = document.getElementById('ShelterForPeople').value;
	donationInfo.hasShelter = shelterForPeople;

	var donations = JSON.parse(window.localStorage.getItem("donationInfo"));
	if (!donations) {
		donations = []		
	}

	var formValid = true;

	if (donationInfo.firstName == "") {
		console.log("The name cannot be empty");
		document.getElementById("fname_error").style.display = "block";
		document.getElementById("fname").style.backgroundColor= '#efbbcc';
		formValid = false;
	} else {
		document.getElementById("fname_error").style.display = "none";
		document.getElementById("fname").style.backgroundColor= '#fff';
	}

	if (donationInfo.lastName == "") {
		console.log("The Surname cannot be empty");
		document.getElementById("lname_error").style.display = "block";
		document.getElementById("lname").style.backgroundColor= '#efbbcc';
		formValid = false;
	} else {
		document.getElementById("lname_error").style.display = "none";
		document.getElementById("lname").style.backgroundColor= '#fff';
	}

	if (donationInfo.email == "") {
		console.log("The email cannot be empty");
		document.getElementById("email_error").style.display = "block";
		document.getElementById("email").style.backgroundColor= '#efbbcc';
		formValid = false;
	} else {
		document.getElementById("email_error").style.display = "none";
		document.getElementById("email").style.backgroundColor= '#fff';
	}

	if(donationInfo.phone == "") {
		console.log("The phonenumber cannot be empty");
		document.getElementById("phone_error").style.display = "block";
		document.getElementById("phonenumber").style.backgroundColor= '#efbbcc';
		formValid = false;
	} else {
		document.getElementById("phone_error").style.display = "none";
		document.getElementById("phonenumber").style.backgroundColor= '#fff';
	}

	if (formValid == true) {
		donations.push(donationInfo);
		window.localStorage.setItem("donationInfo", JSON.stringify(donations));
		window.location.href = "thanks.html"
	}
}

function handleInputValidation(e, errorMessageBoxID) {
	console.log(e.target.value);
	if (e.target.value == "") {
		document.getElementById(errorMessageBoxID).style.display = "block";
		e.target.style.backgroundColor= '#efbbcc';
		formValid = false;
	} else {
		document.getElementById(errorMessageBoxID).style.display = "none";
		e.target.style.backgroundColor= '#fff';
	}
}


//Admin Code

function editListing() {

}

function acceptListing() {

}

function rejectListing(index) {
	var donations = getDonationInfo();
	donations.splice(index, 1);
	localStorage.setItem('donationInfo', JSON.stringify(donations));
	console.log('Deleted item at index ' + i);
}

function loadExistingDonations() {
	var donations = JSON.parse(window.localStorage.getItem("donationInfo"));
	for (var i = 0; i < donations.length; i++) {
		if (donations[i].firstName !="") {
			document.getElementById("donationsList").innerHTML += "<li onclick='showDonationInfo(event)'><div>" + donations[i].firstName + " " + donations[i].lastName + "</div><div class='donationDetails'>" + getDonationInfo(donations[i], i) + "</div></li>";
		}
	}
}

function getDonationInfo(item, index) {
	console.log(item);
	console.log(i);
	var innerHTML = "<span class='phone'><span class='fieldTitle'>Phone: </span>" + item.phone + "</span><br>";
	innerHTML += "<span class= 'email'><span class='fieldTitle'>EMAIL: </span>" + item.email + "</span><br>";
	innerHTML += "<span class= 'location'><span class='fieldTitle'>Location: </span>" + item.location + "</span><br>";
	innerHTML += "<span class= 'checkboxItems'><span class='fieldTitle'>Items: </span>" + item.items + "</span><br>";
	innerHTML += "<span class= 'checkboxItems'><span class='fieldTitle'>Other Items: </span>" + (item.otherItems ? item.otherItems : "") + "</span><br>";
	innerHTML += "<span class= 'checkboxItems'><span class='fieldTitle'>Delivery Method: </span>" + item.deliveryMethod + "</span><br>";
	innerHTML += "<span class= 'hasShelter'><span class='fieldTitle'>Provide shelter: </span>" + item.hasShelter + "</span><br>";
	innerHTML += "<span class= 'edit'><span class='fieldTitle'><a onclick='editListing()'>Edit</a></span></span><br>";
	innerHTML += "<span class= 'accept'><span class='fieldTitle'><a onclick='acceptListing()'>Accept</a></span></span><br>";
	innerHTML += "<span class= 'reject'><span class='fieldTitle'><button type='button' onclick='rejectListing(" + index + ")'>Reject</button></span></span><br>";
	return innerHTML;
}

function showDonationInfo(e) {
	if (e.currentTarget.children[1].style.display == "block") {
		e.currentTarget.children[1].style.display = "none";
	} else {
		e.currentTarget.children[1].style.display = "block";
	}
}

function showAll() {
	var donationInfoBoxes = document.getElementsByClassName("donationDetails");
	for (var i = 0; i < donationInfoBoxes.length; i++) {
		donationInfoBoxes[i].style.display = "block";
	}
}

function hideAll() {
	var donationInfoBoxes = document.getElementsByClassName("donationDetails");
	for (var i = 0; i < donationInfoBoxes.length; i++) {
		donationInfoBoxes[i].style.display = "none";
	}	
}


