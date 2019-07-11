

function movieItem(id, title, description,username, category, 
    creation_date, comments, upvotes, downvotes, own, 
    upvotedbyme, downvotedbyme) {
    var _own = "";
    if(own) {
        _own = '<img src="images/edit.png" />';
    }

    return '<div class="movie-container">' +
    '<a href="article.html?id=' + id + '" class="title white">' + title + '</a>' +
    '<table class="movie-info">' +
        '<tr>'+
            '<td>' + username + '</td>'+
            '<td>' + category + '</td>'+
            '<td>' + creation_date + ' </td>'+
        '</tr>'+
    '</table>'+
    '<p>' + description + '</p>'+
    '<table class="movie-stats">'+
        '<tr>'+
            '<td> <img src="images/comment.png" /> <span class="txtcomments">' +  comments + '</span> </td>'+
            '<td> <img value="' + upvotedbyme + '" id="u-' + id + '" class="m-up '+ upvotedbyme + '" mid="' + id + '" src="images/upvote.png"  /> <span id="tu-' + id + '" class="txtupvotes">' + upvotes + '</span> </td>'+
            '<td> <img value="' + downvotedbyme + '" id="d-' + id + '" class="m-down ' + downvotedbyme + '" mid="' + id + '" src="images/downvote.png"  /> <span id="td-' + id + '" class="txtdownvotes">' + downvotes + '</span> </td>'+
            '<td> ' + _own + '</td>'+
        '</tr>'+
    '</table>'+
    '</div>';
}

function commentItem(id, comment, username, upvotes, downvotes, own, upvotedbyme, downvotedbyme) {
    return '<div class="comment-container">' + 
    '<p>' + comment + '</p>' +
    '<span class="sub">' + username + '</span>' + 
        '<table class="comments-stats">'+
            '<tr>'+
                '<td> <img value="' + upvotedbyme + '" id="u-' + id + '" class="c-up '+ upvotedbyme + '" cid="' + id + '" src="images/upvote.png" /> <span id="tu-' + id + '" class="txtupvotes">' + upvotes + '</span> </td>'+
                '<td> <img value="' + downvotedbyme + '" id="d-' + id + '" class="c-down ' + downvotedbyme + '" cid="' + id + '" src="images/downvote.png" /> <span id="td-' + id + '" class="txtdownvotes">' + downvotes + '</span> </td>'+
            '</tr>'+
        '</table>'+
    '</div>';
}

function menu() {
    return '<nav class="navbar navbar-expand-lg navbar-dark bg-dark">' +
    '<a class="navbar-brand" href="#"> <img src="images/logoletters.png" width="100px" /> </a>' +
    '<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">' +
      '<span class="navbar-toggler-icon"></span>' +
    '</button>' +
    '<div class="collapse navbar-collapse" id="navbarSupportedContent">' +
      '<ul class="navbar-nav mr-auto">' +
        '<li class="nav-item active">' +
          '<a class="nav-link" href="feed.html">Home <span class="sr-only">(current)</span></a>' +
        '</li>' +
        '<li class="nav-item">' +
          '<a class="nav-link" href="publish.html">Write a movie synopsis</a>'+
        '</li>' +
        '<li class="nav-item">' +
            '<a class="nav-link" href="invites.html">Invites</a>' +
        '</li>' +
        '<li class="nav-item">' +
                '<a class="nav-link" href="profile.html">Profile</a>' +
            '</li>' +
      '</ul>' +
      '<form class="form-inline my-2 my-lg-0">'+
        '<button id="btn-logout" class="btn btn-outline-success my-2 my-sm-0" type="button">Logout</button>' +
      '</form>' +
    '</div>'+
  '</nav>';
}

function sentInvite(contact, code, date) {
  return '<table>' +
            '<tr>' +
                '<td>' + contact + '</td>' +
                '<td>' + code + '</td>' +
                '<td>' + date + '</td>' +
            '</tr>' +
          '</table>';
}

function requested(id, email) {
  return '<tr> <td>' + email + '</td>  <td><input type="button" value="Accept" /> </td>  <td> <input class="btncancel" type="button" value="Reject" /> </td>  </tr>  '
}