export interface SnsMessage {
  source: string;
  account: string;
  detailType: string;
  region: string;
  detail: Record<string, string>;
  additionalAttributes: Record<string, unknown>;
}
