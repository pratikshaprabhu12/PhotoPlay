const defaultDestinationPath = 'src/components/{{pascalCase name}}/';

const styleFileType = 'scss';

const typeScriptTemplate = (destinationPath) => {
  return [
    {
      type: 'add',
      path: destinationPath + '{{pascalCase name}}.tsx',
      templateFile: 'plop-templates/typescript/component.hbs',
    },
    {
      type: 'add',
      path: destinationPath + '{{pascalCase name}}.test.tsx',
      templateFile: 'plop-templates/typescript/component.test.hbs',
    },
    {
      type: 'add',
      path: destinationPath + '{{pascalCase name}}.stories.tsx',
      templateFile: 'plop-templates/typescript/component.stories.hbs',
    },
    {
      type: 'add',
      path: destinationPath + '{{pascalCase name}}.module.' + styleFileType,
      templateFile: 'plop-templates/typescript/component.module.hbs',
    },
    {
      type: 'add',
      path: destinationPath + 'index.ts',
      templateFile: 'plop-templates/typescript/index.hbs',
    },
  ];
};

const javaScriptTemplate = (destinationPath) => {
  return [
    {
      type: 'add',
      path: destinationPath + '{{pascalCase name}}.js',
      templateFile: 'plop-templates/javascript/component.hbs',
    },
    {
      type: 'add',
      path: destinationPath + '{{pascalCase name}}.test.js',
      templateFile: 'plop-templates/javascript/component.test.hbs',
    },
    {
      type: 'add',
      path: destinationPath + '{{pascalCase name}}.stories.js',
      templateFile: 'plop-templates/javascript/component.stories.hbs',
    },
    {
      type: 'add',
      path: destinationPath + '{{pascalCase name}}.module.' + styleFileType,
      templateFile: 'plop-templates/javascript/component.module.hbs',
    },
    {
      type: 'add',
      path: destinationPath + 'index.js',
      templateFile: 'plop-templates/javascript/index.hbs',
    },
  ];
};

module.exports = function (plop) {
  // create your generators here
  plop.setGenerator('basics', {
    description: 'Generate a new React component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Enter Component name:',
        validate: (value) => {
          if (!value) {
            return 'Component name is required!!';
          }
          return true;
        },
      },
      {
        type: 'list',
        name: 'type',
        message: 'Select type of file extension for component',
        default: 'tsx',
        choices: () => [
          { name: 'JavaScript(.js)', value: 'js' },
          { name: 'TypeScript(.tsx)', value: 'tsx' },
        ],
      },
    ],
    actions: function (data) {
      return CreateNewTemplate(data);
    },
  });
};

const CreateNewTemplate = (data) => {
  let path = defaultDestinationPath;

  if (data.type === 'tsx') {
    return typeScriptTemplate(path);
  } else {
    return javaScriptTemplate(path);
  }
};
