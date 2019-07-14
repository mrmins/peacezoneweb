var URL = "http://peace.zone/";
var GET = "GET";
var POST = "POST";

var UserLogin = URL + "user/login";
var UserRegister = URL + "user/register";
var UserLogOut = URL + "user/logout";
var UserCheckSession = URL + "user/checksession";
var UserByToken = URL + "user/find";
var UserById = URL + "user/findbyid";

var SendInvite = URL + "user/sendinvite";
var UserPendingInvites = URL + "user/pendinginvites";
var RequestedInvites = URL + "user/requestedinvites";
var Connections = URL + "user/connections";

var ValidateCode = URL + "user/validatecode";

var GetCatalogs = URL + "categories/catalogs";
var GetCatalogosReport = URL + "categories/reportscatalog";

var FindArticle = URL + "article/find";
var AddArticle = URL + "article/add";
var UpdateArticle = URL + "article/update";
var DeleteArticle = URL + "article/delete";

var AddComment= URL + "article/addcomment";
var UpdateComment = URL + "article/updatecomment";
var DeleteComment = URL + "article/deletecomment";

var VoteArticle= URL + "article/votearticle";
var VoteComment= URL + "article/votecomment";
var MyArticles = URL + "article/myarticles";
var ArticlesByUserID = URL + "article/articlesbyuserid";

var MyFeed = URL + "feed/feed";

$(function() {
    
    var route = location.href.replace(/(.+\w\/)(.+)/,"/$2");

    if(route == "/" || route == "/#" || route == "/index.html" || route == "/index.html#") {
        checkSession();
    } else if(route.indexOf("/feed.html") !== -1) {
        $('body').prepend( menu() );
        getFeed();
        $('body').addClass("gray-gradient");
    } else if(route.indexOf("/profile.html") !== -1) {
        $('body').prepend( menu() );
        getProfile();
        $('body').addClass("gray-gradient");
    } else if(route.indexOf("/publish.html") !== -1) {
        $('body').prepend( menu() );
        getCategories();
        $('body').addClass("gray-gradient");
    } else if(  route.indexOf("/article.html") !== -1) {
        $('body').prepend( menu() );
        loadArticle();
        $('body').addClass("gray-gradient");
    } else if(  route.indexOf("/invites.html") !== -1) {
        $('body').prepend( menu() );
        getSentInvites();
        $('body').addClass("gray-gradient");
    } else if(  route.indexOf("/connections.html") !== -1) {
        $('body').prepend( menu() );
        getConnections();
        $('body').addClass("gray-gradient");
    }

    $("#btnLogin").on("click", function() {
        login( $("#txtEmail").val(), $("#txtpassword").val() );
    });

    $("#btn-publish").on("click", function() {
        save("1");
    });

    $("#btn-draft").on("click", function() {
        save("0");
    });

    $("#btnAddComment").on("click", function() {
        publishComment();
    });

    $('body').delegate('#btn-logout', 'click', function() {
        var __data = {'uuid': getCookie('uuid').hexDecode(), 'token': getCookie('token') };

        request(POST, UserLogOut, __data, function(data) {
            if(data) {
                setCookie('token', null, -1);
                setCookie('uuid', null, -1);
                window.location.href = 'index.html';
            } else {
                //TODO: BORRAR COOKIE
            }
        });
    });

    $('body').delegate('.m-up', 'click', function() {
        var id = $(this).attr('mid');
        voteA(id, '1', '#u-' + id, '#tu-' + id, '#d-' + id, '#td-' + id );
    });

    $('body').delegate('.m-down', 'click', function() {
        var id = $(this).attr('mid');
        voteA(id, "0", '#d-' + id, '#td-' + id, '#u-' + id, '#tu-' + id);
    });

    $('body').delegate('.c-up', 'click', function() {
        var id = $(this).attr('cid');
        voteC(id, '1', '#u-' + id, '#tu-' + id, '#d-' + id, '#td-' + id );
    });

    $('body').delegate('.c-down', 'click', function() {
        var id = $(this).attr('cid');
        voteC(id, "0", '#d-' + id, '#td-' + id, '#u-' + id, '#tu-' + id);
    });

});

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(name) {
    var r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
    return r ? r[1] : null;
};


String.prototype.hexEncode = function(){
    var hex, i;

    var result = "";
    for (i=0; i<this.length; i++) {
        hex = this.charCodeAt(i).toString(16);
        result += ("000"+hex).slice(-4);
    }

    return result
}

String.prototype.hexDecode = function(){
    var j;
    var hexes = this.match(/.{1,4}/g) || [];
    var back = "";
    for(j = 0; j<hexes.length; j++) {
        back += String.fromCharCode(parseInt(hexes[j], 16));
    }

    return back;
}

function getURLParameter( name ) {
    var url = location.href;
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( url );
    return results == null ? null : results[1];
}

function request(__method, __url, __data, __callback) {
    $.ajax({
        type: __method,
        url: __url,
        data: __data,
        headers: { 
            'Content-Type': 'application/x-www-form-urlencoded', 'Access-Control-Allow-Origin': '*' },
        success: function(result) {
            __callback(result);
        }
    });
}

function checkSession() {
    if(getCookie('token') != null && getCookie('token') != '') {
        var __data = {'uuid': getCookie('uuid').hexDecode(), 'token': getCookie('token') };

        request(POST, UserCheckSession, __data, function(data) {
            if(data) {
                window.location.href = 'feed.html';
            } else {
                //TODO: BORRAR COOKIE
            }
        });
    }
}

function login(email, password) {
    var __data = {'email': email, 'password': password, 'uuid': email, 'id_device': 2 };
    request(POST, UserLogin,  __data, function(data) {
        if(data.success) {
            setCookie('token', data.message, 7);
            setCookie('uuid', __data.email.hexEncode(), 7);
            window.location.href = "feed.html";
        } else {
            alert(data.message);
        }
    });
}

function getFeed() {
    $('#connectionsfeed').empty();
    $('#myfeed').empty();
    request(GET, MyFeed + "?token=" + getCookie('token'), null, function(data) {
        if(data.success) {
            data.articles.forEach(item => {
                $('#connectionsfeed').append( movieItem(item.id, item.title, item.description, item.username, 
                    item.category, item.creation_date, item.comments, item.upvotes, 
                    item.downvotes, item.own, item.upvotedbyme, item.downvotedbyme ) );
            });

            data.my.forEach(item => {
                $('#myfeed').append( movieItem(item.id, item.title, item.description, item.username, 
                    item.category, item.creation_date, item.comments, item.upvotes, 
                    item.downvotes, item.own, item.upvotedbyme, item.downvotedbyme ) );
            });

            if(data.articles.length == 0) {
                $('#connectionsfeed').append("<p class='white'>No movie synopsis to show</p>");
            }
            if(data.my.length == 0) {
                $('#my').append("<p class='white'>No movie synopsis to show</p>");
            }

        }
    });
}

function getConnectionArticles(id) {
    $('#connectionsfeed').empty();
    $('#myfeed').empty();
    request(GET, ArticlesByUserID + "?token=" + getCookie('token') + "&id=" + id, null, function(data) {
        if(data.success) {
            data.articles.forEach(item => {
                $('#myfeed').append( movieItem(item.id, item.title, item.description, item.username, 
                    item.category, item.creation_date, item.comments, item.upvotes, 
                    item.downvotes, item.own, item.upvotedbyme, item.downvotedbyme ) );
            });

        }
    });
}


function getProfile() {
    var id = getURLParameter("id");

    if (id == null) {
        request(GET, UserByToken + "?token=" + getCookie('token'), null, function(data) {
            $(".username").text(data.username);
            $(".txt-ms").text(data.articles);
            $(".txt-c").text(data.connections);
            getFeed();
            $(".txt-c").parent().attr("href", "connections.html");
        });
    } else {
        request(GET, UserByToken + "?token=" + getCookie('token') + "&id=" + id, null, function(data) {
            $(".username").text(data.username);
            $(".txt-ms").text(data.articles);
            $(".txt-c").text(data.connections);

            getConnectionArticles( getURLParameter('id') );
        });
    }
}

function getCategories() {
    $("#cbx-category").empty();
    request(GET, GetCatalogs, null, function(data) {
        data.catalogs.forEach(item => {
            $("#cbx-category").append("<option value='" + item.name + "'>" + item.name + "</option>");
        });
    });
}


function save(toPublish) {
    if($('#txtTitle').val() == "" || $('#txtDescription').val() == "" ) {
        alert("You must add a title and movie synopsis to submit");
        return;
    }

    var id = getURLParameter("id");
    var endpoint = (id == null) ? AddArticle : UpdateArticle;
    var __data = {
        'token': getCookie('token'),
        'title': $('#txtTitle').val(),
        'description': $('#txtDescription').val(),
        'category': $("#cbx-category option:selected").text(),
        'id': id,
        'published': toPublish
    };

    request(POST, endpoint,  __data, function(data) {
       if(data.success) {
            window.location = "article.html?id=" + data.code;
       } else {

       }
    });    
}

function loadArticle() {
    var id = getURLParameter("id");
    
    request(GET, FindArticle + "?id=" + id + "&token=" + getCookie("token"), null, function(data) {
        //console.log(data);
        var item = data.article;
        $('.feed-main').append( movieItem(item.id, item.title, item.description, item.username, 
            item.category, item.creation_date, item.comments, item.upvotes, 
            item.downvotes, item.own, item.upvotedbyme, item.downvotedbyme) );
        
        data.comments.forEach(item => {
            $('.comment-main').append( commentItem( item.id, item.comment, item.username, 
                item.upvotes, item.downvotes, item.own, item.upvotedbyme, item.downvotedbyme ) );
        });

        if(data.comments.length == 0) {
            $('.comment-main').append("<p>No comments yet.</p>");
        }

    });
}

function publishComment() {
    if($("#txtComment").val() == "") {
        alert("You must write a comment");
        return;
    }

    var id = getURLParameter("id");
    var comment = $("#txtComment").val();

    var __data = {'comment': comment, 'token': getCookie('token'), 'id': id };

    request(POST, AddComment, __data, function(data) {
        console.log(data);
        if(data) {
            $("#txtComment").val("");
            window.location.reload();
        } else {
            //TODO: BORRAR COOKIE
        }
    });
}

function getSentInvites() {
    $("#sentInvites").empty();
    $("#requested table").empty();
    
    request(GET, UserPendingInvites + "?token=" + getCookie('token'), null, function(data) {
        if(data.success) {
            if(data.invites.length == 0) {
                $("#sentInvites").append("<p>No pending invites</p>");
            }
            data.invites.forEach(item => {
                $("#sentInvites").append( sentInvite(item.address, item.code, item.creation_date ) );
            });
        }
    });

    request(GET, RequestedInvites + "?token=" + getCookie('token'), null, function(data) {
        if(data.success) {
            if(data.invites.length == 0) {
                $("#requested table").append("<p>No pending invites</p>");
            }
            //$("#requested table").append( requested(1, "benjamin.rivera@gmail.com") );
            //$("#requested table").append( requested(1, "blopez@gmail.com") );
        }
    });
}

function voteA(id, vote, img, counter, relatedImg, relatedText) {
    var __data = { 'token': getCookie('token'), 'vote': vote, 'id': id  };
    
    request(POST, VoteArticle, __data, function(data) {
        if(data.success) {
            if(data.message == "Vote added") {
                $(img).removeClass('false');
                $(img).removeClass('true');

                $(counter).text( parseInt( $(counter).text() ) + 1 );
                $(img).addClass("true");
    
                if( $(relatedImg).hasClass("true") ) {
                    $(relatedText).text( parseInt( $(relatedText).text() ) - 1 );
                }
    
                $(relatedImg).addClass("false");
            } else {
                $(img).removeClass('true');
                $(img).addClass("false");

                $(relatedImg).removeClass('true');
                $(relatedImg).addClass("false");

                $(counter).text( parseInt( $(counter).text() ) - 1 );
            }
        }
    });
}

function voteC(id, vote, img, counter, relatedImg, relatedText) {
    var __data = { 'token': getCookie('token'), 'vote': vote, 'id': id  };

    request(POST, VoteArticle, __data, function(data) {
        if(data.success) {
            if(data.message == "Vote added") {
                $(img).removeClass('false');
                $(img).removeClass('true');

                $(counter).text( parseInt( $(counter).text() ) + 1 );
                $(img).addClass("true");
    
                if( $(relatedImg).hasClass("true") ) {
                    $(relatedText).text( parseInt( $(relatedText).text() ) - 1 );
                }
    
                $(relatedImg).addClass("false");
            } else {
                $(img).removeClass('true');
                $(img).addClass("false");

                $(relatedImg).removeClass('true');
                $(relatedImg).addClass("false");

                $(counter).text( parseInt( $(counter).text() ) - 1 );
            }
        }
    });
    
}

function getConnections() {
    $('#connection-place').empty();
    request(GET, Connections + "?token=" + getCookie('token'), null, function(data) {
        data.users.forEach(item => {
            $('#connection-place').append(  connectionItem(item.id, item.username) );
        });
    });
}