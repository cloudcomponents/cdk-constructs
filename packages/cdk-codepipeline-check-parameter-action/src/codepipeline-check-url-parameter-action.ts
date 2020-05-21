import * as urlRegex from 'url-regex';

import {
  CodePipelineCheckParameterAction,
  CodePipelineCheckParameterActionProps,
} from './codepipeline-check-parameter-action';

export interface CodePipelineCheckUrlParameterActionProps
  extends Omit<CodePipelineCheckParameterActionProps, 'regExp'> {
  /**
   * Only match an exact string
   *
   * @default true
   */
  readonly exact?: boolean;

  /**
   * Force URLs to start with a valid protocol or www
   */
  readonly strict?: boolean;
}

export class CodePipelineCheckUrlParameterAction extends CodePipelineCheckParameterAction {
  constructor(props: CodePipelineCheckUrlParameterActionProps) {
    const { exact = true, strict = true, ...rest } = props;

    super({
      ...rest,
      regExp: urlRegex({ exact, strict }),
    });
  }
}
