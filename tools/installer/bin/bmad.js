#!/usr/bin/env node

const { program } = require('commander');
const path = require('node:path');
const fs = require('node:fs').promises;
const yaml = require('js-yaml');
const chalk = require('chalk').default || require('chalk');
const inquirer = require('inquirer').default || require('inquirer');
const semver = require('semver');
const https = require('node:https');

// Handle both execution contexts (from root via npx or from installer directory)
let version;
let installer;
let packageName;
try {
  // Try installer context first (when run from tools/installer/)
  version = require('../package.json').version;
  packageName = require('../package.json').name;
  installer = require('../lib/installer');
} catch (error) {
  // Fall back to root context (when run via npx from GitHub)
  console.log(`Installer context not found (${error.message}), trying root context...`);
  try {
    version = require('../../../package.json').version;
    installer = require('../../../tools/installer/lib/installer');
  } catch (error) {
    console.error(
      'Error: Could not load required modules. Please ensure you are running from the correct directory.',
    );
    console.error('Debug info:', {
      __dirname,
      cwd: process.cwd(),
      error: error.message,
    });
    process.exit(1);
  }
}

program
  .version(version)
  .description('BMad Method 설치 프로그램 - 모든 도메인을 위한 범용 AI 에이전트 프레임워크');

program
  .command('install')
  .description('BMad Method 에이전트와 도구 설치')
  .option('-f, --full', 'BMad Method 전체 설치')
  .option('-x, --expansion-only', '확장팩만 설치 (bmad-core 제외)')
  .option('-d, --directory <path>', '설치 디렉토리')
  .option(
    '-i, --ide <ide...>',
    '특정 IDE 설정 (여러 개 선택 가능: cursor, claude-code, windsurf, trae, roo, kilo, cline, gemini, qwen-code, github-copilot, other)',
  )
  .option('-e, --expansion-packs <packs...>', '설치할 확장팩 선택 (여러 개 지정 가능)')
  .action(async (options) => {
    try {
      if (!options.full && !options.expansionOnly) {
        // Interactive mode
        const answers = await promptInstallation();
        if (!answers._alreadyInstalled) {
          await installer.install(answers);
          process.exit(0);
        }
      } else {
        // Direct mode
        let installType = 'full';
        if (options.expansionOnly) installType = 'expansion-only';

        const config = {
          installType,
          directory: options.directory || '.',
          ides: (options.ide || []).filter((ide) => ide !== 'other'),
          expansionPacks: options.expansionPacks || [],
        };
        await installer.install(config);
        process.exit(0);
      }
    } catch (error) {
      console.error(chalk.red('설치 실패:'), error.message);
      process.exit(1);
    }
  });

program
  .command('update')
  .description('기존 BMad 설치 업데이트')
  .option('--force', '수정된 파일을 덮어써서 강제 업데이트')
  .option('--dry-run', '실제 변경 없이 업데이트 대상만 표시')
  .action(async () => {
    try {
      await installer.update();
    } catch (error) {
      console.error(chalk.red('업데이트 실패:'), error.message);
      process.exit(1);
    }
  });

// Command to check if updates are available
program
  .command('update-check')
  .description('BMad 업데이트 확인')
  .action(async () => {
    console.log('업데이트를 확인하는 중...');

    // Make HTTP request to npm registry for latest version info
    const req = https.get(`https://registry.npmjs.org/${packageName}/latest`, (res) => {
      // Check for HTTP errors (non-200 status codes)
      if (res.statusCode !== 200) {
        console.error(chalk.red(`업데이트 확인 실패: 상태 코드 ${res.statusCode}`));
        return;
      }

      // Accumulate response data chunks
      let data = '';
      res.on('data', (chunk) => (data += chunk));

      // Process complete response
      res.on('end', () => {
        try {
          // Parse npm registry response and extract version
          const latest = JSON.parse(data).version;

          // Compare versions using semver
          if (semver.gt(latest, version)) {
            console.log(
              chalk.bold.blue(`⚠️  ${packageName} 업데이트 사용 가능: ${version} → ${latest}`),
            );
            console.log(chalk.bold.blue('\n최신 버전 설치 명령:'));
            console.log(chalk.bold.magenta(`  npm install ${packageName}@latest`));
            console.log(chalk.dim('  또는'));
            console.log(chalk.bold.magenta(`  npx ${packageName}@latest`));
          } else {
            console.log(chalk.bold.blue(`✨ ${packageName}는 최신 상태입니다`));
          }
        } catch (error) {
          // JSON 파싱 오류 처리
          console.error(chalk.red('npm 레지스트리 데이터 파싱 실패:'), error.message);
        }
      });
    });

    // Handle network/connection errors
    req.on('error', (error) => {
      console.error(chalk.red('업데이트 확인 실패:'), error.message);
    });

    // Set 30 second timeout to prevent hanging
    req.setTimeout(30_000, () => {
      req.destroy();
      console.error(chalk.red('업데이트 확인이 시간 초과되었습니다'));
    });
  });

program
  .command('list:expansions')
  .description('사용 가능한 확장팩 목록 보기')
  .action(async () => {
    try {
      await installer.listExpansionPacks();
    } catch (error) {
      console.error(chalk.red('오류:'), error.message);
      process.exit(1);
    }
  });

program
  .command('status')
  .description('설치 상태 표시')
  .action(async () => {
    try {
      await installer.showStatus();
    } catch (error) {
      console.error(chalk.red('오류:'), error.message);
      process.exit(1);
    }
  });

program
  .command('flatten')
  .description('코드베이스를 XML 형식으로 평탄화')
  .option('-i, --input <path>', '평탄화할 입력 디렉토리', process.cwd())
  .option('-o, --output <path>', '출력 파일 경로', 'flattened-codebase.xml')
  .action(async (options) => {
    try {
      await installer.flatten(options);
    } catch (error) {
      console.error(chalk.red('평탄화 실패:'), error.message);
      process.exit(1);
    }
  });

async function promptInstallation() {
  // Display ASCII logo
  console.log(
    chalk.bold.cyan(`
██████╗ ███╗   ███╗ █████╗ ██████╗       ███╗   ███╗███████╗████████╗██╗  ██╗ ██████╗ ██████╗ 
██╔══██╗████╗ ████║██╔══██╗██╔══██╗      ████╗ ████║██╔════╝╚══██╔══╝██║  ██║██╔═══██╗██╔══██╗
██████╔╝██╔████╔██║███████║██║  ██║█████╗██╔████╔██║█████╗     ██║   ███████║██║   ██║██║  ██║
██╔══██╗██║╚██╔╝██║██╔══██║██║  ██║╚════╝██║╚██╔╝██║██╔══╝     ██║   ██╔══██║██║   ██║██║  ██║
██████╔╝██║ ╚═╝ ██║██║  ██║██████╔╝      ██║ ╚═╝ ██║███████╗   ██║   ██║  ██║╚██████╔╝██████╔╝
╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═╝╚═════╝       ╚═╝     ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚═════╝ 
  `),
  );

  console.log(chalk.bold.magenta('🚀 모든 도메인을 위한 범용 AI 에이전트 프레임워크'));
  console.log(chalk.bold.blue(`✨ 설치 프로그램 v${version}\n`));

  const answers = {};

  // Ask for installation directory first
  const { directory } = await inquirer.prompt([
    {
      type: 'input',
      name: 'directory',
      message: 'BMad를 설치할 프로젝트 디렉토리의 전체 경로를 입력하세요:',
      default: path.resolve('.'),
      validate: (input) => {
        if (!input.trim()) {
          return '유효한 프로젝트 경로를 입력하세요';
        }
        return true;
      },
    },
  ]);
  answers.directory = directory;

  // Detect existing installations
  const installDir = path.resolve(directory);
  const state = await installer.detectInstallationState(installDir);

  // Check for existing expansion packs
  const existingExpansionPacks = state.expansionPacks || {};

  // Get available expansion packs
  const availableExpansionPacks = await installer.getAvailableExpansionPacks();

  // Build choices list
  const choices = [];

  // Load core config to get short-title
  const coreConfigPath = path.join(__dirname, '..', '..', '..', 'bmad-core', 'core-config.yaml');
  const coreConfig = yaml.load(await fs.readFile(coreConfigPath, 'utf8'));
  const coreShortTitle = coreConfig['short-title'] || 'BMad Agile Core System';

  // Add BMad core option
  let bmadOptionText;
  if (state.type === 'v4_existing') {
    const currentVersion = state.manifest?.version || 'unknown';
    const newVersion = version; // Always use package.json version
    const versionInfo =
      currentVersion === newVersion
        ? `(v${currentVersion} - 재설치)`
        : `(v${currentVersion} → v${newVersion})`;
    bmadOptionText = `${coreShortTitle} 업데이트 ${versionInfo} .bmad-core`;
  } else {
    bmadOptionText = `${coreShortTitle} (v${version}) .bmad-core`;
  }

  choices.push({
    name: bmadOptionText,
    value: 'bmad-core',
    checked: true,
  });

  // Add expansion pack options
  for (const pack of availableExpansionPacks) {
    const existing = existingExpansionPacks[pack.id];
    let packOptionText;

    if (existing) {
      const currentVersion = existing.manifest?.version || 'unknown';
      const newVersion = pack.version;
      const versionInfo =
        currentVersion === newVersion
          ? `(v${currentVersion} - 재설치)`
          : `(v${currentVersion} → v${newVersion})`;
      packOptionText = `${pack.shortTitle} 업데이트 ${versionInfo} .${pack.id}`;
    } else {
      packOptionText = `${pack.shortTitle} (v${pack.version}) .${pack.id}`;
    }

    choices.push({
      name: packOptionText,
      value: pack.id,
      checked: false,
    });
  }

  // Ask what to install
  const { selectedItems } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'selectedItems',
      message: '설치/업데이트할 항목을 선택하세요 (스페이스로 선택, 엔터로 계속):',
      choices: choices,
      validate: (selected) => {
        if (selected.length === 0) {
          return '최소 한 개 이상의 항목을 선택하세요';
        }
        return true;
      },
    },
  ]);

  // Process selections
  answers.installType = selectedItems.includes('bmad-core') ? 'full' : 'expansion-only';
  answers.expansionPacks = selectedItems.filter((item) => item !== 'bmad-core');

  // Ask sharding questions if installing BMad core
  if (selectedItems.includes('bmad-core')) {
    console.log(chalk.cyan('\n📋 문서 구성 설정'));
    console.log(chalk.dim('프로젝트 문서 구조를 어떻게 구성할지 설정합니다.\n'));

    // Ask about PRD sharding
    const { prdSharded } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'prdSharded',
        message: 'PRD(Product Requirements Document)를 여러 파일로 분할하시겠습니까?',
        default: true,
      },
    ]);
    answers.prdSharded = prdSharded;

    // Ask about architecture sharding
    const { architectureSharded } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'architectureSharded',
        message: '아키텍처 문서를 여러 파일로 분할하시겠습니까?',
        default: true,
      },
    ]);
    answers.architectureSharded = architectureSharded;

    // Show warning if architecture sharding is disabled
    if (!architectureSharded) {
      console.log(chalk.yellow.bold('\n⚠️  중요: 아키텍처 분할 비활성화됨'));
      console.log(
        chalk.yellow('아키텍처 분할을 비활성화하더라도 다음 파일들은 생성하는 것이 좋습니다,'),
      );
      console.log(
        chalk.yellow(
          '예: coding-standards.md, tech-stack.md, source-tree.md (devLoadAlwaysFiles 목록)',
        ),
      );
      console.log(chalk.yellow('이 파일들은 실행 중에 개발 에이전트가 사용합니다.'));
      console.log(
        chalk.yellow('\n대안으로 설치 후 core-config.yaml의 devLoadAlwaysFiles 목록에서'),
      );
      console.log(chalk.yellow('이 파일들을 제거하는 방법도 있습니다.'));

      const { acknowledge } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'acknowledge',
          message: 'Do you acknowledge this requirement and want to proceed?',
          default: false,
        },
      ]);

      if (!acknowledge) {
        console.log(chalk.red('설치가 취소되었습니다.'));
        process.exit(0);
      }
    }
  }

  // Ask for IDE configuration
  let ides = [];
  let ideSelectionComplete = false;

  while (!ideSelectionComplete) {
    console.log(chalk.cyan('\n🛠️  IDE 설정'));
    console.log(
      chalk.bold.yellow.bgRed(' ⚠️  중요: 멀티선택입니다! 스페이스바로 각 IDE를 선택/해제하세요! '),
    );
    console.log(chalk.bold.magenta('🔸 방향키로 이동'));
    console.log(chalk.bold.magenta('🔸 스페이스바로 IDE 선택/해제'));
    console.log(chalk.bold.magenta('🔸 선택 완료 후 엔터\n'));

    const ideResponse = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'ides',
        message: '어떤 IDE를 설정하시겠습니까? (스페이스바로 선택, 엔터로 확정):',
        choices: [
          { name: 'Cursor', value: 'cursor' },
          { name: 'Claude Code', value: 'claude-code' },
          { name: 'Windsurf', value: 'windsurf' },
          { name: 'Trae', value: 'trae' }, // { name: 'Trae', value: 'trae'}
          { name: 'Roo Code', value: 'roo' },
          { name: 'Kilo Code', value: 'kilo' },
          { name: 'Cline', value: 'cline' },
          { name: 'Gemini CLI', value: 'gemini' },
          { name: 'Qwen Code', value: 'qwen-code' },
          { name: 'Crush', value: 'crush' },
          { name: 'Github Copilot', value: 'github-copilot' },
        ],
      },
    ]);

    ides = ideResponse.ides;

    // Confirm no IDE selection if none selected
    if (ides.length === 0) {
      const { confirmNoIde } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'confirmNoIde',
          message: chalk.red(
            '⚠️  선택한 IDE가 없습니다. IDE 통합 설정이 진행되지 않습니다. 계속하시겠습니까?',
          ),
          default: false,
        },
      ]);

      if (!confirmNoIde) {
        console.log(
          chalk.bold.red('\n🔄 IDE 선택으로 돌아갑니다. 스페이스바로 IDE를 선택하세요!\n'),
        );
        continue; // Go back to IDE selection only
      }
    }

    ideSelectionComplete = true;
  }

  // Use selected IDEs directly
  answers.ides = ides;

  // Configure GitHub Copilot immediately if selected
  if (ides.includes('github-copilot')) {
    console.log(chalk.cyan('\n🔧 GitHub Copilot 설정'));
    console.log(chalk.dim('최적의 에이전트 경험을 위해 VS Code 설정을 조정합니다.\n'));

    const { configChoice } = await inquirer.prompt([
      {
        type: 'list',
        name: 'configChoice',
        message: chalk.yellow('How would you like to configure GitHub Copilot settings?'),
        choices: [
          { name: '권장 기본값 사용 (가장 빠름)', value: 'defaults' },
          { name: '각 설정을 수동으로 구성 (취향에 맞게)', value: 'manual' },
          { name: '설정 건너뛰기 (나중에 직접 구성)', value: 'skip' },
        ],
        default: 'defaults',
      },
    ]);

    answers.githubCopilotConfig = { configChoice };
  }

  // Ask for web bundles installation
  const { includeWebBundles } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'includeWebBundles',
      message: '웹용 사전 제작 번들을 포함하시겠습니까? (ChatGPT, Claude, Gemini용 독립 실행 파일)',
      default: false,
    },
  ]);

  if (includeWebBundles) {
    console.log(
      chalk.cyan('\n📦 웹 번들은 웹 기반 AI 플랫폼에서 바로 사용할 수 있는 독립 실행 파일입니다.'),
    );
    console.log(chalk.dim('   IDE 설치와 다른 팀/에이전트를 선택할 수도 있습니다.\n'));

    const { webBundleType } = await inquirer.prompt([
      {
        type: 'list',
        name: 'webBundleType',
        message: '어떤 웹 번들을 포함하시겠습니까?',
        choices: [
          { name: '모두 포함 (에이전트, 팀, 확장팩)', value: 'all' },
          { name: '특정 팀만', value: 'teams' },
          { name: '개별 에이전트만', value: 'agents' },
          { name: '맞춤 선택', value: 'custom' },
        ],
      },
    ]);

    answers.webBundleType = webBundleType;

    // If specific teams, let them choose which teams
    if (webBundleType === 'teams' || webBundleType === 'custom') {
      const teams = await installer.getAvailableTeams();
      const { selectedTeams } = await inquirer.prompt([
        {
          type: 'checkbox',
          name: 'selectedTeams',
          message: '포함할 팀 번들을 선택하세요:',
          choices: teams.map((t) => ({
            name: `${t.icon || '📋'} ${t.name}: ${t.description}`,
            value: t.id,
            checked: webBundleType === 'teams', // Check all if teams-only mode
          })),
          validate: (answer) => {
            if (answer.length === 0) {
              return '최소 한 개 이상의 팀을 선택하세요.';
            }
            return true;
          },
        },
      ]);
      answers.selectedWebBundleTeams = selectedTeams;
    }

    // If custom selection, also ask about individual agents
    if (webBundleType === 'custom') {
      const { includeIndividualAgents } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'includeIndividualAgents',
          message: '개별 에이전트 번들도 포함하시겠습니까?',
          default: true,
        },
      ]);
      answers.includeIndividualAgents = includeIndividualAgents;
    }

    const { webBundlesDirectory } = await inquirer.prompt([
      {
        type: 'input',
        name: 'webBundlesDirectory',
        message: '웹 번들을 저장할 디렉토리를 입력하세요:',
        default: `${answers.directory}/web-bundles`,
        validate: (input) => {
          if (!input.trim()) {
            return '유효한 디렉토리 경로를 입력하세요';
          }
          return true;
        },
      },
    ]);
    answers.webBundlesDirectory = webBundlesDirectory;
  }

  answers.includeWebBundles = includeWebBundles;

  return answers;
}

program.parse(process.argv);

// Show help if no command provided
if (process.argv.slice(2).length === 0) {
  program.outputHelp();
}
