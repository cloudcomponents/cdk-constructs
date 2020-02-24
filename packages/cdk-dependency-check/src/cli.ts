export interface ScanProps {
    /**
     * The name of the project being scanned.
     */
    readonly projectName?: string;

    /**
     * The path to scan.
     */
    readonly paths: string[];

    /**
     * The path patterns to exclude from the scan
     */
    readonly excludes?: string[];

    /**
     * If the score set between 0 and 10 the exit code from dependency-check will indicate if a vulnerability with a CVSS score equal to or higher was identified.
     *
     * @default 0
     */
    readonly failOnCVSS?: number;

    /**
     * Enable the experimental analyzers. If not set the analyzers marked as experimental will not be loaded or used.
     *
     * @default false
     */
    readonly enableExperimental?: boolean;
}

export class Cli {
    constructor(private readonly command: string = 'dependency-check.sh') {}

    public scan(props: ScanProps): string {
        const args = [this.command];

        const {
            projectName,
            paths,
            excludes = [],
            failOnCVSS = 0,
            enableExperimental = false,
        } = props;

        if (projectName) {
            args.push('--project', `"${projectName}"`);
        }

        paths.forEach(path => {
            args.push('--scan', `"${path}"`);
        });

        excludes.forEach(exclude => {
            args.push('--exclude', `"${exclude}"`);
        });

        args.push('--failOnCVSS', `${failOnCVSS}`);

        args.push('--junitFailOnCVSS', `${failOnCVSS}`);

        if (enableExperimental) {
            args.push('--enableExperimental');
        }

        args.push('--prettyPrint --format "ALL"');

        args.push('--out reports');

        return args.join(' ');
    }

    public update(): string {
        const args = [this.command];

        args.push('--updateonly');

        return args.join(' ');
    }

    public version(): string {
        const args = [this.command];

        args.push('--version');

        return args.join(' ');
    }
}
