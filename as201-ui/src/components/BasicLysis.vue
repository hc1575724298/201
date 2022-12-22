<template>
  <div>
     <div>
      <div :class="['model',isShowNumberKeyboard||isShowNumberKeyboardPoint? 'move-top':'']" v-if="title_type==1">
      <div class="step-name">
        {{$t("language.step")}}:
        <input @focus="onfocus('name',lysis.step_name,$event)" class="input-step-name" v-model="lysis.step_name"
          @blur="saveData()" @input="lysis.step_name=lysis.step_name.replace(/[^\w\u4E00-\u9FA5_-]/g,'')" />
      </div>
      <div class="step-name">
        {{$t("language.well1c")}}:
        <div class="select-well" @click.stop="is_arraw()" ref="well1">
          {{lysis.well}}<img src="../images/protocols/down-prto.png" class="arraw-well" />
        </div>
        <div class="select-list" v-if="arraw_status">
          <div class="arrawclass" @click="selectWell(1)">1</div>
          <div class="arrawclass" @click="selectWell(2)">2</div>
          <div class="arrawclass" @click="selectWell(3)">3</div>
          <div class="arrawclass" @click="selectWell(4)">4</div>
          <div class="arrawclass" @click="selectWell(5)">5</div>
          <div class="arrawclass" @click="selectWell(6)">6</div>
          <div class="arrawclass" @click="selectWell(7)">7</div>
          <div class="arrawclass" @click="selectWell(8)">8</div>
          <div class="arrawclass" @click="selectWell(9)" v-if="$store.getters.protocol.cartridge!=15">9</div>
          <div class="arrawclass" @click="selectWell(10)" v-if="$store.getters.protocol.cartridge!=15">10</div>
          <div class="arrawclass" @click="selectWell(11)" v-if="$store.getters.protocol.cartridge==2">11</div>
          <div class="arrawclass" @click="selectWell(12)" v-if="$store.getters.protocol.cartridge==2">12</div>
          <div class="arrawclass" @click="selectWell('A')">A</div>
          <div class="arrawclass" @click="selectWell('B')">B</div>
          <div class="arrawclass" @click="selectWell('C')">C</div>
        </div>
      </div>
      <div class="step-name">
        <span>{{$t("language.labware")}}:</span>
        <div class="select-well" @click.stop="is_arraw_first()" ref="well1">
          {{lysis.basic_labware}}<img src="../images/protocols/down-prto.png" class="arraw-well" />
        </div>
        <div class="select-first" v-if="arraw_first_status">
          <div class="arrawclass" @click="selectlabware(0)">{{$t("language.d_tip")}}</div>
          <div class="arrawclass" @click="selectlabware(1)" v-if="$store.getters.protocol.well_e==1">
            {{$t("language.e_tip")}}
          </div>
          <div class="arrawclass" @click="selectlabware(2)" v-if="$store.getters.protocol.well_e==2">
            {{$t("language.e_sleeve")}}
          </div>
        </div>
      </div>
      <div class="step-name">
        <span
          v-if="(lysis.well==1||lysis.well==2)&&$store.getters.protocol.cartridge==2">{{$t("language.volume")}}(5-2000μl):</span>
        <span
          v-else-if="lysis.well>=3&&lysis.well<=10&&$store.getters.protocol.cartridge==2">{{$t("language.volume")}}(5-1000μl):</span>
        <span
          v-else-if="(lysis.well==11||lysis.well==12)&&$store.getters.protocol.cartridge==2">{{$t("language.volume")}}(5-200μl):</span>

        <span v-else-if="lysis.well==1&&$store.getters.protocol.cartridge==8">{{$t("language.volume")}}(5-8000μl):</span>
        <span
          v-else-if="lysis.well>=2&&lysis.well<=9&&$store.getters.protocol.cartridge==8">{{$t("language.volume")}}(5-1000μl):</span>
        <span v-else-if="lysis.well==10&&$store.getters.protocol.cartridge==8">{{$t("language.volume")}}(5-200μl):</span>

        <span
          v-else-if="lysis.well==1&&$store.getters.protocol.cartridge==15">{{$t("language.volume")}}(5-15000μl):</span>
        <span
          v-else-if="lysis.well>=2&&lysis.well<=7&&$store.getters.protocol.cartridge==15">{{$t("language.volume")}}(5-1000μl):</span>
        <span v-else-if="lysis.well==8&&$store.getters.protocol.cartridge==15">{{$t("language.volume")}}(5-200μl):</span>

        <span v-else-if="lysis.well=='A'">{{$t("language.volume")}}(5-10000μl):</span>
        <span v-else-if="lysis.well=='B'||lysis.well=='C'">{{$t("language.volume")}}(5-1000μl):</span>
        <input @focus="onfocus('num',lysis.volume,$event)" class="input-step-name" v-model="lysis.volume"
          @blur="saveData()" @input="lysis.volume = lysis.volume.replace(/[^[0-9]\d*$/g, '')" />
      </div>
      <div v-if="$store.getters.protocol.steps[order-1].basic_labware==2">
        <div class="step-name">
          {{$t("language.mix_time")}}(1-999s):
          <input @focus="onfocus('point',lysis.mix_time,$event)" class="input-step-name" v-model="lysis.mix_time"
            @blur="saveData()" onKeypress="return(/[\d.]/.test(String.fromCharCode(event.keyCode)))"
            @input="lysis.mix_time = lysis.mix_time.replace(/[^[0-9]\d*$/g, '')" />
        </div>
        <div class="step-name">
          {{$t("language.mix_speed")}}(1-10Hz):
          <input @focus="onfocus('num',lysis.mix_speed,$event)" class="input-step-name" v-model="lysis.mix_speed"
            @blur="saveData()" @input="lysis.mix_speed = lysis.mix_speed.replace(/[^[0-9]\d*$/g, '')" />
        </div>
        <div class="step-name">
          {{$t("language.mix_position")}}(0-20mm):
          <input @focus="onfocus('num',lysis.mix_position,$event)" class="input-step-name" v-model="lysis.mix_position"
            @blur="saveData()" @input="lysis.mix_position = lysis.mix_position.replace(/[^[0-9]\d*$/g, '')" />
        </div>
        <div class="step-name">
          <span
            v-if="(lysis.well==1||lysis.well==2)&&$store.getters.protocol.cartridge==2">{{$t("language.mix_volume")}}(5-1000μl):</span>
          <span
            v-else-if="lysis.well>=3&&lysis.well<=10&&$store.getters.protocol.cartridge==2">{{$t("language.mix_volume")}}(5-600μl):</span>
          <span
            v-else-if="(lysis.well==11||lysis.well==12)&&$store.getters.protocol.cartridge==2">{{$t("language.mix_volume")}}(5-120μl):</span>

          <span
            v-else-if="lysis.well==1&&$store.getters.protocol.cartridge==8">{{$t("language.mix_volume")}}(5-1000μl):</span>
          <span
            v-else-if="lysis.well>=2&&lysis.well<=9&&$store.getters.protocol.cartridge==8">{{$t("language.mix_volume")}}(5-600μl):</span>
          <span
            v-else-if="lysis.well==10&&$store.getters.protocol.cartridge==8">{{$t("language.mix_volume")}}(5-120μl):</span>

          <span
            v-else-if="lysis.well==1&&$store.getters.protocol.cartridge==15">{{$t("language.mix_volume")}}(5-1000μl):</span>
          <span
            v-else-if="lysis.well>=2&&lysis.well<=7&&$store.getters.protocol.cartridge==15">{{$t("language.mix_volume")}}(5-600μl):</span>
          <span
            v-else-if="lysis.well==8&&$store.getters.protocol.cartridge==15">{{$t("language.mix_volume")}}(5-120μl):</span>

          <span v-else-if="lysis.well=='A'">{{$t("language.mix_volume")}}(5-1000μl):</span>
          <span v-else-if="lysis.well=='B'||lysis.well=='C'">{{$t("language.mix_volume")}}(5-600μl):</span>
          <input @focus="onfocus('num',lysis.mix_volume,$event)" class="input-step-name" v-model="lysis.mix_volume"
            @blur="saveData()" @input="lysis.mix_volume = lysis.mix_volume.replace(/[^[0-9]\d*$/g, '')" />
        </div>
      </div>
      <div v-else>
        <div class="step-name">
          {{$t("language.segments")}}(1-5):
          <div class="select-well" @click.stop="isMixSegment()" ref="well1">
            {{lysis.mix_segments}}<img src="../images/protocols/down-prto.png" class="arraw-well" />
          </div>
          <div class="select-list-segments" v-if="mix_segments_status">
            <div class="arrawclass" @click="selectMixSegments('1')">1</div>
            <div class="arrawclass" @click="selectMixSegments('2')">2</div>
            <div class="arrawclass" @click="selectMixSegments('3')">3</div>
            <div class="arrawclass" @click="selectMixSegments('4')">4</div>
            <div class="arrawclass" @click="selectMixSegments('5')">5</div>
          </div>
        </div>
        <div class="step-name">
          {{$t("language.every_mix_times")}}(1-999):
          <input @focus="onfocus('num',lysis.every_mix_times,$event)" class="input-step-name"
            v-model="lysis.every_mix_times" @blur="saveData()"
            @input="lysis.every_mix_times = lysis.every_mix_times.replace(/[^[0-9]\d*$/g, '')" />
        </div>
        <div class="step-name">
          {{$t("language.mix_type")}}:
          <div class="select-well" @click.stop="isMixType()" ref="well1">
            {{lysis.mix_type}}<img src="../images/protocols/down-prto.png" class="arraw-well" />
          </div>
          <div class="select-mix-type" v-if="mix_status">
            <div class="arrawclass" @click="selectMixType(0)">{{$t("language.top_bottom")}}</div>
            <div class="arrawclass" @click="selectMixType(1)">{{$t("language.bottom_top")}}</div>
          </div>
        </div>
        <div class="step-name">
          <span
            v-if="(lysis.well==1||lysis.well==2)&&$store.getters.protocol.cartridge==2">{{$t("language.mix_volume")}}(5-1000μl):</span>
          <span
            v-else-if="lysis.well>=3&&lysis.well<=10&&$store.getters.protocol.cartridge==2">{{$t("language.mix_volume")}}(5-600μl):</span>
          <span
            v-else-if="(lysis.well==11||lysis.well==12)&&$store.getters.protocol.cartridge==2">{{$t("language.mix_volume")}}(5-120μl):</span>

          <span
            v-else-if="lysis.well==1&&$store.getters.protocol.cartridge==8">{{$t("language.mix_volume")}}(5-1000μl):</span>
          <span
            v-else-if="lysis.well>=2&&lysis.well<=9&&$store.getters.protocol.cartridge==8">{{$t("language.mix_volume")}}(5-600μl):</span>
          <span
            v-else-if="lysis.well==10&&$store.getters.protocol.cartridge==8">{{$t("language.mix_volume")}}(5-120μl):</span>

          <span
            v-else-if="lysis.well==1&&$store.getters.protocol.cartridge==15">{{$t("language.mix_volume")}}(5-1000μl):</span>
          <span
            v-else-if="lysis.well>=2&&lysis.well<=7&&$store.getters.protocol.cartridge==15">{{$t("language.mix_volume")}}(5-600μl):</span>
          <span
            v-else-if="lysis.well==8&&$store.getters.protocol.cartridge==15">{{$t("language.mix_volume")}}(5-120μl):</span>

          <span v-else-if="lysis.well=='A'">{{$t("language.mix_volume")}}(5-1000μl):</span>
          <span v-else-if="lysis.well=='B'||lysis.well=='C'">{{$t("language.mix_volume")}}(5-600μl):</span>
          <input @focus="onfocus('num',lysis.mix_volume,$event)" class="input-step-name" v-model="lysis.mix_volume"
            @blur="saveData()" @input="lysis.mix_volume = lysis.mix_volume.replace(/[^[0-9]\d*$/g, '')" />
        </div>
        <div class="step-name">
          {{$t("language.mix_speed")}}(1%-150%):
          <input @focus="onfocus('num',lysis.mix_speed,$event)" class="input-step-name" v-model="lysis.mix_speed"
            @blur="saveData()" @input="lysis.mix_speed = lysis.mix_speed.replace(/[^[0-9]\d*$/g, '')" />
        </div>
        <div class="step-name" v-if="($store.getters.protocol.cartridge==8||$store.getters.protocol.cartridge==15)&&lysis.well==1">
          {{$t("language.mix_moving_speed")}}(1%-150%):
          <input @focus="onfocus('num',lysis.mix_moving_speed,$event)" class="input-step-name"
            v-model="lysis.mix_moving_speed" @blur="saveData()"
            @input="lysis.mix_moving_speed = lysis.mix_moving_speed.replace(/[^[0-9]\d*$/g, '')" />
        </div>
      </div>
      <div>
        <div v-if="getTempStatus()">
          <div class="step-name" style="margin-bottom: 10px;">
            {{$t("language.temperature_switch")}} :
            <span class="switch">
              <el-switch active-color="#13ce66" inactive-color="#DCDFE6" :width="66" @change="saveData()"
                v-model="temperature_on">
              </el-switch>
            </span>
          </div>
          <div v-if="temperature_on==1">
            <div class="step-name" style="margin-bottom: 10px;">
              {{$t("language.temperature")}}(37-120℃):
              <input @focus="onfocusTemp('point',lysis.temperature,$event)" class="input-step-name"
                v-model="lysis.temperature" @blur="saveData()"
                onKeypress="return(/[\d.]/.test(String.fromCharCode(event.keyCode)))" />
            </div>
            <div class="step-name" style="margin-bottom: 10px;">
              {{$t("language.heating_step")}}:
              <div class="heating-step">
                <div class="circle" :class="{'selected-heating':lysis.pre_heating==0}" @click="showWarning(0)">
                  <div class="circle-inner"></div>
                </div>
                <div class="circle-text">{{$t("language.hearting_sync")}}</div>
                <div class="circle" :class="{'selected-heating':lysis.pre_heating==1}" @click="showWarning(1)">
                  <div class="circle-inner"></div>
                </div>
                <div class="circle-text">{{$t("language.preheating")}}</div>
              </div>
            </div>
            <div class="warning" v-if="lysis.pre_heating==1">
              <div class="warning-div" @click="selectHeatStatus"><img src="../images/login/remember_selected.png"
                  class="img-ok" v-if="heat_stauts" />
              </div>
              <div>{{$t("language.elution_warning")}}</div>
              <input @focus="onfocusTemp('num',lysis.pre_heating_seconds,$event)" class="warning-input"
                v-model="lysis.pre_heating_seconds" @blur="saveData()"
                @input="lysis.pre_heating_seconds = lysis.pre_heating_seconds.replace(/[^[0-9]\d*$/g, '')"
                onKeypress="return(/[\d.]/.test(String.fromCharCode(event.keyCode)))" />
            </div>
            <div class="step-name" style="margin-bottom: 10px;">
              {{$t("language.cool_step")}}:
              <div class="heating-step">
                <div class="circle" :class="{'selected-heating':lysis.pre_cooling==0}" @click="changeCool(0)">
                  <div class="circle-inner"></div>
                </div>
                <div class="circle-text">{{$t("language.cool_sync")}}</div>
                <div class="circle" :class="{'selected-heating':lysis.pre_cooling==1}" @click="changeCool(1)">
                  <div class="circle-inner"></div>
                </div>
                <div class="circle-text">{{$t("language.precooling")}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      <div v-else-if="title_type==2" :class="['model',isShowNumberKeyboard||isShowNumberKeyboardPoint? 'move-top':'']">
      <div class="step-name" style="margin-bottom: 10px;">
        {{$t("language.magnet")}} :
        <span class="switch">
          <el-switch active-color="#13ce66" inactive-color="#DCDFE6" :width="66" @change="saveData()"
            v-model="magnet_on">
          </el-switch>
        </span>
      </div>
      <div class="step-name">
        <span>{{$t("language.labware")}}:</span>
        <div class="select-well" @click.stop="isMagnetLabware()" ref="well1">
          {{lysis.magnet_labware}}<img src="../images/protocols/down-prto.png" class="arraw-well" />
        </div>
        <div class="select-first" v-if="magnet_labware_status">
          <div class="arrawclass" @click="selectMagnetlabware(0)">{{$t("language.d_tip")}}</div>
          <div class="arrawclass" @click="selectMagnetlabware(1)" v-if="$store.getters.protocol.well_e==1">
            {{$t("language.e_tip")}}
          </div>
          <div class="arrawclass" @click="selectMagnetlabware(2)" v-if="$store.getters.protocol.well_e==2">
            {{$t("language.e_sleeve")}}
          </div>
        </div>
      </div>
      <div class="step-name">
        {{$t("language.segments")}}(1-5):
        <div class="select-well" @click.stop="is_Segment()" ref="well1">
          {{lysis.segments}}<img src="../images/protocols/down-prto.png" class="arraw-well" />
        </div>
        <div class="select-list-segments" v-if="segments_status">
          <div class="arrawclass" @click="selectSegments('1')">1</div>
          <div class="arrawclass" @click="selectSegments('2')">2</div>
          <div class="arrawclass" @click="selectSegments('3')">3</div>
          <div class="arrawclass" @click="selectSegments('4')">4</div>
          <div class="arrawclass" @click="selectSegments('5')">5</div>
        </div>
      </div>
      <div v-if="$store.getters.protocol.steps[order-1].magnet_labware==2">
        <div class="step-name">
          {{$t("language.every_magnetic_times")}}:
          <input @focus="onfocus('num',lysis.every_magnetic_times,$event)" class="input-step-name"
            v-model="lysis.every_magnetic_times" @blur="saveData()"
            @input="lysis.every_magnetic_times = lysis.every_magnetic_times.replace(/[^[0-9]\d*$/g, '')" />
        </div>
        <div class="step-name">
          {{$t("language.liquid_level_magnetic_times")}}(0-10):
          <input @focus="onfocus('num',lysis.liquid_level_magnetic_times,$event)" class="input-step-name"
            v-model="lysis.liquid_level_magnetic_times" @blur="saveData()"
            @input="lysis.liquid_level_magnetic_times = lysis.liquid_level_magnetic_times.replace(/[^[0-9]\d*$/g, '')" />
        </div>
        <div class="step-name">
          {{$t("language.cycle_1_99")}}:
          <input @focus="onfocus('num',lysis.cycle,$event)" class="input-step-name" v-model="lysis.cycle"
            @blur="saveData()" @input="lysis.cycle = lysis.cycle.replace(/[^[0-9]\d*$/g, '')" />
        </div>
        <div class="step-name">
          {{$t("language.magnet_speed")}}:
          <input @focus="onfocus('num',lysis.magnetic_speed,$event)" class="input-step-name"
            v-model="lysis.magnetic_speed" @blur="saveData()"
            @input="lysis.magnetic_speed = lysis.magnetic_speed.replace(/[^[0-9]\d*$/g, '')" />
        </div>
        <div class="step-name">
          {{$t("language.lowest_magnetic_position")}}:
          <input @focus="onfocusTemp('num',lysis.lowest_magnetic_position,$event)" class="input-step-name"
            v-model="lysis.lowest_magnetic_position" @blur="saveData()"
            @input="lysis.lowest_magnetic_position = lysis.lowest_magnetic_position.replace(/[^[0-9]\d*$/g, '')" />
        </div>
      </div>
      <div v-else>
        <div class="step-name">
          {{$t("language.interval_stay")}}:
          <input @focus="onfocus('num',lysis.interval_stay_time,$event)" class="input-step-name"
            v-model="lysis.interval_stay_time" @blur="saveData()"
            @input="lysis.interval_stay_time = lysis.interval_stay_time.replace(/[^[0-9]\d*$/g, '')" />
        </div>
        <div class="step-name">
          {{$t("language.cycle_1_99")}}:
          <input @focus="onfocus('num',lysis.cycle,$event)" class="input-step-name" v-model="lysis.cycle"
            @blur="saveData()" @input="lysis.cycle = lysis.cycle.replace(/[^[0-9]\d*$/g, '')" />
        </div>
        <div class="step-name">
          {{$t("language.aspirate_speed")}}(1%-150%):
          <input @focus="onfocus('num',lysis.aspirate_speed,$event)" class="input-step-name"
            v-model="lysis.aspirate_speed" @blur="saveData()"
            @input="lysis.aspirate_speed = lysis.aspirate_speed.replace(/[^[0-9]\d*$/g, '')" />
        </div>
        <div class="step-name">
          {{$t("language.magnetic_speed")}}(1%-150%):
          <input @focus="onfocus('num',lysis.magnetic_speed,$event)" class="input-step-name"
            v-model="lysis.magnetic_speed" @blur="saveData()"
            @input="lysis.magnetic_speed = lysis.magnetic_speed.replace(/[^[0-9]\d*$/g, '')" />
        </div>
      </div>
      <div class="step-name" style="margin-bottom: 10px;">
        {{$t("language.drying")}} :
        <span class="switch">
          <el-switch active-color="#13ce66" inactive-color="#DCDFE6" :width="66" @change="saveData()"
            v-model="lysis.drying_on">
          </el-switch>
        </span>
      </div>
      <div v-if="lysis.drying_on" style="margin-left: 20px;">
        <div class="step-name">
          {{$t("language.dry_time")}}:
          <input @focus="onfocusTemp('num',lysis.drying_time,$event)" class="input-step-name" v-model="lysis.drying_time"
            @blur="saveData()" onKeypress="return(/[\d.]/.test(String.fromCharCode(event.keyCode)))" />
        </div>
        <div class="step-name">
          {{$t("language.dry_position")}}:
          <div class="select-well" @click.stop="isDryPosition()" ref="well1">
            {{lysis.drying_position}}<img src="../images/protocols/down-prto.png" class="arraw-well" />
          </div>
          <div class="select-mix-type" v-if="position_status">
            <div class="arrawclass" @click="selectDryPosition(0)">{{$t("language.tube_inside")}}</div>
            <div class="arrawclass" @click="selectDryPosition(1)">{{$t("language.tube_outside")}}</div>
          </div>
        </div>
        <div class="step-name" v-if="$store.getters.protocol.steps[order-1].magnet_labware!=2">
          {{$t("language.drying_volume")}}(5-1000μl):
          <input @focus="onfocus('num',lysis.drying_volume,$event)" class="input-step-name" @blur="saveData()"
            v-model="lysis.drying_volume" @input="lysis.drying_volume = lysis.drying_volume.replace(/[^[0-9]\d*$/g, '')" />
        </div>
      </div>
      </div>
     </div>

    <!-- 全键盘 -->
    <SimpleKeyboard class="searchKeyboard" v-if="isShowKeyboard" :input="input" @onChange="onChange"
      @onKeyPress="onKeyPress" @colseKeyboard="colseKeyboard('name')" @mousedown.native="$event.preventDefault();" />
    <!-- 数字键盘 -->
    <!-- 不可输入小数点 -->
    <NumberKeyboard class="searchKeyboardNumber" v-if="isShowNumberKeyboard" :input="input" @onChange="onChangeNum"
      @onKeyPress="onKeyPressNum" @colseKeyboard="colseKeyboard('num')" @mousedown.native="$event.preventDefault();" />
    <!-- 可输入小数点 -->
    <NumberKeyboard class="searchKeyboardNumber" v-if="isShowNumberKeyboardPoint" :input="input"
      @onChange="onChangeNumPoint" @onKeyPress="onKeyPressNum" @colseKeyboard="colseKeyboard('num')"
      @mousedown.native="$event.preventDefault();" />
  </div>
</template>

<script>
  import SimpleKeyboard from "@/components/SimpleKeyboard";
  import NumberKeyboard from "@/components/NumberKeyboard.vue";
  import MixinNumAndKeyboard from "@/mixins/numAndKeyboard.js";
  export default {
    props: ['order', 'title_type'],
    components: {
      SimpleKeyboard,
      NumberKeyboard
    },
    mixins: [MixinNumAndKeyboard],
    data() {
      return {
        arraw_status: false,
        lysis: {},
        magnet_status: false,
        segments_status: false,
        magnet_type: null,
        temperature_on: null,
        magnet_on: null,
        heat_stauts: false,
        arraw_first_status: false,
        mix_segments_status: false,
        magnet_labware_status: false,
        mix_status: false,
        position_status: false
      }
    },
    watch: {
      'order': {
        immediate: true,
        handler(newval, oldval) {
          this.getData()
        }
      }
    },
    mounted() {
      this.getData()
      if (this.$refs.well1) {
        document.addEventListener('click', this.closeClick);
      }
    },
    methods: {
      closeClick(event) {
        if (this.$refs.well1) {
          if (!this.$refs.well1.contains(event.target)) {
            this.arraw_status = false;
            this.segments_status = false;
            this.magnet_status = false;
            this.arraw_first_status = false
            this.mix_segments_status = false
            this.magnet_labware_status = false
            this.mix_status = false
          }
        }
      },
      is_arraw() {
        this.arraw_status = !this.arraw_status
        this.segments_status = false;
        this.magnet_status = false;
        this.arraw_first_status = false
        this.mix_segments_status = false
        this.magnet_labware_status = false
        this.mix_status = false
      },
      selectWell(type) {
        var protocol = JSON.parse(JSON.stringify(this.$store.getters.protocol))
        this.lysis.well = type
        protocol.steps[this.order - 1].well = type
        this.$store.commit('setProtocol', protocol)
        this.saveData()
        this.arraw_status = false
      },
      getData() {
        this.lysis = JSON.parse(JSON.stringify(this.$store.getters.protocol.steps[this.order - 1]))
        this.lysis.temperature = Number(this.lysis.temperature).toFixed(1)
        this.lysis.drying_on = this.lysis.drying_on == 1 ? true : false
        if (this.lysis.magnet_type == 'tip') {
          this.magnet_type = this.$t("language.tip")
        } else if (this.lysis.magnet_type == 'sleeve') {
          this.magnet_type = this.$t("language.sleeve")
        }
        if (this.lysis.temperature_on == 1) {
          this.temperature_on = true
        } else if (this.lysis.magnet_type == 0) {
          this.temperature_on = false
        }
        if (this.lysis.magnet_on == 1) {
          this.magnet_on = true
        } else if (this.lysis.magnet_on == 0) {
          this.magnet_on = false
        }
        if (this.lysis.pre_heating_seconds != 0) {
          this.heat_stauts = true
        } else {
          this.heat_stauts = false
        }
        if (this.lysis.basic_labware == 0) {
          this.lysis.basic_labware = this.$t("language.d_tip")
        } else if (this.lysis.basic_labware == 1) {
          this.lysis.basic_labware = this.$t("language.e_tip")
        } else if (this.lysis.basic_labware == 2) {
          this.lysis.basic_labware = this.$t("language.e_sleeve")
        }
        if (this.lysis.magnet_labware == 0) {
          this.lysis.magnet_labware = this.$t("language.d_tip")
        } else if (this.lysis.magnet_labware == 1) {
          this.lysis.magnet_labware = this.$t("language.e_tip")
        } else if (this.lysis.magnet_labware == 2) {
          this.lysis.magnet_labware = this.$t("language.e_sleeve")
        }
        if (this.lysis.mix_type == 0) {
          this.lysis.mix_type = this.$t("language.top_bottom")
        } else if (this.lysis.mix_type == 1) {
          this.lysis.mix_type = this.$t("language.bottom_top")
        }
        if (this.lysis.drying_position == 0) {
          this.lysis.drying_position = this.$t("language.tube_inside")
        } else if (this.lysis.drying_position == 1) {
          this.lysis.drying_position = this.$t("language.tube_outside")
        }
      },
      saveData(type) {
        //volume
        if (this.lysis.volume < 5) {
          this.lysis.volume = 5
        }
        if (this.lysis.mix_volume < 5) {
          this.lysis.mix_volume = 5
        }
        if ((this.lysis.well == 1 || this.lysis.well == 2) && this.$store.getters.protocol.cartridge == 2) {
          //volume
          if (this.lysis.volume > 2000) {
            this.lysis.volume = 2000
          }
          //mix_volume
          if (this.lysis.mix_volume > 1000) {
            this.lysis.mix_volume = 1000
          }
        } else if (this.lysis.well >= 3 && this.lysis.well <= 10 && this.$store.getters.protocol.cartridge == 2) {
          //volume
          if (this.lysis.volume > 1000) {
            this.lysis.volume = 1000
          }
          //mix_volume
          if (this.lysis.mix_volume > 600) {
            this.lysis.mix_volume = 600
          }
        } else if (this.lysis.well == 12 && this.lysis.well == 11 && this.$store.getters.protocol.cartridge == 2) {
          //volume
          if (this.lysis.volume > 200) {
            this.lysis.volume = 200
          }
          //mix_volume
          if (this.lysis.mix_volume > 120) {
            this.lysis.mix_volume = 120
          }
        } else if (this.lysis.well == 1 && this.$store.getters.protocol.cartridge == 8) {
          //volume
          if (this.lysis.volume > 8000) {
            this.lysis.volume = 8000
          }
          //mix_volume
          if (this.lysis.mix_volume > 1000) {
            this.lysis.mix_volume = 1000
          }
        } else if (this.lysis.well >= 2 && this.lysis.well <= 9 && this.$store.getters.protocol.cartridge == 8) {
          //volume
          if (this.lysis.volume > 1000) {
            this.lysis.volume = 1000
          }
          //mix_volume
          if (this.lysis.mix_volume > 600) {
            this.lysis.mix_volume = 600
          }
        } else if (this.lysis.well == 10 && this.$store.getters.protocol.cartridge == 8) {
          //volume
          if (this.lysis.volume > 200) {
            this.lysis.volume = 200
          }
          //mix_volume
          if (this.lysis.mix_volume > 120) {
            this.lysis.mix_volume = 120
          }
        } else if (this.lysis.well == 1 && this.$store.getters.protocol.cartridge == 12) {
          //volume
          if (this.lysis.volume > 15000) {
            this.lysis.volume = 15000
          }
          //mix_volume
          if (this.lysis.mix_volume > 1000) {
            this.lysis.mix_volume = 1000
          }
        } else if (this.lysis.well >= 2 && this.lysis.well <= 7 && this.$store.getters.protocol.cartridge == 12) {
          //volume
          if (this.lysis.volume > 1000) {
            this.lysis.volume = 1000
          }
          //mix_volume
          if (this.lysis.mix_volume > 600) {
            this.lysis.mix_volume = 600
          }
        } else if (this.lysis.well == 8 && this.$store.getters.protocol.cartridge == 12) {
          //volume
          if (this.lysis.volume > 200) {
            this.lysis.volume = 200
          }
          //mix_volume
          if (this.lysis.mix_volume > 120) {
            this.lysis.mix_volume = 120
          }
        } else if (this.lysis.well == 'A') {
          //volume
          if (this.lysis.volume > 10000) {
            this.lysis.volume = 10000
          }
          //mix_volume
          if (this.lysis.mix_volume > 1000) {
            this.lysis.mix_volume = 1000
          }
        } else if (this.lysis.well == 'B' || this.lysis.well == 'C') {
          //volume
          if (this.lysis.volume > 1000) {
            this.lysis.volume = 1000
          }
          //mix_volume
          if (this.lysis.mix_volume > 600) {
            this.lysis.mix_volume = 600
          }
        }
        //mixtime
        if (this.lysis.mix_time > 999) {
          this.lysis.mix_time = 999
        } else if (this.lysis.mix_time < 1) {
          this.lysis.mix_time = 1
        }
        //mixspeed
        if (this.lysis.basic_labware == this.$t("language.e_sleeve")) {
          if (this.lysis.mix_speed > 10) {
            this.lysis.mix_speed = 10
          } else if (this.lysis.mix_speed < 1) {
            this.lysis.mix_speed = 1
          }
        } else {
          if (this.lysis.mix_speed > 150) {
            this.lysis.mix_speed = 150
          } else if (this.lysis.mix_speed < 1) {
            this.lysis.mix_speed = 1
          }
        }
        //mix_segments
        if (this.lysis.mix_segments > 5) {
          this.lysis.mix_segments = 5
        } else if (this.lysis.mix_segments < 1) {
          this.lysis.mix_segments = 1
        }
        //every_mix_times
        if (this.lysis.every_mix_times > 999) {
          this.lysis.every_mix_times = 999
        } else if (this.lysis.every_mix_times <= 1) {
          this.lysis.every_mix_times = 1
        }
        //mix_moving_speed
        if (this.lysis.mix_moving_speed > 150) {
          this.lysis.mix_moving_speed = 150
        } else if (this.lysis.mix_moving_speed < 1) {
          this.lysis.mix_moving_speed = 1
        }
        //interval_stay_time
        if (this.lysis.interval_stay_time > 999) {
          this.lysis.interval_stay_time = 999
        } else if (this.lysis.interval_stay_time < 1) {
          this.lysis.interval_stay_time = 1
        }
        // cycle
        if (this.lysis.cycle > 99) {
          this.lysis.cycle = 99
        } else if (this.lysis.cycle < 1) {
          this.lysis.cycle = 1
        }
        //magnetic_speed
        if (this.lysis.magnetic_speed > 150) {
          this.lysis.magnetic_speed = 150
        } else if (this.lysis.magnetic_speed < 1) {
          this.lysis.magnetic_speed = 1
        }
        //drying_time
        if (this.lysis.drying_time > 999) {
          this.lysis.drying_time = 999
        } else if (this.lysis.drying_time <= 1) {
          this.lysis.drying_time = 1
        }
        //every_magnetic_times
        if (this.lysis.every_magnetic_times > 99) {
          this.lysis.every_magnetic_times = 99
        } else if (this.lysis.every_magnetic_times < 1) {
          this.lysis.every_magnetic_times = 1
        }
        //liquid_level_magnetic_times
        if (this.lysis.liquid_level_magnetic_times > 99) {
          this.lysis.liquid_level_magnetic_times = 99
        } else if (this.lysis.liquid_level_magnetic_times <= 0) {
          this.lysis.liquid_level_magnetic_times = 0
        }
        // pre_heating_seconds
        if (this.lysis.pre_heating_seconds > 999) {
          this.lysis.pre_heating_seconds = 999
        } else if (this.lysis.pre_heating_seconds <= 1) {
          this.lysis.pre_heating_seconds = 1
        }
        //temperature
        if (this.lysis.temperature > 120.0) {
          this.lysis.temperature = '120.0'
        } else if (this.lysis.temperature < 37.0) {
          this.lysis.temperature = '37.0'
        } else {
          this.lysis.temperature = Number(this.lysis.temperature).toFixed(1)
        }
        //lowest_magnetic_position
        if (this.lysis.lowest_magnetic_position > 20) {
          this.lysis.lowest_magnetic_position = 20
        } else if (this.lysis.lowest_magnetic_position <= 0) {
          this.lysis.lowest_magnetic_position = 0
        }
        //drying_speed
        if (this.lysis.drying_speed > 10) {
          this.lysis.drying_speed = 10
        } else if (this.lysis.drying_speed < 1) {
          this.lysis.drying_speed = 1
        }
        //mix_position
        if (this.lysis.mix_position > 20) {
          this.lysis.mix_position = 20
        } else if (this.lysis.mix_position <= 0) {
          this.lysis.mix_position = 0
        }
        //aspirate_speed
        if (this.lysis.aspirate_speed > 150) {
          this.lysis.aspirate_speed = 150
        } else if (this.lysis.aspirate_speed <= 1) {
          this.lysis.aspirate_speed = 1
        }
        var protocol = JSON.parse(JSON.stringify(this.$store.getters.protocol))
        this.lysis.temperature_on = this.temperature_on ? 1 : 0
        this.lysis.magnet_on = this.magnet_on ? 1 : 0
        protocol.steps[this.order - 1] = JSON.parse(JSON.stringify(this.lysis))
        protocol.steps[this.order - 1].drying_on = protocol.steps[this.order - 1].drying_on ? 1 : 0
        if (this.lysis.basic_labware == this.$t("language.d_tip")) {
          protocol.steps[this.order - 1].basic_labware = 0
        } else if (this.lysis.basic_labware == this.$t("language.e_tip")) {
          protocol.steps[this.order - 1].basic_labware = 1
        } else if (this.lysis.basic_labware == this.$t("language.e_sleeve")) {
          protocol.steps[this.order - 1].basic_labware = 2
        }
        if (this.lysis.magnet_labware == this.$t("language.d_tip")) {
          protocol.steps[this.order - 1].magnet_labware = 0
        } else if (this.lysis.magnet_labware == this.$t("language.e_tip")) {
          protocol.steps[this.order - 1].magnet_labware = 1
        } else if (this.lysis.magnet_labware == this.$t("language.e_sleeve")) {
          protocol.steps[this.order - 1].magnet_labware = 2
        }
        if (this.lysis.mix_type == this.$t("language.top_bottom")) {
          protocol.steps[this.order - 1].mix_type = 0
        } else if (this.lysis.mix_type == this.$t("language.bottom_top")) {
          protocol.steps[this.order - 1].mix_type = 1
        }
        if (this.lysis.drying_position == this.$t("language.tube_inside")) {
          protocol.steps[this.order - 1].drying_position = 0
        } else if (this.lysis.drying_position == this.$t("language.tube_outside")) {
          protocol.steps[this.order - 1].drying_position = 1
        }
        this.$store.commit('setProtocol', protocol)
        this.$emit('changeName')
          this.isShowKeyboard = this.isShowNumberKeyboard = this.isShowNumberKeyboardPoint = false;
          this.onchangeCount = 0
      },
      showWarning(type) {
        var protocol = JSON.parse(JSON.stringify(this.$store.getters.protocol))
        this.lysis.pre_heating = type
        protocol.steps[this.order - 1].pre_heating = type
        this.$store.commit('setProtocol', protocol)
      },
      changeCool(type) {
        var protocol = JSON.parse(JSON.stringify(this.$store.getters.protocol))
        this.lysis.pre_cooling = type
        protocol.steps[this.order - 1].pre_cooling = type
        this.$store.commit('setProtocol', protocol)
      },
      selectMagnet(type) {
        var protocol = JSON.parse(JSON.stringify(this.$store.getters.protocol))
        this.lysis.magnet_type = type
        this.magnet_type = type
        protocol.steps[this.order - 1].magnet_type = type
        this.$store.commit('setProtocol', protocol)
      },
      selectSegments(type) {
        var protocol = JSON.parse(JSON.stringify(this.$store.getters.protocol))
        this.lysis.segments = type
        protocol.steps[this.order - 1].segments = type
        this.$store.commit('setProtocol', protocol)
        this.segments_status = false
      },
      selectMixSegments(type) {
        var protocol = JSON.parse(JSON.stringify(this.$store.getters.protocol))
        this.lysis.mix_segments = type
        protocol.steps[this.order - 1].mix_segments = type
        this.$store.commit('setProtocol', protocol)
      },
      is_magnet() {
        this.magnet_status = !this.magnet_status
        this.arraw_status = false;
        this.segments_status = false;
        this.arraw_first_status = false
        this.mix_segments_status = false
        this.magnet_labware_status = false
        this.mix_status = false
      },
      is_Segment() {
        this.segments_status = !this.segments_status
        this.arraw_status = false;
        this.magnet_status = false;
        this.arraw_first_status = false
        this.mix_segments_status = false
        this.magnet_labware_status = false
        this.mix_status = false
      },
      isMixSegment() {
        this.mix_segments_status = !this.mix_segments_status
        this.arraw_status = false;
        this.segments_status = false;
        this.magnet_status = false;
        this.arraw_first_status = false
        this.magnet_labware_status = false
        this.mix_status = false
      },
      selectHeatStatus() {
        this.heat_stauts = !this.heat_stauts
        if (this.heat_stauts == false) {
          this.lysis.pre_heating_seconds = 0
        }
      },
      selectlabware(type) {
        var protocol = JSON.parse(JSON.stringify(this.$store.getters.protocol))
        if (type == 0) {
          this.lysis.basic_labware = this.$t("language.d_tip")
        } else if (type == 1) {
          this.lysis.basic_labware = this.$t("language.e_tip")
        } else if (type == 2) {
          this.lysis.basic_labware = this.$t("language.e_sleeve")
        }
        protocol.steps[this.order - 1].basic_labware = type
        this.$store.commit('setProtocol', protocol)
        this.arraw_first_status = false
      },
      selectMagnetlabware(type) {
        var protocol = JSON.parse(JSON.stringify(this.$store.getters.protocol))
        if (type == 0) {
          this.lysis.magnet_labware = this.$t("language.d_tip")
        } else if (type == 1) {
          this.lysis.magnet_labware = this.$t("language.e_tip")
        } else if (type == 2) {
          this.lysis.magnet_labware = this.$t("language.e_sleeve")
        }
        protocol.steps[this.order - 1].magnet_labware = type
        this.$store.commit('setProtocol', protocol)
        this.magnet_labware_status = false
      },
      is_arraw_first() {
        this.arraw_first_status = !this.arraw_first_status
        this.arraw_status = false
        this.segments_status = false;
        this.magnet_status = false;
        this.mix_segments_status = false
        this.magnet_labware_status = false
        this.mix_status = false
      },
      getTempStatus() {
        if (this.$store.getters.protocol.cartridge == 2) {
          if (this.lysis.well == 1 || this.lysis.well == 2 || this.lysis.well == 12) {
            return true
          }
        } else if (this.$store.getters.protocol.cartridge == 8) {
          if (this.lysis.well == 1 || this.lysis.well == 10) {
            return true
          }
        } else if (this.$store.getters.protocol.cartridge == 15) {
          if (this.lysis.well == 1 || this.lysis.well == 8) {
            return true
          }
        } else {
          return false
        }
      },
      isMagnetLabware() {
        this.magnet_labware_status = !this.magnet_labware_status
        this.arraw_first_status = false
        this.arraw_status = false
        this.segments_status = false;
        this.magnet_status = false;
        this.mix_segments_status = false
        this.mix_status = false
      },
      isMixType() {
        this.mix_status = !this.mix_status
        this.magnet_labware_status = false
        this.arraw_first_status = false
        this.arraw_status = false
        this.segments_status = false
        this.magnet_status = false
        this.mix_segments_status = false
      },
      selectMixType(type) {
        var protocol = JSON.parse(JSON.stringify(this.$store.getters.protocol))
        if (type == 0) {
          this.lysis.mix_type = this.$t("language.top_bottom")
        } else if (type == 1) {
          this.lysis.mix_type = this.$t("language.bottom_top")
        }
        protocol.steps[this.order - 1].mix_type = type
        this.$store.commit('setProtocol', protocol)
        this.mix_status = false
      },
      isDryPosition() {
        this.position_status = !this.position_status
        this.mix_status = false
        this.magnet_labware_status = false
        this.arraw_first_status = false
        this.arraw_status = false
        this.segments_status = false
        this.magnet_status = false
        this.mix_segments_status = false
      },
      selectDryPosition(type) {
        var protocol = JSON.parse(JSON.stringify(this.$store.getters.protocol))
        if (type == 0) {
          this.lysis.drying_position = this.$t("language.tube_inside")
        } else if (type == 1) {
          this.lysis.drying_position = this.$t("language.tube_outside")
        }
        protocol.steps[this.order - 1].drying_position = type
        this.$store.commit('setProtocol', protocol)
        this.position_status = false
      }
    },
    destroyed() {
      document.removeEventListener('click', this.closeClick);
    }
  }
</script>

<style scoped="scoped">
.mask {
    width: 100%;
    height: 100%;
    z-index: 99;
    position: absolute;
    left: 0;
    top: 0;
}
  .searchKeyboard {
    left: 600px !important;
    bottom: 40px !important;
    width: 1270px !important;
    transform: scaleY(0.95);
    z-index: 999;
  }

  .keyBoard>>>li.hg-candidate-box-list-item {
    width: 54px !important;
  }

  .searchKeyboardNumber {
    left: 800px !important;
    bottom: -20px !important;
    transform: scale(0.78);
    z-index: 999;
  }

  .move-top {
    height: 530px !important;
  }

  .hidden {
    overflow: hidden;
  }

  .model {
    font-size: 24px;
    margin-left: 37px;
    margin-top: 26px;
    /* background-color: red; */
    height: 952px;
    overflow-y: auto;
  }

  .step-name {
    position: relative;
    width: 100%;
    height: 54px;
    line-height: 54px;
    margin-bottom: 25px;
  }

  .input-step-name {
    position: absolute;
    width: 310px;
    height: 54px;
    left: 513px;
    text-align: center;
    background-color: #ffffff;
    border-radius: 2px;
    box-sizing: border-box;
    border: solid 1px #c2cbda;
    z-index: 999;
  }

  .select-well {
    position: absolute;
    width: 310px;
    height: 54px;
    left: 513px;
    text-align: center;
    background-color: #ffffff;
    border-radius: 2px;
    border: solid 1px #c2cbda;
    box-sizing: border-box;
    top: 0;
  }

  .arraw-well {
    position: absolute;
    /* margin-left: 269px; */
    top: 35%;
    right: 12px;
  }

  .select-list {
    position: absolute;
    z-index: 1000;
    background-color: #ffffff;
    height: 216px;
    overflow-y: auto;
    width: 310px;
    border: solid 2px #c2cbda;
    box-sizing: border-box;
    border-top: none;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    margin-left: 513px;
  }

  .select-list-magnet {
    position: absolute;
    z-index: 1000;
    background-color: #ffffff;
    height: 108px;
    width: 310px;
    border: solid 2px #c2cbda;
    box-sizing: border-box;
    border-top: none;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    margin-left: 513px;
  }

  .select-list-segments {
    position: absolute;
    z-index: 1000;
    background-color: #ffffff;
    height: 270px;
    width: 310px;
    border: solid 2px #c2cbda;
    box-sizing: border-box;
    border-top: none;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    margin-left: 513px;
  }

  .select-mix-type {
    position: absolute;
    z-index: 1000;
    background-color: #ffffff;
    height: 109px;
    width: 310px;
    border: solid 2px #c2cbda;
    box-sizing: border-box;
    border-top: none;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    margin-left: 513px;
  }

  .arrawclass {
    border-top: 2px solid #c2cbda;
    text-align: center;
  }

  .switch {
    position: absolute;
    left: 513px;
  }

  .heating-step {
    position: absolute;
    width: 500px;
    height: 54px;
    left: 513px;
    display: flex;
    align-items: center;
    top: 0;
  }

  .circle {
    width: 30px;
    height: 30px;
    background-color: #ffffff;
    border: solid 1px #5691d3;
    border-radius: 15px;
    margin-right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .circle-text {
    margin-right: 60px;
  }

  .circle-inner {
    width: 14px;
    height: 14px;
    border-radius: 7px;
    background-color: #ffffff;
  }

  .selected-heating {
    background-color: #5691D3;
  }

  .warning {
    position: relative;
    width: 100%;
    height: 40px;
    line-height: 40px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    font-size: 20px;
    color: #666666;
  }

  .warning-div {
    width: 28px;
    height: 28px;
    background-color: #ffffff;
    border-radius: 2px;
    border: solid 1px #5a89c7;
    margin-right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .warning-input {
    width: 170px;
    height: 40px;
    background-color: #ffffff;
    border-radius: 2px;
    border: solid 1px #c2cbda;
    position: absolute;
    left: 513px;
    text-indent: 22px;
  }

  .img-ok {
    transform: scale(0.6);
  }

  .expect-div {
    position: absolute;
    width: 310px;
    height: 54px;
    background-color: #e1e1e1;
    border-radius: 2px;
    border: solid 1px #c2cbda;
    left: 513px;
    text-align: center;
    top: 0;
  }

  .select-first {
    position: absolute;
    z-index: 1000;
    background-color: #ffffff;
    height: 108px;
    width: 311px;
    border: solid 2px #c2cbda;
    box-sizing: border-box;
    border-top: none;
    overflow-y: auto;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    left: 513px;
  }
</style>
<style>
  .step-name .el-switch__core {
    height: 30px;
    border-radius: 21px;
  }

  .step-name .el-switch__core:after {
    height: 28px;
    width: 29px;
    top: 0;
  }

  .step-name .is-checked .el-switch__core:after {
    height: 28px;
    width: 29px;
    top: 0;
    -webkit-transform: translateX(-11px);
  }

  .model,
  .model div,
  .select-list,
  .select-list div,
  .select-first,
  .select-first div {
    touch-action: pan-y !important;
  }
</style>
