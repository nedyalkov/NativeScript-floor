var http = require("http"),
    config = require("./config"),
    imageSource = require("image-source"),
    officeRnDApi = "https://www.officernd.com/api/v1/";

function getPlanImage(planName) {
    var getPlanImageUri, planConfig;

    planConfig = config.plansInfo[planName];

    getPlanImageUri = officeRnDApi + "rooms/" + planConfig.id + "/export-uri?" + planConfig.params.join('&');

    console.log("Loading: " + getPlanImageUri);
return http.getJSON(getPlanImageUri)
    .then(function (res) {
        var uri;

        uri = "https:" + res.uri;
        console.log("Downloading: " + uri);
        return imageSource.fromUrl(uri);
    })
    .then(function (image) {
        console.log("Downloaded!");
        return {
            title: planConfig.name,
            image: image
        };
    });
}

exports.getPlanImage = getPlanImage;
