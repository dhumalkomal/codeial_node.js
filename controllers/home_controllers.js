const Post = require('../models/post');
const User = require('../models/user')
let fetchedPosts;

const cookieParser = require("cookie-parser");

// module.exports.home=function(req, res){
    // return res.end(`<h1>Express is up for Codeial!</h1>`);
     
   //  console.log(req.cookies);
   //  res.cookie('user_id', 25);
   // Post.find({})
   //      .then(posts => {
   //          return res.render('home', {
   //              title: "Codeial | Home",
   //              posts: posts
   //          });
   //      })
   //      .catch(err => {
   //          console.log('Error in fetching posts from database', err);
   //          return res.render('home', {
   //              title: "Codeial | Home",
   //              posts: []
   //          });
   //      });

        // populate the user of each post
module.exports.home = function(req, res){
    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
    .exec() // No callback here
    .then(posts => {
        fetchedPosts = posts; // Store fetched posts in the variable

        return User.find({}) // Using the promise-based query
    })
    .then(users => {
        return res.render('home', {
            title: "Codeial | Home",
            posts: fetchedPosts,
            all_users: users
        });
    })
    .catch(err => {
        console.error('Error fetching posts:', err);
        return res.redirect('back');
    });
}


// module.exports.actionName=function(req, res){
//     return res.end(`<h3>My action</h3>`);
// }