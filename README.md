# AngularJS Skeleton Application

You can use this repository to quickly start building your AngularJS apps with multi environment configuration support.

### Getting Started
You must have `nodejs` and `npm` installed on your system to get started. Next install `yeoman`, `grunt`, `bower`, `karma`, `generator-angular`, `generator-env-config`.
```sh
$ sudo npm install -g yo grunt-cli bower karma generator-angular generator-env-config
```

Then
```sh
$ npm install grunt-replace --save-dev
```

Now install packages by running 
```sh
$ npm install
```
After that you can simply run this app using `grunt serve` and your default browser will open up app.

### Directory Structure
- **Gruntfile.js** contains tasks and other settings for grunt.
- **config** contains environment based configurations.
- **app** contains your app files.
- **app > images** contains image resources
- **app > styles** contains your stylesheets
- **app > views** contains your app views.
- **app > views > partials** contains common view files e.g. footer, header, sidebar
- **app > views > main.html** is the main layout file.
- **app > scripts** contains your angularjs code.
- **app > scripts > config** config contains environment based configurations
- **app > scripts > controllers** continas controller files
- **app > scripts > models** you can place `directives`, `filters`.
- **app > scripts > modules** you can place independent modules.
- **app > scripts > services** you can place services.
- **app > scripts > app.js** is main angular file.
- **app > scripts > js** you can place other `javascript` or `jquery` scripts.

### Environment Based Config
Here you can add as many environment based configs as you want. To create a configuration, for example staging, simply use `yo env-config staging` and you will see a `staging.json` file in `environments` folder. You can then define configration options and map them in `config > config.js` accordingly.

### Run App in Different Environments
You can quickly replace your app configuration with any environment using `grunt {config}`. For example, if you are using `development` environment and want to switch to `production` run `grunt production`.

To run your app simply use `grunt serve`

### Deploying Your App
To deploy your app use `grunt build`.

### Troubleshooting
`Warning: Task "karma" not found. Use --force to continue.`

To fix this, install `grunt-karma` locally or globally and then load the task by adding `grunt.loadNpmTasks('grunt-karma');` to your Gruntfile.

Learned from [Newtriks](http://newtriks.com/) 

**Please help me improving this app.**


