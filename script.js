
fetch('https://api.nasa.gov/planetary/apod?api_key=IdALozQrBg0Hu6viF8JSw56tneremp21kEJRsEpc&date&thumbs=True')

	.then(function(response){
		return response.json()
	})
	.then(function (imageData){
		console.log(imageData)

		if (imageData.media_type === 'video'){
			document.querySelector('img').setAttribute('src',imageData.thumbnail_url)
		} else {
			document.querySelector('img').setAttribute('src',imageData.url)
		}
	})
const STORAGE_KEY = "TIME_KEY"

const $settings = document.getElementById('settings')
const $more = document.getElementById('more')

const $rightPanel = document.getElementById('rightPanel')
const $bottomPanel = document.getElementById('bottomPanel')

const $HourSelector = document.getElementById('hourRadio')
const $secondSelector = document.getElementById('secRadio')
const $DateSelector = document.getElementById('dateRadio')

const $greeting = document.getElementById("greeting")
const $timeDisplay = document.getElementById("time")
const $dayOfWeek = document.getElementById("dayOfWeek")
const $dayOfMonth = document.getElementById("dayOfMonth")

let settingsObj = {}

if(getFromStorage()){
	settingsObj = JSON.parse(getFromStorage())
}else{
	settingsObj.hour = true
	settingsObj.sec = true
	settingsObj.date = true
}

$HourSelector.addEventListener('change', function(e){
	settingsObj.hour = e.target.value == "true"
	setInStorage()
})

$secondSelector.addEventListener('change', function(e){
	settingsObj.sec = e.target.value == "true"
	setInStorage()
})

$DateSelector.addEventListener('change', function(e){
	settingsObj.date = e.target.value == "true"
	setInStorage()
})

function getZeroAddedTime(value){
	if (value == 0){
		return "12"
	}else if(value < 10){
		return "0" + value
	}else{
		return value
	}
}

function getTime(){
	const dateObj = new Date()
	let timeValue
	let isAM = true
	if(true == settingsObj.hour){
		timeValue = getZeroAddedTime(dateObj.getHours())
	}else{ 
		let hour = dateObj.getHours()
		if(hour > 12){
			isAM = false
			hour = hour - 12
			
			timeValue = getZeroAddedTime(hour)			
		}else{
			timeValue = getZeroAddedTime(hour)						
		}
	}
	timeValue = timeValue + ":"

	timeValue = timeValue + getZeroAddedTime(dateObj.getMinutes())


	if(true == settingsObj.sec){
		timeValue = timeValue + ":"
		timeValue = timeValue + getZeroAddedTime(dateObj.getSeconds())
	}

	if(false == settingsObj.hour){
		if(isAM){
			timeValue = timeValue + " " + "AM"
		}else{
			timeValue = timeValue + " " + "PM"
		}
	}

	if(true == settingsObj.date){
		timeValue = timeValue + " " + convertIntMonthToMonth(dateObj.getMonth()) + " " + dateObj.getDate() + " " + dateObj.getFullYear()
	}

	$dayOfWeek.innerHTML = convertIntDayIntoDay(dateObj.getDay())
	$dayOfMonth.innerHTML = dateObj.getDate()
	$greeting.innerHTML = convertGreeting(dateObj.getHours())
	return timeValue
}

function convertGreeting(hour){
	if(hour >=0 && hour < 12){
		return "Good Morning"
	}else if(hour >=12 && hour < 16){
		return "Good Afternoon"
	}else if(hour >=16 && hour < 20 ){
		return "Good Evening"
	}else if(hour >=20 && hour < 24){
		return "Good Night"
	}
}

function convertIntMonthToMonth(intMonth){
	if(intMonth == 0){
		return "January"
	}else if(intMonth == 1){
		return "February"
	}else if(intMonth == 2){
		return "March"
	}else if(intMonth == 3){
		return "April"
	}else if(intMonth == 4){
		return "May"
	}else if(intMonth == 5){
		return "June"
	}else if(intMonth == 6){
		return "July"
	}else if(intMonth == 7){
		return "August"
	}else if(intMonth == 8){
		return "September"
	}else if(intMonth == 9){
		return "October"
	}else if(intMonth == 10){
		return "November"
	}else if(intMonth == 11){
		return December
	}
}

function convertIntDayIntoDay(day){
	if(day == 0){
		return "Sunday"
	}else if(day == 1){
		return "Monday"
	}else if(day == 2){
		return "Tuesday"
	}else if(day == 3){
		return "Wednesday"
	}else if(day == 4){
		return "Thursday"
	}else if(day == 5){
		return "Friday"
	}else if(day == 6){
		return "Saturday"
	}
}

$(document).ready(function(){
	$("#settings").click(function(){
		$(".rightPanel").animate({
			width:"toggle"
		})
	})
	$(".btn-light").click(function(){
		$(".bottom").slideToggle()
	})

	if(settingsObj.hour == true){
		$($HourSelector).children("input[value='true']").attr('checked', 'checked')
	}else{
		$($HourSelector).children("input[value='false']").attr('checked', 'checked')
	}
	if(settingsObj.sec == true){
		$($secondSelector).children("input[value='true']").attr('checked', 'checked')
	}else{
		$($secondSelector).children("input[value='false']").attr('checked', 'checked')		
	}
	if(settingsObj.date == true){
		$DateSelector
		$($DateSelector).children("input[value='true']").attr('checked', 'checked')
	}else{
		$($DateSelector).children("input[value='false']").attr('checked', 'checked')		
	}

	setInterval(function(){
		updateTimerDisplay(getTime())
	}, 500)

})

function updateTimerDisplay(value){
	$timeDisplay.innerHTML = value
}

function getFromStorage(){
	return localStorage.getItem(STORAGE_KEY)
}

function setInStorage(){
	const storageObj = settingsObj
	localStorage.setItem(STORAGE_KEY, JSON.stringify(storageObj))
}

