"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/supabase/resident-group-members/get";
exports.ids = ["pages/api/supabase/resident-group-members/get"];
exports.modules = {

/***/ "@supabase/supabase-js":
/*!****************************************!*\
  !*** external "@supabase/supabase-js" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@supabase/supabase-js");

/***/ }),

/***/ "(api)/./pages/api/supabase/resident-group-members/get.js":
/*!**********************************************************!*\
  !*** ./pages/api/supabase/resident-group-members/get.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _utils_supabase__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/utils/supabase */ \"(api)/./utils/supabase.js\");\n\nconst serviceSupabase = (0,_utils_supabase__WEBPACK_IMPORTED_MODULE_0__.getServiceSupabase)();\nconst handler = async (req, res)=>{\n    const userResult = [];\n    const userRequest = req.query;\n    const host = req.headers.host;\n    // error handling\n    // if (host != 'dev.stayhamlet.com') {\n    //    return res.status(404).json({ error: \"401 Unauthorized - client failed to authenticate with the server\" });\n    // }\n    if (Object.values(userRequest).length === 0) {\n        return res.status(404).json({\n            error: \"400 Invalid - invalid request, no query\"\n        });\n    }\n    console.log(\"userRequest on server: \", userRequest);\n    const userIdsToCheck = Object.values(userRequest);\n    console.log(\"userIdsToCheck: \", userIdsToCheck);\n    const checkUser = async (userId)=>{\n        let userExists = false;\n        let userEmail = null;\n        let id = null;\n        let userStatus = null;\n        let userLastName = null;\n        let userResidentGroup = null;\n        const { data: resident_group_member , error  } = await serviceSupabase.from(\"resident_group_members\").select(\"*\").eq(\"user_id\", userId);\n        if (error) {\n            console.log(\"Supabase error:\", error);\n            return error;\n        } else {\n            if (resident_group_member.length === 0) {\n                console.log(\"no resident_group_member\");\n            } else {\n                console.log(\"resident_group_member found\");\n                userExists = true;\n                userEmail = resident_group_member[0].email;\n                id = resident_group_member[0].id;\n                userStatus = resident_group_member[0].status;\n                userLastName = resident_group_member[0].last_name;\n                userResidentGroup = resident_group_member[0].resident_group_id;\n            }\n            const result = {\n                id: id,\n                email: userEmail,\n                userId: userId,\n                userExists: userExists,\n                userStatus: userStatus,\n                lastName: userLastName,\n                userResidentGroup: userResidentGroup\n            };\n            console.log(\"resident_group_member: \", resident_group_member);\n            console.log(\"result: \", result);\n            return result;\n        }\n    };\n    const checkIds = async (userIdsToCheck)=>{\n        const ids = userIdsToCheck;\n        console.log(\"for loop started\");\n        for (let id of ids){\n            console.log(\"check user inside for loop started\");\n            const result = await checkUser(id);\n            userResult.push(result);\n            console.log(\"check user inside for loop returned\");\n        }\n        console.log(\"for loop finished\");\n        console.log(\"finalResult:\", userResult);\n        return userResult;\n    };\n    try {\n        const data = await checkIds(userIdsToCheck);\n        res.status(200).json(data);\n    } catch (error) {\n        res.status(500).json({\n            error: error,\n            message: error.message\n        });\n    }\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handler);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvc3VwYWJhc2UvcmVzaWRlbnQtZ3JvdXAtbWVtYmVycy9nZXQuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBc0Q7QUFFdEQsTUFBTUMsZUFBZSxHQUFHRCxtRUFBa0IsRUFBRTtBQUU1QyxNQUFNRSxPQUFPLEdBQUcsT0FBT0MsR0FBRyxFQUFFQyxHQUFHLEdBQUs7SUFDaEMsTUFBTUMsVUFBVSxHQUFHLEVBQUU7SUFDckIsTUFBTUMsV0FBVyxHQUFHSCxHQUFHLENBQUNJLEtBQUs7SUFDN0IsTUFBTUMsSUFBSSxHQUFHTCxHQUFHLENBQUNNLE9BQU8sQ0FBQ0QsSUFBSTtJQUU3QixpQkFBaUI7SUFFakIsc0NBQXNDO0lBQ3RDLGlIQUFpSDtJQUNqSCxJQUFJO0lBRUosSUFBSUUsTUFBTSxDQUFDQyxNQUFNLENBQUNMLFdBQVcsQ0FBQyxDQUFDTSxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ3pDLE9BQU9SLEdBQUcsQ0FBQ1MsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDQyxJQUFJLENBQUM7WUFBRUMsS0FBSyxFQUFFLHlDQUF5QztTQUFFLENBQUMsQ0FBQztLQUNyRjtJQUVEQyxPQUFPLENBQUNDLEdBQUcsQ0FBQyx5QkFBeUIsRUFBRVgsV0FBVyxDQUFDO0lBRW5ELE1BQU1ZLGNBQWMsR0FBR1IsTUFBTSxDQUFDQyxNQUFNLENBQUNMLFdBQVcsQ0FBQztJQUNqRFUsT0FBTyxDQUFDQyxHQUFHLENBQUMsa0JBQWtCLEVBQUVDLGNBQWMsQ0FBQztJQUUvQyxNQUFNQyxTQUFTLEdBQUcsT0FBT0MsTUFBTSxHQUFLO1FBQ2hDLElBQUlDLFVBQVUsR0FBRyxLQUFLO1FBQ3RCLElBQUlDLFNBQVMsR0FBRyxJQUFJO1FBQ3BCLElBQUlDLEVBQUUsR0FBRyxJQUFJO1FBQ2IsSUFBSUMsVUFBVSxHQUFHLElBQUk7UUFDckIsSUFBSUMsWUFBWSxHQUFHLElBQUk7UUFDdkIsSUFBSUMsaUJBQWlCLEdBQUcsSUFBSTtRQUU1QixNQUFNLEVBQUVD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WyJ3ZWJwYWNrOi8vaGFtbGV0Ly4vcGFnZXMvYXBpL3N1cGFiYXNlL3Jlc2lkZW50LWdyb3VwLW1lbWJlcnMvZ2V0LmpzPzVhMjAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0U2VydmljZVN1cGFiYXNlIH0gZnJvbSBcIkAvdXRpbHMvc3VwYWJhc2VcIjtcblxuY29uc3Qgc2VydmljZVN1cGFiYXNlID0gZ2V0U2VydmljZVN1cGFiYXNlKClcblxuY29uc3QgaGFuZGxlciA9IGFzeW5jIChyZXEsIHJlcykgPT4ge1xuICAgIGNvbnN0IHVzZXJSZXN1bHQgPSBbXVxuICAgIGNvbnN0IHVzZXJSZXF1ZXN0ID0gcmVxLnF1ZXJ5XG4gICAgY29uc3QgaG9zdCA9IHJlcS5oZWFkZXJzLmhvc3Q7XG4gICAgXG4gICAgLy8gZXJyb3IgaGFuZGxpbmdcbiAgICBcbiAgICAvLyBpZiAoaG9zdCAhPSAnZGV2LnN0YXloYW1sZXQuY29tJykge1xuICAgIC8vICAgIHJldHVybiByZXMuc3RhdHVzKDQwNCkuanNvbih7IGVycm9yOiBcIjQwMSBVbmF1dGhvcml6ZWQgLSBjbGllbnQgZmFpbGVkIHRvIGF1dGhlbnRpY2F0ZSB3aXRoIHRoZSBzZXJ2ZXJcIiB9KTtcbiAgICAvLyB9XG4gICAgXG4gICAgaWYgKE9iamVjdC52YWx1ZXModXNlclJlcXVlc3QpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oeyBlcnJvcjogXCI0MDAgSW52YWxpZCAtIGludmFsaWQgcmVxdWVzdCwgbm8gcXVlcnlcIiB9KTtcbiAgICB9IFxuXG4gICAgY29uc29sZS5sb2coJ3VzZXJSZXF1ZXN0IG9uIHNlcnZlcjogJywgdXNlclJlcXVlc3QpXG4gICAgXG4gICAgY29uc3QgdXNlcklkc1RvQ2hlY2sgPSBPYmplY3QudmFsdWVzKHVzZXJSZXF1ZXN0KVxuICAgIGNvbnNvbGUubG9nKCd1c2VySWRzVG9DaGVjazogJywgdXNlcklkc1RvQ2hlY2spXG5cbiAgICBjb25zdCBjaGVja1VzZXIgPSBhc3luYyAodXNlcklkKSA9PiB7XG4gICAgICAgIGxldCB1c2VyRXhpc3RzID0gZmFsc2VcbiAgICAgICAgbGV0IHVzZXJFbWFpbCA9IG51bGxcbiAgICAgICAgbGV0IGlkID0gbnVsbFxuICAgICAgICBsZXQgdXNlclN0YXR1cyA9IG51bGxcbiAgICAgICAgbGV0IHVzZXJMYXN0TmFtZSA9IG51bGxcbiAgICAgICAgbGV0IHVzZXJSZXNpZGVudEdyb3VwID0gbnVsbFxuICAgIFxuICAgICAgICBjb25zdCB7IGRhdGE6IHJlc2lkZW50X2dyb3VwX21lbWJlciwgZXJyb3IgfSA9IGF3YWl0IHNlcnZpY2VTdXBhYmFzZVxuICAgICAgICAgICAgLmZyb20oXCJyZXNpZGVudF9ncm91cF9tZW1iZXJzXCIpXG4gICAgICAgICAgICAuc2VsZWN0KCcqJylcbiAgICAgICAgICAgIC5lcSgndXNlcl9pZCcsIHVzZXJJZClcbiAgICAgICAgXG4gICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU3VwYWJhc2UgZXJyb3I6XCIsIGVycm9yKVxuICAgICAgICAgICAgcmV0dXJuIGVycm9yXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChyZXNpZGVudF9ncm91cF9tZW1iZXIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibm8gcmVzaWRlbnRfZ3JvdXBfbWVtYmVyXCIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVzaWRlbnRfZ3JvdXBfbWVtYmVyIGZvdW5kXCIpO1xuICAgICAgICAgICAgICAgICAgICB1c2VyRXhpc3RzID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB1c2VyRW1haWwgPSByZXNpZGVudF9ncm91cF9tZW1iZXJbMF0uZW1haWxcbiAgICAgICAgICAgICAgICAgICAgaWQgPSByZXNpZGVudF9ncm91cF9tZW1iZXJbMF0uaWRcbiAgICAgICAgICAgICAgICAgICAgdXNlclN0YXR1cyA9IHJlc2lkZW50X2dyb3VwX21lbWJlclswXS5zdGF0dXNcbiAgICAgICAgICAgICAgICAgICAgdXNlckxhc3ROYW1lID0gcmVzaWRlbnRfZ3JvdXBfbWVtYmVyWzBdLmxhc3RfbmFtZVxuICAgICAgICAgICAgICAgICAgICB1c2VyUmVzaWRlbnRHcm91cCA9IHJlc2lkZW50X2dyb3VwX21lbWJlclswXS5yZXNpZGVudF9ncm91cF9pZFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHtpZDogaWQsIGVtYWlsOiB1c2VyRW1haWwsIHVzZXJJZDogdXNlcklkLCB1c2VyRXhpc3RzOiB1c2VyRXhpc3RzLCB1c2VyU3RhdHVzOiB1c2VyU3RhdHVzLCBsYXN0TmFtZTogdXNlckxhc3ROYW1lLCB1c2VyUmVzaWRlbnRHcm91cDogdXNlclJlc2lkZW50R3JvdXB9XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlc2lkZW50X2dyb3VwX21lbWJlcjogXCIsIHJlc2lkZW50X2dyb3VwX21lbWJlcik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlc3VsdDogXCIsIHJlc3VsdCk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IGNoZWNrSWRzID0gYXN5bmModXNlcklkc1RvQ2hlY2spID0+IHtcbiAgICAgICAgY29uc3QgaWRzID0gdXNlcklkc1RvQ2hlY2s7XG4gICAgICAgIGNvbnNvbGUubG9nKCdmb3IgbG9vcCBzdGFydGVkJyk7XG4gICAgICAgIGZvciAobGV0IGlkIG9mIGlkcykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJjaGVjayB1c2VyIGluc2lkZSBmb3IgbG9vcCBzdGFydGVkXCIpO1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY2hlY2tVc2VyKGlkKTtcbiAgICAgICAgICAgIHVzZXJSZXN1bHQucHVzaChyZXN1bHQpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNoZWNrIHVzZXIgaW5zaWRlIGZvciBsb29wIHJldHVybmVkXCIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKCdmb3IgbG9vcCBmaW5pc2hlZCcpO1xuICAgICAgICBjb25zb2xlLmxvZyhcImZpbmFsUmVzdWx0OlwiLCB1c2VyUmVzdWx0KTtcbiAgICAgICAgcmV0dXJuIHVzZXJSZXN1bHQ7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IGNoZWNrSWRzKHVzZXJJZHNUb0NoZWNrKVxuICAgICAgICByZXMuc3RhdHVzKDIwMCkuanNvbihkYXRhKVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHJlcy5zdGF0dXMoNTAwKS5qc29uKHtlcnJvcjogZXJyb3IsIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2V9KVxuICAgIH1cbiAgICAgICAgXG59XG5cbmV4cG9ydCBkZWZhdWx0IGhhbmRsZXI7Il0sIm5hbWVzIjpbImdldFNlcnZpY2VTdXBhYmFzZSIsInNlcnZpY2VTdXBhYmFzZSIsImhhbmRsZXIiLCJyZXEiLCJyZXMiLCJ1c2VyUmVzdWx0IiwidXNlclJlcXVlc3QiLCJxdWVyeSIsImhvc3QiLCJoZWFkZXJzIiwiT2JqZWN0IiwidmFsdWVzIiwibGVuZ3RoIiwic3RhdHVzIiwianNvbiIsImVycm9yIiwiY29uc29sZSIsImxvZyIsInVzZXJJZHNUb0NoZWNrIiwiY2hlY2tVc2VyIiwidXNlcklkIiwidXNlckV4aXN0cyIsInVzZXJFbWFpbCIsImlkIiwidXNlclN0YXR1cyIsInVzZXJMYXN0TmFtZSIsInVzZXJSZXNpZGVudEdyb3VwIiwiZGF0YSIsInJlc2lkZW50X2dyb3VwX21lbWJlciIsImZyb20iLCJzZWxlY3QiLCJlcSIsImVtYWlsIiwibGFzdF9uYW1lIiwicmVzaWRlbnRfZ3JvdXBfaWQiLCJyZXN1bHQiLCJsYXN0TmFtZSIsImNoZWNrSWRzIiwiaWRzIiwicHVzaCIsIm1lc3NhZ2UiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./pages/api/supabase/resident-group-members/get.js\n");

/***/ }),

/***/ "(api)/./utils/supabase.js":
/*!***************************!*\
  !*** ./utils/supabase.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createResidentGroup\": () => (/* binding */ createResidentGroup),\n/* harmony export */   \"getOnboardingStatus\": () => (/* binding */ getOnboardingStatus),\n/* harmony export */   \"getServiceSupabase\": () => (/* binding */ getServiceSupabase),\n/* harmony export */   \"postOnboardingData\": () => (/* binding */ postOnboardingData),\n/* harmony export */   \"supabase\": () => (/* binding */ supabase)\n/* harmony export */ });\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/supabase-js */ \"@supabase/supabase-js\");\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__);\n// utils/supabase.js\n\nconst supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;\nconst supabase = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(\"https://cijtrwqqphdofjmlvaee.supabase.co\", \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpanRyd3FxcGhkb2ZqbWx2YWVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTc2MjQ0NDQsImV4cCI6MTk3MzIwMDQ0NH0.NWwgCaesEAB1YP9ydq_iulwKZYhKeKFMIDuQy7jw-VA\");\nconst getServiceSupabase = ()=>(0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(\"https://cijtrwqqphdofjmlvaee.supabase.co\", supabaseServiceKey);\nconst getOnboardingStatus = async (userId)=>{\n    const supabase = getSupabase(userId);\n    let { data: users1 , error  } = await supabase.from(\"users\").select(\"is_onboarding\").eq(\"user_id\", userId);\n    const onboardingStatus = users1[0].is_onboarding;\n    return onboardingStatus;\n};\nconst postOnboardingData = async (userId, formData)=>{\n    try {\n        const supabase = getSupabase(userId);\n        let { data: users1 , error  } = await supabase.from(\"users\").update({\n            user_type: formData.userType,\n            first_name: formData.firstName,\n            last_name: formData.lastName,\n            is_onboarding: false\n        }).eq(\"user_id\", userId).select();\n    } catch (error1) {\n        console.log(error1);\n        const errorString = JSON.stringify(error1);\n        return res.status(400).json({\n            errorString\n        });\n    }\n    const response = users;\n    return response;\n};\nasync function createResidentGroup(request) {\n    try {\n        const res1 = await fetch(`/api/supabase/resident-groups/create` + \"?\" + new URLSearchParams(request).toString());\n        const data = await res1.json();\n        console.log(\"API result: \", data);\n        return data;\n    } catch (err) {\n        console.log(\"API error: \", err);\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi91dGlscy9zdXBhYmFzZS5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsb0JBQW9CO0FBQ2dDO0FBRXBELE1BQU1DLGtCQUFrQixHQUFHQyxPQUFPLENBQUNDLEdBQUcsQ0FBQ0Msb0JBQW9CO0FBRXBELE1BQU1DLFFBQVEsR0FBR0wsbUVBQVksQ0FDaENFLDBDQUFvQyxFQUNwQ0Esa05BQXlDLENBQzVDO0FBRU0sTUFBTU0sa0JBQWtCLEdBQUcsSUFBTVIsbUVBQVksQ0FDbERFLDBDQUFvQyxFQUNwQ0Qsa0JBQWtCLENBQ25CO0FBRU0sTUFBTVEsbUJBQW1CLEdBQUcsT0FBT0MsTUFBTSxHQUFLO0lBQ25ELE1BQU1MLFFBQVEsR0FBR00sV0FBVyxDQUFDRCxNQUFNLENBQUM7SUFDcEMsSUFBSSxFQUFFRSxJQUFJLEVBQUVDLE1BQUssR0FBRUMsS0FBSyxHQUFFLEdBQUcsTUFBTVQsUUFBUSxDQUN4Q1UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUNiQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQ3ZCQyxFQUFFLENBQUMsU0FBUyxFQUFFUCxNQUFNLENBQUM7SUFFdEIsTUFBTVEsZ0JBQWdCLEdBQUdMLE1BQUssQ0FBQyxDQUFDLENBQUMsQ0FBQ00sYUFBYTtJQUUvQyxPQUFPRCxnQkFBZ0I7Q0FDeEI7QUFFSSxNQUFNRSxrQkFBa0IsR0FBRyxPQUFPVixNQUFNLEVBQUVXLFFBQVEsR0FBSztJQUM1RCxJQUFJO1FBQ0YsTUFBTWhCLFFBQVEsR0FBR00sV0FBVyxDQUFDRCxNQUFNLENBQUM7UUFDcEMsSUFBSSxFQUFFRSxJQUFJLEVBQUVDLE1BQUssR0FBRUMsS0FBSyxHQUFFLEdBQUcsTUFBTVQsUUFBUSxDQUN4Q1UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUNiTyxNQUFNLENBQ0w7WUFDRUMsU0FBUyxFQUFFRixRQUFRLENBQUNHLFFBQVE7WUFDNUJDLFVBQVUsRUFBRUosUUFBUSxDQUFDSyxTQUFTO1lBQzlCQyxTQUFTLEVBQUVOLFFBQVEsQ0FBQ08sUUFBUTtZQUM1QlQsYUFBYSxFQUFFLEtBQUs7U0FDckIsQ0FDRixDQUNBRixFQUFFLENBQUMsU0FBUyxFQUFFUCxNQUFNLENBQUMsQ0FDckJNLE1BQU0sRUFBRTtLQUNaLENBQUMsT0FBT0YsTUFBSyxFQUFFO1FBQ1plLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDaEIsTUFBSyxDQUFDO1FBQ2xCLE1BQU1pQixXQUFXLEdBQUdDLElBQUksQ0FBQ0MsU0FBUyxDQUFDbkIsTUFBSyxDQUFDO1FBQ3pDLE9BQU9vQixHQUFHLENBQUNDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQ0MsSUFBSSxDQUFDO1lBQUVMLFdBQVc7U0FBRSxDQUFDO0tBQy9DO0lBQ0MsTUFBTU0sUUFBUSxHQUFHeEIsS0FBSztJQUN0QixPQUFPd0IsUUFBUTtDQUNsQjtBQUVNLGVBQWVDLG1CQUFtQixDQUFFQyxPQUFPLEVBQUU7SUFDbEQsSUFBSTtRQUNBLE1BQU1MLElBQUcsR0FBRyxNQUFNTSxLQUFLLENBQUMsQ0FBQyxvQ0FBb0MsQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFLQyxlQUFlLENBQUNGLE9BQU8sQ0FBQyxDQUFFRyxRQUFRLEVBQUUsQ0FBQztRQUNqSCxNQUFNOUIsSUFBSSxHQUFHLE1BQU1zQixJQUFHLENBQUNFLElBQUksRUFBRTtRQUM3QlAsT0FBTyxDQUFDQyxHQUFHLENBQUMsY0FBYyxFQUFFbEIsSUFBSSxDQUFDLENBQUM7UUFDbEMsT0FBT0EsSUFBSTtLQUNkLENBQUMsT0FBTytCLEdBQUcsRUFBRTtRQUNWZCxPQUFPLENBQUNDLEdBQUcsQ0FBQyxhQUFhLEVBQUVhLEdBQUcsQ0FBQyxDQUFDO0tBQ25DO0NBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9oYW1sZXQvLi91dGlscy9zdXBhYmFzZS5qcz80MDZkIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIHV0aWxzL3N1cGFiYXNlLmpzXG5pbXBvcnQgeyBjcmVhdGVDbGllbnQgfSBmcm9tICdAc3VwYWJhc2Uvc3VwYWJhc2UtanMnXG5cbmNvbnN0IHN1cGFiYXNlU2VydmljZUtleSA9IHByb2Nlc3MuZW52LlNVUEFCQVNFX1NFUlZJQ0VfS0VZXG5cbmV4cG9ydCBjb25zdCBzdXBhYmFzZSA9IGNyZWF0ZUNsaWVudChcbiAgICBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19TVVBBQkFTRV9VUkwsXG4gICAgcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfU1VQQUJBU0VfQU5PTl9LRVlcbilcblxuZXhwb3J0IGNvbnN0IGdldFNlcnZpY2VTdXBhYmFzZSA9ICgpID0+IGNyZWF0ZUNsaWVudChcbiAgcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfU1VQQUJBU0VfVVJMLFxuICBzdXBhYmFzZVNlcnZpY2VLZXlcbilcblxuZXhwb3J0IGNvbnN0IGdldE9uYm9hcmRpbmdTdGF0dXMgPSBhc3luYyAodXNlcklkKSA9PiB7XG4gIGNvbnN0IHN1cGFiYXNlID0gZ2V0U3VwYWJhc2UodXNlcklkKVxuICBsZXQgeyBkYXRhOiB1c2VycywgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgLmZyb20oJ3VzZXJzJylcbiAgICAuc2VsZWN0KCdpc19vbmJvYXJkaW5nJylcbiAgICAuZXEoJ3VzZXJfaWQnLCB1c2VySWQpXG5cbiAgICBjb25zdCBvbmJvYXJkaW5nU3RhdHVzID0gdXNlcnNbMF0uaXNfb25ib2FyZGluZ1xuICAgIFxuICAgIHJldHVybiBvbmJvYXJkaW5nU3RhdHVzXG4gIH1cblxuZXhwb3J0IGNvbnN0IHBvc3RPbmJvYXJkaW5nRGF0YSA9IGFzeW5jICh1c2VySWQsIGZvcm1EYXRhKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3Qgc3VwYWJhc2UgPSBnZXRTdXBhYmFzZSh1c2VySWQpXG4gICAgbGV0IHsgZGF0YTogdXNlcnMsIGVycm9yIH0gPSBhd2FpdCBzdXBhYmFzZVxuICAgICAgLmZyb20oJ3VzZXJzJylcbiAgICAgIC51cGRhdGUoXG4gICAgICAgIHtcbiAgICAgICAgICB1c2VyX3R5cGU6IGZvcm1EYXRhLnVzZXJUeXBlLCBcbiAgICAgICAgICBmaXJzdF9uYW1lOiBmb3JtRGF0YS5maXJzdE5hbWUsIFxuICAgICAgICAgIGxhc3RfbmFtZTogZm9ybURhdGEubGFzdE5hbWUsIFxuICAgICAgICAgIGlzX29uYm9hcmRpbmc6IGZhbHNlXG4gICAgICAgIH1cbiAgICAgIClcbiAgICAgIC5lcSgndXNlcl9pZCcsIHVzZXJJZClcbiAgICAgIC5zZWxlY3QoKVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coZXJyb3IpXG4gICAgICBjb25zdCBlcnJvclN0cmluZyA9IEpTT04uc3RyaW5naWZ5KGVycm9yKVxuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAwKS5qc29uKHsgZXJyb3JTdHJpbmcgfSlcbiAgfVxuICAgIGNvbnN0IHJlc3BvbnNlID0gdXNlcnMgXG4gICAgcmV0dXJuIHJlc3BvbnNlXG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjcmVhdGVSZXNpZGVudEdyb3VwIChyZXF1ZXN0KSB7XG4gIHRyeSB7XG4gICAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChgL2FwaS9zdXBhYmFzZS9yZXNpZGVudC1ncm91cHMvY3JlYXRlYCArICc/JyArIChuZXcgVVJMU2VhcmNoUGFyYW1zKHJlcXVlc3QpKS50b1N0cmluZygpKTtcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXMuanNvbigpO1xuICAgICAgY29uc29sZS5sb2coXCJBUEkgcmVzdWx0OiBcIiwgZGF0YSk7XG4gICAgICByZXR1cm4gZGF0YVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiQVBJIGVycm9yOiBcIiwgZXJyKTtcbiAgfVxufVxuXG5cbiAgIl0sIm5hbWVzIjpbImNyZWF0ZUNsaWVudCIsInN1cGFiYXNlU2VydmljZUtleSIsInByb2Nlc3MiLCJlbnYiLCJTVVBBQkFTRV9TRVJWSUNFX0tFWSIsInN1cGFiYXNlIiwiTkVYVF9QVUJMSUNfU1VQQUJBU0VfVVJMIiwiTkVYVF9QVUJMSUNfU1VQQUJBU0VfQU5PTl9LRVkiLCJnZXRTZXJ2aWNlU3VwYWJhc2UiLCJnZXRPbmJvYXJkaW5nU3RhdHVzIiwidXNlcklkIiwiZ2V0U3VwYWJhc2UiLCJkYXRhIiwidXNlcnMiLCJlcnJvciIsImZyb20iLCJzZWxlY3QiLCJlcSIsIm9uYm9hcmRpbmdTdGF0dXMiLCJpc19vbmJvYXJkaW5nIiwicG9zdE9uYm9hcmRpbmdEYXRhIiwiZm9ybURhdGEiLCJ1cGRhdGUiLCJ1c2VyX3R5cGUiLCJ1c2VyVHlwZSIsImZpcnN0X25hbWUiLCJmaXJzdE5hbWUiLCJsYXN0X25hbWUiLCJsYXN0TmFtZSIsImNvbnNvbGUiLCJsb2ciLCJlcnJvclN0cmluZyIsIkpTT04iLCJzdHJpbmdpZnkiLCJyZXMiLCJzdGF0dXMiLCJqc29uIiwicmVzcG9uc2UiLCJjcmVhdGVSZXNpZGVudEdyb3VwIiwicmVxdWVzdCIsImZldGNoIiwiVVJMU2VhcmNoUGFyYW1zIiwidG9TdHJpbmciLCJlcnIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./utils/supabase.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/supabase/resident-group-members/get.js"));
module.exports = __webpack_exports__;

})();