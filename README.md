# Considerations
* as far as I understand it's more common for Node.js to follow Functional Paradigm, but I personally prefer OOP, that's why I follow OOP style here
* min and max borders of entropy multiplier could be put to config as well, but decided to not do this for simplicity
* I did not think of architecture that much - it definitely can be done better, just didn't want to spend a lot of time on this for such a simple service
* summary is missed in many places - would be nice to have it, but I didn't add it because of lack of time
* I made quite a bad choice when chose to use 3rd party libraries to get info about nodes since because of that I can't make integrity check
* I did not implement unit tests, but they should be here
* report generation should be done differently, right now it just takes whatever in database and shows it to user
* in report some time should be added like when last update was done - to implement this we need to fix saving time to "database", which I don't want to do as part of current task

