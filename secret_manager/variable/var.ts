export const aws_profile = {
    region: 'us-east-1',
    profile: 'hitesh',
};

export const secret_value = {
    description:  "NewSecret from Amwell",
    forceOverwriteReplicaSecret: false,
    kmsKeyId: "",
    name: "testing4",
    namePrefix: "",
    policy: "{}",
    recoveryWindowInDays: 7,
    tags: {
        "Name": "My new secret"
    },
    replica: [ {
        kmsKeyId: "",
        region: "us-east-2",
    } ],
};

export const secret_version_value = {
    secretId: "",
    secretString: {
        "username": "admin" ,
         "password": "mypass",
        },
    secretBinary: "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDt4TcI58h4G0wR+GcDY+0VJR10JNvG92jEKGaKxeMaOkfsXflVGsYXbfVBBCG/n3uHtTse7baYLB6LWQAuYWL1SHJVhhTQ7pPiocFWibAvJlVo1l7qJEDu2OxKpWEleCE+p3ufNXAy7v5UFO7EOnj0Zg6R3F/MiAWbQnaEHcYzNtogyC24YBecBLrBXZNi1g0AN1hM9k+3XvWUYTf9vPv8LIWnqo7y4Q2iEGWWurf37YFl1LzX4mG/Co+Vfe5TlZSe2YPMYWlw0ZKaKvwzInRR6dPMAflo3ABzlduiIbSdp110uGqB8i2M8eGXNDxR7Ni4nnLWnT9r1cpWhXWP6pAG4Xg8+x7+PIg/pgjgJNmsURw+jPD6+hkCw2Vz16EIgkC2b7lj0V6J4LncUoRzU/1sAzCQ4tspy3SKBUinYoxbDvXleF66FHEjfparnvNwfslBx0IJjG2uRwuX6zrsNIsGF1stEjz+eyAOtFV4/wRjRcCNDZvl1ODzIvwf8pAWddE= lgallard@server1",
    versionStages: [],
};
export const secret_policy_value = {
    blockPublicPolicy: true,
    policy: {
        "Version": "2012-10-17",
        "Statement": [
          {
            "Sid": "EnableAnotherAWSAccountToReadTheSecret",
            "Effect": "Allow",
            "Principal": {
              "AWS": "arn:aws:iam::088159611464:root"
            },
            "Action": [
                "secretsmanager:GetSecretValue",
                "secretsmanager:DescribeSecret"
            ],
            "Resource": "*"
          }
        ]
      },
    secret_arn: "",
};