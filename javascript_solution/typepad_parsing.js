function event_callback(json_response) {

    var tydget = document.getElementById("tydget");

    // just return empty set for now.
    if (!tydget) {
        alert("Couldn't find id=tydget; ending.");
        return;
    }

    // set up the divs.
   var inner_body_div = outer_div_setup(tydget, json_response.entries[0].object);


   for (var i = 0; i < json_response.entries.length; i++) {
        var author = json_response.entries[i].actor;
        var outer_div = document.createElement("div");
        
        if (author) {
           if (json_response.entries[i].object) {           
                
              // the outer wrapper of this event.
              var outer_div = document.createElement("div");
              outer_div.setAttribute("class", "tydget-event");
                 
              create_event_snippet(json_response.entries[i].object, outer_div, author);
           }
           else {
              // alert("Error on this event; skipping it.");
           }
        
           inner_body_div.appendChild(outer_div);
        }
    }


    var outer_body_div = footer_div_setup(json_response.entries[0].object);
}


function outer_div_setup(tydget, obj) {

    // build the initial divs.
    var outer_div = document.createElement("div");
    outer_div.setAttribute("class", "tydget");
    outer_div.setAttribute("id", "tydget");

    var body_div = document.createElement("div");
    body_div.setAttribute("class", "tydget-body");
    body_div.setAttribute("id", "tydget-body");
    
    // add a header div here.
    
    var header_div = document.createElement("div");
    header_div.setAttribute("class", "tydget-header-div");
    
    var header_title = document.createElement("a");
    header_title.setAttribute("class", "tydget-header-title");

    header_title.setAttribute("href", get_site_url(obj.permalinkUrl));
    header_title.innerHTML = get_site_name(obj.permalinkUrl);  

    
    var header_precursor = document.createElement("div");
    header_precursor.setAttribute("class", "tydget-header-precursor");
    header_precursor.innerHTML = "recently on"; 
    
    header_div.appendChild(header_precursor);   
    header_div.appendChild(header_title);
    
    body_div.appendChild(header_div);
    
    
    var inner_body_div = document.createElement("div");
    inner_body_div.setAttribute("class", "tydget-inner-body");
    inner_body_div.setAttribute("id", "tydget-inner-body");

    body_div.appendChild(inner_body_div);
    outer_div.appendChild(body_div);


    //            event_title.innerHTML = title;
    tydget.appendChild(outer_div);
    
    return inner_body_div;
    
}

function create_event_snippet(obj, outer_div, author) {
      
      //----------- this controls the userpic on the right side
      var userpic_img_url = get_resized_avatar(author, 50);
      var userpic_img = document.createElement("img");
      userpic_img.setAttribute("src", userpic_img_url);
      userpic_img.setAttribute("class", "tydget-thumbnail");
      
      var author_profile_link = document.createElement('a');
      author_profile_link.setAttribute("href", author.profilePageUrl);
      author_profile_link.appendChild(userpic_img);

      var avatar_itself_div = document.createElement("div");
      avatar_itself_div.setAttribute("class", "tydget-avatar-itself");
      avatar_itself_div.appendChild(author_profile_link);

      // wrap the userpic in a userpic div.
      var userpic_div = document.createElement("div");
      userpic_div.setAttribute("class", "tydget-avatar-wrapper");
      userpic_div.appendChild(avatar_itself_div);
      
      // now append this to the Event class.
      outer_div.appendChild(userpic_div);
      
      //------------ Now onto the left part of the event.
      
      // set up the event-detail div.
      var event_detail_div = document.createElement("div");
      event_detail_div.setAttribute("class", "tydget-event-detail");
      var full_action_string = document.createElement("p");
      full_action_string.setAttribute("class", "tydget-action-string");
      
      // create another author_profile_link here.
      var author_profile_link_2 = document.createElement('a');
      author_profile_link_2.setAttribute("href", author.profilePageUrl);
      author_profile_link_2.setAttribute("class", "tydget-author_link");
      author_profile_link_2.innerHTML = get_author_name(author);
/*      title_str.appendChild(author_profile_link_2); */
      
      var action_string = document.createElement('a');
      action_string.setAttribute("href", obj.permalinkUrl);
      action_string.setAttribute("class", "tydget-action-string");
      
      var post_type = get_post_wording(obj);
      var action = get_action_wording(obj);
      
      var title = "";
      // create the title.
      // Audio link titles have funky strings.
      if (obj.title && (!obj.audioLink)) {
         title = chop_str(obj.title, (95 - action.length - post_type.length - author.displayName.length)); //.substring(0, 75);
      }
      else if (obj.content) {
         title = chop_str(obj.content, (95 - action.length - post_type.length - author.displayName.length));
      }
      


      var html_string = " " + action + " " + post_type;
      if (title) {
         html_string += " '" + title + "'";
      }
      action_string.innerHTML = html_string;
/*      title_str.appendChild(dummy_div); */
      
      full_action_string.appendChild(author_profile_link_2); 
      full_action_string.appendChild(action_string);

      event_detail_div.appendChild(full_action_string);
      
//      event_detail_div.appendChild(event_footer_div); 
      outer_div.appendChild(event_detail_div);
      
      //--------- now for the bottom comment + fav counts.
      var fav_count = obj.favoriteCount;
      
      var comment_icon = 'http://mmmeow.com/static/themes/app/images/comments.png';
      var fav_off = 'http://mmmeow.com/static/themes/app/images/fav-off.gif';
      var fav_on = 'http://mmmeow.com/static/themes/app/images/fav-on.gif';

      var event_footer_div = document.createElement('div');
      event_footer_div.setAttribute("class", "tydget-event_footer_div");

      var comment_div = document.createElement('div');
      comment_div.setAttribute('class', "tydget-comment-div");
      var comment_link = document.createElement('a');
      comment_link.setAttribute('href', obj.permalinkUrl);
      comment_link.setAttribute('class', 'tydget-comment-link');
      comment_link.innerHTML = obj.commentCount;
      
      comment_div.appendChild(comment_link); 
      event_footer_div.appendChild(comment_div); 
      
      
      var fav_div = document.createElement('div');
      fav_div.setAttribute('class', 'tydget-fav-div');
      var fav_link = document.createElement('a');
      fav_link.setAttribute('href', obj.permalinkUrl);
      fav_link.setAttribute('class', 'tydget-fav-link');
      fav_link.innerHTML = obj.favoriteCount;
      
      fav_div.appendChild(fav_link);
      event_footer_div.appendChild(fav_div); 
      
      outer_div.appendChild(event_footer_div); 
}


function get_author_name (author_obj) {
    if (author_obj.displayName) {
        return author_obj.displayName;
    }
    
    return "A Member";
}
function get_post_wording(obj) {
   
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

function get_action_wording(obj) {
   if (obj.videoLink || obj.targetURL || obj.audioLink) {
      return "shared";
   }
   
   return "posted";
}

function get_resized_avatar(user, size) {
 
   for (var i = 0; i < user.links.length; i++) {
      if (user.links[i].rel == "avatar") {
         if (user.links[i].width < 125) {
               return user.links[i].href;
         } 
      }
   }

   return "http://up2.typepad.com/6a01157087cbfa970b0120a64430f2970c-50si";
}

function get_date (date_str) {
   var d = new Date();
   
 //  my month = get_month(date_parts[1]);
   
 //  alert("this month = " + month);
}
function get_site_name(url) {
//   return "the community";
   if (!url) {
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

function get_site_url(url) {
   
   if (!url) {
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

function footer_div_setup(tydget, obj) {
      // build the initial divs.

      var footer_outer_div = document.createElement('div');
      footer_outer_div.setAttribute("class", "tydget-footer-outer");  
      
      var footer_inner_div = document.createElement("a");
      footer_inner_div.setAttribute("class", "tydget-footer-inner");
      footer_inner_div.setAttribute("href", "http://www.typepad.com");
      footer_inner_div.innerHTML = ".";
      
      var footer_logo_div = document.createElement("a");
      footer_logo_div.setAttribute("class", "tydget-footer-logo");
      footer_logo_div.setAttribute("href", "http://www.typepad.com");
      footer_logo_div.innerHTML = ".";
      
      
      
      // now nest the divs.
//      footer_inner_div.appendChild(footer_logo_div);
      footer_outer_div.appendChild(footer_inner_div);
      
      
      
      // attempt to get the outer div
      var entire_widget = document.getElementById('tydget-body');

      if (!entire_widget) {
          return;
      }
      
      entire_widget.appendChild(footer_outer_div);

}