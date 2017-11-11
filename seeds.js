var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Open Sky Camp",
        image: "https://images.pexels.com/photos/618848/pexels-photo-618848.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sit amet ipsum at libero aliquet porta vel sit amet eros. Nullam volutpat massa nec eros ullamcorper, in rhoncus lectus aliquet. Pellentesque congue id orci nec sagittis. Integer maximus, dolor nec convallis sodales, eros turpis ultrices sem, id venenatis dolor nulla at nibh. Cras id condimentum orci. Phasellus ac vulputate sem. Nunc eget viverra felis. Maecenas et enim at eros consequat sodales. Nam id nunc nulla. Sed luctus sodales erat vel accumsan. Sed quis nulla rutrum, vehicula sem tincidunt, mollis massa. Nunc scelerisque, arcu eu congue consequat, purus ligula fermentum nunc, nec eleifend nibh nibh tempor ligula. Curabitur vitae arcu lacus. Nullam porttitor eu diam vitae sagittis."
    },
    {
        name: "The Torment Barrens",
        image: "https://images.pexels.com/photos/45241/tent-camp-night-star-45241.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sit amet ipsum at libero aliquet porta vel sit amet eros. Nullam volutpat massa nec eros ullamcorper, in rhoncus lectus aliquet. Pellentesque congue id orci nec sagittis. Integer maximus, dolor nec convallis sodales, eros turpis ultrices sem, id venenatis dolor nulla at nibh. Cras id condimentum orci. Phasellus ac vulputate sem. Nunc eget viverra felis. Maecenas et enim at eros consequat sodales. Nam id nunc nulla. Sed luctus sodales erat vel accumsan. Sed quis nulla rutrum, vehicula sem tincidunt, mollis massa. Nunc scelerisque, arcu eu congue consequat, purus ligula fermentum nunc, nec eleifend nibh nibh tempor ligula. Curabitur vitae arcu lacus. Nullam porttitor eu diam vitae sagittis."
    },
    {
        name: "Pygmy Hedgehog Pastures",
        image: "https://images.pexels.com/photos/587976/pexels-photo-587976.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sit amet ipsum at libero aliquet porta vel sit amet eros. Nullam volutpat massa nec eros ullamcorper, in rhoncus lectus aliquet. Pellentesque congue id orci nec sagittis. Integer maximus, dolor nec convallis sodales, eros turpis ultrices sem, id venenatis dolor nulla at nibh. Cras id condimentum orci. Phasellus ac vulputate sem. Nunc eget viverra felis. Maecenas et enim at eros consequat sodales. Nam id nunc nulla. Sed luctus sodales erat vel accumsan. Sed quis nulla rutrum, vehicula sem tincidunt, mollis massa. Nunc scelerisque, arcu eu congue consequat, purus ligula fermentum nunc, nec eleifend nibh nibh tempor ligula. Curabitur vitae arcu lacus. Nullam porttitor eu diam vitae sagittis."
    }
    ];

function seedDB() {
    //Remove all campgrounds
    Campground.remove({}, function(err){
        // if (err) {
        //     console.log(err);
        // }
        // console.log("removed campground!");
        //Add campgrounds
        // data.forEach(function(seed){
        //     Campground.create(seed, function(err, campground) {
        //         if (err) {
        //             console.log(err);
        //         } else {
        //             console.log("added Campground");
        //             //Add comments
        //             Comment.create({
        //                 text: "Great place, but all the hipsters are scaring of the baby pygmy hedgehogs.",
        //                 author: "Benjamin"
        //             }, function(err, comment){
        //                 if (err) {
        //                     console.log(err);
        //                 } else {
        //                     campground.comments.push(comment);
        //                     campground.save();
        //                     console.log("Created new comment");
        //                 }
        //             });
        //         }
        //     });
        // });
    });
}

module.exports = seedDB;