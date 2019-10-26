$(document).ready(function(){
    $('.delete').on('click',function(e){
        $target =$(e.target);
        
        const id = $target.attr('data-id')
        $.ajax({
            type:'DELETE',
            url:'/deletemovie/'+id,
            success: function(response){
                alert('Deleting Movie')
                window.location.href='/movies'
            },
            error:function(err){
                console.log(err);
                
            }
        })
    })
})
