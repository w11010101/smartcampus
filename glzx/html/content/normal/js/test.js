define(['dateTime'],function(mousewheel,dateTime){
    // 日期
    $.datetimepicker.setLocale('zh');
    $('#startDate').datetimepicker({        
        timepicker:false,
        format:'Y.m.d',
        parentID:"html",
        onShow:function( ct ){
            console.log(123)
            this.setOptions({
                maxDate:$('#endDate').val()?$('#endDate').val():false
            })
        },
    });

    $('#endDate').datetimepicker({
        timepicker:false,
        format:'Y.m.d',
        parentID:"html",
        onShow:function( ct ){
            this.setOptions({
                minDate:$('#startDate').val()?$('#startDate').val():false
            })
        },
    });
    // ==================================
    return {
        val:"test.js return 的 对象",
        start:function(text){
            console.log(text+'这是test对象中的start方法');
        }
    }
});