import { Construct } from "constructs";
import { App, TerraformStack, TerraformOutput } from "cdktf";
import { AwsProvider } from "@cdktf/provider-aws";
import VPC from "./helpers/vpc";
import ApplicationLoadBalancer from "./helpers/loadbalancer";
import EC2Instance from "./helpers/instance";
import {AlbTargetGroupAttachment} from "@cdktf/provider-aws/lib/elb";
import {STACK_NAME} from "./utils";
import {S3Bucket} from "@cdktf/provider-aws/lib/s3";

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
	  super(scope, id);

      new AwsProvider(this, "aws", {
          region: "us-east-1",
      });

      const {vpc, publicSubnets, privateSubnets} = new VPC(this).create();

      const {alb, albTargetGroup, albSecurityGroup} = new ApplicationLoadBalancer(this, {
          subnets: publicSubnets,
          vpc
      }).create();

      const instance = new EC2Instance(this, {
          albsg: albSecurityGroup,
          vpc,
          subnet: privateSubnets[0]
      }).create();

      new AlbTargetGroupAttachment(this, `${STACK_NAME}-tg-attachment`, {
          targetGroupArn: albTargetGroup.arn,
          targetId: instance.id,
          dependsOn: [instance]
      })

      new TerraformOutput(this, "vpc_id", {
          value: vpc.id,
      });

      new TerraformOutput(this, "alb_url", {
          value: alb.dnsName,
      });

      new TerraformOutput(this, "instance_private_ip", {
          value: instance.privateIp,
      });
  }
}

const app = new App();
new MyStack(app, "BaseStack");
app.synth();
