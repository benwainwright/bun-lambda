import { App, Stack, StackProps } from "aws-cdk-lib";
import { DockerImageAsset } from "aws-cdk-lib/aws-ecr-assets";
import { Code, Function, LayerVersion, Runtime } from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import path from "node:path";

interface BunFunctionProps {
  handler: string;
  code: Code
}

export class BunFunction extends Construct {
  constructor(context: Construct, id: string, props: BunFunctionProps) {
    super(context, id)

    const layer = new LayerVersion(this, `${id}/bun-layer`, {
      code: Code.fromDockerBuild(path.join(__dirname, ".."), {
        imagePath: '/var/runtime'
      }),
      compatibleRuntimes: [Runtime.PROVIDED_AL2],
    });

    new Function(this, `${id}/bun-function`, {
      runtime: Runtime.PROVIDED_AL2,
      code: props.code,
      handler: props.handler,
      layers: [layer]
    })
  }
}

export class BunStack extends Stack {

  constructor(context: Construct, id: string, props: StackProps) {
    super(context, id, props)

    new BunFunction(this, `bun-function`, {
      handler: 'foo',
      code: Code.fromAsset(path.join(__dirname))
    })
  }
}

const app = new App()

new BunStack(app, `bun-stack`, {
  env: {
    account: '661272765443',
    region: 'eu-west-2'
  }
})
