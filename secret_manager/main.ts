import { Construct } from "constructs";
import { App, TerraformStack , TerraformOutput } from "cdktf";
import { AwsProvider, secretsmanager  } from "@cdktf/provider-aws";
import { aws_profile , secret_value , secret_version_value , secret_policy_value } from "./variable/var";
class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    
    super(scope, id);

    new AwsProvider(this, "aws", {
      region: aws_profile.region,
      profile: aws_profile.profile,
    });
    const secret = new secretsmanager.SecretsmanagerSecret(this, "mysecret", {
      description:  secret_value.description,
      forceOverwriteReplicaSecret: secret_value.forceOverwriteReplicaSecret,
      kmsKeyId: secret_value.kmsKeyId,
      name: secret_value.name,
      //namePrefix: "",(conflicts with name)
      policy: secret_value.policy,
      recoveryWindowInDays: secret_value.recoveryWindowInDays,
      //rotationLambdaArn: "",(argument is deprecated)
      tags: secret_value.tags,
      replica: secret_value.replica,
        // rotationRules: {
        //   automaticallyAfterDays: 30, 
        // },
    });
    new secretsmanager.SecretsmanagerSecretVersion(this , "myversion" ,{
      secretId: secret.id,
      secretString: JSON.stringify(secret_version_value.secretString),
      //secretBinary: "",
      versionStages: secret_version_value.versionStages,
    })
    new secretsmanager.SecretsmanagerSecretPolicy(this , "mypolicy" , {
      secretArn: secret.arn,
      policy: JSON.stringify(secret_policy_value.policy),
    })
    new TerraformOutput(this, "name", {
      value: secret.name,
    });
  }
}
const app = new App();
new MyStack(app, "typescript-aws");
export {MyStack as My};
app.synth();