const Comment = require('../models/comment');
const Post = require('../models/post');
module.exports.create = function(req, res) {
    Post.findById(req.body.post)
        .exec() // Execute the query
        .then(post => {
            if (post) {
                Comment.create({
                    content: req.body.content,
                    post: req.body.post,
                    user: req.user._id
                })
                .then(comment => {
                    post.comments.push(comment);
                    return post.save(); // Save the post
                })
                .then(() => {
                    res.redirect('/');
                })
                .catch(err => {
                    // Handle error
                    console.error(err);
                    res.redirect('/');
                });
            }
            });                
};


module.exports.destroy = async function(req, res) {
    try {
        const comment = await Comment.findById(req.params.id).exec();

        if (comment.user == req.user.id) {
            let postId = comment.post;

            await comment.deleteOne();

            await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });

            return res.redirect('back');
        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.error(err);
        return res.redirect('back');
    }
}




// module.exports.destroy = function(req, res){
//     Comment.findById(req.params.id, function(err, comment){
//         if(comment.user == req.user.id){

//             let postId =comment.post;

//             comment.remove();

//             Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}}, function(err, post){
//                 return req.redirect('back');
//             });
//         }else{
//             return req.redirect('back');
//         }
//     });
// }



// module.exports.create = function(req, res) {
//     Post.findById(req.body.post)
//         .exec() // Execute the query
//         .then(post => {
//             if (post) {
//                 Comment.create({
//                     content: req.body.content,
//                     post: req.body.post,
//                     user: req.user._id
//                 })
//                 .then(comment => {
//                     post.comments.push(comment);
//                     post.save();
//                     res.redirect('/');
//                 })
//                 .catch(err => {
//                     // Handle error
//                     console.error(err);
//                     res.redirect('/');
//                 });
//             }
//         })
//         .catch(err => {
//             // Handle error
//             console.error(err);
//             res.redirect('/');
//         });
// };
