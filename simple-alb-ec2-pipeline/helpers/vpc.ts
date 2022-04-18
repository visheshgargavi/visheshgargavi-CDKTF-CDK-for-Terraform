import {Token, TerraformStack, Fn} from "cdktf";
import {Vpc, Subnet, InternetGateway, NatGateway, RouteTable, RouteTableAssociation, SecurityGroup} from "@cdktf/provider-aws/lib/vpc";
import {Eip} from "@cdktf/provider-aws/lib/ec2";
import {STACK_NAME, AVAILABILITY_ZONES} from "./../utils";

interface VpcResponse {
    vpc: Vpc,
    publicSubnets: Subnet[],
    privateSubnets: Subnet[]
}

export default class VPC {
    stack: TerraformStack;

    constructor(stack: TerraformStack) {
        this.stack = stack;
    }

    create(): VpcResponse {
        const vpc = new Vpc(this.stack, `${STACK_NAME}-vpc`, {
            cidrBlock: '10.0.0.0/16',
            enableDnsHostnames: true,
            tags: { ['Name']: `${STACK_NAME}-vpc` }
        });

        const subnet = this.createSubnets(vpc);
        const gateway = this.createInternetAndNatGateway(vpc, subnet.publicSubnets);
        const routeTable = this.createPublicPrivateRouteTable(vpc, gateway.internetGateway, gateway.natGateway);
        this.createPublicRouteTableAssociations(subnet.publicSubnets, routeTable.publicRouteTable);
        this.createPrivateRouteTableAssociations(subnet.privateSubnets, routeTable.privateRouteTable)

        return {vpc, publicSubnets: subnet.publicSubnets, privateSubnets: subnet.privateSubnets};
    }

    private createSubnets(vpc: Vpc): {privateSubnets: Subnet[], publicSubnets: Subnet[]} {
        const publicSubnets: Subnet[] = [];
        const privateSubnets: Subnet[] = [];

        AVAILABILITY_ZONES.forEach((az, index) => {
            const publicSubnet  = new Subnet(this.stack, `${STACK_NAME}-publicSubnet-${index+1}`, {
                vpcId: Token.asString(vpc.id),
                availabilityZone: az,
                cidrBlock: Fn.cidrsubnet(vpc.cidrBlock, 8, index),
                mapPublicIpOnLaunch: true,
                tags: { ['Name']: `${STACK_NAME}-publicSubnet-${index+1}`},
                dependsOn: [vpc]
            });
            publicSubnets.push(publicSubnet);

            const privateSubnet  = new Subnet(this.stack, `${STACK_NAME}-privateSubnet-${index+1}`, {
                vpcId: Token.asString(vpc.id),
                availabilityZone: az,
                cidrBlock: Fn.cidrsubnet(vpc.cidrBlock, 8, index+128),
                mapPublicIpOnLaunch: true,
                tags: { ['Name']: `${STACK_NAME}-privateSubnet-${index+1}` },
                dependsOn: [vpc]
            });
            privateSubnets.push(privateSubnet);
        });

        return {privateSubnets, publicSubnets};
    }

    private createInternetAndNatGateway(vpc: Vpc, publicSubnets: Subnet[]) {
        /** InternetGateway */
        const internetGateway = new InternetGateway(this.stack, `${STACK_NAME}-igw`, {
            vpcId: Token.asString(vpc.id),
            tags: { ['Name']: `${STACK_NAME}-igw` }
        });

        /** NatGateway */
        const eip = new Eip(this.stack, `${STACK_NAME}-eip`, {
            vpc: true
        });
        const natGateway = new NatGateway(this.stack, `${STACK_NAME}-nat`, {
            allocationId: Token.asString(eip.id),
            subnetId: Token.asString(publicSubnets[0].id),
            tags: { ['Name']: `${STACK_NAME}-nat` }
        });

        return {internetGateway, natGateway};
    }

    private createPublicPrivateRouteTable(vpc: Vpc, internetGateway: InternetGateway, natGateway: NatGateway) {
        /** Public Route Table */
        const publicRouteTable = new RouteTable(this.stack, `${STACK_NAME}-public-rtb`, {
            vpcId: Token.asString(vpc.id),
            route: [{
                cidrBlock:              '0.0.0.0/0',
                gatewayId:              internetGateway.id,
                ipv6CidrBlock:          '',
                egressOnlyGatewayId:    '',
                instanceId:             '',
                natGatewayId:           '',
                networkInterfaceId:     '',
                transitGatewayId:       '',
                vpcPeeringConnectionId: ''
            }],
            dependsOn: [internetGateway],
            tags: { ['Name']: `${STACK_NAME}-public-rtb` }
        });

        /**　Private Route Table　*/
        const privateRouteTable =　new RouteTable(this.stack, `${STACK_NAME}-private-rtb`, {
            vpcId: vpc.id,
            route: [{
                cidrBlock:              '0.0.0.0/0',
                gatewayId:              '',
                ipv6CidrBlock:          '',
                egressOnlyGatewayId:    '',
                instanceId:             '',
                natGatewayId:           natGateway.id,
                networkInterfaceId:     '',
                transitGatewayId:       '',
                vpcPeeringConnectionId: ''
            }],
            dependsOn: [natGateway],
            tags: { ['Name']: `${STACK_NAME}-private-rtb` }
        });

        return {publicRouteTable, privateRouteTable};
    }

    private createPublicRouteTableAssociations(publicSubets: Subnet[], publicRouteTable: RouteTable) {
        publicSubets.forEach((subnet, i) => {
            new RouteTableAssociation(this.stack, `${STACK_NAME}-public-rtb-association-${i+1}`, {
                routeTableId: Token.asString(publicRouteTable.id),
                subnetId:     Token.asString(subnet.id),
                dependsOn: [publicRouteTable, subnet]
            });
        })
    }

    private createPrivateRouteTableAssociations(privateSubets: Subnet[], privateRouteTable: RouteTable) {
        privateSubets.forEach((subnet, i) => {
            new RouteTableAssociation(this.stack, `${STACK_NAME}-private-rtb-association-${i+1}`, {
                routeTableId: Token.asString(privateRouteTable.id),
                subnetId: Token.asString(subnet.id),
                dependsOn: [privateRouteTable, subnet]
            });
        });
    }
}