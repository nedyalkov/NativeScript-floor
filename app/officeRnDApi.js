var http = require("http"),
    config = require("./config"),
    imageSource = require("image-source"),
    officeRnDApi = "https://www.officernd.com/api/v1/";

function getRoomImage(roomIndex) {
    var getRoomImageUri, roomConfig;

    roomIndex = roomIndex || 0;
    roomConfig = config.rooms[roomIndex];

    getRoomImageUri = officeRnDApi + "rooms/" + roomConfig.roomId + "/export-uri?" + roomConfig.params.join('&');

    console.log("Loading: " + getRoomImageUri);
    return http.getJSON(getRoomImageUri)
        .then(function (res) {
            var uri;

            uri = "https:" + res.uri;
            console.log("Downloading: " + uri);
            return imageSource.fromUrl(uri);
        })
        .then(function (image) {
            console.log("Downloaded!");
            return {
                title: roomConfig.roomName,
                image: image
            };
        });
}

exports.getRoomImage = getRoomImage;