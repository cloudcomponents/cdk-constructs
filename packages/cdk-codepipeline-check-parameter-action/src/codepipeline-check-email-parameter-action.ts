import * as emailRegex from 'email-regex';

import {
    CodePipelineCheckParameterAction,
    CodePipelineCheckParameterActionProps,
} from './codepipeline-check-parameter-action';

export interface CodePipelineCheckEmailParameterActionProps
    extends Omit<CodePipelineCheckParameterActionProps, 'regExp'> {
    /**
     * Only match an exact string
     *
     * @default true
     */
    readonly exact?: boolean;
}

export class CodePipelineCheckEmailParameterAction extends CodePipelineCheckParameterAction {
    constructor(props: CodePipelineCheckEmailParameterActionProps) {
        const { exact = true, ...rest } = props;

        super({
            ...rest,
            regExp: emailRegex({ exact }),
        });
    }
}
