/*
    This is the javascript for the edit.html file.
    This javasript is for the editing of the website resume.
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
/*
    This is the user login function, it authenticates the user and lets the user to edit the ontents of the website resume if the authentication is successful.
*/
function loginFunction() {
    /*Get user inputted username and password.*/
    var email = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    /*Authenticate user informations on firebase*/
    firebase.auth().signInWithEmailAndPassword(email, password).then(function (user) {
        //now that user is signed in, try to get information about the use
        var user = firebase.auth().currentUser;
        if (user != null) {
            alert("The user signing in is: " + user.email);

            /*The following pages will be hide / shown if authentication is sucessful.*/
            $(".login-container").hide();
            $(".container-content").show();
            $("nav").show();
            $("footer").show();

            /*reads from firebase and displays the self-introductory message.*/
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

            /*reads from firebase and displays the hobbies*/
            var myHobby = '';
            //read data
            db.collection("hobbies").get().then(function (snapshot) {
                snapshot.forEach(function (doc) {
                    myHobby += '<div><p>' + doc.data().name + '</p></div>';
                })
                $('#hobby-content').append(myHobby);
            });

            /*reads from firebase and displays the educational backgrounds*/
            var myEducation = '';
            //read data
            db.collection("educations").get().then(function (snapshot) {
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

            /*reads from firebase and displays the organizations*/
            var myOrganization = '';
            //read data
            db.collection("organizations").get().then(function (snapshot) {
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

            /*reads from firebase and displays the work histories*/
            var myWork = '';
            //read data
            db.collection("works").get().then(function (snapshot) {
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

            /*reads from firebase and displays the links addresses*/
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

            /*if twitter is clicked, diret user to twitter (this is done in a new window)*/
            var twitters = document.getElementById("twitter");
            twitters.onclick = function (event) {
                window.open(myTwitter).href;
            }

            /*if linkedin is clicked, diret user to linkedin (this is done in a new window)*/
            var linkedins = document.getElementById("linkedin");
            linkedins.onclick = function (event) {
                window.open(myLinkedin).href;
            }

            /*if github is clicked, diret user to github (this is done in a new window)*/
            var githubs = document.getElementById("github");
            githubs.onclick = function (event) {
                window.open(myGithub).href;
            }

        }
    }).catch(function (err) {
        if (err.code == "auth/wrong-password") {
            alert("You have entered the wrong password!")
            $("#password").val("");
        } else {
            alert(err.message);
            $("#username").val("");
            $("#password").val("");
        }
    });
}

/*update introdutory message*/
function updateIntroFunction() {
    var intro = document.getElementById("updatedIntro").value;

    var obj = JSON.parse('{ "value":"' + intro + '"}');
    var dbabout = db.collection("others").doc("intro");
    //adding
    dbabout.set(obj).then(function (doc) {
        alert("Introduction message updated!");

        /*show/hide these pages if introduction is sucessfully updated*/
        $("#updatedIntro").val("");
        $(".update-intro-container").hide();
        $(".add-hobby-container").hide();
        $(".delete-hobby-container").hide();
        $(".add-education-container").hide();
        $(".delete-education-container").hide();
        $(".add-organization-container").hide();
        $(".delete-organization-container").hide();
        $(".add-work-container").hide();
        $(".delete-work-container").hide();
        $(".choose-link-container").hide();
        $(".update-twitter-container").hide();
        $(".update-linkedin-container").hide();
        $(".update-github-container").hide();

        /*reload and display the new introductory message*/
        var dbabout = db.collection("others").doc("intro");
        var aboutme = '';
        //read data
        dbabout.get().then(function (doc) {
            if (doc.exists) {
                aboutme += '<p>' + doc.data().value + '</p>';
                $('#about-content>p').detach();
                $('#about-content').append(aboutme);
            } else {
                console.log("No such document");
            }
        });

        $("nav").show();
        $(".container-content").show();
        $("footer").show();
    });
}

/*add hobby function*/
function addHobbyFunction() {
    var hobby = document.getElementById("hobbyname").value;
    var obj = JSON.parse('{ "name":"' + hobby + '"}');
    //adding
    db.collection("hobbies").add(obj).then(function (doc) {
        alert("Item added with the uid: " + doc.id);

        /*show or hide the folliwing pages if item is successfully added*/
        $("#hobbyname").val("");
        $(".add-hobby-container").hide();
        $(".update-intro-container").hide();
        $(".delete-hobby-container").hide();
        $(".add-education-container").hide();
        $(".delete-education-container").hide();
        $(".add-organization-container").hide();
        $(".delete-organization-container").hide();
        $(".add-work-container").hide();
        $(".delete-work-container").hide();
        $(".choose-link-container").hide();
        $(".update-twitter-container").hide();
        $(".update-linkedin-container").hide();
        $(".update-github-container").hide();
        var myHobby = '';
        //read data
        db.collection("hobbies").get().then(function (snapshot) {
            snapshot.forEach(function (doc) {
                myHobby += '<div><p>' + doc.data().name + '</p></div>';
            })
            $('#hobby-content>div').detach();
            $('#hobby-content').append(myHobby);
        });
        $("nav").show();
        $(".container-content").show();
        $("footer").show();
    });
}

/*delete a hobby*/
function deleteHobbyFunction() {
    var hobby = document.getElementById("hobbyID").value;

    db.collection("hobbies").doc(hobby).delete().then(function (doc) {
        alert("Item deleted: " + hobby);

        /*show or hide the following pages if hobby is successfully deleted*/
        $("#hobbyID").val("");
        $(".add-hobby-container").hide();
        $(".update-intro-container").hide();
        $(".delete-hobby-container").hide();
        $(".add-education-container").hide();
        $(".delete-education-container").hide();
        $(".add-organization-container").hide();
        $(".delete-organization-container").hide();
        $(".add-work-container").hide();
        $(".delete-work-container").hide();
        $(".choose-link-container").hide();
        $(".update-twitter-container").hide();
        $(".update-linkedin-container").hide();
        $(".update-github-container").hide();

        /*display the current list of hobbies*/
        var myHobby = '';
        //read data
        db.collection("hobbies").get().then(function (snapshot) {
            snapshot.forEach(function (doc) {
                myHobby += '<div><p>' + doc.data().name + '</p></div>';
            })
            $('#hobby-content>div').detach();
            $('#hobby-content').append(myHobby);
        });
        $("nav").show();
        $(".container-content").show();
        $("footer").show();
    }).catch(function (err) {
        alert("Error in deleting item: " + err);
        var myHobby = '';
        //read data
        db.collection("hobbies").get().then(function (snapshot) {
            snapshot.forEach(function (doc) {
                myHobby += '<div><p>' + doc.data().name + '</p></div>';
            })
            $('#hobby-content>div').detach();
            $('#hobby-content').append(myHobby);
        });
        $("#hobbyID").val("");
        $(".add-hobby-container").hide();
        $(".update-intro-container").hide();
        $(".delete-hobby-container").hide();
        $(".add-education-conainer").hide();
        $(".delete-education-container").hide();
        $(".add-organization-container").hide();
        $(".delete-organization-container").hide();
        $(".add-work-container").hide();
        $(".delete-work-container").hide();
        $(".choose-link-container").hide();
        $(".update-twitter-container").hide();
        $(".update-linkedin-container").hide();
        $(".update-github-container").hide();
        $("nav").show();
        $(".container-content").show();
        $("footer").show();
    });
}

/*delete an educational history*/
function deleteEducationFunction() {
    var edu = document.getElementById("educationID").value;

    db.collection("educations").doc(edu).delete().then(function (doc) {
        alert("Item deleted: " + edu);

        /*show/hide the pages after successful deletion of an educational background*/
        $("#educationID").val("");
        $(".add-hobby-container").hide();
        $(".update-intro-container").hide();
        $(".delete-hobby-container").hide();
        $(".add-education-container").hide();
        $(".delete-education-container").hide();
        $(".add-organization-container").hide();
        $(".delete-organization-container").hide();
        $(".add-work-container").hide();
        $(".delete-work-container").hide();
        $(".choose-link-container").hide();
        $(".update-twitter-container").hide();
        $(".update-linkedin-container").hide();
        $(".update-github-container").hide();

        /*read from firebase and display the eduational backgrounds*/
        var myEducation = '';
        //read data
        db.collection("educations").get().then(function (snapshot) {
            snapshot.forEach(function (doc) {
                myEducation += '<div class="edu-divided-div">';
                myEducation += '<p class="bold">' + doc.data().school + '</p>';
                myEducation += '<p class="normal">' + doc.data().degree + '</p>';
                myEducation += '<p class="center">' + doc.data().year_start + '-' + doc.data().year_end + '</p>';
                myEducation += '</div>';
            })
            $('#education-content>div').detach();
            $('#education-content').append(myEducation);
        });
        $("nav").show();
        $(".container-content").show();
        $("footer").show();
    }).catch(function (err) {
        alert("Error in deleting item: " + err);
        var myEducation = '';
        //read data
        db.collection("educations").get().then(function (snapshot) {
            snapshot.forEach(function (doc) {
                myEducation += '<div class="edu-divided-div">';
                myEducation += '<p class="bold">' + doc.data().school + '</p>';
                myEducation += '<p class="normal">' + doc.data().degree + '</p>';
                myEducation += '<p class="center">' + doc.data().year_start + '-' + doc.data().year_end + '</p>';
                myEducation += '</div>';
            })
            $('#education-content>div').detach();
            $('#education-content').append(myEducation);
            $("#educationID").val("");
            $(".add-hobby-container").hide();
            $(".update-intro-container").hide();
            $(".delete-hobby-container").hide();
            $(".add-education-conainer").hide();
            $(".delete-education-container").hide();
            $(".add-organization-container").hide();
            $(".delete-organization-container").hide();
            $(".add-work-container").hide();
            $(".delete-work-container").hide();
            $(".choose-link-container").hide();
            $(".update-twitter-container").hide();
            $(".update-linkedin-container").hide();
            $(".update-github-container").hide();
            $("nav").show();
            $(".container-content").show();
            $("footer").show();
        });
    });
}

/*add an educational background*/
function addEducationFunction() {
    var school = document.getElementById("schoolname").value;
    var degree = document.getElementById("degree").value;
    var yearStart = document.getElementById("year-start").value;
    var yearEnd = document.getElementById("year-end").value;

    var start = parseInt(yearStart);
    var end = parseInt(yearEnd);

    var obj = JSON.parse('{ "school":"' + school + '","degree":"' + degree + '","year_end": "' + end + '","year_start":"' + start + '"}');
    //adding
    db.collection("educations").add(obj).then(function (doc) {
        alert("Item added with the uid: " + doc.id);

        /*show/hide the pages when an eduation background is successfully added*/
        $("#schoolname").val("");
        $("#degree").val("");
        $("#year-start").val("");
        $("#year-end").val("");
        $(".add-hobby-container").hide();
        $(".update-intro-container").hide();
        $(".delete-hobby-container").hide();
        $(".add-education-container").hide();
        $(".delete-education-container").hide();
        $(".add-organization-container").hide();
        $(".delete-organization-container").hide();
        $(".add-work-container").hide();
        $(".delete-work-container").hide();
        $(".choose-link-container").hide();
        $(".update-twitter-container").hide();
        $(".update-linkedin-container").hide();
        $(".update-github-container").hide();

        /*read from firebase and display educational backgrounds*/
        var myEducation = '';
        //read data
        db.collection("educations").get().then(function (snapshot) {
            snapshot.forEach(function (doc) {
                myEducation += '<div class="edu-divided-div">';
                myEducation += '<p class="bold">' + doc.data().school + '</p>';
                myEducation += '<p class="normal">' + doc.data().degree + '</p>';
                myEducation += '<p class="center">' + doc.data().year_start + '-' + doc.data().year_end + '</p>';
                myEducation += '</div>';
            })
            $('#education-content>div').detach();
            $('#education-content').append(myEducation);
        });
        $("nav").show();
        $(".container-content").show();
        $("footer").show();
    });
}

/*delete an organization*/
function deleteOrganizationFunction() {
    var org = document.getElementById("organizationID").value;

    db.collection("organizations").doc(org).delete().then(function (doc) {
        alert("Item deleted: " + org);

        /*show/hide pages after successful deletion of an organization*/
        $("#organizationID").val("");
        $(".add-hobby-container").hide();
        $(".update-intro-container").hide();
        $(".delete-hobby-container").hide();
        $(".add-education-container").hide();
        $(".delete-education-container").hide();
        $(".add-organization-container").hide();
        $(".delete-organization-container").hide();
        $(".add-work-container").hide();
        $(".delete-work-container").hide();
        $(".choose-link-container").hide();
        $(".update-twitter-container").hide();
        $(".update-linkedin-container").hide();
        $(".update-github-container").hide();
        var myOrganization = '';
        //read data
        db.collection("organizations").get().then(function (snapshot) {
            snapshot.forEach(function (doc) {
                myOrganization += '<div class="edu-divided-div">';
                myOrganization += '<p class="bold">' + doc.data().name + '</p>';
                myOrganization += '<p class="normal">' + doc.data().position + '</p>';
                myOrganization += '<p class="center">' + doc.data().year_start + '-' + doc.data().year_end + '</p>';
                myOrganization += '</div>';
            })
            $('#organization-content>div').detach();
            $('#organization-content').append(myOrganization);
        });
        $("nav").show();
        $(".container-content").show();
        $("footer").show();
    }).catch(function (err) {
        alert("Error in deleting item: " + err);
        var myOrganization = '';
        //read data
        db.collection("organizations").get().then(function (snapshot) {
            snapshot.forEach(function (doc) {
                myOrganization += '<div class="edu-divided-div">';
                myOrganization += '<p class="bold">' + doc.data().name + '</p>';
                myOrganization += '<p class="normal">' + doc.data().position + '</p>';
                myOrganization += '<p class="center">' + doc.data().year_start + '-' + doc.data().year_end + '</p>';
                myOrganization += '</div>';
            })
            $('#organization-content>div').detach();
            $('#organization-content').append(myOrganization);
            $("#organizationID").val("");
            $(".add-hobby-container").hide();
            $(".update-intro-container").hide();
            $(".delete-hobby-container").hide();
            $(".add-education-conainer").hide();
            $(".delete-education-container").hide();
            $(".add-organization-container").hide();
            $(".delete-organization-container").hide();
            $(".add-work-container").hide();
            $(".delete-work-container").hide();
            $(".choose-link-container").hide();
            $(".update-twitter-container").hide();
            $(".update-linkedin-container").hide();
            $(".update-github-container").hide();
            $("nav").show();
            $(".container-content").show();
            $("footer").show();
        });
    });
}

/*add an organization*/
function addOrganizationFunction() {
    var org = document.getElementById("orgname").value;
    var position = document.getElementById("position").value;
    var yearStart = document.getElementById("org-year-start").value;
    var yearEnd = document.getElementById("org-year-end").value;

    var start = parseInt(yearStart);
    var end = parseInt(yearEnd);

    var obj = JSON.parse('{ "name":"' + org + '","position":"' + position + '","year_end": "' + end + '","year_start":"' + start + '"}');
    //adding
    db.collection("organizations").add(obj).then(function (doc) {
        alert("Item added with the uid: " + doc.id);

        /*show / hide pages after successful adding of an organization*/
        $("#orgname").val("");
        $("#position").val("");
        $("#org-year-start").val("");
        $("#org-year-end").val("");
        $(".add-hobby-container").hide();
        $(".update-intro-container").hide();
        $(".delete-hobby-container").hide();
        $(".add-education-container").hide();
        $(".delete-education-container").hide();
        $(".add-organization-container").hide();
        $(".delete-organization-container").hide();
        $(".add-work-container").hide();
        $(".delete-work-container").hide();
        $(".choose-link-container").hide();
        $(".update-twitter-container").hide();
        $(".update-linkedin-container").hide();
        $(".update-github-container").hide();
        var myOrganization = '';
        //read data
        db.collection("organizations").get().then(function (snapshot) {
            snapshot.forEach(function (doc) {
                myOrganization += '<div class="edu-divided-div">';
                myOrganization += '<p class="bold">' + doc.data().name + '</p>';
                myOrganization += '<p class="normal">' + doc.data().position + '</p>';
                myOrganization += '<p class="center">' + doc.data().year_start + '-' + doc.data().year_end + '</p>';
                myOrganization += '</div>';
            })
            $('#organization-content>div').detach();
            $('#organization-content').append(myOrganization);
        });
        $("nav").show();
        $(".container-content").show();
        $("footer").show();
    });
}

/*delete a work history*/
function deleteWorkFunction() {
    var work = document.getElementById("workID").value;

    db.collection("works").doc(work).delete().then(function (doc) {
        alert("Item deleted: " + work);

        /*show/hide pages after successful deletion of work history*/
        $("#workID").val("");
        $(".add-hobby-container").hide();
        $(".update-intro-container").hide();
        $(".delete-hobby-container").hide();
        $(".add-education-container").hide();
        $(".delete-education-container").hide();
        $(".add-organization-container").hide();
        $(".delete-organization-container").hide();
        $(".add-work-container").hide();
        $(".delete-work-container").hide();
        $(".choose-link-container").hide();
        $(".update-twitter-container").hide();
        $(".update-linkedin-container").hide();
        $(".update-github-container").hide();

        /*read from firebase and display work history*/
        var myWork = '';
        //read data
        db.collection("works").get().then(function (snapshot) {
            snapshot.forEach(function (doc) {
                myWork += '<div class="edu-divided-div">';
                myWork += '<p class="bold">' + doc.data().name + '</p>';
                myWork += '<p class="normal">' + doc.data().lab + '</p>';
                myWork += '<p class="center">' + doc.data().year_start + '-' + doc.data().year_end + '</p>';
                myWork += '</div>';
            })
            $('#work-content>div').detach()
            $('#work-content').append(myWork);
        });
        $("nav").show();
        $(".container-content").show();
        $("footer").show();
    }).catch(function (err) {
        alert("Error in deleting item: " + err);
        var myWork = '';
        //read data
        db.collection("works").get().then(function (snapshot) {
            snapshot.forEach(function (doc) {
                myWork += '<div class="edu-divided-div">';
                myWork += '<p class="bold">' + doc.data().name + '</p>';
                myWork += '<p class="normal">' + doc.data().lab + '</p>';
                myWork += '<p class="center">' + doc.data().year_start + '-' + doc.data().year_end + '</p>';
                myWork += '</div>';
            })
            $('#work-content>div').detach()
            $('#work-content').append(myWork);
            $("#workID").val("");
            $(".add-hobby-container").hide();
            $(".update-intro-container").hide();
            $(".delete-hobby-container").hide();
            $(".add-education-conainer").hide();
            $(".delete-education-container").hide();
            $(".add-organization-container").hide();
            $(".delete-organization-container").hide();
            $(".add-work-container").hide();
            $(".delete-work-container").hide();
            $(".choose-link-container").hide();
            $(".update-twitter-container").hide();
            $(".update-linkedin-container").hide();
            $(".update-github-container").hide();
            $("nav").show();
            $(".container-content").show();
            $("footer").show();
        });
    });
}

/*add work function*/
function addWorkFunction() {
    var work = document.getElementById("workname").value;
    var lab = document.getElementById("lab").value;
    var yearStart = document.getElementById("work-year-start").value;
    var yearEnd = document.getElementById("work-year-end").value;

    var start = parseInt(yearStart);
    var end = parseInt(yearEnd);

    var obj = JSON.parse('{ "name":"' + work + '","lab":"' + lab + '","year_end": "' + end + '","year_start":"' + start + '"}');
    //adding
    db.collection("works").add(obj).then(function (doc) {
        alert("Item added with the uid: " + doc.id);

        /*show/hide pages after successful adding of a work history*/
        $("#workname").val("");
        $("#lab").val("");
        $("#work-year-start").val("");
        $("#work-year-end").val("");
        $(".add-hobby-container").hide();
        $(".update-intro-container").hide();
        $(".delete-hobby-container").hide();
        $(".add-education-container").hide();
        $(".delete-education-container").hide();
        $(".add-organization-container").hide();
        $(".delete-organization-container").hide();
        $(".add-work-container").hide();
        $(".delete-work-container").hide();
        $(".choose-link-container").hide();
        $(".update-twitter-container").hide();
        $(".update-linkedin-container").hide();
        $(".update-github-container").hide();

        /*read from firebase and display work history*/
        var myWork = '';
        //read data
        db.collection("works").get().then(function (snapshot) {
            snapshot.forEach(function (doc) {
                myWork += '<div class="edu-divided-div">';
                myWork += '<p class="bold">' + doc.data().name + '</p>';
                myWork += '<p class="normal">' + doc.data().lab + '</p>';
                myWork += '<p class="center">' + doc.data().year_start + '-' + doc.data().year_end + '</p>';
                myWork += '</div>';
            })
            $('#work-content>div').detach()
            $('#work-content').append(myWork);
        });
        $("nav").show();
        $(".container-content").show();
        $("footer").show();
    });
}

myTwit = '';
myLinked = '';
myGit = '';

/*choose a link to edit*/
function chooseLinkFunction() {
    $("footer").hide();
    $("nav").hide();
    $(".container-content").hide();
    $(".login-container").hide();
    $(".update-intro-container").hide();
    $(".add-hobby-container").hide();
    $(".add-education-container").hide();
    $(".delete-hobby-container").hide();
    $(".add-organization-container").hide();
    $(".add-work-container").hide();
    $(".delete-education-container").hide();
    $(".delete-organization-container").hide();
    $(".delete-work-container").hide();
    $(".update-twitter-container").hide();
    $(".choose-link-container").hide();
    var selected = document.getElementById("selected-links").value;
    var db = firebase.firestore();
    if (selected == "Twitter") {
        var dbtwit = db.collection("others").doc("link");

        var myOldTwitter = '';
        //read data
        dbtwit.get().then(function (doc) {
            if (doc.exists) {
                myOldTwitter += '<label for="oldTwitter">Current Twitter Link</label>';
                myOldTwitter += '<textarea readonly name="oldTwitter" class="oldTwitter">' + doc.data().twitter + '</textarea>';
                myTwit = doc.data().twitter;
                myLinked = doc.data().linkedin;
                myGit = doc.data().github;
                $('#old-twitter-div>label').detach();
                $('#old-twitter-div>textarea').detach();
                $('#old-twitter-div').append(myOldTwitter);
            } else {
                console.log("No such document");
            }
            $('#selected-links').val("");
        });
        $(".update-twitter-container").show();
    } else if (selected == "LinkedIn") {
        var dblinkedin = db.collection("others").doc("link");

        var myOldLinkedin = '';
        //read data
        dblinkedin.get().then(function (doc) {
            if (doc.exists) {
                myOldLinkedin += '<label for="oldLinkedin">Current Linked in Link</label>';
                myOldLinkedin += '<textarea readonly name="oldLinkedin" class="oldLinkedin">' + doc.data().linkedin + '</textarea>';
                myTwit = doc.data().twitter;
                myLinked = doc.data().linkedin;
                myGit = doc.data().github;
                $('#old-linkedin-div>label').detach();
                $('#old-linkedin-div>textarea').detach();
                $('#old-linkedin-div').append(myOldLinkedin);
            } else {
                console.log("No such document");
            }
            $('#selected-links').val("");
        });
        $(".update-linkedin-container").show();
    } else if (selected == "Github") {
        var dbGithub = db.collection("others").doc("link");

        var myOldGithub = '';
        //read data
        dbGithub.get().then(function (doc) {
            if (doc.exists) {
                myOldGithub += '<label for="oldGithub">Current Github Link</label>';
                myOldGithub += '<textarea readonly name="oldGithub" class="oldGithub">' + doc.data().github + '</textarea>';
                myTwit = doc.data().twitter;
                myLinked = doc.data().linkedin;
                myGit = doc.data().github;
                $('#old-github-div>label').detach();
                $('#old-github-div>textarea').detach();
                $('#old-github-div').append(myOldGithub);
            } else {
                console.log("No such document");
            }
            $('#selected-links').val("");
        });
        $(".update-github-container").show();
    }
}

/*update twitter link*/
function updateTwitterFunction() {
    //var db = firebase.firestore();
    var twitter = document.getElementById("updatedTwitter").value;
    var dblinks = db.collection("others").doc("link");
    var obj = JSON.parse('{ "github":"' + myGit + '","linkedin":"' + myLinked + '","twitter": "' + twitter + '"}');

    //adding
    dblinks.set(obj).then(function (doc) {
        alert("Twitter link updated!");
        $("#updatedTwitter").val("");
        $(".add-hobby-container").hide();
        $(".update-intro-container").hide();
        $(".delete-hobby-container").hide();
        $(".add-education-container").hide();
        $(".delete-education-container").hide();
        $(".add-organization-container").hide();
        $(".delete-organization-container").hide();
        $(".add-work-container").hide();
        $(".delete-work-container").hide();
        $(".choose-link-container").hide();
        $(".update-twitter-container").hide();
        $(".update-linkedin-container").hide();
        $(".update-github-container").hide();
        $(".choose-link-container").hide();


        var dblinks = db.collection("others").doc("link");

        var mynewTwitter = '';
        var mynewLinkedin = '';
        var mynewGithub = '';

        var displayTwitter = '';
        var displayLinkedin = '';
        var displayGithub = '';
        //read data
        dblinks.get().then(function (doc) {
            if (doc.exists) {
                mynewTwitter += doc.data().twitter;
                mynewLinkedin += doc.data().linkedin;
                mynewGithub += doc.data().github;

                displayTwitter += '<p class="displayTwit">' + mynewTwitter + '</p>';
                displayLinkedin += '<p class="displayLinked">' + mynewLinkedin + '</p>';
                displayGithub += '<p class="displayGit">' + mynewGithub + '</p>';

                $('#twitter>p').detach();
                $('#linkedin>p').detach();
                $('#github>p').detach();
                $('#twitter').append(displayTwitter);
                $('#linkedin').append(displayLinkedin);
                $('#github').append(displayGithub);
            } else {
                console.log("No such document");
            }
        });

        var twitters = document.getElementById("twitter");
        twitters.onclick = function (event) {
            window.open(mynewTwitter).href;
        }

        var linkedins = document.getElementById("linkedin");
        linkedins.onclick = function (event) {
            window.open(mynewLinkedin).href;
        }

        var githubs = document.getElementById("github");
        githubs.onclick = function (event) {
            window.open(mynewGithub).href;
        }
        $("footer").show();
        $("nav").show();
        $(".container-content").show();
    });
}

/*update linkedin link*/
function updateLinkedinFunction() {
    var linkedin = document.getElementById("updatedlinkedIn").value;
    var dblinks = db.collection("others").doc("link");

    var obj = JSON.parse('{ "github":"' + myGit + '","linkedin":"' + linkedin + '","twitter": "' + myTwit + '"}');

    //adding
    dblinks.set(obj).then(function (doc) {
        alert("Linked in link updated!");
        $("#updatedlinkedIn").val("");
        $(".add-hobby-container").hide();
        $(".update-intro-container").hide();
        $(".delete-hobby-container").hide();
        $(".add-education-container").hide();
        $(".delete-education-container").hide();
        $(".add-organization-container").hide();
        $(".delete-organization-container").hide();
        $(".add-work-container").hide();
        $(".delete-work-container").hide();
        $(".choose-link-container").hide();
        $(".update-twitter-container").hide();
        $(".update-linkedin-container").hide();
        $(".update-github-container").hide();

        var dblinks = db.collection("others").doc("link");

        var mynewTwitter = '';
        var mynewLinkedin = '';
        var mynewGithub = '';

        var displayTwitter = '';
        var displayLinkedin = '';
        var displayGithub = '';
        //read data
        dblinks.get().then(function (doc) {
            if (doc.exists) {
                mynewTwitter += doc.data().twitter;
                mynewLinkedin += doc.data().linkedin;
                mynewGithub += doc.data().github;

                displayTwitter += '<p class="displayTwit">' + mynewTwitter + '</p>';
                displayLinkedin += '<p class="displayLinked">' + mynewLinkedin + '</p>';
                displayGithub += '<p class="displayGit">' + mynewGithub + '</p>';

                $('#twitter>p').detach();
                $('#linkedin>p').detach();
                $('#github>p').detach();
                $('#twitter').append(displayTwitter);
                $('#linkedin').append(displayLinkedin);
                $('#github').append(displayGithub);
            } else {
                console.log("No such document");
            }
        });

        var twitters = document.getElementById("twitter");
        twitters.onclick = function (event) {
            window.open(mynewTwitter).href;
        }

        var linkedins = document.getElementById("linkedin");
        linkedins.onclick = function (event) {
            window.open(mynewLinkedin).href;
        }

        var githubs = document.getElementById("github");
        githubs.onclick = function (event) {
            window.open(mynewGithub).href;
        }
        $("footer").show();
        $("nav").show();
        $(".container-content").show();
    });
}

/*update github link*/
function updateGithubFunction() {
    var github = document.getElementById("updatedGithub").value;
    var dblinks = db.collection("others").doc("link");

    var obj = JSON.parse('{ "github":"' + github + '","linkedin":"' + myLinked + '","twitter": "' + myTwit + '"}');

    //adding
    dblinks.set(obj).then(function (doc) {
        alert("Github link updated!");
        $("#updatedGithub").val("");
        $(".add-hobby-container").hide();
        $(".update-intro-container").hide();
        $(".delete-hobby-container").hide();
        $(".add-education-container").hide();
        $(".delete-education-container").hide();
        $(".add-organization-container").hide();
        $(".delete-organization-container").hide();
        $(".add-work-container").hide();
        $(".delete-work-container").hide();
        $(".choose-link-container").hide();
        $(".update-twitter-container").hide();
        $(".update-linkedin-container").hide();
        $(".update-github-container").hide();

        var dblinks = db.collection("others").doc("link");

        var mynewTwitter = '';
        var mynewLinkedin = '';
        var mynewGithub = '';

        var displayTwitter = '';
        var displayLinkedin = '';
        var displayGithub = '';
        //read data
        dblinks.get().then(function (doc) {
            if (doc.exists) {
                mynewTwitter += doc.data().twitter;
                mynewLinkedin += doc.data().linkedin;
                mynewGithub += doc.data().github;

                displayTwitter += '<p class="displayTwit">' + mynewTwitter + '</p>';
                displayLinkedin += '<p class="displayLinked">' + mynewLinkedin + '</p>';
                displayGithub += '<p class="displayGit">' + mynewGithub + '</p>';

                $('#twitter>p').detach();
                $('#linkedin>p').detach();
                $('#github>p').detach();
                $('#twitter').append(displayTwitter);
                $('#linkedin').append(displayLinkedin);
                $('#github').append(displayGithub);
            } else {
                console.log("No such document");
            }
        });

        var twitters = document.getElementById("twitter");
        twitters.onclick = function (event) {
            window.open(mynewTwitter).href;
        }

        var linkedins = document.getElementById("linkedin");
        linkedins.onclick = function (event) {
            window.open(mynewLinkedin).href;
        }

        var githubs = document.getElementById("github");
        githubs.onclick = function (event) {
            window.open(mynewGithub).href;
        }
        $("footer").show();
        $("nav").show();
        $(".container-content").show();
    });
}


$("nav").hide();
$(".container-content").hide();
$("footer").hide();
$(".update-intro-container").hide();
$(".add-hobby-container").hide();
$(".delete-hobby-container").hide();
$(".add-education-container").hide();
$(".delete-education-container").hide();
$(".add-organization-container").hide();
$(".delete-organization-container").hide();
$(".add-work-container").hide();
$(".delete-work-container").hide();
$(".choose-link-container").hide();
$(".update-twitter-container").hide();
$(".update-linkedin-container").hide();
$(".update-github-container").hide();

/*do the following when the document is ready*/
$(document).ready(function () {
    $("#form-signin").submit(function (e) {
        e.preventDefault();
        loginFunction();
    });

    /*if edit introduction icon is clicked*/
    $(".edit-intro-icon").click(function () {
        $("footer").hide();
        $("nav").hide();
        $(".container-content").hide();
        $(".login-container").hide();
        $(".add-hobby-container").hide();
        $(".delete-hobby-container").hide();
        $(".add-education-container").hide();
        $(".delete-education-container").hide();
        $(".add-organization-container").hide();
        $(".delete-organization-container").hide();
        $(".add-work-container").hide();
        $(".delete-work-container").hide();
        $(".choose-link-container").hide();
        $(".update-twitter-container").hide();
        $(".update-linkedin-container").hide();
        $(".update-github-container").hide();
        $(".update-intro-container").show();
        var dbabout = db.collection("others").doc("intro");
        var myOldIntro = '';
        //read data
        dbabout.get().then(function (doc) {
            if (doc.exists) {
                myOldIntro += '<label for="oldIntro">Current Message</label>';
                myOldIntro += '<textarea readonly name="oldIntro" class="oldIntro">' + doc.data().value + '</textarea>';
                $('#old-intro-div>label').detach();
                $('#old-intro-div>textarea').detach();
                $('#old-intro-div').append(myOldIntro);
            } else {
                console.log("No such document");
            }
        });
    });

    /*if add hobby icon is clicked*/
    $(".add-hobby-i").click(function () {
        $("footer").hide();
        $("nav").hide();
        $(".container-content").hide();
        $(".login-container").hide();
        $(".update-intro-container").hide();
        $(".delete-hobby-container").hide();
        $(".add-education-container").hide();
        $(".delete-education-container").hide();
        $(".add-organization-container").hide();
        $(".delete-organization-container").hide();
        $(".add-work-container").hide();
        $(".delete-work-container").hide();
        $(".choose-link-container").hide();
        $(".update-twitter-container").hide();
        $(".update-linkedin-container").hide();
        $(".update-github-container").hide();
        $(".add-hobby-container").show();
    });

    /*if delete hobby icon is clicked*/
    $(".delete-hobby-i").click(function () {
        $("footer").hide();
        $("nav").hide();
        $(".container-content").hide();
        $(".login-container").hide();
        $(".update-intro-container").hide();
        $(".add-hobby-container").hide();
        $(".add-education-container").hide();
        $(".delete-education-container").hide();
        $(".add-organization-container").hide();
        $(".delete-organization-container").hide();
        $(".add-work-container").hide();
        $(".delete-work-container").hide();
        $(".choose-link-container").hide();
        $(".update-twitter-container").hide();
        $(".update-linkedin-container").hide();
        $(".update-github-container").hide();
        $(".delete-hobby-container").show();
        //var db = firebase.firestore();
        var myHobby = '';
        //read data
        db.collection("hobbies").get().then(function (snapshot) {
            myHobby += '<select id="hobbyID" required>';
            myHobby += '<option value="">--Select Hobby--</option>';
            snapshot.forEach(function (doc) {
                myHobby += '<option value="' + doc.id + '">' + doc.data().name + '</option>';
            })
            myHobby += '</select>';
            $('#select-hobby>select').detach();
            $('#select-hobby').append(myHobby);
        });
    });

    /*if add education icon is clicked*/
    $(".add-education-i").click(function () {
        $("footer").hide();
        $("nav").hide();
        $(".container-content").hide();
        $(".login-container").hide();
        $(".update-intro-container").hide();
        $(".add-hobby-container").hide();
        $(".delete-hobby-container").hide();
        $(".delete-education-container").hide();
        $(".add-organization-container").hide();
        $(".delete-organization-container").hide();
        $(".add-work-container").hide();
        $(".delete-work-container").hide();
        $(".choose-link-container").hide();
        $(".update-twitter-container").hide();
        $(".update-linkedin-container").hide();
        $(".update-github-container").hide();
        $(".add-education-container").show();
    });

    /*if delete education icon is clicked*/
    $(".delete-education-i").click(function () {
        $("footer").hide();
        $("nav").hide();
        $(".container-content").hide();
        $(".login-container").hide();
        $(".update-intro-container").hide();
        $(".add-hobby-container").hide();
        $(".add-education-container").hide();
        $(".delete-hobby-container").hide();
        $(".add-organization-container").hide();
        $(".delete-organization-container").hide();
        $(".add-work-container").hide();
        $(".delete-work-container").hide();
        $(".choose-link-container").hide();
        $(".update-twitter-container").hide();
        $(".update-linkedin-container").hide();
        $(".update-github-container").hide();
        $(".delete-education-container").show();
        var myEducation = '';
        //read data
        db.collection("educations").get().then(function (snapshot) {
            myEducation += '<select id="educationID" required>';
            myEducation += '<option value="">--Select Education--</option>';
            snapshot.forEach(function (doc) {
                myEducation += '<option value="' + doc.id + '">' + doc.data().school + " (" + doc.data().degree + ")" + '</option>';
            })
            myEducation += '</select>';
            $('#select-education>select').detach();
            $('#select-education').append(myEducation);
        });
    });

    /*if add organization icon is clicked*/
    $(".add-organization-i").click(function () {
        $("footer").hide();
        $("nav").hide();
        $(".container-content").hide();
        $(".login-container").hide();
        $(".update-intro-container").hide();
        $(".add-hobby-container").hide();
        $(".delete-hobby-container").hide();
        $(".delete-education-container").hide();
        $(".delete-organization-container").hide();
        $(".add-work-container").hide();
        $(".delete-work-container").hide();
        $(".add-education-container").hide();
        $(".choose-link-container").hide();
        $(".update-twitter-container").hide();
        $(".update-linkedin-container").hide();
        $(".update-github-container").hide();
        $(".add-organization-container").show();
    });

    /*if delete organization icon is clicked*/
    $(".delete-organization-i").click(function () {
        $("footer").hide();
        $("nav").hide();
        $(".container-content").hide();
        $(".login-container").hide();
        $(".update-intro-container").hide();
        $(".add-hobby-container").hide();
        $(".add-education-container").hide();
        $(".delete-hobby-container").hide();
        $(".add-organization-container").hide();
        $(".add-work-container").hide();
        $(".delete-work-container").hide();
        $(".delete-education-container").hide();
        $(".choose-link-container").hide();
        $(".update-twitter-container").hide();
        $(".update-linkedin-container").hide();
        $(".update-github-container").hide();
        $(".delete-organization-container").show();
        var myOrganization = '';
        //read data
        db.collection("organizations").get().then(function (snapshot) {
            myOrganization += '<select id="organizationID" required>';
            myOrganization += '<option value="">--Select Organization--</option>';
            snapshot.forEach(function (doc) {
                myOrganization += '<option value="' + doc.id + '">' + doc.data().name + " (" + doc.data().position + ")" + '</option>';
            })
            myOrganization += '</select>';
            $('#select-organization>select').detach();
            $('#select-organization').append(myOrganization);
        });
    });

    /*if add work icon is clicked*/
    $(".add-work-i").click(function () {
        $("footer").hide();
        $("nav").hide();
        $(".container-content").hide();
        $(".login-container").hide();
        $(".update-intro-container").hide();
        $(".add-hobby-container").hide();
        $(".delete-hobby-container").hide();
        $(".delete-education-container").hide();
        $(".delete-organization-container").hide();
        $(".delete-work-container").hide();
        $(".add-education-container").hide();
        $(".add-organization-container").hide();
        $(".choose-link-container").hide();
        $(".update-twitter-container").hide();
        $(".update-linkedin-container").hide();
        $(".update-github-container").hide();
        $(".add-work-container").show();
    });

    /*if delete work ion is clicked*/
    $(".delete-work-i").click(function () {
        $("footer").hide();
        $("nav").hide();
        $(".container-content").hide();
        $(".login-container").hide();
        $(".update-intro-container").hide();
        $(".add-hobby-container").hide();
        $(".add-education-container").hide();
        $(".delete-hobby-container").hide();
        $(".add-organization-container").hide();
        $(".add-work-container").hide();
        $(".delete-education-container").hide();
        $(".delete-organization-container").hide();
        $(".choose-link-container").hide();
        $(".update-twitter-container").hide();
        $(".update-linkedin-container").hide();
        $(".update-github-container").hide();
        $(".delete-work-container").show();
        var myWork = '';
        //read data
        db.collection("works").get().then(function (snapshot) {
            myWork += '<select id="workID" required>';
            myWork += '<option value="">--Select Work--</option>';
            snapshot.forEach(function (doc) {
                myWork += '<option value="' + doc.id + '">' + doc.data().name + " (" + doc.data().lab + ")" + '</option>';
            })
            myWork += '</select>';
            $('#select-work>select').detach();
            $('#select-work').append(myWork);
        });
    });

    /*if edit links ion is clicked*/
    $(".edit-links-icon").click(function () {
        $("footer").hide();
        $("nav").hide();
        $(".container-content").hide();
        $(".login-container").hide();
        $(".update-intro-container").hide();
        $(".add-hobby-container").hide();
        $(".add-education-container").hide();
        $(".delete-hobby-container").hide();
        $(".add-organization-container").hide();
        $(".add-work-container").hide();
        $(".delete-education-container").hide();
        $(".delete-organization-container").hide();
        $(".delete-work-container").hide();
        $(".update-twitter-container").hide();
        $(".update-linkedin-container").hide();
        $(".update-github-container").hide();
        $(".choose-link-container").show();
    });

    /*forms are submitted and the orresponding ations are executed*/
    $("#form-update-intro").submit(function (e) {
        e.preventDefault();
        updateIntroFunction();
    });
    $("#form-add-hobby").submit(function (e) {
        e.preventDefault();
        addHobbyFunction();
    });
    $("#form-delete-hobby").submit(function (e) {
        e.preventDefault();
        deleteHobbyFunction();
    });
    $("#form-add-education").submit(function (e) {
        e.preventDefault();
        addEducationFunction();
    });
    $("#form-delete-education").submit(function (e) {
        e.preventDefault();
        deleteEducationFunction();
    });
    $("#form-add-organization").submit(function (e) {
        e.preventDefault();
        addOrganizationFunction();
    });
    $("#form-delete-organization").submit(function (e) {
        e.preventDefault();
        deleteOrganizationFunction();
    });
    $("#form-add-work").submit(function (e) {
        e.preventDefault();
        addWorkFunction();
    });
    $("#form-delete-work").submit(function (e) {
        e.preventDefault();
        deleteWorkFunction();
    });
    $("#form-choose-link").submit(function (e) {
        e.preventDefault();
        chooseLinkFunction();
    });
    $("#form-update-twitter").submit(function (e) {
        e.preventDefault();
        updateTwitterFunction();
    });
    $("#form-update-linkedin").submit(function (e) {
        e.preventDefault();
        updateLinkedinFunction();
    });
    $("#form-update-github").submit(function (e) {
        e.preventDefault();
        updateGithubFunction();
    });
});