import { Construct } from "constructs";
import {App, TerraformOutput, TerraformStack} from "cdktf";
import {Resource, NullProvider} from "./.gen/providers/null";
import {AwsProvider} from "./.gen/providers/aws";
import {S3Bucket} from "./.gen/providers/aws/s3";

class MyStack extends TerraformStack {
    constructor(scope: Construct, name: string) {
        super(scope, name);

        new AwsProvider(this, 'aws', {
            region: "us-east-2"
        });

        const bucket = new S3Bucket(this, 's3-bucket', {
            bucketPrefix: "my-s3-bucket-",
        })

        new TerraformOutput(this, 's3-bucket-name', {
            value: bucket.id
        })

        const nullResource1 = new Resource(this, 'null-resource-1', {
            triggers: {
                bucket: bucket.id
            },
            dependsOn: [bucket],
            provider: new NullProvider(this, 'np1')
        });

        const nullResource2 = new Resource(this, 'null-resource-2', {
            triggers: {
                bucket: bucket.id
            },
            dependsOn: [bucket],
            provider: new NullProvider(this, 'np2', {
                alias: "destroy-provider"
            })
        });

        nullResource1.addOverride("provisioner", [{
            "local-exec": {
                working_dir: "./../../../",
                command: `node sample.js ${bucket.id}`,
            }
        }]);

        nullResource2.addOverride("provisioner", [{
            "local-exec": {
                when: "destroy",
                working_dir: "./../../../",
                command: `node sample.js`,
            }
        }])
    }
}


const app = new App();
new MyStack(app, "variable-types");
app.synth();