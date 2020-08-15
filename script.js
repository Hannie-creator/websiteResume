/*
    This is the javascript for the index.html file.
    This javasript is for the displaying of the contents of the website resume.
    Author: Hannah Chen
    Submitted on: August 14,2020
*/
var firebaseConfig = {
    apiKey: "AIzaSyCip2ZKxH6JvwQetkGjOzwVdnTRvcK2Xfc",
    authDomain: "ccapdev-website-resume.firebaseapp.com",
    databaseURL: "https://ccapdev-website-resume.firebaseio.com",
    projectId: "ccapdev-website-resume",
    storageBucket: "ccapdev-website-resume.appspot.com",
    messagingSenderId: "561383675031",
    appId: "1:561383675031:web:e8a55987d155fa9f5905d2"
};
// Initialize Firebase
var defaultProject = firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

/*collapse navigation bar*/
$('.navbar-collapse a').click(function () {
    $(".navbar-collapse").collapse('hide');
});

var dbabout = db.collection("others").doc("intro");
var aboutme = '';
//read data
dbabout.get().then(function (doc) {
    if (doc.exists) {
        aboutme += '<p>' + doc.data().value + '</p>';
        $('#about-content').append(aboutme);
    } else {
        console.log("No such document");
    }
});

/*read from firebase and display hobbies*/
var myHobby = '';
//read data
db.collection("hobbies").orderBy("name", "asc").get().then(function (snapshot) {
    snapshot.forEach(function (doc) {
        myHobby += '<div><p>' + doc.data().name + '</p></div>';
    })
    $('#hobby-content').append(myHobby);
});

/*read from firebase and display educations*/
var myEducation = '';
//read data
db.collection("educations").orderBy("year_start", "desc").get().then(function (snapshot) {
    myEducation += '</br>';
    snapshot.forEach(function (doc) {
        myEducation += '<div class="edu-divided-div">';
        myEducation += '<p class="bold">' + doc.data().school + '</p>';
        myEducation += '<p class="normal">' + doc.data().degree + '</p>';
        myEducation += '<p class="center">' + doc.data().year_start + '-' + doc.data().year_end + '</p>';
        myEducation += '</div>';
    })
    $('#education-content').append(myEducation);
});

/*read from firebase and display organizations*/
var myOrganization = '';
//read data
db.collection("organizations").orderBy("year_start", "desc").get().then(function (snapshot) {
    myOrganization += '</br>';
    snapshot.forEach(function (doc) {
        myOrganization += '<div class="edu-divided-div">';
        myOrganization += '<p class="bold">' + doc.data().name + '</p>';
        myOrganization += '<p class="normal">' + doc.data().position + '</p>';
        myOrganization += '<p class="center">' + doc.data().year_start + '-' + doc.data().year_end + '</p>';
        myOrganization += '</div>';
    })
    $('#organization-content').append(myOrganization);
});

/*read from firebase and display work*/
var myWork = '';
//read data
db.collection("works").orderBy("year_start", "desc").get().then(function (snapshot) {
    myEducation += '</br>';
    snapshot.forEach(function (doc) {
        myWork += '<div class="edu-divided-div">';
        myWork += '<p class="bold">' + doc.data().name + '</p>';
        myWork += '<p class="normal">' + doc.data().lab + '</p>';
        myWork += '<p class="center">' + doc.data().year_start + '-' + doc.data().year_end + '</p>';
        myWork += '</div>';
    })
    $('#work-content').append(myWork);
});

/*read from firebase and display links*/
var dblinks = db.collection("others").doc("link");

var myTwitter = '';
var myLinkedin = '';
var myGithub = '';

var displayTwitter = '';
var displayLinkedin = '';
var displayGithub = '';
//read data
dblinks.get().then(function (doc) {
    if (doc.exists) {
        myTwitter += doc.data().twitter;
        myLinkedin += doc.data().linkedin;
        myGithub += doc.data().github;

        displayTwitter += '<p class="displayTwit">' + myTwitter + '</p>';
        displayLinkedin += '<p class="displayLinked">' + myLinkedin + '</p>';
        displayGithub += '<p class="displayGit">' + myGithub + '</p>';

        $('#twitter').append(displayTwitter);
        $('#linkedin').append(displayLinkedin);
        $('#github').append(displayGithub);
    } else {
        console.log("No such document");
    }
});

/*direct user to the twitter link if twitter is clicked*/
var twitters = document.getElementById("twitter");
twitters.onclick = function (event) {
    window.open(myTwitter).href;
}

/*direct user to the linked in link if linked in is clicked*/
var linkedins = document.getElementById("linkedin");
linkedins.onclick = function (event) {
    window.open(myLinkedin).href;
}

/*direct user to the github link if github is clicked*/
var githubs = document.getElementById("github");
githubs.onclick = function (event) {
    window.open(myGithub).href;
}
