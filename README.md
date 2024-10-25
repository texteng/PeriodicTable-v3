# PeriodicTable-v3
This is the third version of the period table project i did for my coding bootcamp in 2018
Note, this periodic table is only meant to be a technical demonstration. It is not meant to be used by scientists or students.
For these resources see:
* https://ptable.com/
* https://www.fishersci.com/us/en/periodic-table.html


## Version 1- https://github.com/texteng/texteng.github.io/tree/master/PeriodicTable
This version was hacked together during my coding bootcamp. It uses a combination of bootstrap 4, jquery, and scss compiled into javascript, css, and html.
The biggest advantage that this periodic table has over the more professional ones is the color schemes created with scss for loops and hsl color pallates.

## Version 2- https://github.com/texteng/texteng.github.io/tree/master/PeriodicTableTypescript
This version of my periodic table, (Currently found https://texteng.github.io/PeriodicTableTypescript/periodictable.html), makes several improvements over version 1.  I learned how to better use typescript and create note scripts to parse json and create files.
* It is written in typescript.
* It removes most of the jquery using standard js methods
* Moves many in browser calculations into a node script entering into a single master json file.  The original periodic table kept the original json files and handled everything in runtime. While the scss files from the original project remain, determining which classes get which colors are found in the master json file.
* Gets rid of weird grid system

## Version 3 (Current)
This version is a rewrite of the original periodic table. My goal in this project was to learn React and tailwind.css. I also learned how to use postcss and vite. This project benefits from the  6+ years of development experience I have had since i programmed the original table.
* Instead of using classes to determine color, the master json file has all of the colors. This removes the scss tricks i used in the first version, but greatly simplifies how the code works.
* Bootstrap and Jquery have been completely removed and replaced with tailwind and react.
* Element locations are on the master json file, not separate mapping files.

Additional improvements:
* Hovering over elements, rows and column instead of highlighting the target elements, now increases the grayscale and decreases the opacity of surrounding elmeents
* Newer versions of the json files i have used as references now return photos. these have been added to the element modals.
* added the cpk color scheme which came from the source json files. and i am now using it as the default color scheme for the table.
* Five media query breakpoints instead of 2.

To Do
* add the legend for the color schemes and the associated hover code.
* Add wide mode
* Add the special lanthanideas and the actinide tiles

To set up
To start dev environment, in the terminal
1. `npm install`
2. `npm run dev`

To modify the json file which the whole period table is based of
1. Create two files, `src/utils/pt_json1.json` and `src/utils/pt_json2.json`
2. Copy the contents of https://github.com/Bowserinator/Periodic-Table-JSON into pt_json1.json
3. Copy the contents of https://github.com/neelpatel05/periodic-table-api into pt_json2.json
4. Run the command `npm run build-json`