var COLUMN_TYPE = ['todo', 'doing', 'done'];

var DOING_LIMIT = 3;

var DB = {
    // Lấy dữ liệu
    getData: function () {
        // Trước khi lấy thì phải kiểm tra
        if (typeof (Storage) !== "undefined") {
            // Code for localStorage/sessionStorage.
            var data;
            try {
                data = JSON.parse(localStorage.getItem('list')) || {};
                COLUMN_TYPE.forEach(function (type) {
                    if (!Array.isArray(data[type])) data[type] = [];
                });
            } catch (error) {
                data = {};
            }

            return data;


        } else {
            // Sorry! No Web Storage support..
            alert('Sorry! No Web Storage support..');
            return {};
        }
    },

    // Lưu dữ liệu
    setData: function (data) {
        localStorage.setItem('list', JSON.stringify(data));
    }
};

var Until = {
    showLoading: function () {
        $('.overlay').removeClass('hidden');
    },
    hideLoading: function () {
        $('.overlay').addClass('hidden');
    },
    openAlertModal: function () {
        $('#modal-alert').modal('show');
    },
    openConfirmModal: function () {
        $('#modal-confirm').modal('show');
    },
    closeConfirmModal: function () {
        $('#modal-confirm').modal('hide');
    }
};

var list = DB.getData();

var app = {

    init: function () {
        var self = this;

        // Add job to lists
        COLUMN_TYPE.forEach(function (type) {
            var columnType = list[type] || [];
            columnType.forEach(function (jobName) {
                self.addJobToList(type, jobName);
            });
        });

        // Init sortable
        this.sortJob();

        // Hide loading
        /* Until.hideLoading(); */
    },

    sortJob: function () {
        var self = this;
        

        $('.sorted-list').sortable({
            connectWith: '.sorted-list',
            placeholder: '.ui-state-highlight',
           
            start: function (event, ui) {
                
                
                // Add style class
                $(ui.item[0]).addClass('dragging');

                
                // Set column and position
                ui.item.oldColumnType = $(ui.item).parent().attr('id');
                
                
                ui.item.oldItemPosition = ui.item.index();
                
            },
            stop: function (event, ui) {
                // Remove style class
                $(ui.item[0]).removeClass('dragging');

                // Get old and new column
                var item = ui.item;
                var oldItemPosition = item.oldItemPosition;
                var oldColumnType = item.oldColumnType;
                var newColumnType = $(item).parent().attr('id');

                if (newColumnType == 'doing' && list[newColumnType].length >= DOING_LIMIT) {
                    
                    Until.openAlertModal();
                    $('.sorted-list').sortable('cancel');
                } 
                else {
                    // Remove Item from old position
                    
                    
                    list[oldColumnType].splice(oldItemPosition, 1);
                    self.updateJobCount(oldColumnType);

                    // Add item to new position
                    list[newColumnType].splice(item.index(), 0, item[0].innerText);
                    self.updateJobCount(newColumnType);

                    // Store data to local storage
                    DB.setData(list);
                }
            }
        });
    },




    newJob: function (e, type, input) {
        var jobName = $(input).val();

        // Get event onkeydown
        var event = window.event || e; // Hoạt động trên Chrome & FF

        // Check key press is Enter (code = 13)

        if (event.keyCode === 13 && jobName.trim() !== '') {
            // Store data to local storage
            if (!list[type]) list[type] = [];

            // Limit doing job
            if (type == 'doing' && list[type].length >= DOING_LIMIT) {
                Until.openAlertModal();
            } 
            else {
                list[type].push(jobName);
                DB.setData(list);

                // Update DOM
                this.addJobToList(type, jobName);
            }

            // Reset input
            $(input).val('');
        }



    },

    addJobToList: function (type, jobName) {
        // Convert HTML entities
        /* var tmp = $('<div></div>');
        tmp.text(jobName); */

        // Append item to list

        var item = '<div class="list-group-item"> <a href="#!" class="row"> <div class="col-xl-8">' +
            jobName +
            '</div> <div class="col-xl-4 d-flex justify-content-end badge" onclick="app.deleteJob(this)"> <i class="fas fa-trash-alt"></i> </div> </a> </div>';

        $('#' + type).append(item);

        // Update count of job
        this.updateJobCount(type);
    },

    deleteJob: function (a) {
        var btnDelete = $('#btn-delete');
        var btnCancel = $('#btn-cancel');
        var self = this;
        
        Until.openConfirmModal();

        // Unbind old event on Agree button
        btnDelete.off('click');

        // Bind new event onclick on Agree button
        btnDelete.on('click', function () {
            var item = $(a).parent();
            var itemP = item.parent();
            var columnType = itemP.parent().attr('id');

            var itemPosition = $('#' + columnType + ' .list-group-item').index(item);

            // Remove item from list
            
            list[columnType].splice(itemPosition, 1);
            DB.setData(list);

            // Remove item from DOM and update count
           
            itemP.remove(); 
            self.updateJobCount(columnType);

            Until.closeConfirmModal();
        });

        btnCancel.on('click', function () {
            Until.closeConfirmModal();
        });
    },
    
    updateJobCount: function (type) {
        $('#' + type).prev().find('.count').text('(' + list[type].length + ')');
        
        
    }


};

$(function () {
    app.init();
});