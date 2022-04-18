import { Construct } from "constructs";
import { App, TerraformStack , TerraformOutput , TerraformResourceLifecycle } from "cdktf";
import { AwsProvider, 
    SecretsmanagerSecretConfig,
    SecretsmanagerSecretReplica,
    SecretsmanagerSecretRotationRules,
    SecretsmanagerSecretRotationRulesOutputReference,
    SecretsmanagerSecret,
  } from '@cdktf/provider-aws';

export interface AmWellReplica {
    readonly kmskeyId: string,
    readonly region?: string,
}

export interface AmWellSecretsmanagerSecretConfig {
  readonly description?: string;
  readonly forceOverwriteReplicaSecret?: boolean;
  readonly kmsKeyId?: string;
  readonly name?: string;
  readonly policy?: string;
  readonly recoveryWindowInDays?: number;
  //readonly rotationLambdaArn?: string;
  //readonly tags?: { [key: string]: string };
  //readonly tagsAll?: { [key: string]: string };
  readonly replica?: AmWellReplica;
  //readonly rotationRules?: SecretsmanagerSecretRotationRules;
}

