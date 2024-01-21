


https://github.com/nathan4sch/SplitTheBill/assets/47926489/7d839407-6968-4398-85e7-3201a9bc6f16


Whenever my roommates and I (Evan) go grocery shopping we end up having difficulties divvying up the receipt afterwards. It's difficult because there are some items that 2 or 3 people will use, but the others won't -- **this means that splitting a grocery bill evenly often leads to someone overpaying**. We found several websites/apps that offer solutions but all of them had a lot of overhead and were complicated to set up. That's what inspired us to create:

# Split The Bill
Split The Bill is a lightweight mobile app that allows you to scan a receipt on your phone and then split the items between everyone. After scanning you are brought to a page where you can add people from the payment roster. Once you have everyone added, just pass the phone around and each person can select which items they are going to use! Simple and efficient.

### What's it made of?
This app is built on top of the react-native mobile framework. Once you take the photo on the mobile app, it's sent to an external node.js server on AWS, which then uses Tesseract OCR to parse text from the photo. That text is sent into a custom GPT model that parses a list of items and their prices (in JSON format) from the other receipt gibberish, which is returned to the react-native frontend for the users to split up.

### Roadblocks
There were a significant amount of roadblocks during development, mostly stemming from the fact that we had no clue how to use any of the technologies in this project before starting. Sending the image file from the frontend to the node.js server proved extremely difficult (this took up half our time) because we didn't realize certain packages don't work with react-native and Expo Go (the mobile testing service we used). Learning react-native was also a big roadblock but once we got the hang of it towards the end we managed to fit everything together nicely.

### Coming soon...
All of us really enjoyed working on this project and will continue developing it after the hackathon ends! Some of the features that are on our list are seamless integration with Venmo, improved styling, faster load times, more accurate receipt parsing, and eventually publishing on the IOS app store.
