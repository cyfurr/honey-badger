"use strict";
/* eslint-disable @typescript-eslint/naming-convention */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const LogTextColor_1 = require("C:/snapshot/project/obj/models/spt/logging/LogTextColor");
// WTT imports
const WTTInstanceManager_1 = require("./WTTInstanceManager");
const CustomItemService_1 = require("./CustomItemService");
class CustomFramework {
    Instance = new WTTInstanceManager_1.WTTInstanceManager();
    version;
    modName = "ahoneybadger";
    config;
    customItemService = new CustomItemService_1.CustomItemService();
    debug = false;
    // Anything that needs done on preSptLoad, place here.
    preSptLoad(container) {
        // Initialize the instance manager DO NOTHING ELSE BEFORE THIS
        this.Instance.preSptLoad(container, this.modName);
        this.Instance.debug = this.debug;
        // EVERYTHING AFTER HERE MUST USE THE INSTANCE
        this.getVersionFromJson();
        this.displayCreditBanner();
        this.customItemService.preSptLoad(this.Instance);
    }
    // Anything that needs done on postDBLoad, place here.
    async postDBLoadAsync(container) {
        // Initialize the instance manager DO NOTHING ELSE BEFORE THIS
        this.Instance.postDBLoad(container);
        // EVERYTHING AFTER HERE MUST USE THE INSTANCE
        this.customItemService.postDBLoad();
        this.Instance.logger.log(`[${this.modName}] Database: Loading complete.`, LogTextColor_1.LogTextColor.GREEN);
    }
    getVersionFromJson() {
        const packageJsonPath = node_path_1.default.join(__dirname, "../package.json");
        node_fs_1.default.readFile(packageJsonPath, "utf-8", (err, data) => {
            if (err) {
                console.error("Error reading file:", err);
                return;
            }
            const jsonData = JSON.parse(data);
            this.version = jsonData.version;
        });
    }
    colorLog(message, color) {
        const colorCodes = {
            red: "\x1b[31m",
            green: "\x1b[32m",
            yellow: "\x1b[33m",
            blue: "\x1b[34m",
            magenta: "\x1b[35m",
            cyan: "\x1b[36m",
            white: "\x1b[37m",
            gray: "\x1b[90m",
            brightRed: "\x1b[91m",
            brightGreen: "\x1b[92m",
            brightYellow: "\x1b[93m",
            brightBlue: "\x1b[94m",
            brightMagenta: "\x1b[95m",
            brightCyan: "\x1b[96m",
            brightWhite: "\x1b[97m"
        };
        const resetCode = "\x1b[0m";
        const colorCode = colorCodes[color] || "\x1b[37m"; // Default to white if color is invalid.
        console.log(`${colorCode}${message}${resetCode}`); // Log the colored message here
    }
    displayCreditBanner() {
        this.colorLog(`[${this.modName}] Developers:  -   Code Framework: GroovypenguinX`, "green");
    }
}
module.exports = { mod: new CustomFramework() };
//# sourceMappingURL=mod.js.map