import {TerraformStack} from "cdktf";
import {STACK_NAME} from "./../utils";
import {Alb, AlbListener, AlbTargetGroup, AlbListenerRule} from "@cdktf/provider-aws/lib/elb";
import {Subnet, Vpc, SecurityGroup} from "@cdktf/provider-aws/lib/vpc";

interface AlbProps {
    subnets: Subnet[],
    vpc: Vpc
}

interface AlbResponse {
    alb: Alb,
    albTargetGroup: AlbTargetGroup
    albListener: AlbListener,
    albSecurityGroup: SecurityGroup
}

export default class ApplicationLoadBalancer {
    stack: TerraformStack;
    props: AlbProps;

    constructor(stack: TerraformStack, props: AlbProps) {
        this.stack = stack;
        this.props = props;
    }

    private createAlbSecurityGroup(): SecurityGroup {
        return new SecurityGroup(this.stack, `${STACK_NAME}-alb-sg`, {
            name: `${STACK_NAME}-alb-sg`,
            vpcId: this.props.vpc.id,
            ingress: [{
                protocol: 'tcp',
                fromPort: 80,
                toPort: 80,
                cidrBlocks: ['0.0.0.0/0']
            }],
            egress: [{
                protocol: "-1",
                fromPort: 0,
                toPort: 0,
                cidrBlocks: ["0.0.0.0/0"]
            }]
        })
    }

    create(): AlbResponse {
        const albSecurityGroup = this.createAlbSecurityGroup();

        const alb = new Alb(this.stack, `${STACK_NAME}-alb`, {
            name: `${STACK_NAME}-alb`,
            internal: false,
            loadBalancerType: "application",
            subnets: this.props.subnets.map(subnet => subnet.id),
            securityGroups: [albSecurityGroup.id]
        })

        const albTargetGroup = this.createTargetGroup();
        const albListener = this.createListener(alb, albTargetGroup);

        return { alb, albTargetGroup, albListener, albSecurityGroup };
    }

    private createListener(alb: Alb, tg: AlbTargetGroup): AlbListener {
        const listener =  new AlbListener(this.stack, `${STACK_NAME}-listener`, {
            loadBalancerArn: alb.arn,
            port: 80,
            protocol: 'HTTP',
            defaultAction: [{
                type: 'forward',
                targetGroupArn: tg.arn,
                /*fixedResponse: {
                    contentType: "text/plain",
                    messageBody: 'fixed response content',
                    statusCode: "200"
                }*/
            }]
        });

        new AlbListenerRule(this.stack, `${STACK_NAME}-listener-rule`, {
            listenerArn: listener.arn,
            dependsOn: [tg],
            priority: 1,
            action: [{
                type: 'forward',
                targetGroupArn: tg.arn
            }],
            condition: [{
                pathPattern: {
                    values: ["/"]
                }
            }]
        })

        return listener;
    }

    private createTargetGroup(): AlbTargetGroup {
        return new AlbTargetGroup(this.stack, `${STACK_NAME}-target-group`, {
            name: `${STACK_NAME}-target-group`,
            protocol: 'HTTP',
            vpcId: this.props.vpc.id,
            port: 80,
            healthCheck: {
                path: '/',
                port: "80"
            }
        });
    }
}