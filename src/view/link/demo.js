AlarmMappingDemo = function () {
    this.box = new ElementBox();
    this.network = demo.Util.createDraggableNetwork(this.box);
    this.tree = new Tree(this.box);
    this.table = new Table(this.box.getAlarmBox());

    //twaver.controls.Table
    this.table.setCheckMode(true);
    this.toolbar = document.createElement('div');
};
twaver.Util.ext('AlarmMappingDemo', Object, {
    init: function () {
         var tablePane = new BorderPane(new TablePane(this.table), null, null, this.toolbar);
         tablePane.setBottomHeight(25);


        //垂直分割面板 network/tablepane
        var centerSplit = new SplitPane(this.network, tablePane, 'vertical', 0.6);

        var mainSplit = new SplitPane(this.tree, centerSplit, 'horizontal', 0.3);
        // console.log(mainSplit)

        demo.Util.appendChild(mainSplit.getView(), document.getElementById('network'), 0, 0, 0, 0);
        this.initButton();
        this.initTable();
        window.onresize = function (e) { mainSplit.invalidate(); };

        this.box.getAlarmBox().setAlarmElementMapping(new demo.CustomAlarmElementMapping(this.box));
        this.network.setMovableFunction(function (element) { return false; });

        this.network.setDragToPan(false);
        this.network.setWheelToZoom(false);
        this.initBox();
    },
    initButton: function () {
        var self = this;
        demo.Util.addButton(this.toolbar, 'Create Alarm', null, function () {
            var alarm = demo.Util.randomAlarm();
            alarm.setClient('MAPPINGID', demo.Util.randomInt(5) + 1);
            self.box.getAlarmBox().add(alarm);
        });
        demo.Util.addButton(this.toolbar, 'Remove Alarm', null, function () {
            self.box.getAlarmBox().removeSelection();
        });
        demo.Util.addButton(this.toolbar, '! Acked', null, function () {
            self.box.getAlarmBox().getSelectionModel().getSelection().forEach(function (alarm) {
                alarm.setAcked(!alarm.isAcked());
            });
        });
        demo.Util.addButton(this.toolbar, '! Cleared', null, function () {
            if (self.box.getAlarmBox().getSelectionModel().size() == 0) {
                return;
            }
            self.box.getAlarmBox().getSelectionModel().getSelection().forEach(function (alarm) {
                alarm.setCleared(!alarm.isCleared());
            });
        });
        var checkBox = demo.Util.addCheckBox(this.toolbar, self.box.getAlarmBox().isRemoveAlarmWhenAlarmIsCleared(), 'Remove On Cleared', function () {
            self.box.getAlarmBox().setRemoveAlarmWhenAlarmIsCleared(checkBox.checked);
        });
    },
    initTable: function () {
        //可编辑table
        this.table.setEditable(true); 

        // 自定义表格逻辑（添加告警上色）
        this.table.onCellRendered = function (params) {
            if (params.column.getName() === 'Alarm Severity') {
                params.div.style.backgroundColor = params.data.getAlarmSeverity().color;
            }
        };

        //创建列
        demo.Util.createColumn(this.table, 'Mapping ID', 'MAPPINGID', 'client');

        var column = demo.Util.createColumn(this.table, 'Alarm Severity', 'alarmSeverity', 'accessor', 'string', true);
        column.setWidth(120);
        column.setHorizontalAlign('center');
        var setValue = column.setValue;
        column.setValue = function (data, value, view) {
            value = twaver.AlarmSeverity.getByName(value);
            setValue.call(column, data, value, view);
        };
        column.setEnumInfo(twaver.AlarmSeverity.severities.toArray());
        demo.Util.createColumn(this.table, 'Acked', 'acked', 'accessor', 'boolean', true).setWidth(50);
        demo.Util.createColumn(this.table, 'Cleared', 'cleared', 'accessor', 'boolean', true).setWidth(50);
        var timeColumn = demo.Util.createColumn(this.table, 'Raised Time', 'raisedTime', 'client');
        timeColumn.setWidth(150);
        timeColumn.setHorizontalAlign('center');
        timeColumn.renderCell = function (params) {
            var span = document.createElement('span');
            span.innerHTML = demo.Util.formatDate(params.value, 'yyyy-MM-dd hh:mm:ss');
            span.style.whiteSpace = 'nowrap';
            params.div.appendChild(span);
        }
    },
    initBox: function () {
        this.createData("Geography Group", 250, 60);
        this.createData("Business Group", 60, 160);
        this.createData("Manufacturer Group", 430, 160);

        var i, alarm;
        for (i = 1; i <= 5; i++) {
            alarm = new twaver.Alarm({ clients: { 'MAPPINGID': i, "raisedTime": new Date()} });
            alarm.setAlarmSeverity(twaver.AlarmSeverity.severities.get(i));
            this.box.getAlarmBox().add(alarm);
        }
        for (i = 1; i <= 5; i++) {
            alarm = new twaver.Alarm({ clients: { 'MAPPINGID': 5 - i + 1, "raisedTime": new Date()} });
            alarm.setAlarmSeverity(twaver.AlarmSeverity.severities.get(i));
            alarm.setAcked(true);
            this.box.getAlarmBox().add(alarm);
        }

        
        this.tree.expandAll();
    },
    createData: function (name, x, y) {
         var dummy = new twaver.Dummy({ id: name, name: name });
        
        // var dummy = new twaver.Group({id:name,name:name});
         this.box.add(dummy)
        for (var i = 1; i <= 5; i++) {
            var node = new Node({ name: "BSC_" + i, clients: { 'MAPPINGID': i} });
            if (name === "Geography Group") {
                node.setLocation(i * 100, 50);
            } else if (name === "Business Group") {
                node.setLocation(i * 100, 150);
            } else if (name === "Manufacturer Group") {
                node.setLocation(i * 100, 250);
            }
            node.setParent(dummy);
            this.box.add(node);
        }
    }, 
});

export default new AlarmMappingDemo()

