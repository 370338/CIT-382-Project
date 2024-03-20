The goal of our application was to allow the user to dynamicly graph csv files. We are converting the file from a csv to an array of objects then mapping it using re-charts. the end goal of this application would be to allow a small buisness to have a databasse of all there specific data then have a LM query the data and return a csv (or array of objects) that could be displayed to give the user custom analitics. 

compleated feilds.
1) this is compleated see components.js
2) see app.js
3) we have more then two chiled components. the graphinmg page along with testing and converter components
4) the data entry is titled data entry. it allows the useer to copy and past in a CSV and then it gets stored for later examination
5) there is an admin checkbox (TODO!!) this allows you tyo access the test page of our app, there are two dropdown menues within the graphing component, there is a text box style inpute for hte data entry
6) the data enterd into the input is lifted to the parent state then passed into chiled components
7) data is listed multipul spots, the csvs that are loaded are listed and the catagorys are listed within the drop down menue
8) Data is selected in the data entry portion it is updated in th graph portion
9) the whole application is based on graphing 
10) we have a fetch command set to pull the csv that is pre-loaded for examplke data from the public folder. this would be replaced with a call to a database by an AI i the full project