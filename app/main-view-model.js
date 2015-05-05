var observable = require("data/observable"),
    api = require("./officeRnDApi");

var mainViewModel = new observable.Observable();

mainViewModel.set("title", "Loading floorplan");
mainViewModel.set("isLoading", true);
api.getPlanImage('demo')
    .then(function (res) {
        console.log("Displaying...");
        mainViewModel.set("title", res.title);
        mainViewModel.set("image", res.image);
        mainViewModel.set("isLoading", false);
    });

exports.mainViewModel = mainViewModel;