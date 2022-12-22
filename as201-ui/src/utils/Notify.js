export default {
  CODE_RUN_LOG: 0x0001, //运行日志
  CODE_HARDWARE_SELF_CHECK_COMPLETE: 0x0002, //下位机自检完成
  CODE_HARDWARE_BOOT_COMPLETE: 0x0003, //硬件初始化完成
  CODE_SCAN_SUCCESS: 0x0004, //扫码成功
  CODE_HSB_RUN_COMPLETE: 0x0005, //核酸板运行完成
  CODE_WKB_REPORT_TEMPERATURE: 0x0006, //温控板上传温度的温度数据通知
  CODE_REPORT_PROGRESS: 0x0007, //报告导出进度通知
  CODE_SMB_COMPLETE: 0x0008, //扫码板扫描成功通知
  CODE_SMB_UNCOMPLETE: 0x0009, //扫码板扫描成功通知
  CODE_FZB_FH_OPEN: 0x000A, //辅助版-废弃盒抽屉打开通知
  CODE_FZB_FH_CLOSE: 0x000B, //辅助版-废弃盒抽屉关闭通知
  CODE_FZB_DOOR_OPEN: 0x000C, //辅助版-门打开通知
  CODE_FZB_DOOR_CLOSE: 0x000D, //辅助版-门关闭通知
  CODE_BOOT_X_OK: 0x0011, //X轴初始化完成通知
  CODE_BOOT_Z_OK: 0x0012, //Z轴初始化完成通知
  CODE_TEMPERATURE: 0x0013, //实时问题上报
  CODE_AUCOOLER_TEMPERATURE: 0x0014, //制冷模块1温度
  CODE_AUCOOLER2_TEMPERATURE: 0x0015, //制冷模块2温度
  CODE_UPGRADE_PROGRESS: 0x0016, //升级进度
  CODE_AUCOOLER_P8_OPEN: 0x0017, //P8板位温度打开
  CODE_AUCOOLER_P8_CLOSE: 0x0018, //P8板位温度关闭

  //错误信息
  CODE_HARDWARE_ERROR_NOTIFY: 0x1001, //硬件错误消息通知 4097
  CODE_HARDWARE_USB_ERROR: 0x1002, //USB断开 4098
  CODE_HARDWARE_X_OFFLINE: 0x1003, //心跳异常 4099
  CODE_HARDWARE_X_UNRECOGNIZE: 0x1004, //X轴未识别 4100
  CODE_HARDWARE_BOOT_FAILED: 0x1005, //硬件初始化失败 4101
  CODE_HARDWARE_CHECK_FAILED: 0x1006, //硬件自检失败 4102
  CODE_HARDWARE_NOT_FOUND: 0x1007, //硬件不存在 4103
  CODE_HARDWARE_NOT_ONLINE: 0x1008, //硬件掉线 4104
  CODE_HARDWARE_FZB_NOTONLINE: 0x1009, //辅助板不在线 4105
  CODE_HARDWARE_FZB_STOP: 0x100a, //辅助板急停中 4106

  CODE_RUN_TIMEOUT: 0x2001, //命令执行超时 8193
  CODE_RUN_NO_TASKS: 0x2002, //当前任务队列没有任务
  CODE_RUN_DONT_REPEAT_RUN: 0x2003, //任务正在运行，请不要重复执行
  CODE_RUN_TASK_ERROR: 0x2004, //任务执行过程中的异常信息
  CODE_RUN_ERROR: 0x2005, //指令执行过程中的异常信息
  CODE_RUN_HSB_SEND_PARAMS_ERROR: 0x2006, //核酸板发送参数失败通知
  CODE_RUN_HSB_RUN_ERROR: 0x2007, //核酸板发送参数失败通知
  CODE_RUN_HYB_ERROR: 0x2008, //混匀版运行过程中出现错误

  CODE_RUN_WORKFLOW_START: 0x3001, //流程开始执行通知,data是流程的id
  CODE_RUN_WORKFLOW_COMPLETE: 0x3002, //流程执行完成通知,data是流程的id
  CODE_RUN_COMMAND_START: 0x3003, //命令开始执行通知,data是命令的id
  CODE_RUN_COMMAND_COMPLETE: 0x3004, //命令执行完成通知,data是命令的id
  CODE_RUN_TIPS_DATA: 0x3005, //通知前端更新TIP数据，data是携带的tip头数据,对应Tips模型
  //展示等待或人工干预对话框，msg是提示信息。data是剩余时间。
  //如果是0xFFFF,则为人工干预。如果小于0XFFFF的值，表示剩余等待的秒数，如果是0，则等待结束，关闭等待对话框
  CODE_RUN_WAITING: 0x3006,
  CODE_RUN_DEBUG_TIP: 0x3007, //调试信息
  CODE_RUN_TIME: 0x3008, //程序运行剩余时间通知

  CODE_RUN_COMMAND_ERROR: 0x4001, //程序运行指令执行失败错误
  CODE_RUN_PARAMS_ERROR: 0x4002, //程序运行参数错误通知
  CODE_RUN_TIPS_NOT_ENOUGH: 0x4003, //吸头不足
  CODE_RUN_COMPLETE: 0x4004, //程序运行完成
  CODE_RUN_WASTE_NOT_ENOUGH: 0x4005, //废弃盒容量不足
  CODE_RUN_DOOR_OPEN: 0x4006, //运行过程中门打开通知
  CODE_RUN_FATAL_ERROR: 0x4007, //运行过程中指令执行失败，不能继续往下执行 msg: 设备名称 data: 指令执行返回值
  CODE_RUN_POSITION_NOT_SET: 0x4008, //程序没有配置位置数据，程序异常，必须停止运行

  CODE_FZB_DOOR_OPEN: 0x000C,//辅助版-门打开通知
  CODE_FZB_DOOR_CLOSE: 0x000D,//辅助版-门关闭通知
  CODE_SYSTEM_TIME: 0x8010, // 系统时间

  CODE_RUN_COMMAND_START: 0x3003,//命令开始执行通知,data是步骤的[id,order]
  CODE_RUN_COMMAND_COMPLETE: 0x3004,//命令执行完成通知,data是步骤的[id,order]
  CODE_RUN_TIME: 0x3008,//程序运行剩余时间通知

  CODE_RUN_COMMAND_ERROR: 0x4001,//程序运行指令执行失败错误
  CODE_RUN_PARAMS_ERROR: 0x4002,//程序运行参数错误通知

  CODE_RUN_DOOR_OPEN: 0x4006,//运行过程中门打开通知
  CODE_RUN_FATAL_ERROR: 0x4007,//运行过程中指令执行失败，不能继续往下执行

  CODE_RUNNING_TEMP: 0x4020,//运行中温度通知
  CODE_RUN_PAUSE: 0x3006,//步骤暂停通知
  CODE_IMPORT_SUCCESS : 0x8003,//导入成功
  CODE_IMPORT_ERROR : 0x8004,//导入失败
  CODE_SYSTEM_TIME : 0x8010,//系统时间
  CODE_START_TEMPERATURE_CALIBRATION  : 0x8011,
  CODE_FILE_REAPT : 0x8030,//文件重复
  CODE_EXPORT_SUCCESS : 0x8001,//导出成功
  CODE_EXPORT_ERROR : 0x8002,//导出失败
  CODE_GET_FILES_SUCCESS: 0x8034,//获取文件成功
  CODE_DIR_PATH:0x8036//当前文件夹路径
}
