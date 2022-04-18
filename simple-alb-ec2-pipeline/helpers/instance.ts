import {TerraformStack} from "cdktf";
import {STACK_NAME} from "./../utils";
import {Instance, DataAwsAmi} from "@cdktf/provider-aws/lib/ec2";
import {SecurityGroup, Subnet, Vpc} from "@cdktf/provider-aws/lib/vpc";
import {IamRole, IamInstanceProfile} from "@cdktf/provider-aws/lib/iam";

interface InstanceProps {
    albsg: SecurityGroup,
    subnet: Subnet,
    vpc: Vpc,
    amiId?: string
}

export default class EC2Instance {
    stack: TerraformStack;
    props: InstanceProps;

    constructor(stack: TerraformStack, props: InstanceProps) {
        this.stack = stack;
        this.props = props;

        const ami = new DataAwsAmi(this.stack, 'amazon-ami', {
            mostRecent: true,
            owners: ['amazon'],
            filter: [{
                name: "virtualization-type",
                values: ["hvm"]
            }],
            nameRegex: "^amzn2-ami-hvm-.*x86_64-gp2"
        });

        this.props.amiId = ami.id;
    }

    private createEC2SecurityGroup() {
        return new SecurityGroup(this.stack, `${STACK_NAME}-instance-sg`, {
            name: `${STACK_NAME}-instance-sg`,
            vpcId: this.props.vpc.id,
            // allow traffic to the instance port from the application load balancer
            ingress: [{
                protocol: 'tcp',
                fromPort: 80,
                toPort: 80,
                securityGroups: [this.props.albsg.id]
            }],
            egress: [{
                protocol: "-1",
                fromPort: 0,
                toPort: 0,
                cidrBlocks: ["0.0.0.0/0"]
            }]
        })
    }

    private createRole(): IamRole {
        return new IamRole(this.stack, `${STACK_NAME}-ec2-role`, {
            name: `${STACK_NAME}-ec2-role`,
            managedPolicyArns: [
                "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
            ],
            assumeRolePolicy: JSON.stringify({
                Version: "2012-10-17",
                Statement: [
                    {
                        Action: "sts:AssumeRole",
                        Effect: "Allow",
                        Sid: "",
                        Principal: {
                            Service: "ec2.amazonaws.com",
                        },
                    },
                ],
            }),
        });
    }

    create(): Instance {
        const instanceSecurityGroup = this.createEC2SecurityGroup();
        const role = this.createRole();
        const instanceProfile = new IamInstanceProfile(this.stack, `${STACK_NAME}-instance-profile`, {
            name: `${STACK_NAME}-instance-profile`,
            role: role.id
        });

        return new Instance(this.stack, `${STACK_NAME}-instance`, {
            ami: this.props.amiId,
            instanceType: "t2.micro",
            subnetId: this.props.subnet.id,
            vpcSecurityGroupIds: [instanceSecurityGroup.id],
            associatePublicIpAddress: false,
            iamInstanceProfile: instanceProfile.id,
            userData: `
                #!/bin/bash
                sudo yum install httpd -y,
                echo "<h1>Response from server XXX</h1>" > sudo tee /var/www/html/index.html
                sudo chkconfig httpd on
                sudo service httpd start
            `,
            dependsOn: [this.props.subnet]
        });
    }
}