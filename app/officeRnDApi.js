var http = require("http"),
    config = require("./config"),
    imageSource = require("image-source"),
    Cache = require("ui/image-cache").Cache,
    officeRnDApi = "https://www.officernd.com/api/v1/",
    defaultImageSource = imageSource.fromFile("~/res/loading.gif"),
    defaultNotFoundImageSource = imageSource.fromFile("~/res/no-image.png");

var cache = new Cache();

cache.invalid = defaultNotFoundImageSource;
cache.placeholder = defaultImageSource;
cache.maxRequests = 5;

function getImage(uri, done) {
    var source = cache.get(uri);

    if (source) {
        done(source);
    } else {
        cache.push({
            key: uri,
            url: uri,
            completed: function (result, key) {
                if (key === uri) {
                    done(result);
                }
            }
        });
    }
}

function getRoomImage(roomIndex, update) {
    var getRoomImageUri, roomConfig, imageModel, params;

    roomIndex = roomIndex || 0;
    roomConfig = config.rooms[roomIndex];

    getRoomImageUri = officeRnDApi + "rooms/" + roomConfig.roomId + "/export-uri?" + roomConfig.params.join('&');

    console.log("Loading: " + getRoomImageUri);
    http.getJSON(getRoomImageUri)
        .then(function (res) {
            var uri = "https:" + res.uri;
            // TODO: Read room name from the endpoint

            console.log("Loading image: " + uri);
            getImage(uri, function (image) {
                console.log("Image downloaded");
                update(roomConfig.roomName, image);
            });
        }, function (err) {
            console.log("ERROR: " + err);
            update(roomConfig.roomName, defaultNotFoundImageSource);
        });
}

exports.getRoomImage = getRoomImage;