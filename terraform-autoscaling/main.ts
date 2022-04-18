import { Construct } from "constructs";
import { App, TerraformStack, Token, TerraformOutput } from "cdktf";
import {Vpc} from "./.gen/modules/terraform-aws-modules/aws/vpc";
import {AwsProvider} from "@cdktf/provider-aws";
import {DataAwsAmi, LaunchTemplate} from "@cdktf/provider-aws/lib/ec2";
import {AutoscalingGroup, AutoscalingSchedule} from "@cdktf/provider-aws/lib/autoscaling";
import {SecurityGroup} from "@cdktf/provider-aws/lib/vpc";

// Cross-stack references are not fully supported currently, so using a global variable to achieve that same functionality.
let publicSubnetIds: unknown;

class MyStack1 extends TerraformStack {
    vpc: Vpc;

    constructor(scope: Construct, name: string) {
        super(scope, name);

        new AwsProvider(this, "aws", {
            region: "us-east-2",
        });

        this.vpc = this.createVpc();

        new TerraformOutput(this, 'subnets-output', {
            value: this.vpc.publicSubnetsOutput
        });

        publicSubnetIds = this.vpc.publicSubnetsOutput;
    }

    createVpc(): Vpc {
        return new Vpc(this, "vpc", {
            name: "my-vpc",
            cidr: "10.10.0.0/16",
            azs: ['us-east-2a', 'us-east-2b'],
            //enableNatGateway: false,
            //enableVpnGateway: false,
            //privateSubnets: ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"],
            publicSubnets: ['10.10.101.0/24', '10.10.102.0/24'],
        });
    }
}

interface MyStack2Props {
    vpc: Vpc,
}
class MyStack2 extends TerraformStack {
    constructor(scope: Construct, name: string, props: MyStack2Props) {
        super(scope, name);

        new AwsProvider(this, "aws", {
            region: "us-east-2",
        });
        const sg = this.createSecurityGroup(props.vpc);
        this.createAutoScalingGroup(sg);
    }

    createSecurityGroup(vpc: Vpc): SecurityGroup {
        return new SecurityGroup(this, `my-sg`, {
            name: "my-sg",
            vpcId: vpc.vpcIdOutput,
            // allow traffic to the instance port from the world
            ingress: [{
                protocol: 'tcp',
                fromPort: 80,
                toPort: 80,
                cidrBlocks: ["0.0.0.0/0"]
            }],
            egress: [{
                protocol: "-1",
                fromPort: 0,
                toPort: 0,
                cidrBlocks: ["0.0.0.0/0"]
            }]
        })
    }

    createAutoScalingGroup(sg: SecurityGroup) {
        const ami = new DataAwsAmi(this, 'amazon-ami', {
            mostRecent: true,
            owners: ['amazon'],
            filter: [{
                name: "virtualization-type",
                values: ["hvm"]
            }],
            nameRegex: "^amzn2-ami-hvm-.*x86_64-gp2"
        });
        const launchTemplate = new LaunchTemplate(this, "launch-template", {
            imageId: ami.id,
            name: "my-launch-template",
            instanceType: "t2.micro",
            vpcSecurityGroupIds: [sg.id],
            keyName: "my-key-pair-1"
        });

        const asg = new AutoscalingGroup(this, "asg", {
            name: "my-asg",
            minSize: 1,
            maxSize: 3,
            desiredCapacity: 1,
            launchTemplate: {
                id: Token.asString(launchTemplate.id),
                name: launchTemplate.name,
                version: "$Latest"
            },
            vpcZoneIdentifier: publicSubnetIds as string[],
            terminationPolicies: ['OldestInstance'],
            dependsOn: [launchTemplate]
        });

        new AutoscalingSchedule(this, "scale-up", {
            scheduledActionName: "scale-up",
            autoscalingGroupName: asg.name,
            minSize: 3,
            desiredCapacity: 3,
            maxSize: 3,
            timeZone: "Etc/UTC",
            startTime: "2022-02-22T08:25:00Z",
            recurrence: "0 0 * * *",
            dependsOn: [asg]
        });

        new AutoscalingSchedule(this, "scale-down", {
            scheduledActionName: "scale-down",
            autoscalingGroupName: asg.name,
            minSize: 1,
            desiredCapacity: 1,
            maxSize: 1,
            timeZone: "Etc/UTC",
            startTime: "2022-02-22T08:40:00Z",
            recurrence: "0 0 * * *",
            dependsOn: [asg]
        })
    }
}

const app = new App();
const {vpc} = new MyStack1(app, "VPC");
new MyStack2(app, "ASG", {vpc });
app.synth();
