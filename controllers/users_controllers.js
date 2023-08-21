const User = require('../models/user');


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


module.exports.profile = function(req, res) {
    User.findById(req.params.id)
        .exec()
        .then(user => {
            // Handle user data
            return res.render('user_profile', {
                title: "User Profile",
                profile_user: user
            });
        })
        .catch(err => {
            console.error('Error fetching user:', err);
            return res.redirect('back');
        });
}



module.exports.update = async function(req, res) {
    if (req.user.id == req.params.id) {
        try {
            await User.findByIdAndUpdate(req.params.id, req.body).exec();
            return res.redirect('back');
        } catch (err) {
            console.error(err);
            return res.redirect('back');
        }
    } else {
        return res.status(401).send('Unauthorized');
    }
};


    


// render the Sign in page
module.exports.signIn = function(req, res){
     if(req.isAuthenticated()){
        return res.redirect('/user/profile');
     }


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



// sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}
  

// sign out the user
module.exports.destroySession = function(req, res){
    req.logout(function(err) {
        if (err) {
            console.log(err);
            return res.redirect('/');
        }
        // Successfully logged out
        req.flash('success', 'You have logged out');
        res.redirect('/');
    });
}

    