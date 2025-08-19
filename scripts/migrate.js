"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_s3_1 = require("@aws-sdk/client-s3");
var fs_1 = require("fs");
var pg_1 = require("pg");
var dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });
// Validate environment variables
var CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
var CLOUDFLARE_ACCESS_KEY_ID = process.env.CLOUDFLARE_ACCESS_KEY_ID;
var CLOUDFLARE_SECRET_ACCESS_KEY = process.env.CLOUDFLARE_SECRET_ACCESS_KEY;
var R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;
var POSTGRES_URL = process.env.DATABASE_URL;
if (!CLOUDFLARE_ACCOUNT_ID ||
    !CLOUDFLARE_ACCESS_KEY_ID ||
    !CLOUDFLARE_SECRET_ACCESS_KEY ||
    !R2_BUCKET_NAME ||
    !POSTGRES_URL) {
    console.error("Missing requrired Environment Variables. Please check your .env.local file");
    process.exit(1);
}
// R2 S3 Client Initialization
var s3 = new client_s3_1.S3Client({
    region: "auto",
    endpoint: "https://".concat(CLOUDFLARE_ACCOUNT_ID, ".r2.cloudflarestorage.com"),
    credentials: {
        accessKeyId: CLOUDFLARE_ACCESS_KEY_ID,
        secretAccessKey: CLOUDFLARE_SECRET_ACCESS_KEY,
    },
});
// PostgreSQL Pool Initialization
var pool = new pg_1.Pool({
    connectionString: POSTGRES_URL,
});
function migrateImages() {
    return __awaiter(this, void 0, void 0, function () {
        var result, meals, _i, meals_1, meal, localImagePath, imageFileName, fileBuffer, error_1, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Starting image migration...");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 11, 12, 14]);
                    return [4 /*yield*/, pool.query("SELECT slug, image FROM meals")];
                case 2:
                    result = _a.sent();
                    meals = result.rows;
                    _i = 0, meals_1 = meals;
                    _a.label = 3;
                case 3:
                    if (!(_i < meals_1.length)) return [3 /*break*/, 10];
                    meal = meals_1[_i];
                    localImagePath = "public".concat(meal.image);
                    imageFileName = meal.image.split("/").pop();
                    if (!imageFileName) {
                        console.error("Skipping invalid image path for meal ".concat(meal.slug, ": ").concat(meal.image));
                        return [3 /*break*/, 9];
                    }
                    _a.label = 4;
                case 4:
                    _a.trys.push([4, 8, , 9]);
                    return [4 /*yield*/, fs_1.promises.readFile(localImagePath)];
                case 5:
                    fileBuffer = _a.sent();
                    return [4 /*yield*/, s3.send(new client_s3_1.PutObjectCommand({
                            Bucket: R2_BUCKET_NAME,
                            Key: imageFileName,
                            Body: fileBuffer,
                            ContentType: "image/jpeg", // Adjust content type as needed
                        }))];
                case 6:
                    _a.sent();
                    console.log("Successfully uploaded ".concat(imageFileName, " to R2."));
                    return [4 /*yield*/, pool.query("UPDATE meals SET image = $1 WHERE slug = $2", [
                            imageFileName,
                            meal.slug,
                        ])];
                case 7:
                    _a.sent();
                    console.log("Successfully updated database for meal ".concat(meal.slug, "."));
                    return [3 /*break*/, 9];
                case 8:
                    error_1 = _a.sent();
                    console.error("Failed to migrate image for meal ".concat(meal.slug, ":"), error_1.message);
                    return [3 /*break*/, 9];
                case 9:
                    _i++;
                    return [3 /*break*/, 3];
                case 10:
                    console.log("Image migration complete! ✨");
                    return [3 /*break*/, 14];
                case 11:
                    error_2 = _a.sent();
                    console.error("An error occurred during migration:", error_2.message);
                    return [3 /*break*/, 14];
                case 12: return [4 /*yield*/, pool.end()];
                case 13:
                    _a.sent();
                    return [7 /*endfinally*/];
                case 14: return [2 /*return*/];
            }
        });
    });
}
migrateImages();
