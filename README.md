## Intro
Working in [Xogito](https://www.xogito.com) is always fun!<br />
But sometimes you need to deal with messy UI like [WebHR](https://xogito.webhr.co). You can now avoid that by using this package :)

## Requirements
Please have [Node.js](https://nodejs.org/en) installed with npm >= 5.2.0 for using [npx](https://blog.npmjs.org/post/162869356040/introducing-npx-an-npm-package-runner).

## Sing-in
```
npx xogito-signing -u john.doe -p P@22w0rd
```

## Sing-out
```
npx xogito-signing -u john.doe -p P@22w0rd -a sign-out
```

## Help
```
npx xogito-signing --help
```
```
Options:
  -u, --user      User name                                  [string] [required]
  -p, --password  User password                              [string] [required]
  -a, --action    Singing action
                           [choices: "sign-in", "sign-out"] [default: "sign-in"]
  -h, --help      Show help                                            [boolean]
  -v, --version   Show version number                                  [boolean]

Examples:
  xogito-signing --user john.doe --password P@22w0rd
```
