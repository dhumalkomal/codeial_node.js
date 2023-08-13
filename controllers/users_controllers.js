const User = require('../models/user');

module.exports.profile = async (req, res) => {
    try {
      // Retrieve user credentials from the cookie
      const { email } = req.cookies;
  
      // Find the user based on the email (you should have a more secure way to store user information)
      const user = await User.findOne({  email });
  
      if (user) {
        // console.log('User not found');
        return res.redirect('/user/signIn');
      }
  
      // Render the profile page
      res.render('user_profile', {
        title: "User Profile",
        user:{  email }
      });
    } catch (err) {
    //   console.log('Error:', err);
      res.redirect('/user/signIn');
    }
}


// module.exports.profile=function(req, res){
//     if(req.cookies.user_id){
//        User.findById(req.cookies.user_id, function(err, user){
//          if(!user){
//             res.render('user_profile', {
//                 title:"User Profile",
//                 user:user
//             })
//          }
//          return res.redirect('/user/signIn');

//        });
//     }
//     else{
//         return res.redirect('/user/signIn');
//     }
// }

// module.exports.profile=function(req, res){
//     // return res.end(`<h1>Users Profile</h1>`);

//     return res.render('user_profile', {
//         title:"Profile"
//     })
// }

// render the Sign in page
module.exports.signIn = function(req, res){

    return res.render('user_sign_in', {
        title:"Codeial | Sign In"
    });
}

// render the Sign up page
module.exports.signUp = function(req, res){

    return res.render('user_sign_up', {
        title:"Codeial | Sign Up"
    });
}

// get the sign up data
module.exports.create = function(req, res){
    if (req.body.password !== req.body.confirm_password){
        return res.redirect('back');
    }

          User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return User.create(req.body)
                    .then(newUser => {
                        return res.redirect('/user/signIn');
                    })
                    .catch(err => {
                        // console.log('error in creating user while signing up:', err);
                        return res.redirect('back');
                    });
            } else {
                return res.redirect('/user/signIn');
            }
        })
        .catch(err => {
            // console.log('error in finding user in signing up:', err)
            return res.redirect('back');
        });
};
      
// get sign in data and create the session
module.exports.createSession = function(req, res) {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user) {
                // handle user not found
                return res.redirect('/user/profile');
            }

            // handle password mismatch
            if (user.password !== req.body.password) {
                return res.redirect('back');
            }

            // handle session creation
            res.cookie('user_id', user.id);
            return res.redirect('/user/profile');
        })
        .catch(err => {
            console.log('error in finding user in signing up', err);
            return res.redirect('back');
        });
}



// get sign in data and create the session
// module.exports.createSession = function(req, res){
    
//     //  steps to Athonticate
//     //  find the user
//     User.findOne({email: req.body.email}, function(err, user){
//             if(err){console.log('error in finding user in signing up'); return}

//             // handle user found
//             if(user){
//                  // handle password which don't match
//                  if (user.password !== req.body.password){
//                     return res.redirect('back');
//                 }
//                  // handle session creation
//                  res.cookie('user_id', user.id);
//                  return res.redirect('/user/profile');
//             }
//             else{
//                 // handle user not found
//                 return res.redirect('back');
//             }
//     });

// }

// module.exports.createSession = async function(req, res) {
//     try {
//         // Find the user
//         const user = await User.findOne({ email: req.body.email });
//         if (user) {
//             // Handle user not found
//             return res.redirect('back');
//         }
        
//         // Handle password mismatch
//         if (user.password !== req.body.password) {
//             return res.redirect('back');
//         }
        
//         // Handle session creation
//         res.cookie('user_id', user.id);
//         return res.redirect('/user/profile');
//     } catch (err) {
//         console.log('Error in finding user in signing up:', err);
//         // Handle other errors, maybe redirect back or show an error page
//         return res.redirect('back');
//     }
// }


