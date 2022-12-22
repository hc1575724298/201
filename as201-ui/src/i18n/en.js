import enLocale from 'element-ui/lib/locale/lang/en';

let translate = {
  protocol: "Protocol", // 程序
  parameters: "Parameters", //参数
  run_started_at: "Run started at", //开始时间
  sample_number: "Sample number", //样本数
  skip_incubator: "Skip Incubate", //跳过孵育
  abort: "Abort", // 终止
  continue: "Continue", // 继续
  mix_time: "Mix time", // 混合时间
  mix_speed: "Mix speed", //混合速度
  mix_position: "Mix position", //混合高度
  mix_volume: "Mix volume", //混合体积
  temperature_switch: "Temperature switch", //温度开关
  heating_setup: "Heating setup", //升温设置
  heating_sync: "Heating sync", //升温动作同步
  preheating: "Preheating", //先升温后动作
  elution_well_preheated_advance_seconds: "Elution well preheated advance seconds", //洗脱孔提前加热时间
  cooling_setup: "Cooling setup", //降温设置
  precooling: "Precooling", //先降温后动作
  cooling_sync: "Cooling sync", //降温动作同步
  magnet_type: "Magnet type", //吸磁方式
  yes: "Yes", // 是
  segments: "Segments", //段数
  interval_stay_time: "Interval stay time", //每段停留时间
  cycle: "Cycle", // 循环次数
  beat_speed: "Beat speed", //吹打速度
  drying_time: "Drying time", //晾干时间
  expected_magnetic_total_time: "Expected magnetic total time", //预计吸磁总时间
  every_magnetic_times: "Every magnetic times",
  liquid_level_magnetic_times: "Liquid level magnetic times", //液面吸磁次数
  magnetic_speed: "Magnetic speed", //吸磁速度
  lowest_magnetic_position: "Lowest magnetic position", //吸磁最低位
  drying_position: "Drying position", //晾干位置
  discard_beads: "Discard beads", //弃磁
  remaining_time: "Remaining time", //剩余时间
  status: "Status", //状态
  running: "Running", // 运行中
  finished_run: "Finished", // 运行结束
  source_well: "Source well", //源孔位
  destination_well: "Destination well", //目标孔位
  mix_before_aspirating: "Mix before aspirating", //吸液前混合
  aspiration_position: "Aspiration position", //吸液位置
  dispense_position: "Dispense position", //注液位置
  abort_protocol: "Do you want to abort the protocol?", //是否终止运行程序？
  wait_open_door: "Open the door, please wait...", //开门中请等待……
  wait_close_door: "Closing the door, please wait...", //关门中请等待……
  close_the_door: 'Close the door', // 关门
  open_the_door: 'Open the door', // 开门
  step_run: "Step Run", //步骤运行
  no_num: 'No.', //序号
  open_door: "Open door", // 开门
  close_door: "Close door", // 关门
  view: 'View',
  information: "Information",
  protocol_name: "Protocol name", //程序名称
  pre_packaged: "Pre-packaged", //预封装
  cartridge: 'Cartridge', //试剂条
  expected_run_time: 'Expected run time(hh:mm:ss)', //预计运行时间(hh:mm:ss)
  remark: 'Remark(Optional)', //备注（可选）
  name_A_Z: 'Name(A-Z)', //名称(A-Z)
  name_Z_A: 'Name(Z-A)', //名称(Z-A)
  user_Z_A: 'User(Z-A)', //用户(Z-A)
  user_A_Z: 'User(A-Z)', //用户(A-Z)
  sample_settings: 'Sample settings', //样本设置
  load_labware: 'Load labware', //装载耗材
  elution_volume: 'Elution volume(μl)', //洗脱体积(μl)
  reagent_volume: 'Reagent volume(μl)', //试剂体积(μl)
  sample_volume: 'Sample volume(μl)', //样本体积(μl)
  worktable_select_sample_positions: 'Select sample positions', //选择样本位置
  selected: 'Selected', //已选择
  select_all: 'Select all', //全选
  sampleID: 'SampleID', //样本ID
  next: 'Next', //下一步
  labware_list: 'Labware list', //耗材列表
  cartridge_rack: 'Cartridge rack', //试剂条
  well: 'Well', //孔位
  reagent_tube: '1.5ml_Reagent tube', // 1.5ml试剂管
  Elution_tube: '1.5ml_Elution tube', // 1.5ml洗脱管
  sample_5ml_tube: '5ml_Sample tube', // 5ml样本管信息
  magnetic_sleeve: 'Magnetic sleeve', //磁棒套
  tip_1000ul: '1000ul_tip', //1000ul_吸头
  place_the_labware_in_the_same_positions_with_list_and_click_Run_for_start: 'Place the labware in the same positions with list and click “Run ” for start.', //将耗材按照列表放在对应位置，并点击“运行”。
  back: 'Back', //上一步
  note_optional: "Note(Optional)", //说明（可选）
  username_placeholder: "Username",
  password_placeholder: "Password",
  password: "password",
  log: "Log in",
  remember: "Remember Password",
  delete_sentence: 'Do you want to delete user',
  delete_user_warning_sentence: "Warning:if delete the user, user's local file will also be deleted",
  modified: "Modified",
  modified_user_warning_sentence: "Warning:The user's local folder name will also be modified after the user name has been modified!",
  cancel: 'Cancel', //取消
  ok: 'OK', // 确定
  run: "Run", // 运行
  protocols: "Protocols", // 程序
  clear: "Clear",
  setting: "Setting",
  loT: "loT",
  favorites: "Favorites", //收藏
  list: "List",
  manage: "Manage",
  switch: "Switch user",
  change_password: "Change password",
  original_password: "Original password",
  new_password: "New password",
  input_again: "Input again",
  group: "group",
  no: "No", //否
  table_username: "User name",
  timeOldToNew: "Time(Old-New)",
  timeNewToOld: "Time(New-Old)",
  operation: "Operation",
  add: "Add",
  user: "User",
  advanced_user: "Advanced user",
  add_user: "Add user",
  Interval_start: "Start",
  clear_title: "UV sterilizer",
  clear_time_text: "Sterilization time(hh:mm)：",
  sterilizer: "UV sterilizer",
  hepa: "HEPA filter",
  hepa_setting: "HEPA filter settings",
  switch_on: "Switch on",
  switch_off: "Switch off",
  switch_run: "Switch off after run is completed",
  switch_during: "Switch on during run",
  switch_during_immediately: "Immediately",
  switch_during_open: "When open the door",
  system: "System",
  instrument: "Instrument",
  tools: "Tools",
  maintenance: "Maintenance",
  reports: "Reports",
  advanced: "Advanced",
  help: "Help",
  lan: "Language",
  time: "Time",
  cleaning_needles: "Cleaning piercing needles",
  tightness: "Tightness test",
  o_rings: "O-rings maintenance",
  lastExecuted: "Last executed：",
  followSteps: "Follow the steps below：",
  cleaning_needles_warning: "The Cleaning piercing needles has to be performed after running the last protocol of the day",
  cleaning_needles_steps_first: "1.Put on gloves.",
  cleaning_needles_steps_second: '2.Press "Move" button.',
  cleaning_needles_steps_third: "3.Prepare for the bottom trays.",
  cleaning_needles_steps_fourth: "4.Cleaning piercing needles .",
  cleaning_needles_steps_fifth: '5.Maintenance completed，press "Reset" button .',
  tightness_steps_first: "1.Put on gloves.",
  tightness_steps_second: "2.Prepare for 24 sample tubes and tips.",
  tightness_steps_third: '3.Press "Test" button.',
  tightness_steps_fourth: "4.Wait for 30s.",
  tightness_steps_fifth: "5.Check whether the liquid level in the tip drops.",
  tightness_steps_sixth: '6.Maintenance completed，press "Reset" button .',
  o_rings_steps_first: "1.Put on gloves.",
  o_rings_steps_second: '2.Press "Move" button.',
  o_rings_steps_third: "3.Take out the bottom trays.",
  o_rings_steps_fourth: '4.Observe,clean or change the O-rings.',
  o_rings_steps_fifth: '5.Maintenance completed，press "Reset" button .',
  o_rings_warning: "Use appropriate cleaning agents adapyed to the particular elements.",
  move: "Move",
  reset: "Reset",
  test: "Test",
  pipettor: "Pipettor",
  uv_sterilizer: "UV-sterilizer",
  maintenance_hepa: "HEPA",
  aging: "Aging",
  date: "month/Day/Year:",
  timeInput: "hour/Minute/Second:",
  usedTimes: "Used time(times):",
  lifeTimes: "Life time(times):",
  usedTime: "Used time(h):",
  lifeTime: "Life time(h):",
  alarm: "alarm",
  alarm_remain: "Alarm remain time(times):",
  alarm_remain_hour: "Alarm remain time(h):",
  yaxis: "Y-axis aging",
  zaxis: "Z-axis aging",
  load: "Load/Unload aging",
  lid: "Load/Unload lid aging",
  pipettor_aging: "Pipettor aging",
  mangnetic_aging: "Magnetic aging",
  side_mangnetic: "side_mangnetic",
  locker: "Locker&door aging",
  machine: "Machine aging",
  cycles: "Cycles：",
  labware: "Labware",
  calibration_temperture: "Temperature calibration",
  transfer_liquid_calibration: "Transfer liquid calibration",
  worktable_calibration: "Worktable calibration",
  oem: "OEM",
  pn_number: "PN number",
  elution_tube: "Elution tube",
  reagent_tube: "Reagent tube",
  sample_tube: "Sample tube",
  brand: "Brand",
  volume: "Volume",
  volume_ml: "Volume(ml)",
  ml: "(ml)",
  mm: "(mm)",
  buttom_diameter: "Buttom diameter of tube",
  depth_tube: "Depth of tube",
  inner_height: "Inner height",
  caps_height: "Cap height",
  buttom_diameter_mm: "Bottom diameter of tube(mm)",
  depth_tube_mm: "Depth of tube(mm)",
  inner_height_mm: "Inner height(mm)",
  caps_height_mm: "Cap height(mm)",
  total: "Total：",
  selected: "Selected",
  save: "Save",
  factory: "Factory",
  new: "New",
  motion: "Motion",
  transfer: "Transfer",
  magnet: "Magnet",
  horizontal_speed: "Horizontal speed(1-50)mm/s",
  magnetic_lifting_speed: "Magnetic rod lifting speed(1-50)mm/s",
  magnetic_sleeve_speed: "Magnetic rod sleeve lifting speed(1-50)mm/s",
  aspirate_speed: "Aspirate speed",
  aspirate_acceleration: "Aspirate acceleration(100-500μl/s²)",
  aspirate_delay: "Aspirate delay(0.1-10s)",
  dispense_speed: "Dispense speed(20-2000μl/s)",
  dispense_acceleration: "Dispense acceleration(100-500μl/s²)",
  dispense_delay: "Dispense delay(0.1-10s)",
  blow_liquid: "Blow liquid volume(0-20μl)",
  air_gap: "Air gap volume(0-20μl)",
  prewetting: "Prewetting(0-10)",
  tip: "Tip",
  sleeve: "Sleeve",
  magnet_aspirate_speed: "Aspirate speed(10-1000μl/s)",
  magnet_dispense_speed: "Dispense speed(10-100μl/s)",
  magnet_dispense_delay: "Dispense delay(0.1-10ms)",
  magnet_speed: "Magnetic speed(1-15mm/s)",
  temperature: "Temp.",
  start_cali: "Start Cali.",
  edit: "Edit",
  aspirate_ul: "Aspirate(μl)",
  dispense_ul: "Dispense(μl)",
  aspirate: "Aspirate",
  transfer_step1: "1.Please make worktable calibration first.",
  transfer_step2: "2.Please put the reagent tube and reagent in ",
  position_a: "position B.",
  blow: "Blow air",
  aspirate_volume: "Aspirate volume(μl)：",
  dispense_volume: "Dispense volume(μl)：",
  tips: "Tips",
  magnetic_sleeve: "Magnetic Sleeve",
  cartridege_rack_tips: "Cartridge rack-Tips",
  cartridege_rack_sleeve: "Cartridge rack-Sleeve",
  cartridege_rack_rod: "Cartridege-rack-rod",
  cartridege_rack: "Cartridege rack",
  well5: "Cartridge 5 well",
  well7: "Cartridge 7 well",
  well8: "Cartridge 8 well",
  reagent_worktable: "1.5ml_Reagent tube",
  elution_worktable: "1.5ml_Elution tube",
  allsheng: "allsheng",
  neutral: "neutral",
  other: "other",
  import_img: "Import Image",
  pn: "PN:",
  scan: "Scan code",
  name_az: "Name(A-Z)",
  name_za: "Name(Z-A)",
  user_A_Z: "User(A-Z)",
  user_Z_A: "User(Z-A)",
  finished: "Finished time",
  load: "Load",
  unload: "Unload",
  zero_calibration: "Zero Calibration",
  pre_calibration: "Pre-calibration",
  release: "Release",
  compensation: "Compensation",
  return_calibration: "Return calibration",
  position: "Position",
  tip_position: "Tip Position:",
  sleeve_position: "Sleeve Position:",
  Magnetic_rod_postion: "Magnetic Rod Postion:",
  sample_tube_10: "10ml_Sample tube",
  stop_cali: "Stop Cali.",
  clear_login: "Clear Login Records",
  view_instruction: "View instructions",
  delete: "Delete",
  import: "Import",
  export: "Export",
  load_unload: "Load/Unload tip aging",
  hepa_filter_setting: "HEPA filter settings",
  switch_off_run: "Switch off after run is completed",
  save_as: "Save as",
  rename_protocols: "Rename Protocol：",
  search_protocols: "search protocols",
  protocols_name: "Protocols Name:",
  protocols_user_name: "user name:",
  start_date: "Start Date:",
  ending_date: "Ending Date:",
  new_protocol: "New protocol",
  basic: "Basic",
  step: "Step",
  basic_information: "Basic information",
  cartridege_8: "Cartridge rack：8 well",
  cartridege_7: "Cartridge rack：7 well",
  cartridege_5: "Cartridge rack：5 well",
  reagent_volume_1500: "Reagent volume(10-1500μl)",
  sample_volume_5000: "Sample volume(100-5000μl)",
  sample_volume_10: "Sample volume(100-10000μl)",
  remark_optional: "Remark(Optional)",
  elution_tube_big: "Elution Tube",
  reagent_tube_big: "Reagent Tube",
  sample_tube_big: "Sample Tube",
  step_list: "Step list",
  magnetic: "Magnetic", //吸磁参数
  unload_labware: "Unload labware", //卸耗材
  well1a: "Well(1 / B)",
  temp10100: "Temp.(37-120℃)",
  time999: "Time(0-999min)",
  add_step: "Add step", //添加步骤
  bind: "Bind", //结合
  wash: "Wash", //洗涤
  elution: "Elution", //洗脱
  discard: "Discard", //弃磁
  pause: "Pause", //暂停
  custom: "Custom", //自定义
  incubator: "Incubator", //孵育
  lysis: "Lysis", //裂解
  magnetic: "Magnetic",
  well1c: "Well(1 / C)",
  source_well_1c: "Source well(1-C)",
  destination_well_1c: "Destination well(1-C)",
  volume_5: "Volume(5-1000μl)",
  mix_before: "Mix before aspirating(0-10times)",
  volume_5_2000: "Volume(5-2000μl)",
  heating_step: "Heating setup",
  hearting_sync: "Heating sync",
  elution_warning: "Elution well preheated advance seconds(1-999s):",
  cool_step: "Cooling setup",
  cool_sync: "Cooling sync",
  interval_stay: "Interval stay time(1-999s)",
  cycle_1_99: "Cycle(1-99)",
  expected_magnetic: "Expected magnetic total time(0-99999s)",
  every_magnetic: "Every magnetic time(1-999s)",
  liquid_level: "Liquid level magnetic time(0-999s)",
  lowest_magnetic: "Lowest magnetic position(0-40%)",
  dry_time: "Drying time(1-999s)",
  dry_position: "Drying position",
  account_switch: "Do you want to account Switching ?",
  enter_password_differ: "Entered password differ!",
  delete_protocol: "Do you want to delete the selected protocol?",
  users: 'Users',
  upgrade: "Upgrade",
  error_log: "Error log",
  sys_info: "System Information",
  encryption: "Encryption",
  one_click: "One-Click Restore",
  software: "Software",
  firmware: "Firmware",
  ui: "UI",
  mix_motion: "Mix motion",
  temp_control: "Temp. Control",
  Auxiliary: "Auxiliary",
  insert_disk: "Insert U disk",
  select_what: "Select what you want to upgrade",
  restart_instrument: "Restart the instrument",
  error_code: "Error code",
  details: "Details",
  instrument_info: "Instrument info.",
  name: "Name",
  type: "Type",
  pn_code: "PN code",
  total_info: "Total info.",
  total_time: "Total time",
  well_other: " Well",
  magnet_type_sleeve: "Sleeve",
  magnet_type_tip: "Tip",
  tip_pause: 'Tip',
  maximum15: "The value contains a maximum of 15 characters.",
  loading: "Loading...",
  no_more: 'No more',
  clean: "clear",
  rom: "Rom",
  total_run_number: "Total run number",
  total_run_time: "Total run time",
  remainder: "Remainder",
  user_info: "User info.",
  protocol_number: "Protocol number",
  system_ui: "UI",
  temperature_control: "Temperature control",
  upgrade_time: "Upgrade time",
  upgrade_version: "Version",
  encryption_note: "Note：when the encryption open，advanced User can't create new protocol，and no protocol parameters are displayed at running.",
  one_click: "One-Click Restore",
  one_click_note: "One-click restore means emptying the information of users, protocols,error log and reports.",
  restore_note: "Are you sure to restore the factory parameter settings?",
  aspirating: "Aspirating...",
  dispensing: "Dispensing...",
  upgrade_filename: "Upgrade filename",
  upgrade_progress: "Upgrade progress",
  clear_login_records: "Do you want to clear login records?",
  selected_labwares: "Selected：",
  clear_warning: "UV lamp life is running gone，Please replace！",
  used: "Used",
  scan_code: "Please scan the bar code！",
  edit_code: "Please edit the PN number！",
  protocol_tips: "Tips",
  check_u: "Please insert U disk!",
  exporting: "Exporting...",
  cover_warning: "Protocol is existed,cover it?",
  yes: "Yes",
  no_button: "No",
  importing: "Importing...",
  no_import_protocols: "No Protocols To Import",
  change_password_success: "Change password successful！",
  different_password: "Different password！",
  repeated_password: "Password repeated！",
  repeated_tube: "Tube Repeated！",
  add_new: "Add Success！",
  operate_success: "Operate Successful！",
  save_success: "Save Successful！",
  clear_success: "Clear Successful！",
  import_success: "Import Successful！",
  import_error: "Import Failed！",
  export_success: "Export Successful！",
  export_error: "Export Failed！",
  delete_success: "Delete Successful！",
  move_success: "Move Successful！",
  reset_success: "Reset Successful！",
  test_success: "Test Successful",
  load_success: "Load Successful!",
  unload_success: "Unload Successful",
  delete_report: "Do you want to delete the selected reports?",
  delete_labware: "Do you want to delete the selected labwares?",
  delete_error:"Do you want to delete the selected error logs?",
  cartridge_2mL:"Cartridge ：2mL",
  cartridge_8mL:"Cartridge ：8mL",
  cartridge_15mL:"Cartridge ：15mL",
  wellA:"WellA",
  wellB:"WellB",
  wellC:"WellC",
  wellD:"WellD",
  wellE:"WellE",
  loop:"Loop",
  from:"From",
  to:"To",
  liquid:"Liquid",
  aspiration_position:"Aspiration position",
  every_mix_times:"Every mix times",
  well1x:"Well(1/x)",
  d_tip:"D(Tip 1)",
  e_tip:"E(Tip 2)",
  e_sleeve:"E(Sleeve)",
  mix_position:"Mix position",
  mix_moving_speed:"Mix moving speed",
  drying:"Drying",
  drying_volume:"Dry volume",
  every_magnetic_times: "Every magnetic times",
  drying_speed: "Drying speed",
  drying_on: "Drying",
  basic_labware: "Labware",
  tip_1: "Tip 1",
  tip_2: "Tip 2",
  error_protocol: "Program format error",
  edit_protocol: "Edit protocol",
  no_photo: "No photo to import",
  mix_type: "Mix type",
  top_bottom: "From top to bottom",
  bottom_top: "From bottom to top",
  tube_inside: "Tube inside",
  tube_outside: "Tube outside",
  factory_success: "Factory success",
  // is_save:"Are you sure to back?"
};

const en = {
  language: translate,
  ...enLocale,
}

export default en
