## Intro
Working in [Xogito](https://www.xogito.com) is always fun!<br />
But sometimes you need to deal with messy UI like [PeopleHR](https://xogito.peoplehr.net). You can now avoid that by using this CLI :)

## Install
```
npm install --global xogito-signing
```

## Sing-in
```
xogito-signing -u john.doe -p P@22w0rd
```

## Sing-out
```
xogito-signing -u john.doe -p P@22w0rd -a sign-out
```

## Help
```
xogito-signing --help
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
