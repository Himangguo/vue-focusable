<script>
import classnames from "classnames";
import { getWidgetRect, careteId, changeGoto, cloneElement } from "../core";
import { isVueCpn } from "../utils/type";
export default {
  name: "Focus",
  inject: ["focusInfo"],
  props: {
    onOk: {
      type: Function,
      default() {
        return () => {};
      },
    },
    onAcitve: {
      type: Function,
      default() {
        return () => {};
      },
    },
    onLeave: {
      type: Function,
      default() {
        return () => {};
      },
    },
    onEdge: {
      type: Function,
      default() {
        return () => {};
      },
    },
    onBeforeLeave: {
      type: Function,
      default() {
        return () => {};
      },
    },
    foIndex: {
      type: Number | undefined,
      default: undefined,
    },
    zIndex: {
      type: Number,
      default: 1,
    },
    foGoto: {
      type: String | undefined,
      default: undefined,
    },
    foWidgetBind: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      reciveClassName: "",
      cacheClassName: "cached",
      activeClassName: "focusActive",
    };
  },
  mounted() {
    // 指定移动方向
    let goto = changeGoto(this.foGoto);
    let element = this.$el;
    // 创建唯一id
    this.id = careteId();
    // 组件层级
    let rect = getWidgetRect(element);
    let cubInfo = {
      rect,
      element,
      goto,
      zIndex: parseInt(this.zIndex, 10),
      // 激活状态改变类名为activeClassName
      active: () => {
        this.reciveClassName = this.activeClassName;
      },
      // 未激活状态改变类名为cachePropsName
      unactive: () => {
        this.reciveClassName = this.cacheClassName;
      },
      // 卸载状态改变类名为空
      clear: () => {
        this.reciveClassName = "";
      },
      onOk: this.onOk,
      onEdge: this.onEdge,
      onAcitve: this.onAcitve,
      onBeforeLeave: this.onBeforeLeave,
      onLeave: this.onLeave,
      foWidgetBind: this.foWidgetBind,
    };

    this.focusInfo.cubs[this.zIndex] = this.focusInfo.cubs[this.zIndex] || {};
    // 在全局focusManange中保存这个焦点组件的信息
    this.focusInfo.cubs[this.zIndex][this.id] = cubInfo;

    if (this.foIndex) this.focusInfo.foIndexs[this.foIndex] = cubInfo;

    // 为element添加原生属性
    element.dataset.focusId = this.id;
    element.dataset.focusIndex = this.zIndex;
  },
  beforeDestroy() {
    // 在组件将要卸载时，删除focusManage中保存的此focus节点对象
    delete this.focusInfo.cubs[this.zIndex][this.id];
    if (this.foIndex) {
      delete this.focusInfo.foIndexs[this.foIndex];
    }
  },
  render(createElement) {
    let child = this.$slots.default[0];
    let childClass = child.data.staticClass;
    let staticClass = "";
    if (!isVueCpn(child)) {
      staticClass = classnames({
        [childClass]: childClass,
        // 根据state中的[reciveClassName]字段来判断当前节点处于什么状态（active、cache、unactive）
        // focusManage在切换焦点时，会改变三个元素的状态，当前元素（active）,前一个元素（cache），前前一个节点（unActive）
        [this.activeClassName]: this.activeClassName === this.reciveClassName,
        [this.cacheClassName]: this.cacheClassName === this.reciveClassName,
      });
      return createElement(
        child.tag,
        { ...child.data, staticClass },
        child.children
      );
    } else {
      staticClass = classnames({
        [this.activeClassName]: this.activeClassName === this.reciveClassName,
        [this.cacheClassName]: this.cacheClassName === this.reciveClassName,
      });
      child.componentInstance && Object.assign(child.componentInstance._props, {
        focusStateClass:
          this.activeClassName === this.reciveClassName
            ? this.activeClassName
            : this.cacheClassName === this.reciveClassName
            ? this.cacheClassName
            : "",
      });
      // child.componentInstance&&child.componentInstance.$forceUpdate()
      return child;
    }
  },
};
</script>
