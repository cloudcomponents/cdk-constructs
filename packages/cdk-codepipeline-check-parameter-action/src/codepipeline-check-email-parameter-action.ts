import * as emailRegex from 'email-regex';

import {
    CodepipelineCheckParameterAction,
    CodepipelineCheckParameterActionProps,
} from './codepipeline-check-parameter-action';

export interface CodepipelineCheckEmailParameterActionProps
    extends Omit<CodepipelineCheckParameterActionProps, 'regExp'> {
    /**
     * Only match an exact string
     *
     * @default true
     */
    readonly exact?: boolean;
}

export class CodepipelineCheckEmailParameterAction extends CodepipelineCheckParameterAction {
    constructor(props: CodepipelineCheckEmailParameterActionProps) {
        const { exact = true, ...rest } = props;

        super({
            ...rest,
            regExp: emailRegex({ exact }),
        });
    }
}
