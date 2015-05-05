var http = require("http"),
    config = require("./config"),
    imageSource = require("image-source"),
    officeRnDApi = "https://www.officernd.com/api/v1/";

function getRoomImage(roomIndex, update) {
    var getRoomImageUri, roomConfig, imageModel, params;

    roomIndex = roomIndex || 0;
    roomConfig = config.rooms[roomIndex];

    getRoomImageUri = officeRnDApi + "rooms/" + roomConfig.roomId + "/export-uri?" + roomConfig.params.join('&');

    console.log("Loading: " + getRoomImageUri);
    http.getJSON(getRoomImageUri)
        .then(function (res) {
            var uri = "https:" + res.uri;
            console.log("Loading image: " + uri);
            imageSource.fromUrl(uri)
                .then(function (image) {
                    console.log("Image downloaded");
                    update(roomConfig.roomName, image);
                }, function (err) {
                    console.log("ERROR downloading image: " + err);
                    update(roomConfig.roomName, defaultNotFoundImageSource);
                });
        }, function (err) {
            console.log("ERROR calling API: " + err);
            update(roomConfig.roomName, defaultNotFoundImageSource);
        });
}

exports.getRoomImage = getRoomImage;