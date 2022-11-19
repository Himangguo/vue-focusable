<script>
import classnames from "classnames";
import { focusManageLib, getWidgetRect, createId, changeGoto } from "../core";
import { isVueCpn } from "../utils/type";
export default {
  name: "Focus",
  props: {
    onOk: {
      type: Function,
      default() {
        return () => {};
      },
    },
    onActive: {
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
      type: Number|String,
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
    console.log('Focus mounted')
    // 指定移动方向
    let goto = changeGoto(this.foGoto);
    let element = this.$el;
    // 监听dom是否可见，并添加可见属性（在盒子中的浏览器不支持IntersectionObserver）
    // this.observe(element)
    // 创建唯一id
    this.id = createId();
    // 组件层级
    let rect = getWidgetRect(element);
    // 为element添加原生属性
    element.dataset.focusId = this.id;
    element.dataset.focusIndex = this.zIndex;
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
      onActive: this.onActive,
      onBeforeLeave: this.onBeforeLeave,
      onLeave: this.onLeave,
      foWidgetBind: this.foWidgetBind,
    };

    focusManageLib.cubs[this.zIndex] = focusManageLib.cubs[this.zIndex] || {};
    // 在全局focusManange中保存这个焦点组件的信息
    focusManageLib.cubs[this.zIndex][this.id] = cubInfo;

    if (this.foIndex) focusManageLib.foIndexs[this.foIndex] = cubInfo;


  },
  beforeUpdate() {
    // 支持goto的动态更新
    focusManageLib.cubs[this.zIndex][this.id].goto = changeGoto(this.foGoto);
  },
  beforeDestroy() {
    // 在组件将要卸载时，删除focusManage中保存的此focus节点对象
    delete focusManageLib.cubs[this.zIndex][this.id];
    if (this.foIndex) {
      delete focusManageLib.foIndexs[this.foIndex];
    }
  },
  render(createElement) {
    let child = this.$slots.default[0];
    let childClass = child.data?.staticClass;
    let staticClass = "";
    if (!isVueCpn(child)) {
      staticClass = classnames({
        [childClass]: childClass,
        // 根据state中的[reciveClassName]字段来判断当前节点处于什么状态（active、cache、unactive）
        // focusManage在切换焦点时，会改变三个元素的状态，当前元素（active）,前一个元素（cache），前前一个节点（unActive）
        [this.activeClassName]: this.activeClassName === this.reciveClassName,
        [this.cacheClassName]: this.cacheClassName === this.reciveClassName,
      });
      if(!child.tag && child.text) {
        // 如果是纯文本
        return createElement(
            'span',
            { staticClass },
            child.text
        );
      }
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
      // 1、直接修改组件的props，但是vue会警告此做法
      // child.componentInstance && Object.assign(child.componentInstance._props, {
      //   focusStateClass:
      //     this.activeClassName === this.reciveClassName
      //       ? this.activeClassName
      //       : this.cacheClassName === this.reciveClassName
      //       ? this.cacheClassName
      //       : "",
      // });
      // return child;
      // 2、直接创建组件的虚拟dom，但是需要手动引入组件并注册
      return createElement(
          child.componentOptions.tag,
          {
            on: {...child.componentOptions.listeners},
            props: {...child.componentOptions.propsData,
              focusStateClass:
                this.activeClassName === this.reciveClassName
                  ? this.activeClassName
                  : this.cacheClassName === this.reciveClassName
                  ? this.cacheClassName
                  : "",
               },
            attrs: child.data.attrs,
            staticClass: child.data.staticClass,
            staticStyle: {
              boxSizing: 'border-box',
            }
          },
          child.children
      );
    }
  },
  methods: {
    observe(ele) {
      let root = document.body
      const options = {
        root,
        rootMargin: '0px',
        threshold: 0.1
      }
      const observer = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting) {
          ele.setAttribute('data-focusable', '')
        }else {
          ele.removeAttribute('data-focusable')
        }
      }, options)

      observer.observe(ele);
    }
  }
};
</script>
