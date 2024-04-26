const fs = require("fs");
const moment = require("moment");

function replaceSpecialCharsAndSpacesWithDashes(inputString) {
    // Split the string into parts separated by '.'
    const parts = inputString.split(".");

    // Process all parts except the last one
    const processedParts = parts.slice(0, -1).map((part) => {
        // Replace special characters with spaces
        const stringWithSpaces = part.replace(/[^\w\s]/g, " ");

        // Replace spaces with dashes
        const stringWithDashes = stringWithSpaces.replace(/\s+/g, "-");

        return stringWithDashes;
    });

    // Join the processed parts with '.' and add the last part (without modifications)
    const result = processedParts.join(".") + "-" + moment().format("YYYYMMDDHHmmss") + "." + parts[parts.length - 1];

    return result;
}
module.exports = {
    async uploadifle(req, res) {
        try {
            let files;
            let uploadPath;
            let folder = "files/";
            if (!req.files || Object.keys(req.files).length === 0) {
                return res.status(400).send("No files were uploaded.");
            }

            // The name of the input field (i.e. "files") is used to retrieve the uploaded file
            files = req.files.files;
            if (req.body.folder) {
                folder = "files/" + req.body.folder + "/";
            }
            var dir = __dirname + "/../public/" + folder;
            console.log(fs.existsSync(dir));
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            uploadPath = dir + replaceSpecialCharsAndSpacesWithDashes(files.name);

            var fileurl = folder + replaceSpecialCharsAndSpacesWithDashes(files.name);
            // Use the mv() method to place the file somewhere on your server
            files.mv(uploadPath, function(err) {
                if (err) return res.status(500).send(err);

                res.send({
                    status: true,
                    data: fileurl,
                });
            });
        } catch (error) {
            console.log(error);
            res.send({
                status: false,
                message: "terjadi error",
            });
        }
    },
};