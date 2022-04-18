"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("cdktf/lib/testing/adapters/jest"); // Load types for expect matchers
// import { Testing } from "cdktf";
describe("My CDKTF Application", () => {
    // The tests below are example tests, you can find more information at
    // https://cdk.tf/testing
    it.todo("should be tested");
    // // All Unit testst test the synthesised terraform code, it does not create real-world resources
    // describe("Unit testing using assertions", () => {
    //   it("should contain a resource", () => {
    //     // import { Image,Container } from "./.gen/providers/docker"
    //     expect(
    //       Testing.synthScope((scope) => {
    //         new MyApplicationsAbstraction(scope, "my-app", {});
    //       })
    //     ).toHaveResource(Container);
    //     expect(
    //       Testing.synthScope((scope) => {
    //         new MyApplicationsAbstraction(scope, "my-app", {});
    //       })
    //     ).toHaveResourceWithProperties(Image, { name: "ubuntu:latest" });
    //   });
    // });
    // describe("Unit testing using snapshots", () => {
    //   it("Tests the snapshot", () => {
    //     const app = Testing.app();
    //     const stack = new TerraformStack(app, "test");
    //     new TestProvider(stack, "provider", {
    //       accessKey: "1",
    //     });
    //     new TestResource(stack, "test", {
    //       name: "my-resource",
    //     });
    //     expect(Testing.synth(stack)).toMatchSnapshot();
    //   });
    //   it("Tests a combination of resources", () => {
    //     expect(
    //       Testing.synthScope((stack) => {
    //         new TestDataSource(stack, "test-data-source", {
    //           name: "foo",
    //         });
    //         new TestResource(stack, "test-resource", {
    //           name: "bar",
    //         });
    //       })
    //     ).toMatchInlineSnapshot();
    //   });
    // });
    // describe("Checking validity", () => {
    //   it("check if the produced terraform configuration is valid", () => {
    //     const app = Testing.app();
    //     const stack = new TerraformStack(app, "test");
    //     new TestDataSource(stack, "test-data-source", {
    //       name: "foo",
    //     });
    //     new TestResource(stack, "test-resource", {
    //       name: "bar",
    //     });
    //     expect(Testing.fullSynth(app)).toBeValidTerraform();
    //   });
    //   it("check if this can be planned", () => {
    //     const app = Testing.app();
    //     const stack = new TerraformStack(app, "test");
    //     new TestDataSource(stack, "test-data-source", {
    //       name: "foo",
    //     });
    //     new TestResource(stack, "test-resource", {
    //       name: "bar",
    //     });
    //     expect(Testing.fullSynth(app)).toPlanSuccessfully();
    //   });
    // });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi10ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi10ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkNBQXlDLENBQUMsaUNBQWlDO0FBQzNFLG1DQUFtQztBQUVuQyxRQUFRLENBQUMsc0JBQXNCLEVBQUUsR0FBRyxFQUFFO0lBQ3BDLHNFQUFzRTtJQUN0RSx5QkFBeUI7SUFDekIsRUFBRSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBRTVCLGtHQUFrRztJQUNsRyxvREFBb0Q7SUFDcEQsNENBQTRDO0lBQzVDLG1FQUFtRTtJQUNuRSxjQUFjO0lBQ2Qsd0NBQXdDO0lBQ3hDLDhEQUE4RDtJQUM5RCxXQUFXO0lBQ1gsbUNBQW1DO0lBRW5DLGNBQWM7SUFDZCx3Q0FBd0M7SUFDeEMsOERBQThEO0lBQzlELFdBQVc7SUFDWCx3RUFBd0U7SUFDeEUsUUFBUTtJQUNSLE1BQU07SUFFTixtREFBbUQ7SUFDbkQscUNBQXFDO0lBQ3JDLGlDQUFpQztJQUNqQyxxREFBcUQ7SUFFckQsNENBQTRDO0lBQzVDLHdCQUF3QjtJQUN4QixVQUFVO0lBRVYsd0NBQXdDO0lBQ3hDLDZCQUE2QjtJQUM3QixVQUFVO0lBRVYsc0RBQXNEO0lBQ3RELFFBQVE7SUFFUixtREFBbUQ7SUFDbkQsY0FBYztJQUNkLHdDQUF3QztJQUN4QywwREFBMEQ7SUFDMUQseUJBQXlCO0lBQ3pCLGNBQWM7SUFFZCxxREFBcUQ7SUFDckQseUJBQXlCO0lBQ3pCLGNBQWM7SUFDZCxXQUFXO0lBQ1gsaUNBQWlDO0lBQ2pDLFFBQVE7SUFDUixNQUFNO0lBRU4sd0NBQXdDO0lBQ3hDLHlFQUF5RTtJQUN6RSxpQ0FBaUM7SUFDakMscURBQXFEO0lBRXJELHNEQUFzRDtJQUN0RCxxQkFBcUI7SUFDckIsVUFBVTtJQUVWLGlEQUFpRDtJQUNqRCxxQkFBcUI7SUFDckIsVUFBVTtJQUNWLDJEQUEyRDtJQUMzRCxRQUFRO0lBRVIsK0NBQStDO0lBQy9DLGlDQUFpQztJQUNqQyxxREFBcUQ7SUFFckQsc0RBQXNEO0lBQ3RELHFCQUFxQjtJQUNyQixVQUFVO0lBRVYsaURBQWlEO0lBQ2pELHFCQUFxQjtJQUNyQixVQUFVO0lBQ1YsMkRBQTJEO0lBQzNELFFBQVE7SUFDUixNQUFNO0FBQ1IsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXCJjZGt0Zi9saWIvdGVzdGluZy9hZGFwdGVycy9qZXN0XCI7IC8vIExvYWQgdHlwZXMgZm9yIGV4cGVjdCBtYXRjaGVyc1xuLy8gaW1wb3J0IHsgVGVzdGluZyB9IGZyb20gXCJjZGt0ZlwiO1xuXG5kZXNjcmliZShcIk15IENES1RGIEFwcGxpY2F0aW9uXCIsICgpID0+IHtcbiAgLy8gVGhlIHRlc3RzIGJlbG93IGFyZSBleGFtcGxlIHRlc3RzLCB5b3UgY2FuIGZpbmQgbW9yZSBpbmZvcm1hdGlvbiBhdFxuICAvLyBodHRwczovL2Nkay50Zi90ZXN0aW5nXG4gIGl0LnRvZG8oXCJzaG91bGQgYmUgdGVzdGVkXCIpO1xuXG4gIC8vIC8vIEFsbCBVbml0IHRlc3RzdCB0ZXN0IHRoZSBzeW50aGVzaXNlZCB0ZXJyYWZvcm0gY29kZSwgaXQgZG9lcyBub3QgY3JlYXRlIHJlYWwtd29ybGQgcmVzb3VyY2VzXG4gIC8vIGRlc2NyaWJlKFwiVW5pdCB0ZXN0aW5nIHVzaW5nIGFzc2VydGlvbnNcIiwgKCkgPT4ge1xuICAvLyAgIGl0KFwic2hvdWxkIGNvbnRhaW4gYSByZXNvdXJjZVwiLCAoKSA9PiB7XG4gIC8vICAgICAvLyBpbXBvcnQgeyBJbWFnZSxDb250YWluZXIgfSBmcm9tIFwiLi8uZ2VuL3Byb3ZpZGVycy9kb2NrZXJcIlxuICAvLyAgICAgZXhwZWN0KFxuICAvLyAgICAgICBUZXN0aW5nLnN5bnRoU2NvcGUoKHNjb3BlKSA9PiB7XG4gIC8vICAgICAgICAgbmV3IE15QXBwbGljYXRpb25zQWJzdHJhY3Rpb24oc2NvcGUsIFwibXktYXBwXCIsIHt9KTtcbiAgLy8gICAgICAgfSlcbiAgLy8gICAgICkudG9IYXZlUmVzb3VyY2UoQ29udGFpbmVyKTtcblxuICAvLyAgICAgZXhwZWN0KFxuICAvLyAgICAgICBUZXN0aW5nLnN5bnRoU2NvcGUoKHNjb3BlKSA9PiB7XG4gIC8vICAgICAgICAgbmV3IE15QXBwbGljYXRpb25zQWJzdHJhY3Rpb24oc2NvcGUsIFwibXktYXBwXCIsIHt9KTtcbiAgLy8gICAgICAgfSlcbiAgLy8gICAgICkudG9IYXZlUmVzb3VyY2VXaXRoUHJvcGVydGllcyhJbWFnZSwgeyBuYW1lOiBcInVidW50dTpsYXRlc3RcIiB9KTtcbiAgLy8gICB9KTtcbiAgLy8gfSk7XG5cbiAgLy8gZGVzY3JpYmUoXCJVbml0IHRlc3RpbmcgdXNpbmcgc25hcHNob3RzXCIsICgpID0+IHtcbiAgLy8gICBpdChcIlRlc3RzIHRoZSBzbmFwc2hvdFwiLCAoKSA9PiB7XG4gIC8vICAgICBjb25zdCBhcHAgPSBUZXN0aW5nLmFwcCgpO1xuICAvLyAgICAgY29uc3Qgc3RhY2sgPSBuZXcgVGVycmFmb3JtU3RhY2soYXBwLCBcInRlc3RcIik7XG5cbiAgLy8gICAgIG5ldyBUZXN0UHJvdmlkZXIoc3RhY2ssIFwicHJvdmlkZXJcIiwge1xuICAvLyAgICAgICBhY2Nlc3NLZXk6IFwiMVwiLFxuICAvLyAgICAgfSk7XG5cbiAgLy8gICAgIG5ldyBUZXN0UmVzb3VyY2Uoc3RhY2ssIFwidGVzdFwiLCB7XG4gIC8vICAgICAgIG5hbWU6IFwibXktcmVzb3VyY2VcIixcbiAgLy8gICAgIH0pO1xuXG4gIC8vICAgICBleHBlY3QoVGVzdGluZy5zeW50aChzdGFjaykpLnRvTWF0Y2hTbmFwc2hvdCgpO1xuICAvLyAgIH0pO1xuXG4gIC8vICAgaXQoXCJUZXN0cyBhIGNvbWJpbmF0aW9uIG9mIHJlc291cmNlc1wiLCAoKSA9PiB7XG4gIC8vICAgICBleHBlY3QoXG4gIC8vICAgICAgIFRlc3Rpbmcuc3ludGhTY29wZSgoc3RhY2spID0+IHtcbiAgLy8gICAgICAgICBuZXcgVGVzdERhdGFTb3VyY2Uoc3RhY2ssIFwidGVzdC1kYXRhLXNvdXJjZVwiLCB7XG4gIC8vICAgICAgICAgICBuYW1lOiBcImZvb1wiLFxuICAvLyAgICAgICAgIH0pO1xuXG4gIC8vICAgICAgICAgbmV3IFRlc3RSZXNvdXJjZShzdGFjaywgXCJ0ZXN0LXJlc291cmNlXCIsIHtcbiAgLy8gICAgICAgICAgIG5hbWU6IFwiYmFyXCIsXG4gIC8vICAgICAgICAgfSk7XG4gIC8vICAgICAgIH0pXG4gIC8vICAgICApLnRvTWF0Y2hJbmxpbmVTbmFwc2hvdCgpO1xuICAvLyAgIH0pO1xuICAvLyB9KTtcblxuICAvLyBkZXNjcmliZShcIkNoZWNraW5nIHZhbGlkaXR5XCIsICgpID0+IHtcbiAgLy8gICBpdChcImNoZWNrIGlmIHRoZSBwcm9kdWNlZCB0ZXJyYWZvcm0gY29uZmlndXJhdGlvbiBpcyB2YWxpZFwiLCAoKSA9PiB7XG4gIC8vICAgICBjb25zdCBhcHAgPSBUZXN0aW5nLmFwcCgpO1xuICAvLyAgICAgY29uc3Qgc3RhY2sgPSBuZXcgVGVycmFmb3JtU3RhY2soYXBwLCBcInRlc3RcIik7XG5cbiAgLy8gICAgIG5ldyBUZXN0RGF0YVNvdXJjZShzdGFjaywgXCJ0ZXN0LWRhdGEtc291cmNlXCIsIHtcbiAgLy8gICAgICAgbmFtZTogXCJmb29cIixcbiAgLy8gICAgIH0pO1xuXG4gIC8vICAgICBuZXcgVGVzdFJlc291cmNlKHN0YWNrLCBcInRlc3QtcmVzb3VyY2VcIiwge1xuICAvLyAgICAgICBuYW1lOiBcImJhclwiLFxuICAvLyAgICAgfSk7XG4gIC8vICAgICBleHBlY3QoVGVzdGluZy5mdWxsU3ludGgoYXBwKSkudG9CZVZhbGlkVGVycmFmb3JtKCk7XG4gIC8vICAgfSk7XG5cbiAgLy8gICBpdChcImNoZWNrIGlmIHRoaXMgY2FuIGJlIHBsYW5uZWRcIiwgKCkgPT4ge1xuICAvLyAgICAgY29uc3QgYXBwID0gVGVzdGluZy5hcHAoKTtcbiAgLy8gICAgIGNvbnN0IHN0YWNrID0gbmV3IFRlcnJhZm9ybVN0YWNrKGFwcCwgXCJ0ZXN0XCIpO1xuXG4gIC8vICAgICBuZXcgVGVzdERhdGFTb3VyY2Uoc3RhY2ssIFwidGVzdC1kYXRhLXNvdXJjZVwiLCB7XG4gIC8vICAgICAgIG5hbWU6IFwiZm9vXCIsXG4gIC8vICAgICB9KTtcblxuICAvLyAgICAgbmV3IFRlc3RSZXNvdXJjZShzdGFjaywgXCJ0ZXN0LXJlc291cmNlXCIsIHtcbiAgLy8gICAgICAgbmFtZTogXCJiYXJcIixcbiAgLy8gICAgIH0pO1xuICAvLyAgICAgZXhwZWN0KFRlc3RpbmcuZnVsbFN5bnRoKGFwcCkpLnRvUGxhblN1Y2Nlc3NmdWxseSgpO1xuICAvLyAgIH0pO1xuICAvLyB9KTtcbn0pO1xuIl19