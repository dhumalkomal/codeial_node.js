// const Post =require('../models/post');
const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req, res){
    try {
        const post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });

        req.flash('success','Post Published!')
        return res.redirect('back');
    } catch (err) {
        // console.log('Error in creating the post', err);
        req.flash('error', err)
        return res.redirect('back');
    }
}

module.exports.destroy = async function(req, res) {
    try {
        const post = await Post.findById(req.params.id).exec();

        if (post.user == req.user.id) {
            await Post.deleteOne({ _id: req.params.id });
            await Comment.deleteMany({ post: req.params.id });


            req.flash('success','Post and associated comments deleted!')
            return res.redirect('back');
        } else {
            req.flash('error','You cannot delete this post!')
            return res.redirect('back');
        }
    } catch (err) {
        req.flash('error', err);
        return res.redirect('back');
    }
}



// module.exports.destroy = async function(req, res) {
//     try {
//         const post = await Post.findById(req.params.id).exec();

//         if (post.user == req.user.id) {
//             await post.remove();
//             await Comment.deleteMany({ post: req.params.id });

//             return res.redirect('back');
//         } else {
//             return res.redirect('back');
//         }
//     } catch (err) {
//         console.error(err);
//         return res.redirect('back');
//     }
// }



// module.exports.destroy = function(req, res){
//     Post.findById(req.params.id , function(err, post){
//         // .id means convertig the object id into string
//         if(post.user == req.user.id){
//             post.remove();

//             Comment.deleteMany({post: req.params.id}, function(err){
//                 return res.redirect('back');
//             });
//         }else{
//             return res.redirect('back');
//         }
//     });
// }


// module.exports.create = function(req, res) {
//     Post.create({
//         content: req.body.content,
//         User: req.user._id
//     })
//     .then(post => {
//         return res.redirect('back');
//     })
//     .catch(err => {
//         console.log('Error in creating the post', err);
//         return res.redirect('back');
//     });
// };

// module.exports.create = function(req, res){
//     if (req.user) {
//         Post.create({
//             content: req.body.content,
//             User: req.user._id
//         }, function(err, post){
//             if (err) {
//                 console.log('Error in creating the post', err);
//                 return;
//             }

//             return res.redirect('back');
//         });
//     } else {
//         // Handle the case when req.user is undefined
//         // Redirect or show an error message
//         return res.redirect('back');
//     }
// }





// module.exports.create = function(req, res){
//     Post.create ({
//         content : req.body.content,
//         User : req.user._id
//     } , function(err, post){
//         if(err){  console.log('Error in creating the post'); return; }

//         return res.redirect('back');
//     });
// }