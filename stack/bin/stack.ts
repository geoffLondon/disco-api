#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { StackStack } from '../lib/stack-stack';

const app = new cdk.App();
new StackStack(app, 'StackStack');
