"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cdktf_1 = require("cdktf");
const null_1 = require("./.gen/providers/null");
const aws_1 = require("./.gen/providers/aws");
const s3_1 = require("./.gen/providers/aws/s3");
class MyStack extends cdktf_1.TerraformStack {
    constructor(scope, name) {
        super(scope, name);
        new aws_1.AwsProvider(this, 'aws', {
            region: "us-east-2"
        });
        const bucket = new s3_1.S3Bucket(this, 's3-bucket', {
            bucketPrefix: "my-s3-bucket-temp-",
        });
        new cdktf_1.TerraformOutput(this, 's3-bucket-name', {
            value: bucket.id
        });
        const nullResource = new null_1.Resource(this, 'null-resource', {
            triggers: {
                bucket: bucket.id
            },
            dependsOn: [bucket],
            provider: new null_1.NullProvider(this, 'np')
        });
        nullResource.addOverride("provisioner", [{
                "local-exec": {
                    working_dir: "./../../../",
                    command: `node sample.js ${bucket.id}`
                }
            }]);
    }
}
const app = new cdktf_1.App();
new MyStack(app, "variable-types");
app.synth();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxpQ0FBMkQ7QUFDM0QsZ0RBQStEO0FBQy9ELDhDQUFtRDtBQUNuRCxnREFBaUQ7QUFFakQsTUFBTSxPQUFRLFNBQVEsc0JBQWM7SUFDaEMsWUFBWSxLQUFnQixFQUFFLElBQVk7UUFDdEMsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztRQUVuQixJQUFJLGlCQUFXLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRTtZQUN6QixNQUFNLEVBQUUsV0FBVztTQUN0QixDQUFDLENBQUM7UUFFSCxNQUFNLE1BQU0sR0FBRyxJQUFJLGFBQVEsQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFO1lBQzNDLFlBQVksRUFBRSxvQkFBb0I7U0FDckMsQ0FBQyxDQUFBO1FBRUYsSUFBSSx1QkFBZSxDQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBRTtZQUN4QyxLQUFLLEVBQUUsTUFBTSxDQUFDLEVBQUU7U0FDbkIsQ0FBQyxDQUFBO1FBRUYsTUFBTSxZQUFZLEdBQUcsSUFBSSxlQUFRLENBQUMsSUFBSSxFQUFFLGVBQWUsRUFBRTtZQUNyRCxRQUFRLEVBQUU7Z0JBQ04sTUFBTSxFQUFFLE1BQU0sQ0FBQyxFQUFFO2FBQ3BCO1lBQ0QsU0FBUyxFQUFFLENBQUMsTUFBTSxDQUFDO1lBQ25CLFFBQVEsRUFBRSxJQUFJLG1CQUFZLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQztTQUN6QyxDQUFDLENBQUM7UUFFSCxZQUFZLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUNyQyxZQUFZLEVBQUU7b0JBQ1YsV0FBVyxFQUFFLGFBQWE7b0JBQzFCLE9BQU8sRUFBRSxrQkFBa0IsTUFBTSxDQUFDLEVBQUUsRUFBRTtpQkFDekM7YUFDSixDQUFDLENBQUMsQ0FBQztJQUNSLENBQUM7Q0FDSjtBQUdELE1BQU0sR0FBRyxHQUFHLElBQUksV0FBRyxFQUFFLENBQUM7QUFDdEIsSUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFLGdCQUFnQixDQUFDLENBQUM7QUFDbkMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSBcImNvbnN0cnVjdHNcIjtcbmltcG9ydCB7QXBwLCBUZXJyYWZvcm1PdXRwdXQsIFRlcnJhZm9ybVN0YWNrfSBmcm9tIFwiY2RrdGZcIjtcbmltcG9ydCB7IFJlc291cmNlLCBOdWxsUHJvdmlkZXIgfSBmcm9tIFwiLi8uZ2VuL3Byb3ZpZGVycy9udWxsXCI7XG5pbXBvcnQgeyBBd3NQcm92aWRlciB9IGZyb20gXCIuLy5nZW4vcHJvdmlkZXJzL2F3c1wiO1xuaW1wb3J0IHtTM0J1Y2tldH0gZnJvbSBcIi4vLmdlbi9wcm92aWRlcnMvYXdzL3MzXCI7XG5cbmNsYXNzIE15U3RhY2sgZXh0ZW5kcyBUZXJyYWZvcm1TdGFjayB7XG4gICAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgbmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyKHNjb3BlLCBuYW1lKTtcblxuICAgICAgICBuZXcgQXdzUHJvdmlkZXIodGhpcywgJ2F3cycsIHtcbiAgICAgICAgICAgIHJlZ2lvbjogXCJ1cy1lYXN0LTJcIlxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBidWNrZXQgPSBuZXcgUzNCdWNrZXQodGhpcywgJ3MzLWJ1Y2tldCcsIHtcbiAgICAgICAgICAgIGJ1Y2tldFByZWZpeDogXCJteS1zMy1idWNrZXQtdGVtcC1cIixcbiAgICAgICAgfSlcblxuICAgICAgICBuZXcgVGVycmFmb3JtT3V0cHV0KHRoaXMsICdzMy1idWNrZXQtbmFtZScsIHtcbiAgICAgICAgICAgIHZhbHVlOiBidWNrZXQuaWRcbiAgICAgICAgfSlcblxuICAgICAgICBjb25zdCBudWxsUmVzb3VyY2UgPSBuZXcgUmVzb3VyY2UodGhpcywgJ251bGwtcmVzb3VyY2UnLCB7XG4gICAgICAgICAgICB0cmlnZ2Vyczoge1xuICAgICAgICAgICAgICAgIGJ1Y2tldDogYnVja2V0LmlkXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVwZW5kc09uOiBbYnVja2V0XSxcbiAgICAgICAgICAgIHByb3ZpZGVyOiBuZXcgTnVsbFByb3ZpZGVyKHRoaXMsICducCcpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIG51bGxSZXNvdXJjZS5hZGRPdmVycmlkZShcInByb3Zpc2lvbmVyXCIsIFt7XG4gICAgICAgICAgICBcImxvY2FsLWV4ZWNcIjoge1xuICAgICAgICAgICAgICAgIHdvcmtpbmdfZGlyOiBcIi4vLi4vLi4vLi4vXCIsXG4gICAgICAgICAgICAgICAgY29tbWFuZDogYG5vZGUgc2FtcGxlLmpzICR7YnVja2V0LmlkfWBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfV0pO1xuICAgIH1cbn1cblxuXG5jb25zdCBhcHAgPSBuZXcgQXBwKCk7XG5uZXcgTXlTdGFjayhhcHAsIFwidmFyaWFibGUtdHlwZXNcIik7XG5hcHAuc3ludGgoKTsiXX0=