# Disco API

## Overview

Back-end application built using AWS CDK.

## Requirements

```shell script
➜ go version
go version go1.15 darwin/amd64
```

## Local run

Run:
```shell script
go get github.com/go-task/task/cmd/task
task install
task test
task build
```

## Check deployment infrastructure

Requirements:
```shell script
➜ npm -v
6.14.8
```

Run:
```shell script
task synth-local
```

## Utils

### Update CDK deps

```shell script
npx npm-check-updates -u
```

### Adding CDK deps

```shell script
npm install --save @aws-cdk/aws-sns
```

### Using prettier

In Goland:
- install the prettier plugin
- declare the path for prettier in: `Preferences | Languages & Frameworks | JavaScript | Prettier`
- use `Reformat with Prettier`

In Webstorm:
- use `Reformat with Prettier`
