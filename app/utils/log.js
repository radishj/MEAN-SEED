'use strict';
var log4js = require('log4js'),
    config = require('../config/config');

log4js.configure({
    appenders: [
        {
            // ����̨���
            type: 'console',
            category: 'console'
        },
        {
            // �����ļ���ʽ
            type: 'file',
            filename: 'log/log.log',
            pattern: '_yyyy-MM-dd',
            maxLogSize: 20480,
            backups: 3,
            category: 'dateFileLog'
        }
    ],
    replaceConlsole: true,
    levels: {
        dateFileLog: 'debug',
        console: 'debug'
    }
});

var dateFileLog = log4js.getLogger('dateFileLog');
var consoleLog  = log4js.getLogger('console');
// ģʽѡ��
if(config.env === 'development') {
    exports.logger  = consoleLog;
} else {
    exports.logger  = dateFileLog;
}

exports.use = function(app) {
    app.use(log4js.connectLogger(consoleLog, {level: 'INFO', format: ':method :url'}));
}