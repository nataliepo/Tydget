# What is this project?

TypePad + Widget = Tydget.  It uses JavaScript to insert a doo-dad ideal for sidebars.


# What's the status?
It's in super-alpha:
* basic QA and only in FF 3.5.3
* tested among a handful of Motion groups but not all of them


# How do I use it?
Two major parts involved in using Tydget: a HTML file where you want the widget to appear, and the JS code (javascript_solution/typepad_parsing.js file) that makes it.  

## Set up the JS Code
It's not served in a public place yet, so for now, copy the javascript_solution/ directory of this repo into your webhost. 

You'll know if it's installed properly if you view http://localhost/javascript_solution/typepad_parsing.js in your browser and see JS code like:
    function event_callback(json_response) {

        var tydget = document.getElementById("tydget");
    ...
    
## Set up your HTML file
### Note your XID
Right now, Tydget only works with Motion Communities powered by TypePad.  So you'll need to know the XID of that community.

Here's a couple sample XIDs as an example:
    6p0120a6255c8c970b = www.mmmeow.com
    6p0120a604b654970c = www.womensbookclub.org
    6p0120a641b4e9970b = www.wtfbklyn.com

### Insert Code Snippet
Somewhere inside the <body> tag of your HTML page, insert (in this order):
    
    <div id="tydget"></div>
    <script type="text/javascript" src="http://localhost/javascript_solution/typepad_parsing.js"></script> 

Then, replace the <XID> part of this string with the XID you noted in the previous step:
    <script type="text/javascript" src="http://api.typepad.com/groups/<XID>/events.js?max-results=5&start-index=1&callback=event_callback"></script>
    
The last line uses the TypePad Group API to list the most recent events in a particular Motion group in JSON format.  Then it calls the event_callback() function defined in Tydget's typepad_parsing.js, and the HTML code is created based on the contents of the events stream.

### Save and view in your browser
You should see some very plain-looking HTML that starts with "Recently on..." and then shows a listing of events, each with a userpic, username, snippet of the entry that links to the Motion post, and then two linked numbers (Comments and Favorites). 
    
### Make it prettier!
You'll either want to insert in-line css or make a custom stylesheet for each of the tydget- styles.   Check out the file references/very_vanilla.html if you want a quick glance at the HTML being generated.  Otherwise, if you're comfortable with using Firebug, then you can identify the classnames associated with each HTML element. 

## Examples
The examples/ directory has a few Tydget examples, including some with in-line styles.  Warning: these styles are loud and natalified and I would love for someone to improve them  or provide alternatives. :)
