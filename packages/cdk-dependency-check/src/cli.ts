import { join } from 'path';

export interface ScanProps {
  /**
   * The name of the project being scanned.
   */
  readonly projectName?: string;

  /**
   * Basedir
   *
   * @default `.`
   */
  readonly basedir?: string;

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

  /**
   * Disables the automatic updating of the CPE data.
   *
   * @default false
   */
  readonly noUpdate?: boolean;

  /**
   * The file paths to the suppression XML files; used to suppress false positives.
   */
  readonly suppressions?: string[];
}

export class Cli {
  constructor(private readonly command: string = 'dependency-check.sh') {}

  public scan(props: ScanProps): string {
    const args = [this.command];

    const {
      projectName,
      basedir = '.',
      paths,
      excludes = [],
      suppressions = [],
      failOnCVSS = 0,
      enableExperimental = false,
      noUpdate = false,
    } = props;

    if (projectName) {
      args.push(`--project "${projectName}"`);
    }

    paths.forEach((path) => {
      args.push(`--scan "${join(basedir, path)}"`);
    });

    excludes.forEach((exclude) => {
      args.push(`--exclude "${join(basedir, exclude)}"`);
    });

    suppressions.forEach((suppression) => {
      args.push(`--suppression "${join(basedir, suppression)}}"`);
    });

    args.push(`--failOnCVSS ${failOnCVSS}`);

    args.push(`--junitFailOnCVSS ${failOnCVSS}`);

    if (enableExperimental) {
      args.push('--enableExperimental');
    }

    if (noUpdate) {
      args.push('--noupdate');
    }

    args.push('--prettyPrint --format HTML --format JUNIT');

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
