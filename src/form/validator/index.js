// include fs-extra package
var fs = require("fs-extra");

const source      = 'dist/resources';
const destination = '../../webapp/lib';

 var init = async function(){
        // copy source folder to destination
        fs.copy(source, destination, function (err) {
            console.log(source)
            console.log(destination)
            if (err){
                console.log('An error occured while copying the folder.')
                return console.error(err)
            }
            console.log('Copy completed!')
        });

        try {
            const filePath   = process.cwd() + "../../../webapp/manifest.json";
            const json       = await fs.readJSON(filePath);           
            const appUI5     = json["sap.ui5"]
          
            json["sap.ui5"].resourceRoots = {
                "form.validator": "./lib/form/validator",                
            }
            

            fs.writeJSON(filePath, json);
            console.log("Updated manifest");
        } catch (e) {
            console.log("Error during the manipulation of the manifest: " + e);
            throw e;
        }
    };

init();
