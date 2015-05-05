var observable = require("data/observable"),
    api = require("./officeRnDApi");

var mainViewModel = new observable.Observable();

mainViewModel.set("title", "Loading floorplan");
mainViewModel.set("isLoading", true);
api.getRoomImage(0, function (name, imageSource) {
    mainViewModel.set("title", name);
    mainViewModel.set("image", imageSource);
    mainViewModel.set("isLoading", false);
});

exports.mainViewModel = mainViewModel;