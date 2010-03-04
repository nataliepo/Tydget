function event_callback(json_response) {

    var tydget = document.getElementById("tydget");

    // just return empty set for now.
    if (!tydget) {
        alert("Couldn't find id=tydget; ending.");
        return;
    }

    // set up the divs.
   var inner_body_div = outer_div_setup(tydget);


   for (var i = 0; i < json_response.entries.length; i++) {
        
      
        var author = json_response.entries[i].actor;
        
        if (author) {
             
             if (json_response.entries[i].object) {           
                
                  // the outer wrapper of this event.
                 var outer_div = document.createElement("div");
                 outer_div.setAttribute("class", "event");
                 
                create_event_snippet(json_response.entries[i].object, outer_div, author);
             }
             else {
                // alert("Error on this event; skipping it.");
             }
        
             // add the outer_div (Event) to the inner-body.
             inner_body_div.appendChild(outer_div);
         }
    }
}


function outer_div_setup(tydget) {

    // build the initial divs.
    var outer_div = document.createElement("div");
    outer_div.setAttribute("class", "typepad_widget");
    var body_div = document.createElement("div");
    body_div.setAttribute("class", "body");
    var inner_body_div = document.createElement("div");
    inner_body_div.setAttribute("class", "inner-body");

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
      userpic_img.setAttribute("class", "thumbnail");
      
      var author_profile_link = document.createElement('a');
      author_profile_link.setAttribute("href", author.profilePageUrl);
      author_profile_link.appendChild(userpic_img);

      var avatar_itself_div = document.createElement("div");
      avatar_itself_div.setAttribute("class", "avatar-itself");
      avatar_itself_div.appendChild(author_profile_link);

      // wrap the userpic in a userpic div.
      var userpic_div = document.createElement("div");
      userpic_div.setAttribute("class", "avatar-wrapper");
      userpic_div.appendChild(avatar_itself_div);
      
      // now append this to the Event class.
      outer_div.appendChild(userpic_div);
      
      //------------ Now onto the left part of the event.
      
      // set up the event-detail div.
      var event_detail_div = document.createElement("div");
      event_detail_div.setAttribute("class", "event-detail");
      var title_str = document.createElement("p");
      
      // create another author_profile_link here.
      var author_profile_link_2 = document.createElement('a');
      author_profile_link_2.setAttribute("href", author.profilePageUrl);
      author_profile_link_2.setAttribute("class", "author_link");
      author_profile_link_2.innerHTML = author.displayName;
      title_str.appendChild(author_profile_link_2);
      
      var dummy_div = document.createElement('div');
      
      var title = "";
      // create the title.
      if (obj.title) {
         title = obj.title.substring(0, 80);
      }
      else if (obj.content) {
         title = obj.content.substring(0, 80);
      }
      
      var post_type = get_post_wording(obj);
      var action = get_action_wording(obj);

      var html_string = " " + action + " " + post_type;
      if (title) {
         html_string += " titled '" + title + "'";
      }
      dummy_div.innerHTML = html_string;
      title_str.appendChild(dummy_div);

      event_detail_div.appendChild(title_str);
      
      //--------- now for the bottom comment + fav counts.
      var fav_count = obj.favoriteCount;
      
      var comment_icon = 'http://mmmeow.com/static/themes/app/images/comments.png';
      var fav_off = 'http://mmmeow.com/static/themes/app/images/fav-off.gif';
      var fav_on = 'http://mmmeow.com/static/themes/app/images/fav-on.gif';

      var event_footer_div = document.createElement('div');
      event_footer_div.setAttribute("class", "event_footer_div");

      var comment_div = document.createElement('div');
      comment_div.setAttribute('class', "comment-div");
      var comment_link = document.createElement('a');
      comment_link.setAttribute('href', obj.permalinkUrl);
      comment_link.setAttribute('class', 'comment-link');
      comment_link.innerHTML = obj.commentCount + " Comments, " + 
                               obj.favoriteCount + " Favorites";
      
      comment_div.appendChild(comment_link); 
      event_footer_div.appendChild(comment_div); 
      
      
      event_detail_div.appendChild(event_footer_div); 
      outer_div.appendChild(event_detail_div);
}

function get_post_wording(obj) {
   
   if (obj.videoLink) {
      return "a video";
   }
   else if (obj.imageLink) {
      return "an image";
   }
   else if (obj.targetUrl) {
      return "a link";
   }
   else {
      return "something";
   }

}

function get_action_wording(obj) {
   if (obj.videoLink || obj.targetURL) {
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