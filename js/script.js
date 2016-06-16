var genParamString = function(paramObject) {
    var outputString = '?'
    for (var key in paramObject) {
     	outputString += key + '=' + paramObject[key] + '&'
    }
    return outputString.substr(0,outputString.length - 1)
}
try {
	var token = GLOBAL_TOKEN
}
catch (e) {
	var token = ''
}
console.log('token>>>' + token)
var urlRepos = 'https://api.github.com/users/mundtp/repos',
	urlProfile = 'https://api.github.com/users/mundtp'
 	params = {
	access_token: token
}
var promiseProfile = $.getJSON(urlProfile + genParamString(params)),
	promiseRepos = $.getJSON(urlRepos + genParamString(params))


var profileDataHandler = function(responseObject){
	console.log(responseObject)
	var htmlCard = ''
	var profileObject = responseObject,
		avatarUrl = profileObject.avatar_url
		fullName = profileObject.name,
		login = profileObject.login,
		myLocation = profileObject.location
		email = profileObject.email
		created = profileObject.created_at,
	    year = created.slice(0,4),
	    month = parseInt(created.slice(5,7)),
    	day = parseInt(created.slice(8,10)),
	    monthList = ["blank","January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],


	htmlCard += '<img class="profile" src="' + avatarUrl + '"></img>'
	htmlCard += '<h2 class="fullName">' + fullName + '</h2>'
	htmlCard += '<p class="login">' + login + '</p>'
	htmlCard += '<p class="location">' + myLocation + '</p>'
	htmlCard += '<p class="email">' + email + '</p>'
	htmlCard += '<p class="joinDate">' + "Joined on " + monthList[month] + " " + day + ", " + year + '</p>'
	htmlCard += '</div'
	var followersBar = '<div><div class="followersBar">'
		followersBar += '<div><h2 class="noMarginBottom">0</h3><p class="noMarginTop">Followers</p></div>'
		followersBar += '<div><h2 class="noMarginBottom">0</h3><p class="noMarginTop">Starred</p></div>'
		followersBar += '<div><h2 class="noMarginBottom">0</h3><p class="noMarginTop">Following</p></div>'
		followersBar += '</div></div>'



	var leftContainer = document.querySelector('#leftCol')
	leftContainer.innerHTML = htmlCard + followersBar
}

var repoDataHandler = function(responseObject){
	console.log(responseObject)
	var htmlCard = '<h4>Respositories</h4>'
	htmlCard += '<input class="searchBox" type="text"	placeholder="Find a respository...">'
		for(var i = 0;i<responseObject.length;i++){
				var repoObject = responseObject[i],
					repoName = repoObject.name,
					description = repoObject.description,
					updated = repoObject.updated_at,
					date = new Date(),
					dateStr = date.toString(),
					updatedDay = updated.slice(8,10),
					dateStrDay = dateStr.slice(8,10),
					difference = dateStrDay - updatedDay
					if(difference < 0){
						difference = 30 + difference
					}
					lastUpdated = "Updated " + difference + " days ago"
					if(difference === 1){
						lastUpdated = "Updated " + difference + " day ago"
					}
					console.log(updated)




					if(!description){
					description = ''
					}
				htmlCard += '<div class="repoCard">'
				htmlCard += '<h3 class="repoName">' + repoName + '</h3>'
				htmlCard += '<p class="description">' + description + '</p>'
				htmlCard += '<p class="updated">' + lastUpdated + '</p>'
		}
	var rightContainer = document.querySelector('#rightCol')
	rightContainer.innerHTML = htmlCard
}

promiseRepos.then(repoDataHandler)
promiseProfile.then(profileDataHandler)
