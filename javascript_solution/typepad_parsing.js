function community_callback(json_response) {

    var tydget = document.getElementById("tydget");

    // just return nothing for now.
    if (!tydget) {
        return;
    }
    
    // set up the outer div wrappers.
    innerHTML =
'<div id="tydget">  \n' +    
'   <div id="tydget" class="tydget"> \n' + 
'       <div id="tydget-body" class="tydget-body">  \n';
    
    innerHTML += build_header(json_response);
    innerHTML += build_inner_body(json_response);
    innerHTML += build_footer(json_response);
    
    innerHTML += 
'       </div>\n' + 
'   </div>\n' + 
'</div>';
   
   tydget.innerHTML = innerHTML;

   return;
}

/***************
 * build_ methods are the powerhouses generating the html,
 * create_ methods make smaller event snippet
 ***************/
function build_header (json_response) {
    var innerHTML = "";
    
    // janky workaround since events feed doesnt store url or name
    var url = get_site_url(json_response.entries[0].object.permalinkUrl);
    var name = get_site_name(json_response.entries[0].object.permalinkUrl);
    
    innerHTML = 
'           <div class="tydget-header-div"> \n' + 
'               <div class="tydget-header-precursor"> \n' + 
'                   recently on \n' + 
'               </div>\n' + 
'               <a class="tydget-header-title" href="' + url + '">' + name + '</a> \n' +
'           </div>  \n';
    
    return innerHTML;
}

function build_inner_body (json_response) {
    var innerHTML = '<div id="tydget-inner-body" class="tydget-inner-body">';
    
    for (var i = 0; i < json_response.entries.length; i++) {
        var author = json_response.entries[i].actor;
        if (author) {
            // Skip null objects in the stream. this is a known bug in the
            // events api that deleted obj stay in there.
            if (json_response.entries[i].object) {           

                // the outer wrapper of this event.
                innerHTML += '<div class="tydget-event">\n';
                innerHTML += create_event_snippet(json_response.entries[i].object, author); 
                innerHTML += '</div>';
             }
         }
     }
    
     // close out the event div.
     innerHTML += '\n</div>';
    
     return innerHTML;
}

function build_footer (obj) {
    var innerHTML = "";
    
    innerHTML = 
'   <div class="tydget-footer-outer">\n' + 
'       <a class="tydget-footer-inner" href="http://www.typepad.com">Powered by TypePad</a>\n' + 
'   </div>\n';

    return innerHTML;
}

function create_event_snippet (obj, author) {
    var innerHTML = "";
    
    innerHTML += create_event_avatar(obj, author);
    innerHTML += create_event_detail(obj, author);
    innerHTML += create_event_footer(obj, author);

    return innerHTML;
}

function create_event_avatar (obj, author) {

    var innerHTML = 
'       <div class="tydget-avatar-wrapper">\n' + 
'           <div class="tydget-avatar-itself">\n' + 
'               <a href="' + author.profilePageUrl + '">\n' + 
'                   <img class="tydget-thumbnail" src="' + get_resized_avatar(author, 50) + '">\n' + 
'               </a>\n' + 
'           </div>\n' + 
'       </div>';

    return innerHTML;
}

function create_event_detail (obj, author) {
    var innerHTML = "";
    
    innerHTML += 
'       <div class="tydget-event-detail">\n' + 
'           <span class="tydget-action-string">\n'  + 
'               <a class="tydget-author_link" href="' + author.profilePageUrl + '">' + get_author_name(author) + '</a>\n' + 
'               <a class="tydget-action-string" href="' + obj.permalinkUrl + '">' + get_full_action_wording(obj, author) + '</a>\n' + 
'           </span>\n' + 
'       </div>\n';

    return innerHTML;
}

function create_event_footer (obj, author) {
    var innerHTML = "";
    
    innerHTML += 
'       <div class="tydget-event_footer_div">\n' + 
'           <div class="tydget-comment-div">\n' + 
'               <a class="tydget-comment-link" href="' + obj.permalinkUrl + '#comments">' + obj.commentCount + '</a>\n' + 
'           </div>\n' + 
'           <div class="tydget-fav-div">\n' + 
'               <a class="tydget-fav-link" href="' + obj.permalinkUrl + '#comments">' + obj.favoriteCount + '</a>\n' + 
'           </div>\n' + 
'       </div>\n';

    return innerHTML;
}



/***************
 * utility fns to help parse the api or formulate something for tydget
 ***************/
/* These are all hosted in Boone/library/utilites.js */

/***************
 * utility fns to help parse the api or formulate something for tydget
 ***************/
 
 
function get_author_name (author_obj) {
    if (author_obj.displayName) {
        return author_obj.displayName;
    }

    return "A Member";
}


 function get_post_wording (obj) {

    var str = "";
    if (obj.videoLink) {
       str = "a video";
    }
    else if (obj.imageLink) {
       str = "an image";
    }
    else if (obj.targetUrl) {
       str = "a link";
    }
    else if (obj.audioLink) {
       str = "a soundclip";
    }

    if (str && (((obj.title && !obj.audioLink) || obj.content))) {
       str += " called";
    }

    return str;
}


function get_action_verb (obj) {
   if (obj.videoLink || obj.targetURL || obj.audioLink) {
      return "shared";
   }
   
   return "posted";
}


function get_resized_avatar (user, size) {
    // use the lilypad as a default in case all else fails
    var default_avatar = 'http://up3.typepad.com/6a00d83451c82369e20120a4e574c1970b-50si';
    
    
     //for (var i = 0; i < user.links.length; i++) {
     //     if (user.links[i].rel == "avatar") {
     //      if (user.links[i].width < 125) {
     //             return user.links[i].href;
     //        } 
    //     }
    // }

    if (user.avatarLink) {
       return user.avatarLink.url;
    }

   return default_avatar;
}


function get_site_name (url) {
//   return "the community";
   if (!url) {
//       alert("[get_site_name] name is bad");
      return "Community";
   }
   
   var url_parts = new Array();
   url_parts = url.split("/");

   // the first two should represent the http.
   // the next should represent everything up to the slash.
   
   // If it's a (something).typepad.com, just show the something.
   var name = url_parts[2];
   var snippet_parts = new Array();
   snippet_parts = name.split(".");
   if (snippet_parts[1] == "typepad") {
      name = snippet_parts[0];
   }
   else if ((snippet_parts[1] == "com") ||
            (snippet_parts[1] == "info") ||
            (snippet_parts[1] == "org")) {
      // this is the case where there's no subdomain, so just use the domain.
      name = snippet_parts[0];
   }
   else {
      // otherwise, if it's a www.NAME.com, so use the inner.
      name = snippet_parts[1];
   }

   if (name == "mmmeow") {
      return name;
   }
   else if (name == "womensbookclub") {
      return "NY Women's Book Club";
   }
   
   name = capitalize_string(name);
   
   return "The " + name + " Community";
}


function get_site_url (url) {
   
   if (!url) {
    //   alert("[get_site_url] url is bad");
      return "http://www.typepad.com";
   }
   
   var url_parts = new Array();
   url_parts = url.split("/");
   
   // the first two should represent the http.
   // the next should represent everything up to the slash.
   return "http://" + url_parts[2];
}


function chop_str (str, size) {
   if (str.length <= size) {
      return str;
   }
   
   var str_parts = new Array();
   str_parts = str.split(" ");
   
   // now we have an array of words.
   var i = 0;

   var curr = "";
   var next = str_parts[i];
   while (next.length < size) {
      curr += str_parts[i] + ' ';
      i++;
      next += str_parts[i] + ' ';
   }
  
   // chop the last space
   curr = curr.substring(0, (curr.length - 1));
   return curr + "...";
}


function capitalize_string (name) {

   // make sure name is capitalized.
    var first_letter = name.substr(0, 1);
    var rest = name.substr(1, name.length);
    first_letter = first_letter.toUpperCase();
    return first_letter + rest;
}


function get_full_action_wording(obj, author) {

    var post_type = get_post_wording(obj);
    var action = get_action_verb(obj);
    
    // borrow the twitter length for simplicity.
    var string_length = 140;
      
    var title = "";
    // create the title.
    // Audio link titles have funky strings.
    if (obj.title && (!obj.audioLink)) {
        title = chop_str(obj.title, (string_length - action.length - post_type.length - author.displayName.length)); //.substring(0, 75);
    }
    else if (obj.content) {
        title = chop_str(obj.content, (string_length - action.length - post_type.length - author.displayName.length));
    }

    var html_string = " " + action + " " + post_type;
    if (title) {
        html_string += " '" + title + "'";
    }
    
    return html_string;
}


