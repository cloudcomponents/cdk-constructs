import { Input } from './inputs';

interface BaseAction {
  name: string;
}

export interface OpenUri extends BaseAction {
  '@type': 'OpenUri';
  targets: { os: 'default' | 'iOS' | 'android' | 'windows'; uri: string }[];
}

export interface HttpPost extends BaseAction {
  '@type': 'HttpPOST';
  target: string;
  headers: { name: string; value: string }[];
  body: string;
  bodyContentType?: 'application/json' | 'application/x-www-form-urlencoded';
}

export interface ActionCard extends BaseAction {
  '@type': 'ActionCard';
  inputs?: Input[];
  actions?: OpenUri | HttpPost[];
}

export type Action = OpenUri | HttpPost | ActionCard;
