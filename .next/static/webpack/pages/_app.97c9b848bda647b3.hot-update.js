"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/_app",{

/***/ "./utils/segment/track.js":
/*!********************************!*\
  !*** ./utils/segment/track.js ***!
  \********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"clearUserTraits\": function() { return /* binding */ clearUserTraits; },\n/* harmony export */   \"trackCalEvent\": function() { return /* binding */ trackCalEvent; },\n/* harmony export */   \"trackExistingResidentInvited\": function() { return /* binding */ trackExistingResidentInvited; },\n/* harmony export */   \"trackFormSubmitted\": function() { return /* binding */ trackFormSubmitted; },\n/* harmony export */   \"trackNewResidentInvited\": function() { return /* binding */ trackNewResidentInvited; },\n/* harmony export */   \"trackPage\": function() { return /* binding */ trackPage; },\n/* harmony export */   \"trackResidentGroupDeleted\": function() { return /* binding */ trackResidentGroupDeleted; },\n/* harmony export */   \"trackResidentGroupDeletedNotifyExistingResident\": function() { return /* binding */ trackResidentGroupDeletedNotifyExistingResident; },\n/* harmony export */   \"trackResidentGroupDeletedNotifyNewResident\": function() { return /* binding */ trackResidentGroupDeletedNotifyNewResident; },\n/* harmony export */   \"trackResidentGroupDeletedNotifyUser\": function() { return /* binding */ trackResidentGroupDeletedNotifyUser; },\n/* harmony export */   \"trackResidentGroupMemberDeleted\": function() { return /* binding */ trackResidentGroupMemberDeleted; },\n/* harmony export */   \"trackResidentGroupMemberDeletedNotifyExistingResident\": function() { return /* binding */ trackResidentGroupMemberDeletedNotifyExistingResident; },\n/* harmony export */   \"trackResidentGroupMemberDeletedNotifyNewResident\": function() { return /* binding */ trackResidentGroupMemberDeletedNotifyNewResident; },\n/* harmony export */   \"trackResidentGroupMemberDeletedNotifyUser\": function() { return /* binding */ trackResidentGroupMemberDeletedNotifyUser; },\n/* harmony export */   \"trackUserIdentify\": function() { return /* binding */ trackUserIdentify; }\n/* harmony export */ });\n// Pages\nvar trackPage = function(pageCategory, pageName, pageProperties) {\n    analytics.page(pageCategory, pageName, pageProperties);\n};\n// Identify\nvar trackUserIdentify = function(traits) {\n    analytics.identify(traits.id, {\n        email: traits.email,\n        name: traits.name,\n        first_name: traits.first_name,\n        last_name: traits.last_name,\n        user_type: traits.user_type\n    });\n};\nvar clearUserTraits = function() {\n    analytics.user().traits({});\n};\n// Events\nvar trackCalEvent = function(analytics1, eventTitle, eventUserId, eventEmail, eventProperties) {\n    analytics1.track({\n        event: eventTitle,\n        userId: eventUserId,\n        email: eventEmail,\n        properties: {\n            name: eventProperties.name,\n            first_name: eventProperties.first_name,\n            last_name: eventProperties.last_name\n        }\n    });\n};\n// Form submitted\nvar trackFormSubmitted = function(eventTitle, eventUserId, eventEmail, eventProperties) {\n    analytics.track({\n        event: eventTitle,\n        userId: eventUserId,\n        email: eventEmail,\n        properties: {\n            name: eventProperties.name,\n            first_name: eventProperties.first_name,\n            last_name: eventProperties.last_name,\n            user_type: eventProperties.user_type\n        }\n    });\n};\n// Residents Invited\n// // Existing Resident Invited  // //\nvar trackExistingResidentInvited = function(eventTitle, eventUserId, eventEmail, eventProperties) {\n    analytics.track({\n        event: eventTitle,\n        userId: eventUserId,\n        email: eventEmail,\n        properties: {\n            invited_user: {\n                first_name: eventProperties.first_name,\n                userId: eventProperties.userId,\n                email: eventProperties.email,\n                invited_by: eventProperties.invited_by\n            }\n        }\n    });\n};\n// // New Resident Invited // //\nvar trackNewResidentInvited = function(eventTitle, eventUserId, eventEmail, eventProperties) {\n    analytics.track({\n        event: eventTitle,\n        userId: eventUserId,\n        email: eventEmail,\n        properties: {\n            invited_user: {\n                first_name: eventProperties.first_name,\n                email: eventProperties.email,\n                invited_by: eventProperties.invited_by,\n                sign_up_url: eventProperties.sign_up_url\n            }\n        }\n    });\n};\n// Resident Group Deleted //\nvar trackResidentGroupDeleted = function(eventTitle, eventUserId, eventEmail, eventProperties) {\n    analytics.track({\n        event: eventTitle,\n        userId: eventUserId,\n        email: eventEmail,\n        properties: {\n            group_id: eventProperties.group_id\n        }\n    });\n};\n// Resident Group Deleted Notify User\nvar trackResidentGroupDeletedNotifyUser = function(eventTitle, eventUserId, eventEmail, eventProperties) {\n    analytics.track({\n        event: eventTitle,\n        userId: eventUserId,\n        email: eventEmail,\n        properties: {\n            group_id: eventProperties.group_id\n        }\n    });\n};\n// Resident Group Deleted Notify New Resident\nvar trackResidentGroupDeletedNotifyNewResident = function(eventTitle, eventUserId, eventEmail, eventProperties) {\n    analytics.track({\n        event: eventTitle,\n        userId: eventUserId,\n        email: eventEmail,\n        properties: {\n            group_id: eventProperties.group_id,\n            deleted_by: eventProperties.deleted_by,\n            notified_user: {\n                first_name: eventProperties.first_name,\n                email: eventProperties.email\n            }\n        }\n    });\n};\n// Resident Group Deleted Notify Existing Resident\nvar trackResidentGroupDeletedNotifyExistingResident = function(eventTitle, eventUserId, eventEmail, eventProperties) {\n    analytics.track({\n        event: eventTitle,\n        userId: eventUserId,\n        email: eventEmail,\n        properties: {\n            group_id: eventProperties.group_id,\n            deleted_by: eventProperties.deleted_by,\n            notified_user: {\n                first_name: eventProperties.first_name,\n                email: eventProperties.email,\n                userId: eventProperties.userId\n            }\n        }\n    });\n};\n// Resident Group Member Deleted //\nvar trackResidentGroupMemberDeleted = function(eventTitle, eventUserId, eventEmail, eventProperties) {\n    analytics.track({\n        event: eventTitle,\n        userId: eventUserId,\n        email: eventEmail,\n        properties: {\n            group_id: eventProperties.group_id,\n            resident_group_member_id: eventProperties.resident_group_member_id\n        }\n    });\n};\n// Resident Group Member Deleted Notify User\nvar trackResidentGroupMemberDeletedNotifyUser = function(eventTitle, eventUserId, eventEmail, eventProperties) {\n    analytics.track({\n        event: eventTitle,\n        userId: eventUserId,\n        email: eventEmail,\n        properties: {\n            group_id: eventProperties.group_id,\n            deleted_user: {\n                first_name: eventProperties.first_name\n            }\n        }\n    });\n};\n// Resident Group Member Deleted Notify New Resident\nvar trackResidentGroupMemberDeletedNotifyNewResident = function(eventTitle, eventUserId, eventEmail, eventProperties) {\n    analytics.track({\n        event: eventTitle,\n        userId: eventUserId,\n        email: eventEmail,\n        properties: {\n            group_id: eventProperties.group_id,\n            deleted_by: eventProperties.deleted_by,\n            deleted_user: {\n                first_name: eventProperties.first_name,\n                email: eventProperties.email\n            }\n        }\n    });\n};\n// Resident Group Member Deleted Notify Existing Resident\nvar trackResidentGroupMemberDeletedNotifyExistingResident = function(eventTitle, eventUserId, eventEmail, eventProperties) {\n    analytics.track({\n        event: eventTitle,\n        userId: eventUserId,\n        email: eventEmail,\n        properties: {\n            group_id: eventProperties.group_id,\n            deleted_by: eventProperties.deleted_by,\n            deleted_user: {\n                first_name: eventProperties.first_name,\n                userId: eventProperties.userId,\n                email: eventProperties.email\n            }\n        }\n    });\n};\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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TCxXQUFXO1FBQ25CVCxLQUFLLEVBQUVVLFVBQVU7UUFDakJLLFVBQVUsRUFBRTtZQUNSUSxRQUFRLEVBQUVaLGVBQWUsQ0FBQ1ksUUFBUTtZQUNsQ0csVUFBVSxFQUFFZixlQUFlLENBQUNlLFVBQVU7WUFDdENNLFlBQVksRUFBRTtnQkFDVjlCLFVBQVUsRUFBRVMsZUFBZSxDQUFDVCxVQUFVO2dCQUN0Q1ksTUFBTSxFQUFFSCxlQUFlLENBQUNHLE1BQU07Z0JBQzlCZCxLQUFLLEVBQUVXLGVBQWUsQ0FBQ1gsS0FBSzthQUMvQjtTQUNKO0tBQ0osQ0FBQztDQUNMIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3V0aWxzL3NlZ21lbnQvdHJhY2suanM/YzkwMSJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBQYWdlc1xuXG5leHBvcnQgY29uc3QgdHJhY2tQYWdlID0gKHBhZ2VDYXRlZ29yeSwgcGFnZU5hbWUsIHBhZ2VQcm9wZXJ0aWVzKSA9PiB7XG4gICAgYW5hbHl0aWNzLnBhZ2UocGFnZUNhdGVnb3J5LCBwYWdlTmFtZSwgcGFnZVByb3BlcnRpZXMpXG59XG5cbi8vIElkZW50aWZ5XG5leHBvcnQgY29uc3QgdHJhY2tVc2VySWRlbnRpZnkgPSAodHJhaXRzKSA9PiB7XG4gICAgYW5hbHl0aWNzLmlkZW50aWZ5KHRyYWl0cy5pZCwge1xuICAgICAgZW1haWw6IHRyYWl0cy5lbWFpbCxcbiAgICAgIG5hbWU6IHRyYWl0cy5uYW1lLFxuICAgICAgZmlyc3RfbmFtZTogdHJhaXRzLmZpcnN0X25hbWUsXG4gICAgICBsYXN0X25hbWU6IHRyYWl0cy5sYXN0X25hbWUsXG4gICAgICB1c2VyX3R5cGU6IHRyYWl0cy51c2VyX3R5cGVcbiAgICB9KVxufVxuXG5leHBvcnQgY29uc3QgY2xlYXJVc2VyVHJhaXRzID0gKCkgPT4ge1xuICAgIGFuYWx5dGljcy51c2VyKCkudHJhaXRzKHt9KVxufVxuXG4vLyBFdmVudHNcbmV4cG9ydCBjb25zdCB0cmFja0NhbEV2ZW50ID0gKGFuYWx5dGljcywgZXZlbnRUaXRsZSwgZXZlbnRVc2VySWQsIGV2ZW50RW1haWwsIGV2ZW50UHJvcGVydGllcykgPT4ge1xuICAgIGFuYWx5dGljcy50cmFjayh7XG4gICAgICAgIGV2ZW50OiBldmVudFRpdGxlLFxuICAgICAgICB1c2VySWQ6IGV2ZW50VXNlcklkLFxuICAgICAgICBlbWFpbDogZXZlbnRFbWFpbCxcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgbmFtZTogZXZlbnRQcm9wZXJ0aWVzLm5hbWUsXG4gICAgICAgICAgICBmaXJzdF9uYW1lOiBldmVudFByb3BlcnRpZXMuZmlyc3RfbmFtZSxcbiAgICAgICAgICAgIGxhc3RfbmFtZTogZXZlbnRQcm9wZXJ0aWVzLmxhc3RfbmFtZVxuICAgICAgICB9XG4gICAgfSlcbn1cblxuLy8gRm9ybSBzdWJtaXR0ZWRcbmV4cG9ydCBjb25zdCB0cmFja0Zvcm1TdWJtaXR0ZWQgPSAoZXZlbnRUaXRsZSwgZXZlbnRVc2VySWQsIGV2ZW50RW1haWwsIGV2ZW50UHJvcGVydGllcykgPT4ge1xuICAgIGFuYWx5dGljcy50cmFjayh7XG4gICAgICAgIGV2ZW50OiBldmVudFRpdGxlLFxuICAgICAgICB1c2VySWQ6IGV2ZW50VXNlcklkLFxuICAgICAgICBlbWFpbDogZXZlbnRFbWFpbCxcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgbmFtZTogZXZlbnRQcm9wZXJ0aWVzLm5hbWUsXG4gICAgICAgICAgICBmaXJzdF9uYW1lOiBldmVudFByb3BlcnRpZXMuZmlyc3RfbmFtZSxcbiAgICAgICAgICAgIGxhc3RfbmFtZTogZXZlbnRQcm9wZXJ0aWVzLmxhc3RfbmFtZSxcbiAgICAgICAgICAgIHVzZXJfdHlwZTogZXZlbnRQcm9wZXJ0aWVzLnVzZXJfdHlwZSxcbiAgICAgICAgfVxuICAgIH0pXG59XG5cbi8vIFJlc2lkZW50cyBJbnZpdGVkXG4vLyAvLyBFeGlzdGluZyBSZXNpZGVudCBJbnZpdGVkICAvLyAvL1xuZXhwb3J0IGNvbnN0IHRyYWNrRXhpc3RpbmdSZXNpZGVudEludml0ZWQgPSAoZXZlbnRUaXRsZSwgZXZlbnRVc2VySWQsIGV2ZW50RW1haWwsIGV2ZW50UHJvcGVydGllcykgPT4ge1xuICAgIGFuYWx5dGljcy50cmFjayh7XG4gICAgICAgIGV2ZW50OiBldmVudFRpdGxlLFxuICAgICAgICB1c2VySWQ6IGV2ZW50VXNlcklkLFxuICAgICAgICBlbWFpbDogZXZlbnRFbWFpbCxcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgaW52aXRlZF91c2VyOiB7XG4gICAgICAgICAgICAgICAgZmlyc3RfbmFtZTogZXZlbnRQcm9wZXJ0aWVzLmZpcnN0X25hbWUsXG4gICAgICAgICAgICAgICAgdXNlcklkOiBldmVudFByb3BlcnRpZXMudXNlcklkLFxuICAgICAgICAgICAgICAgIGVtYWlsOiBldmVudFByb3BlcnRpZXMuZW1haWwsXG4gICAgICAgICAgICAgICAgaW52aXRlZF9ieTogZXZlbnRQcm9wZXJ0aWVzLmludml0ZWRfYnksXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KVxufVxuIC8vIC8vIE5ldyBSZXNpZGVudCBJbnZpdGVkIC8vIC8vXG5leHBvcnQgY29uc3QgdHJhY2tOZXdSZXNpZGVudEludml0ZWQgPSAoZXZlbnRUaXRsZSwgZXZlbnRVc2VySWQsIGV2ZW50RW1haWwsIGV2ZW50UHJvcGVydGllcykgPT4ge1xuICAgIGFuYWx5dGljcy50cmFjayh7XG4gICAgICAgIGV2ZW50OiBldmVudFRpdGxlLFxuICAgICAgICB1c2VySWQ6IGV2ZW50VXNlcklkLFxuICAgICAgICBlbWFpbDogZXZlbnRFbWFpbCxcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgaW52aXRlZF91c2VyOiB7XG4gICAgICAgICAgICAgICAgZmlyc3RfbmFtZTogZXZlbnRQcm9wZXJ0aWVzLmZpcnN0X25hbWUsXG4gICAgICAgICAgICAgICAgZW1haWw6IGV2ZW50UHJvcGVydGllcy5lbWFpbCxcbiAgICAgICAgICAgICAgICBpbnZpdGVkX2J5OiBldmVudFByb3BlcnRpZXMuaW52aXRlZF9ieSxcbiAgICAgICAgICAgICAgICBzaWduX3VwX3VybDogZXZlbnRQcm9wZXJ0aWVzLnNpZ25fdXBfdXJsLFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSlcbn1cblxuLy8gUmVzaWRlbnQgR3JvdXAgRGVsZXRlZCAvL1xuZXhwb3J0IGNvbnN0IHRyYWNrUmVzaWRlbnRHcm91cERlbGV0ZWQgPSAoZXZlbnRUaXRsZSwgZXZlbnRVc2VySWQsIGV2ZW50RW1haWwsIGV2ZW50UHJvcGVydGllcykgPT4ge1xuICAgIGFuYWx5dGljcy50cmFjayh7XG4gICAgICAgIGV2ZW50OiBldmVudFRpdGxlLFxuICAgICAgICB1c2VySWQ6IGV2ZW50VXNlcklkLFxuICAgICAgICBlbWFpbDogZXZlbnRFbWFpbCxcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgZ3JvdXBfaWQ6IGV2ZW50UHJvcGVydGllcy5ncm91cF9pZCxcbiAgICAgICAgfVxuICAgIH0pXG59XG5cbi8vIFJlc2lkZW50IEdyb3VwIERlbGV0ZWQgTm90aWZ5IFVzZXJcbmV4cG9ydCBjb25zdCB0cmFja1Jlc2lkZW50R3JvdXBEZWxldGVkTm90aWZ5VXNlciA9IChldmVudFRpdGxlLCBldmVudFVzZXJJZCwgZXZlbnRFbWFpbCwgZXZlbnRQcm9wZXJ0aWVzKSA9PiB7XG4gICAgYW5hbHl0aWNzLnRyYWNrKHtcbiAgICAgICAgZXZlbnQ6IGV2ZW50VGl0bGUsXG4gICAgICAgIHVzZXJJZDogZXZlbnRVc2VySWQsXG4gICAgICAgIGVtYWlsOiBldmVudEVtYWlsLFxuICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICBncm91cF9pZDogZXZlbnRQcm9wZXJ0aWVzLmdyb3VwX2lkLFxuICAgICAgICB9XG4gICAgfSlcbn1cblxuLy8gUmVzaWRlbnQgR3JvdXAgRGVsZXRlZCBOb3RpZnkgTmV3IFJlc2lkZW50XG5leHBvcnQgY29uc3QgdHJhY2tSZXNpZGVudEdyb3VwRGVsZXRlZE5vdGlmeU5ld1Jlc2lkZW50ID0gKGV2ZW50VGl0bGUsIGV2ZW50VXNlcklkLCBldmVudEVtYWlsLCBldmVudFByb3BlcnRpZXMpID0+IHtcbiAgICBhbmFseXRpY3MudHJhY2soe1xuICAgICAgICBldmVudDogZXZlbnRUaXRsZSxcbiAgICAgICAgdXNlcklkOiBldmVudFVzZXJJZCxcbiAgICAgICAgZW1haWw6IGV2ZW50RW1haWwsXG4gICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgIGdyb3VwX2lkOiBldmVudFByb3BlcnRpZXMuZ3JvdXBfaWQsXG4gICAgICAgICAgICBkZWxldGVkX2J5OiBldmVudFByb3BlcnRpZXMuZGVsZXRlZF9ieSxcbiAgICAgICAgICAgIG5vdGlmaWVkX3VzZXI6IHtcbiAgICAgICAgICAgICAgICBmaXJzdF9uYW1lOiBldmVudFByb3BlcnRpZXMuZmlyc3RfbmFtZSxcbiAgICAgICAgICAgICAgICBlbWFpbDogZXZlbnRQcm9wZXJ0aWVzLmVtYWlsLFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSlcbn1cblxuLy8gUmVzaWRlbnQgR3JvdXAgRGVsZXRlZCBOb3RpZnkgRXhpc3RpbmcgUmVzaWRlbnRcbmV4cG9ydCBjb25zdCB0cmFja1Jlc2lkZW50R3JvdXBEZWxldGVkTm90aWZ5RXhpc3RpbmdSZXNpZGVudCA9IChldmVudFRpdGxlLCBldmVudFVzZXJJZCwgZXZlbnRFbWFpbCwgZXZlbnRQcm9wZXJ0aWVzKSA9PiB7XG4gICAgYW5hbHl0aWNzLnRyYWNrKHtcbiAgICAgICAgZXZlbnQ6IGV2ZW50VGl0bGUsXG4gICAgICAgIHVzZXJJZDogZXZlbnRVc2VySWQsXG4gICAgICAgIGVtYWlsOiBldmVudEVtYWlsLFxuICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICBncm91cF9pZDogZXZlbnRQcm9wZXJ0aWVzLmdyb3VwX2lkLFxuICAgICAgICAgICAgZGVsZXRlZF9ieTogZXZlbnRQcm9wZXJ0aWVzLmRlbGV0ZWRfYnksXG4gICAgICAgICAgICBub3RpZmllZF91c2VyOiB7XG4gICAgICAgICAgICAgICAgZmlyc3RfbmFtZTogZXZlbnRQcm9wZXJ0aWVzLmZpcnN0X25hbWUsXG4gICAgICAgICAgICAgICAgZW1haWw6IGV2ZW50UHJvcGVydGllcy5lbWFpbCxcbiAgICAgICAgICAgICAgICB1c2VySWQ6IGV2ZW50UHJvcGVydGllcy51c2VySWQsXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KVxufVxuXG4vLyBSZXNpZGVudCBHcm91cCBNZW1iZXIgRGVsZXRlZCAvL1xuZXhwb3J0IGNvbnN0IHRyYWNrUmVzaWRlbnRHcm91cE1lbWJlckRlbGV0ZWQgPSAoZXZlbnRUaXRsZSwgZXZlbnRVc2VySWQsIGV2ZW50RW1haWwsIGV2ZW50UHJvcGVydGllcykgPT4ge1xuICAgIGFuYWx5dGljcy50cmFjayh7XG4gICAgICAgIGV2ZW50OiBldmVudFRpdGxlLFxuICAgICAgICB1c2VySWQ6IGV2ZW50VXNlcklkLFxuICAgICAgICBlbWFpbDogZXZlbnRFbWFpbCxcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgZ3JvdXBfaWQ6IGV2ZW50UHJvcGVydGllcy5ncm91cF9pZCxcbiAgICAgICAgICAgIHJlc2lkZW50X2dyb3VwX21lbWJlcl9pZDogZXZlbnRQcm9wZXJ0aWVzLnJlc2lkZW50X2dyb3VwX21lbWJlcl9pZFxuICAgICAgICB9XG4gICAgfSlcbn1cblxuLy8gUmVzaWRlbnQgR3JvdXAgTWVtYmVyIERlbGV0ZWQgTm90aWZ5IFVzZXJcbmV4cG9ydCBjb25zdCB0cmFja1Jlc2lkZW50R3JvdXBNZW1iZXJEZWxldGVkTm90aWZ5VXNlciA9IChldmVudFRpdGxlLCBldmVudFVzZXJJZCwgZXZlbnRFbWFpbCwgZXZlbnRQcm9wZXJ0aWVzKSA9PiB7XG4gICAgYW5hbHl0aWNzLnRyYWNrKHtcbiAgICAgICAgZXZlbnQ6IGV2ZW50VGl0bGUsXG4gICAgICAgIHVzZXJJZDogZXZlbnRVc2VySWQsXG4gICAgICAgIGVtYWlsOiBldmVudEVtYWlsLFxuICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICBncm91cF9pZDogZXZlbnRQcm9wZXJ0aWVzLmdyb3VwX2lkLFxuICAgICAgICAgICAgZGVsZXRlZF91c2VyOiB7XG4gICAgICAgICAgICAgICAgZmlyc3RfbmFtZTogZXZlbnRQcm9wZXJ0aWVzLmZpcnN0X25hbWUsXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KVxufVxuXG4vLyBSZXNpZGVudCBHcm91cCBNZW1iZXIgRGVsZXRlZCBOb3RpZnkgTmV3IFJlc2lkZW50XG5leHBvcnQgY29uc3QgdHJhY2tSZXNpZGVudEdyb3VwTWVtYmVyRGVsZXRlZE5vdGlmeU5ld1Jlc2lkZW50ID0gKGV2ZW50VGl0bGUsIGV2ZW50VXNlcklkLCBldmVudEVtYWlsLCBldmVudFByb3BlcnRpZXMpID0+IHtcbiAgICBhbmFseXRpY3MudHJhY2soe1xuICAgICAgICBldmVudDogZXZlbnRUaXRsZSxcbiAgICAgICAgdXNlcklkOiBldmVudFVzZXJJZCxcbiAgICAgICAgZW1haWw6IGV2ZW50RW1haWwsXG4gICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgIGdyb3VwX2lkOiBldmVudFByb3BlcnRpZXMuZ3JvdXBfaWQsXG4gICAgICAgICAgICBkZWxldGVkX2J5OiBldmVudFByb3BlcnRpZXMuZGVsZXRlZF9ieSxcbiAgICAgICAgICAgIGRlbGV0ZWRfdXNlcjoge1xuICAgICAgICAgICAgICAgIGZpcnN0X25hbWU6IGV2ZW50UHJvcGVydGllcy5maXJzdF9uYW1lLFxuICAgICAgICAgICAgICAgIGVtYWlsOiBldmVudFByb3BlcnRpZXMuZW1haWwsXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KVxufVxuXG4vLyBSZXNpZGVudCBHcm91cCBNZW1iZXIgRGVsZXRlZCBOb3RpZnkgRXhpc3RpbmcgUmVzaWRlbnRcbmV4cG9ydCBjb25zdCB0cmFja1Jlc2lkZW50R3JvdXBNZW1iZXJEZWxldGVkTm90aWZ5RXhpc3RpbmdSZXNpZGVudCA9IChldmVudFRpdGxlLCBldmVudFVzZXJJZCwgZXZlbnRFbWFpbCwgZXZlbnRQcm9wZXJ0aWVzKSA9PiB7XG4gICAgYW5hbHl0aWNzLnRyYWNrKHtcbiAgICAgICAgZXZlbnQ6IGV2ZW50VGl0bGUsXG4gICAgICAgIHVzZXJJZDogZXZlbnRVc2VySWQsXG4gICAgICAgIGVtYWlsOiBldmVudEVtYWlsLFxuICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICBncm91cF9pZDogZXZlbnRQcm9wZXJ0aWVzLmdyb3VwX2lkLFxuICAgICAgICAgICAgZGVsZXRlZF9ieTogZXZlbnRQcm9wZXJ0aWVzLmRlbGV0ZWRfYnksXG4gICAgICAgICAgICBkZWxldGVkX3VzZXI6IHtcbiAgICAgICAgICAgICAgICBmaXJzdF9uYW1lOiBldmVudFByb3BlcnRpZXMuZmlyc3RfbmFtZSxcbiAgICAgICAgICAgICAgICB1c2VySWQ6IGV2ZW50UHJvcGVydGllcy51c2VySWQsXG4gICAgICAgICAgICAgICAgZW1haWw6IGV2ZW50UHJvcGVydGllcy5lbWFpbCxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pXG59XG4iXSwibmFtZXMiOlsidHJhY2tQYWdlIiwicGFnZUNhdGVnb3J5IiwicGFnZU5hbWUiLCJwYWdlUHJvcGVydGllcyIsImFuYWx5dGljcyIsInBhZ2UiLCJ0cmFja1VzZXJJZGVudGlmeSIsInRyYWl0cyIsImlkZW50aWZ5IiwiaWQiLCJlbWFpbCIsIm5hbWUiLCJmaXJzdF9uYW1lIiwibGFzdF9uYW1lIiwidXNlcl90eXBlIiwiY2xlYXJVc2VyVHJhaXRzIiwidXNlciIsInRyYWNrQ2FsRXZlbnQiLCJldmVudFRpdGxlIiwiZXZlbnRVc2VySWQiLCJldmVudEVtYWlsIiwiZXZlbnRQcm9wZXJ0aWVzIiwidHJhY2siLCJldmVudCIsInVzZXJJZCIsInByb3BlcnRpZXMiLCJ0cmFja0Zvcm1TdWJtaXR0ZWQiLCJ0cmFja0V4aXN0aW5nUmVzaWRlbnRJbnZpdGVkIiwiaW52aXRlZF91c2VyIiwiaW52aXRlZF9ieSIsInRyYWNrTmV3UmVzaWRlbnRJbnZpdGVkIiwic2lnbl91cF91cmwiLCJ0cmFja1Jlc2lkZW50R3JvdXBEZWxldGVkIiwiZ3JvdXBfaWQiLCJ0cmFja1Jlc2lkZW50R3JvdXBEZWxldGVkTm90aWZ5VXNlciIsInRyYWNrUmVzaWRlbnRHcm91cERlbGV0ZWROb3RpZnlOZXdSZXNpZGVudCIsImRlbGV0ZWRfYnkiLCJub3RpZmllZF91c2VyIiwidHJhY2tSZXNpZGVudEdyb3VwRGVsZXRlZE5vdGlmeUV4aXN0aW5nUmVzaWRlbnQiLCJ0cmFja1Jlc2lkZW50R3JvdXBNZW1iZXJEZWxldGVkIiwicmVzaWRlbnRfZ3JvdXBfbWVtYmVyX2lkIiwidHJhY2tSZXNpZGVudEdyb3VwTWVtYmVyRGVsZXRlZE5vdGlmeVVzZXIiLCJkZWxldGVkX3VzZXIiLCJ0cmFja1Jlc2lkZW50R3JvdXBNZW1iZXJEZWxldGVkTm90aWZ5TmV3UmVzaWRlbnQiLCJ0cmFja1Jlc2lkZW50R3JvdXBNZW1iZXJEZWxldGVkTm90aWZ5RXhpc3RpbmdSZXNpZGVudCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./utils/segment/track.js\n"));

/***/ })

});