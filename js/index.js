
const firebaseConfig = {
  apiKey: "AIzaSyCN6KbibbAXiQuhFh2MrKndMnQZor-l7NU",
  authDomain: "fir-blog-app-93a6d.firebaseapp.com",
  databaseURL: "https://fir-blog-app-93a6d-default-rtdb.firebaseio.com",
  projectId: "fir-blog-app-93a6d",
  storageBucket: "fir-blog-app-93a6d.appspot.com",
  messagingSenderId: "246033199550",
  appId: "1:246033199550:web:f1e837020a6614bbd909ef"
};

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  $("#btn-login").click(()=>{
      let email=$("#email").val();
      let password=$("#password").val();
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        return firebase.auth().signInWithEmailAndPassword(email, password);
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode);
      window.alert("Message :" +errorMessage);
      });
  })

  $("#btn-signup").click(()=>{
    let email=$("#email").val();
    let password=$("#password").val();
    let cpassword=$("#confirm-password").val();
    if(email!="" && password!="" && cpassword!="")
    {
      if(password==cpassword){
          let result=firebase.auth().createUserWithEmailAndPassword(email,password);
        result.catch(()=>{
          let errorCode=error.code;
          let errorMessage = error.message;;
          console.log(errorCode);
          console.log(errorMessage);
          window.alert("Message:" +errorMessage);
        })
      }
      else{
        window.alert("Passowrd do not match with confirmed password");
      }
    }
    else{
      window.alert("Form is incomplete.Please fill out all fields");
    }
    
})

$("#btn-resetPassword").click(()=>{
    let auth=firebase.auth();
    let email=$("#email").val();

    if(email!=""){
      auth.sendPasswordResetEmail(email).then(()=>{
        window.alert("Email has been sent to you,Please check and verify ")
      }).catch((error)=>{
        let errorCode=error.code;
        let errorMessage=error.message;

        console.log(errorCode);
        console.log(errorMessage);
      })
    }
    else{
      window.alert("Please write your email first");
    }
})

  $("#btn-logout").click(()=>{
    firebase.auth().signOut();
})

$("#btn-update").click(function()
  {
    var phone = $("#phone").val();
    var address = $("#address").val();
    var bio = $("#bio").val();
    var fName = $("#firstName").val();
    var sName = $("#secondName").val();
    var country = $("#country").val();
    var gender = $("#gender").val();

    var rootRef = firebase.database().ref().child("Users");
    var userID = firebase.auth().currentUser.uid;
    var usersRef = rootRef.child(userID);

    if(fName!="" && sName!="" && phone!="" && country!="" && gender!="" && bio!="" && address!="")
    {
        var userData = 
        {
            "phone": phone,
            "address": address,
            "bio": bio,
            "firstName": fName,
            "secondName": sName,
            "country": country,
            "gender": gender,
        };

        usersRef.set(userData, function(error)
        {
            if(error)
            {
                var errorCode = error.code;
                var errorMessage = error.message;

                console.log(errorCode);
                onsole.log(errorMessage);

                window.alert("Message : " + errorMessage);
            }
            else
            {
                window.location.href = "index.html";
            }
        });
    }
    else
    {
        window.alert("Form is incomplete. Please fill out all fields.");
    }
  });

  function switchView(view)
{
    $.get({
        url:view,
        cache:false,
    })
    .then(function(data){
        $("#container").html(data);
    });
}

function googleSignIn(){
  base_provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(base_provider).then(function(result){
    console.log(result);
    alert("Success..Signed in with google");
    window.location = 'Main.html';
  }).catch(function(err){
    console.log(err);
    alert("Failed");

  });
}
