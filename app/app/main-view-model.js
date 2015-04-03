var observable = require("data/observable"),
    api = require("./officeRnDApi");

var mainViewModel = new observable.Observable();

mainViewModel.set("roomName", "Skyline Ballroom");
api.getRoomImage(0, function (roomName, imageSource) {
    mainViewModel.set("title", roomName);
    mainViewModel.set("image", imageSource);
});

exports.mainViewModel = mainViewModel;