# Description

Application to check node availability. Runs in background and once per a while checks node status. Saves it to storage and generates html report with sla levels of those nodes.

At the moment this app supports Ethereum and Near networks only, but it allows to easily extend the app to work with other blockchains.

# How to run

Go to `config` folder and fix nodes and other configs in `default.json` to your desired ones.

## Locally
```bash
cd <project_root>
npm run build
npm start
```

## Using docker compose
```bash
cd <project_root>
docker compose up --build
```

## How to check
Go to http://localhost:80

# Considerations

* As far as I understand it's more common for Node.js to follow Functional Paradigm, but I personally prefer OOP, that's why I follow OOP style here
* Min and max borders of entropy multiplier could be put to config as well, but decided to not do this for simplicity
* I did not think of architecture that much - it definitely can be done better, just didn't want to spend a lot of time on this for such a simple service
* Summary is missed in many places - would be nice to have it, but I didn't add it because of lack of time
* I made quite a bad choice when chose to use 3rd party libraries to get info about nodes since because of that I can't make integrity check
* I did not implement unit tests, but they should be here
* Report generation should be done differently, right now it just takes whatever in database and shows it to user
* In report some time should be added like when last update was done - to implement this we need to fix saving time to "database", which I don't want to do as part of current task
* For simplicity web framework is not used, in real production environment some web framework should be used
* There are many deprecation notices from packages, ideally that should be fixed
* For simplicity I used recursion in networks-checker, in real world scenario it can cause problems with stack overflow
* Configuration is not very adapted for environment variables, it can be done better, but because of time reasons I didn't work on that much