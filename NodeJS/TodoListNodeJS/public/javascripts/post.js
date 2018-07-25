

$(document).ready(()=>{
    $('.postEdit').click(function(e) {
        var baseUrl = location.protocol + '//' + document.domain + ':' + location.port + '/admin';
        // alert(url);
        // return;
        var params = {
            id: $('.id').val(),
            title: $('.title').val(),
            content: tinymce.get('content').getContent(),
            author: $('.author').val()
        };

        
        $.ajax({
            url: baseUrl + '/post/edit',
            type: 'PUT',
            data: params,
            dataType: 'json',
            success: function(res) {
                if (res && res.statusCode == 200) {
                    location.reload();
                    // window.location.href = baseUrl + '/dashboard';
                }
            }
        });

    });

    $('.postDelete').click(function(e){
        // alert('alo');
        var postId = $(this).attr('postId');
        // console.log(postId);
        // alert(postId);
        var baseUrl = location.protocol + '//' + document.domain + ':' + location.port + '/admin';
        // alert(baseUrl);        
        $.ajax({
            url: baseUrl + '/post/delete',
            type: 'DELETE',
            data: {id: postId},
            dataType: 'json',
            success: function(res) {
                if (res && res.statusCode == 200) {
                    location.reload();
                }
            }
        });
    });
});