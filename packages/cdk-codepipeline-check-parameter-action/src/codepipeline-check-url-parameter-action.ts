import * as urlRegex from 'url-regex';

import {
    CodepipelineCheckParameterAction,
    CodepipelineCheckParameterActionProps,
} from './codepipeline-check-parameter-action';

export interface CodepipelineCheckUrlParameterActionProps
    extends Omit<CodepipelineCheckParameterActionProps, 'regExp'> {
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

export class CodepipelineCheckUrlParameterAction extends CodepipelineCheckParameterAction {
    constructor(props: CodepipelineCheckUrlParameterActionProps) {
        const { exact = true, strict = true, ...rest } = props;

        super({
            ...rest,
            regExp: urlRegex({ exact, strict }),
        });
    }
}
