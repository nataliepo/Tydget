function event_callback(json_response) {

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

